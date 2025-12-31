from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import status
from django.conf import settings
from .serializers import UserSerializer, LoginSerializer
from .models import User


# Create your views here.
User = get_user_model()


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.isactive = True
        user.save()
        # user.send_verification_email()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        user = authenticate(request=request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "official_id": user.official_id,
                        "email": user.email,
                        "name": user.name,
                        "is_staff": user.is_staff,
                        "is_superuser": user.is_superuser,
                    },
                }
            )
        return Response({"error": "Invalid Credentials"}, status=400)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"success": "Successfully logged out"},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        form = PasswordResetForm({"email": email})
        if form.is_valid():
            users = form.get_users(email)
            if users:
                for user in users:
                    token = default_token_generator.make_token(user)
                    uid = urlsafe_base64_encode(force_bytes(user.pk))
                    current_site = get_current_site(request)
                    reset_link = f"https://{current_site.domain}/account/reset-password-confirm/{uid}/{token}/"
                    subject = "Password Reset Request"
                    message = render_to_string(
                        "account/password_reset_email.html",
                        {
                            "user": user,
                            "reset_link": reset_link,
                        },
                    )
                    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
                return Response(
                    {"success": "Password reset email sent"}, status=status.HTTP_200_OK
                )
        return Response({"error": "Invalid email"}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            password = request.data.get("password")
            if password:
                user.set_password(password)
                user.save()
                return Response(
                    {"success": "Password has been reset"}, status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"error": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST
        )


# class VerifyEmailView(APIView):
#     def get(self, request, uidb64, token):
#         try:
#             uid = urlsafe_base64_decode(uidb64).decode()
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             user = None

#         if user is not None and default_token_generator.check_token(user, token):
#             user.is_active = True
#             user.save()
#             return Response({'success': 'Email has been verified'}, status=status.HTTP_200_OK)
#         return Response({'error': 'Invalid token or user'}, status=status.HTTP_400_BAD_REQUEST)
