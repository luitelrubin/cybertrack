from django.urls import path
from django.contrib.auth import views as auth_views
from .views import SignupView, LoginView, LogoutView,PasswordResetConfirmView, PasswordResetRequestView
app_name = 'account'
urlpatterns = [
    path('register/', SignupView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # path('verify_email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify_email'),
    path('reset_password/',  PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset_password_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirmation'),
]