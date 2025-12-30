# Generated migration to update province names

from django.db import migrations


def update_province_names(apps, schema_editor):
    """Update Province 1 to Koshi Province in all complaint models"""
    DefamationComplaint = apps.get_model("complaints", "DefamationComplaint")
    FinancialFraudComplaint = apps.get_model("complaints", "FinancialFraudComplaint")
    SocialMediaHackComplaint = apps.get_model("complaints", "SocialMediaHackComplaint")
    OtherComplaint = apps.get_model("complaints", "OtherComplaint")

    # Update Province 1 to Koshi Province
    DefamationComplaint.objects.filter(province="Province 1").update(
        province="Koshi Province"
    )
    FinancialFraudComplaint.objects.filter(province="Province 1").update(
        province="Koshi Province"
    )
    SocialMediaHackComplaint.objects.filter(province="Province 1").update(
        province="Koshi Province"
    )
    OtherComplaint.objects.filter(province="Province 1").update(
        province="Koshi Province"
    )


def reverse_province_names(apps, schema_editor):
    """Reverse the province name updates"""
    DefamationComplaint = apps.get_model("complaints", "DefamationComplaint")
    FinancialFraudComplaint = apps.get_model("complaints", "FinancialFraudComplaint")
    SocialMediaHackComplaint = apps.get_model("complaints", "SocialMediaHackComplaint")
    OtherComplaint = apps.get_model("complaints", "OtherComplaint")

    # Revert Koshi Province back to Province 1
    DefamationComplaint.objects.filter(province="Koshi Province").update(
        province="Province 1"
    )
    FinancialFraudComplaint.objects.filter(province="Koshi Province").update(
        province="Province 1"
    )
    SocialMediaHackComplaint.objects.filter(province="Koshi Province").update(
        province="Province 1"
    )
    OtherComplaint.objects.filter(province="Koshi Province").update(
        province="Province 1"
    )


class Migration(migrations.Migration):

    dependencies = [
        ("complaints", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(update_province_names, reverse_province_names),
    ]
