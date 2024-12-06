from django.urls import path
from .views import (FinancialComplaintCreateView, SocialMediaHackComplaintCreateView, DefamationComplaintCreateView, OtherComplaintCreateView,
                    ListAllComplaintsView, AllComplaintUpdateView,ComplaintTrackingView, SendEmailView,
                    )
urlpatterns = [
    #Complaint Listing URL
    path('', ListAllComplaintsView.as_view(), name='list-all-complaints'),
    #Complaint creation URLs
    path('create-financial-fraud/', FinancialComplaintCreateView.as_view(), name='financial-complaint-create'),
    path('create-social-media-hack/', SocialMediaHackComplaintCreateView.as_view(), name='social-media-hack-complaint-create'),
    path('create-defamation/', DefamationComplaintCreateView.as_view(), name='defamation-complaint-create'),
    path('create-other/', OtherComplaintCreateView.as_view(), name='social-media-hack-complaint-create'),
    #Complaint Update URL
    path('update-complaint/<str:complaint_type>/<str:complaint_id>/', AllComplaintUpdateView.as_view(), name='update-complaint'),
    #Complaint Tracking URL
    path('track-complaint/', ComplaintTrackingView.as_view(), name='track-complaint'),
    #Sending Email URL
    path('send-email/', SendEmailView.as_view(), name='send-email'),
]