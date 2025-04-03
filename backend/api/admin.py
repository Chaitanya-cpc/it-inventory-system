from django.contrib import admin
from .models import Category, Asset, Warranty, Credential, Subscription

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)
    list_filter = ('parent',)

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'purchase_date', 'purchase_price', 'user')
    search_fields = ('name', 'description')
    list_filter = ('category', 'purchase_date', 'user')
    date_hierarchy = 'purchase_date'

@admin.register(Warranty)
class WarrantyAdmin(admin.ModelAdmin):
    list_display = ('asset', 'start_date', 'end_date', 'provider')
    search_fields = ('asset__name', 'provider')
    list_filter = ('start_date', 'end_date')
    date_hierarchy = 'end_date'

@admin.register(Credential)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ('name', 'username', 'website', 'user')
    search_fields = ('name', 'username', 'website')
    list_filter = ('user',)

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'provider', 'start_date', 'renewal_date', 'cost', 'status', 'user')
    search_fields = ('name', 'provider')
    list_filter = ('status', 'renewal_date', 'user')
    date_hierarchy = 'renewal_date'
