from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"


class Asset(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='assets')
    purchase_date = models.DateField(null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assets')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name


class Warranty(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='warranties')
    start_date = models.DateField()
    end_date = models.DateField()
    provider = models.CharField(max_length=255)
    details = models.TextField(blank=True)
    document = models.FileField(upload_to='warranty_docs/', null=True, blank=True)
    
    def __str__(self):
        return f"Warranty for {self.asset.name}"
    
    class Meta:
        verbose_name_plural = "Warranties"


class Credential(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)  # In production, consider encryption
    website = models.URLField(blank=True)
    notes = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='credentials')
    
    def __str__(self):
        return self.name


class Subscription(models.Model):
    name = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    start_date = models.DateField()
    renewal_date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('canceled', 'Canceled'),
            ('expired', 'Expired'),
        ],
        default='active'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
