from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import (User, 
                    FinancialFraudComplaint, 
                    SocialMediaHackComplaint, 
                    DefamationComplaint, 
                    OtherComplaint, 
                    Complaint, 
                    Status
)
from .serializers import (UserSerializer,
                        LoginSerializer,
                        FinancialFraudComplaintSerializer, 
                        SocialMediaHackComplaintSerializer, 
                        DefamationComplaintSerializer, 
                        OtherComplaintSerializer, 
                        ComplaintSerializer
)
from rest_framework.permissions import AllowAny

# Create your views here.

def home(request):
    return HttpResponse("Hello, world. You're at the Cyber_Track index.")

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid Credentials'}, status=400)

    
class FinancialFraudComplaintCreateView(generics.CreateAPIView):
    queryset = FinancialFraudComplaint.objects.all()
    serializer_class = FinancialFraudComplaintSerializer
    permission_classes = [AllowAny]

class SocialMediaHackComplaintCreateView(generics.CreateAPIView):
    queryset = SocialMediaHackComplaint.objects.all()
    serializer_class = SocialMediaHackComplaintSerializer
    permission_classes = [AllowAny]

class DefamationComplaintCreateView(generics.CreateAPIView):
    queryset = DefamationComplaint.objects.all()
    serializer_class = DefamationComplaintSerializer
    permission_classes = [AllowAny]

class OtherComplaintCreateView(generics.CreateAPIView):
    queryset = OtherComplaint.objects.all()
    serializer_class = OtherComplaintSerializer
    permission_classes = [AllowAny]


