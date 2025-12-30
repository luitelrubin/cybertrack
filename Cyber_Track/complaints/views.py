from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from itertools import chain
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsOfficerOrAdmin
from .models import (
    FinancialFraudComplaint,
    SocialMediaHackComplaint,
    DefamationComplaint,
    OtherComplaint,
    Document,
)
from .serializers import (
    FinancialFraudComplaintSerializer,
    SocialMediaHackComplaintSerializer,
    DefamationComplaintSerializer,
    OtherComplaintSerializer,
    DocumentSerializer,
)

# Create your views here.


class UploadDocumentView(generics.CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def post(self, request, *args, **kwargs):
        document_serializer = DocumentSerializer(data=request.data)
        if document_serializer.is_valid():
            document_serializer.save()
            return Response(status=201)
        else:
            return Response(document_serializer.errors, status=400)


# Complaint Create Views
class FinancialComplaintCreateView(
    generics.CreateAPIView
):  # To Create Financial Fraud Complaint
    queryset = FinancialFraudComplaint.objects.all()
    serializer_class = FinancialFraudComplaintSerializer


class SocialMediaHackComplaintCreateView(
    generics.CreateAPIView
):  # To Create Social Media Hack Complaint
    queryset = SocialMediaHackComplaint.objects.all()
    serializer_class = SocialMediaHackComplaintSerializer


class DefamationComplaintCreateView(
    generics.CreateAPIView
):  # To Create Defamation Complaint
    queryset = DefamationComplaint.objects.all()
    serializer_class = DefamationComplaintSerializer


class OtherComplaintCreateView(generics.CreateAPIView):  # To Create Other Complaint
    queryset = OtherComplaint.objects.all()
    serializer_class = OtherComplaintSerializer


# Fetching complaints


class ListAllComplaintsView(generics.ListAPIView):  # To List All Complaints

    # permission_classes = [IsAuthenticated, IsOfficerOrAdmin]

    def get_queryset(self):
        financial_fraud_complaints = FinancialFraudComplaint.objects.all()
        social_media_hack_complaints = SocialMediaHackComplaint.objects.all()
        defamation_complaints = DefamationComplaint.objects.all()
        other_complaints = OtherComplaint.objects.all()

        combined_queryset = list(
            chain(
                financial_fraud_complaints,
                social_media_hack_complaints,
                defamation_complaints,
                other_complaints,
            )
        )
        return combined_queryset

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            financial_fraud_page = [
                item for item in page if isinstance(item, FinancialFraudComplaint)
            ]
            social_media_hack_page = [
                item for item in page if isinstance(item, SocialMediaHackComplaint)
            ]
            defamation_page = [
                item for item in page if isinstance(item, DefamationComplaint)
            ]
            other_complaints_page = [
                item for item in page if isinstance(item, OtherComplaint)
            ]

            financial_fraud_serializer = FinancialFraudComplaintSerializer(
                financial_fraud_page, many=True
            )
            social_media_hack_serializer = SocialMediaHackComplaintSerializer(
                social_media_hack_page, many=True
            )
            defamation_serializer = DefamationComplaintSerializer(
                defamation_page, many=True
            )
            other_complaints_serializer = OtherComplaintSerializer(
                other_complaints_page, many=True
            )

            all_complaints = (
                financial_fraud_serializer.data
                + social_media_hack_serializer.data
                + defamation_serializer.data
                + other_complaints_serializer.data
            )
            return self.get_paginated_response(all_complaints)

        financial_fraud_serializer = FinancialFraudComplaintSerializer(
            queryset, many=True
        )
        social_media_hack_serializer = SocialMediaHackComplaintSerializer(
            queryset, many=True
        )
        defamation_serializer = DefamationComplaintSerializer(queryset, many=True)
        other_complaints_serializer = OtherComplaintSerializer(queryset, many=True)

        all_complaints = (
            financial_fraud_serializer.data
            + social_media_hack_serializer.data
            + defamation_serializer.data
            + other_complaints_serializer.data
        )

        return Response(all_complaints)


class AllComplaintUpdateView(generics.GenericAPIView):

    # permission_classes = [IsAuthenticated, IsOfficerOrAdmin]

    def get_serializer_class(self, complaint_type):
        if complaint_type == "financial_fraud":
            return FinancialFraudComplaintSerializer
        elif complaint_type == "social_media_hack":
            return SocialMediaHackComplaintSerializer
        elif complaint_type == "defamation":
            return DefamationComplaintSerializer
        elif complaint_type == "other":
            return OtherComplaintSerializer
        else:
            return None

    def get_queryset(self, complaint_type):
        if complaint_type == "financial_fraud":
            return FinancialFraudComplaint.objects.all()
        elif complaint_type == "social_media_hack":
            return SocialMediaHackComplaint.objects.all()
        elif complaint_type == "defamation":
            return DefamationComplaint.objects.all()
        elif complaint_type == "other":
            return OtherComplaint.objects.all()
        else:
            return None

    def get_serializer(self, *args, **kwargs):
        complaint_type = self.kwargs.get("complaint_type")
        serializer_class = self.get_serializer_class(complaint_type)
        kwargs["context"] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get(self, request, complaint_type, complaint_id, *args, **kwargs):
        queryset = self.get_queryset(complaint_type)
        if not queryset:
            return Response(
                {"error": "Invalid complaint type"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            complaint = queryset.get(complaint_id=complaint_id)
        except queryset.model.DoesNotExist:
            return Response(
                {"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(complaint)
        return Response(serializer.data)

    def put(self, request, complaint_type, complaint_id, *args, **kwargs):
        queryset = self.get_queryset(complaint_type)
        if not queryset:
            return Response(
                {"error": "Invalid complaint type"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            complaint = queryset.get(complaint_id=complaint_id)
        except queryset.model.DoesNotExist:
            return Response(
                {"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND
            )

        existing_data_serializer = self.get_serializer(complaint)
        existing_data = existing_data_serializer.data

        serializer = self.get_serializer(complaint, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            updated_data = serializer.data
            return Response(
                {
                    # "existing_data": existing_data,
                    "updated_data": updated_data
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplaintTrackingView(generics.GenericAPIView):  # To Track Complaint
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        complaint_type = self.request.data.get("complaint_type")
        if complaint_type == "financial_fraud":
            return FinancialFraudComplaintSerializer
        elif complaint_type == "social_media_hack":
            return SocialMediaHackComplaintSerializer
        elif complaint_type == "defamation":
            return DefamationComplaintSerializer
        elif complaint_type == "other":
            return OtherComplaintSerializer
        else:
            raise ValueError("Invalid complaint type")

    def get_queryset(self):
        complaint_type = self.request.data.get("complaint_type")
        if complaint_type == "financial_fraud":
            return FinancialFraudComplaint.objects.all()
        elif complaint_type == "social_media_hack":
            return SocialMediaHackComplaint.objects.all()
        elif complaint_type == "defamation":
            return DefamationComplaint.objects.all()
        elif complaint_type == "other":
            return OtherComplaint.objects.all()
        else:
            raise ValueError("Invalid complaint type")

    def post(self, request, *args, **kwargs):
        complaint_type = request.data.get("complaint_type")
        complaint_id = request.data.get("complaint_id")
        unique_id_number = request.data.get("unique_id_number")
        date_of_birth = request.data.get("date_of_birth")

        queryset = self.get_queryset()
        if not queryset:
            return Response(
                {"error": "Invalid complaint type"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            complaint = queryset.get(
                complaint_id=complaint_id,
                unique_id_number=unique_id_number,
                date_of_birth=date_of_birth,
            )
        except queryset.model.DoesNotExist:
            return Response(
                {"error": "Complaint not found or unique ID is incorrect."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {
                "complaint_id": complaint_id,
                "status": complaint.status,
                "victim_name": complaint.victim_Name,
            },
            status=status.HTTP_200_OK,
        )

    def get(self, request, *args, **kwargs):
        return Response(
            {"error": "GET method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


class SendEmailView(generics.GenericAPIView):
    # permission_classes = [IsAuthenticated, IsOfficerOrAdmin]

    def post(self, request, *args, **kwargs):
        recepient_email = request.data.get("recepient_email")
        subject = request.data.get("subject")
        message = request.data.get("message")

        if not recepient_email or not subject or not message:
            return Response(
                {"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [recepient_email],
            fail_silently=False,
        )

        return Response(
            {"message": "Email sent successfully"}, status=status.HTTP_200_OK
        )
