from django.contrib import admin
from notices.models import Notice

# Register your models here.


class NoticeManagement(admin.ModelAdmin):
    list_display = ("id", "title", "created_at", "is_public")


admin.site.register(Notice, NoticeManagement)
