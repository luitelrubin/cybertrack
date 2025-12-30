from rest_framework import serializers
from .models import (
    Complaint,
    SocialMediaHackComplaint,
    DefamationComplaint,
    OtherComplaint,
    FinancialFraudComplaint,
    Document,
)


class DocumentSerializer(serializers.Serializer):
    class Meta:
        model = Document
        fields = ["file", "file_type", "uploaded_at"]


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            "complaint_id",
            "victim_Name",
            "date_of_birth",
            "country",
            "province",
            "district",
            "city",
            "ward_no",
            "unique_id_number",
            "contact_no",
            "contact_email",
            "guardian_no",
            "description",
            "medium",
            "evidence_links",
            "unique_id_card",
            "signature",
            "screenshots",
            "other_doc",
            "status",
            "created_at",
            "updated_at",
        ]


class FinancialFraudComplaintSerializer(serializers.ModelSerializer):
    complaint_type = serializers.SerializerMethodField()

    class Meta:
        model = FinancialFraudComplaint
        fields = ComplaintSerializer.Meta.fields + [
            "amount",
            "id_url",
            "frauder_name",
            "fraud_medium",
            "complaint_type",
        ]

    def get_complaint_type(self, obj):
        return "financial"


class SocialMediaHackComplaintSerializer(serializers.ModelSerializer):
    complaint_type = serializers.SerializerMethodField()

    class Meta:
        model = SocialMediaHackComplaint
        fields = ComplaintSerializer.Meta.fields + [
            "social_media_name",
            "hacked_since",
            "crime_type",
            "activity",
            "id_url",
            "profile_full_name",
            "language_used",
            "hacked_id_related_phone_or_email",
            "device_brand",
            "device_model",
            "id_creation_date",
            "present_active_id_url",
            "complaint_type",
        ]

    def get_complaint_type(self, obj):
        return "social"


class DefamationComplaintSerializer(serializers.ModelSerializer):
    complaint_type = serializers.SerializerMethodField()

    class Meta:
        model = DefamationComplaint
        fields = ComplaintSerializer.Meta.fields + [
            "subject",
            "id_url",
            "activity",
            "frauder_name",
            "suspect_persons",
            "complaint_type",
        ]

    def get_complaint_type(self, obj):
        return "defamation"


class OtherComplaintSerializer(serializers.ModelSerializer):
    complaint_type = serializers.SerializerMethodField()

    class Meta:
        model = OtherComplaint
        fields = ComplaintSerializer.Meta.fields + [
            "subject",
            "id_url",
            "activity",
            "frauder_name",
            "suspect_persons",
            "complaint_type",
        ]

    def get_complaint_type(self, obj):
        return "others"
