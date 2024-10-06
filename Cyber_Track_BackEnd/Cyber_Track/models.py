from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import time, random, string

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,id, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Enter Valid Email')
        if not id:
            raise ValueError('Enter Valid Service_ID')
        
        email = self.normalize_email(email)
        user = self.model(id=id, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, id, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(id, email, password, **extra_fields)
    
class User(AbstractBaseUser):
        id = models.CharField(max_length=50, primary_key=True)
        email = models.EmailField(max_length=255, unique=True)
        name = models.CharField(max_length=100)
        post = models.CharField(max_length=100)
        posted_district = models.CharField(max_length=100)
        batch_no = models.IntegerField()
        created_at = models.DateTimeField(auto_now_add=True)
        is_active = models.BooleanField(default=True)
        is_staff = models.BooleanField(default=True)
        is_superuser = models.BooleanField(default=False)

        objects = UserManager()
        
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['id','name', 'post', 'posted_district', 'batch_no']
        
        objects = UserManager()
        
        def __str__(self):
            return self.email
        
        def has_perm(self, perm, obj=None):
            return self.is_superuser
        
        def has_module_perms(self, app_label):
            return self.is_superuser

class Status(models.Model):
    PENDING = 'pending'
    IN_ACTION = 'in_action'
    SCAM = 'scam'
    RESOLVED = 'resolved'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_ACTION, 'In Action'),
        (SCAM, 'Scam'),
        (RESOLVED, 'Resolved'),
    ]

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=PENDING)
    
    def __str__(self):
        return self.get_status_display()

def generate_unique_id():
    timestamp = int(time.time() * 1000)
    random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
    return f"{timestamp}{random_str}"

class Complaint(models.Model):
    complaint_id = models.CharField(max_length=20, default=generate_unique_id, unique=True, primary_key=True, editable=False)
    victim_Name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    address = models.TextField()
    unique_id = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=15)
    contact_email = models.EmailField()
    guardian_no = models.CharField(max_length=15, null=True, blank=True)
    description = models.TextField()
    medium = models.CharField(max_length=100, choices=[
        ('FB', 'Facebook'),
        ('messenger', 'Messenger'),
        ('whatsapp', 'Whatsapp'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('snapchat', 'Snapchat'),
        ('linkedin', 'Linkedin'),
        ('others', 'Others')

    ])
    evidence_links = models.TextField(null=True, blank=True)
    unique_id_card = models.FileField(upload_to='documents/')
    signature = models.FileField(upload_to='documents/')
    screenshots = models.FileField(upload_to='documents/')
    other_doc = models.FileField(upload_to='documents/')
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.complaint_id
    
class FinancialFraudComplaint(Complaint):
    amount = models.FloatField()
    id_url = models.CharField()
    frauder_name = models.CharField(max_length=100)
    fraud_medium = models.CharField(max_length=100, choices=[
        ('FB', 'Facebook'),
        ('messenger', 'Messenger'),
        ('whatsapp', 'Whatsapp'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('snapchat', 'Snapchat'),
        ('linkedin', 'Linkedin'),
        ('others', 'Others')
    ])

class SocialMediaHackComplaint(Complaint):
    social_media_name = models.CharField(max_length=100)
    crime_type = models.CharField(max_length=100, choices=[
        ('account_hack', 'Account Hack'),
        ('fake_account', 'Fake Account'),
        ('others', 'Others')
    ])
    activity = models.CharField(max_length=100, choices=[
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('post', 'Post'),
        ('financial_activity', 'Financial Activity'),
        ('others', 'Others')
    ])
    id_url = models.CharField(max_length=100)
    profile_full_name = models.CharField(max_length=100)
    language_used = models.CharField(max_length=100)
    hacked_id_related_phone_or_email = models.CharField(max_length=100)
    device_brand = models.CharField(max_length=100)
    device_model = models.CharField(max_length=100)
    id_creation_date = models.DateField()
    present_active_id_url = models.CharField(max_length=100)
    
    

class DefamationComplaint(Complaint):
    subject = models.CharField(max_length=100)
    id_url = models.CharField(max_length=100)
    activity = models.CharField(max_length=100, choices=[
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('post', 'Post'),
        ('financial_loss', 'Financial Loss')
    ])
    frauder_name = models.CharField(max_length=100)
    suspect_persons = models.TextField()

class OtherComplaint(Complaint):
    subject = models.CharField(max_length=100)
    id_url = models.CharField(max_length=100)
    activity = models.CharField(max_length=100, choices=[
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('post', 'Post'),
        ('financial_loss', 'Financial Loss')
    ])
    frauder_name = models.CharField(max_length=100)
    suspect_persons = models.TextField()
