from rest_framework import serializers
from .models import User, Status, Complaint, FinancialFraudComplaint, SocialMediaHackComplaint, DefamationComplaint, OtherComplaint

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'name', 'post', 'posted_district', 'batch_no']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            id=validated_data['id'],
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            post=validated_data['post'],
            posted_district=validated_data['posted_district'],
            batch_no=validated_data['batch_no']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class FinancialFraudComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialFraudComplaint
        fields = '__all__'

class SocialMediaHackComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaHackComplaint
        fields = '__all__'

class DefamationComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefamationComplaint
        fields = '__all__'

class OtherComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherComplaint
        fields = '__all__'