from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import time, random, string
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import default_token_generator

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, official_id, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Enter Valid Email')
        if not official_id:
            raise ValueError('Enter Valid Service_ID')
        
        email = self.normalize_email(email)
        user = self.model(official_id=official_id, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # def create_superuser(self, id, email, password=None, **extra_fields):
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)
        
    #     return self.create_user(id, email, password, **extra_fields)

    def create_superuser(self, official_id, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_active') is not True:
            raise ValueError('Superuser must have is_active=True.')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(official_id, email, password, **extra_fields)
    
class User(AbstractBaseUser):
        # id = models.AutoField()
        official_id = models.CharField(primary_key=True)
        email = models.EmailField(max_length=255, unique=True)
        name = models.CharField(max_length=100)
        post = models.CharField(max_length=100)
        posted_district = models.CharField(max_length=100)
        batch_no = models.IntegerField()
        created_at = models.DateTimeField(auto_now_add=True)
        is_active = models.BooleanField(default=False)
        is_staff = models.BooleanField(default=True)
        is_superuser = models.BooleanField(default=False)


        objects = UserManager()
        
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['official_id','name', 'post', 'posted_district', 'batch_no']
        
        objects = UserManager()
        
        def __str__(self):
            return self.email
        
        def has_perm(self, perm, obj=None):
            return self.is_superuser
        
        def has_module_perms(self, app_label):
            return self.is_superuser

        def send_verification_email(self):
        # Generating verification token
            token = default_token_generator.make_token(self)
            uid = urlsafe_base64_encode(force_bytes(self.pk))

            # Building verification URL
            current_site = get_current_site(None)
            verification_url = reverse('account:verify_email', kwargs={'uidb64': uid, 'token': token})
            verification_link = f'https://{current_site.domain}{verification_url}'

            # Render email template
            subject = 'Verify your email address'
            message = render_to_string('account/verification_email.html', {
                'user': self,
                'verification_link': verification_link,
            })

            # Send email
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [self.email],
                fail_silently=False,
            )