from django.contrib import admin
from complaints.models import Complaint ,FinancialFraudComplaint, SocialMediaHackComplaint, DefamationComplaint, OtherComplaint

# Register your models here.

class ComplaintsManagement(admin.ModelAdmin):
    list_display = ('complaint_id', 'victim_Name', 'status', 'created_at')

# admin.site.register(Complaint, ComplaintsManagement)
admin.site.register(FinancialFraudComplaint, ComplaintsManagement)
admin.site.register(SocialMediaHackComplaint, ComplaintsManagement)
admin.site.register(DefamationComplaint, ComplaintsManagement)
admin.site.register(OtherComplaint, ComplaintsManagement)