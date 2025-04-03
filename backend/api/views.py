from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta

from .models import Category, Asset, Warranty, Credential, Subscription
from .serializers import (
    CategorySerializer, RecursiveCategorySerializer, AssetSerializer, 
    WarrantySerializer, CredentialSerializer, SubscriptionSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    
    def get_queryset(self):
        # Only show categories with no parent (top-level) by default
        parent_id = self.request.query_params.get('parent', None)
        if parent_id is not None:
            if parent_id == '0':  # Special case for top-level categories
                return Category.objects.filter(parent=None)
            return Category.objects.filter(parent=parent_id)
        return Category.objects.all()
    
    @action(detail=False, methods=['get'])
    def tree(self, request):
        # Return the entire category hierarchy
        categories = Category.objects.filter(parent=None)
        serializer = RecursiveCategorySerializer(categories, many=True)
        return Response(serializer.data)


class AssetViewSet(viewsets.ModelViewSet):
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category__name']
    
    def get_queryset(self):
        # Filter assets by the authenticated user
        user = self.request.user
        queryset = Asset.objects.filter(user=user)
        
        # Filter by category if provided
        category_id = self.request.query_params.get('category', None)
        if category_id:
            # Get all subcategories recursively
            subcategories = []
            self._get_subcategories(int(category_id), subcategories)
            # Filter by the category and all its subcategories
            queryset = queryset.filter(Q(category_id=category_id) | Q(category_id__in=subcategories))
            
        return queryset
    
    def _get_subcategories(self, category_id, result):
        # Helper method to get all subcategories recursively
        subcategories = Category.objects.filter(parent_id=category_id)
        for subcat in subcategories:
            result.append(subcat.id)
            self._get_subcategories(subcat.id, result)
    
    def perform_create(self, serializer):
        # Automatically set the user to the authenticated user
        serializer.save(user=self.request.user)


class WarrantyViewSet(viewsets.ModelViewSet):
    queryset = Warranty.objects.all()
    serializer_class = WarrantySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Only show warranties for assets owned by the authenticated user
        user = self.request.user
        return Warranty.objects.filter(asset__user=user)
    
    @action(detail=False, methods=['get'])
    def expiring_soon(self, request):
        # Return warranties expiring in the next 30 days
        user = request.user
        thirty_days_from_now = timezone.now().date() + timedelta(days=30)
        warranties = Warranty.objects.filter(
            asset__user=user,
            end_date__lte=thirty_days_from_now,
            end_date__gte=timezone.now().date()
        )
        serializer = self.get_serializer(warranties, many=True)
        return Response(serializer.data)


class CredentialViewSet(viewsets.ModelViewSet):
    serializer_class = CredentialSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'username', 'website']
    
    def get_queryset(self):
        # Only show credentials owned by the authenticated user
        user = self.request.user
        return Credential.objects.filter(user=user)
    
    def perform_create(self, serializer):
        # Automatically set the user to the authenticated user
        serializer.save(user=self.request.user)


class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'provider']
    
    def get_queryset(self):
        # Only show subscriptions owned by the authenticated user
        user = self.request.user
        return Subscription.objects.filter(user=user)
    
    def perform_create(self, serializer):
        # Automatically set the user to the authenticated user
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def expiring_soon(self, request):
        # Return subscriptions renewing in the next 30 days
        user = request.user
        thirty_days_from_now = timezone.now().date() + timedelta(days=30)
        subscriptions = Subscription.objects.filter(
            user=user,
            renewal_date__lte=thirty_days_from_now,
            renewal_date__gte=timezone.now().date()
        )
        serializer = self.get_serializer(subscriptions, many=True)
        return Response(serializer.data)
