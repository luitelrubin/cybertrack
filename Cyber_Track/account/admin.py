from django.contrib import admin
from .models import User

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'batch_no', 'post', 'posted_district', 'created_at')

admin.site.register(User, UserAdmin)