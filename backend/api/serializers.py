from rest_framework import serializers
from .models import Category, Asset, Warranty, Credential, Subscription
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent']
        read_only_fields = ['id']


class RecursiveCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'subcategories']
    
    def get_subcategories(self, obj):
        if obj.subcategories.exists():
            return RecursiveCategorySerializer(obj.subcategories.all(), many=True).data
        return []


class WarrantySerializer(serializers.ModelSerializer):
    class Meta:
        model = Warranty
        fields = ['id', 'asset', 'start_date', 'end_date', 'provider', 'details', 'document']
        read_only_fields = ['id']


class AssetSerializer(serializers.ModelSerializer):
    warranties = WarrantySerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Asset
        fields = ['id', 'name', 'description', 'category', 'category_name', 'purchase_date', 
                 'purchase_price', 'user', 'created_at', 'updated_at', 'warranties']
        read_only_fields = ['id', 'created_at', 'updated_at', 'category_name']


class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = ['id', 'name', 'username', 'password', 'website', 'notes', 'user']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'name', 'provider', 'start_date', 'renewal_date', 
                 'cost', 'status', 'user', 'notes']
        read_only_fields = ['id'] 