from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, AssetViewSet, WarrantyViewSet, 
    CredentialViewSet, SubscriptionViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'assets', AssetViewSet, basename='asset')
router.register(r'warranties', WarrantyViewSet, basename='warranty')
router.register(r'credentials', CredentialViewSet, basename='credential')
router.register(r'subscriptions', SubscriptionViewSet, basename='subscription')

urlpatterns = [
    path('', include(router.urls)),
] 