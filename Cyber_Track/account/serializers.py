from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'post', 'posted_district', 'batch_no','official_id', 'email', 'password','confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
        }

    

    def create(self, validated_data):
        password = validated_data.pop('password')
        confirm_password = validated_data.pop('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        user = User(
            official_id=validated_data['official_id'],
            email=validated_data['email'],
            name=validated_data['name'],
            post=validated_data['post'],
            posted_district=validated_data['posted_district'],
            batch_no=validated_data['batch_no']
        )
        user.set_password(password)
        user.save()
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
   