from django.urls import path
from .views import (SignupView, 
                    LoginView,  
                    FinancialFraudComplaintCreateView, 
                    SocialMediaHackComplaintCreateView, 
                    DefamationComplaintCreateView, 
                    OtherComplaintCreateView,
)


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('complaint/financial-fraud/', FinancialFraudComplaintCreateView.as_view(), name='financial-fraud-complaint'),
    path('complaint/social-media-hack/', SocialMediaHackComplaintCreateView.as_view(), name='social-media-hack-complaint'),
    path('complaint/defamation/', DefamationComplaintCreateView.as_view(), name='defamation-complaint'),
    path('complaint/other/', OtherComplaintCreateView.as_view(), name='other-complaint'),

]