from django.db import models
import time, random, string
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('In Action', 'In Action'),
    ('Scam', 'Scam'),
    ('Resolved', 'Resolved'),
    ('Closed', 'Closed')
    ]

#Country Choices
COUNTRY_CHOICES = [
    ('Select Country', 'Select Country'),
    ('Nepal', 'Nepal')
]

# Choices for Nepal's provinces
PROVINCE_CHOICES = [
    ('Select Province', 'Select Province'),
    ('Province 1', 'Province 1'),
    ('Madhesh Province', 'Madhesh Province'),
    ('Bagmati Province', 'Bagmati Province'),
    ('Gandaki Province', 'Gandaki Province'),
    ('Lumbini Province', 'Lumbini Province'),
    ('Karnali Province', 'Karnali Province'),
    ('Sudurpashchim Province', 'Sudurpashchim Province'),
]

# Choices for districts, organized by province
DISTRICT_CHOICES = {
    'Select Province': [
        ('Select District', 'Select District'),
    ],
    'Province 1': [
        ('Bhojpur', 'Bhojpur'),
        ('Dhankuta', 'Dhankuta'),
        ('Ilam', 'Ilam'),
        ('Jhapa', 'Jhapa'),
        ('Khotang', 'Khotang'),
        ('Morang', 'Morang'),
        ('Okhaldhunga', 'Okhaldhunga'),
        ('Sankhuwasabha', 'Sankhuwasabha'),
        ('Solukhumbu', 'Solukhumbu'),
        ('Sunsari', 'Sunsari'),
        ('Taplejung', 'Taplejung'),
        ('Terhathum', 'Terhathum'),
        ('Udayapur', 'Udayapur'),
    ],
    'Province 2': [
        ('Bara', 'Bara'),
        ('Dhanusa', 'Dhanusa'),
        ('Mahottari', 'Mahottari'),
        ('Parsa', 'Parsa'),
        ('Rautahat', 'Rautahat'),
        ('Saptari', 'Saptari'),
        ('Sarlahi', 'Sarlahi'),
        ('Siraha', 'Siraha'),
    ],
    'Bagmati Province': [
        ('Bhaktapur', 'Bhaktapur'),
        ('Chitwan', 'Chitwan'),
        ('Dhading', 'Dhading'),
        ('Dolakha', 'Dolakha'),
        ('Kathmandu', 'Kathmandu'),
        ('Kavrepalanchok', 'Kavrepalanchok'),
        ('Lalitpur', 'Lalitpur'),
        ('Makawanpur', 'Makawanpur'),
        ('Nuwakot', 'Nuwakot'),
        ('Ramechhap', 'Ramechhap'),
        ('Rasuwa', 'Rasuwa'),
        ('Sindhuli', 'Sindhuli'),
        ('Sindhupalchok', 'Sindhupalchok'),
    ],
    'Gandaki Province': [
        ('Baglung', 'Baglung'),
        ('Gorkha', 'Gorkha'),
        ('Kaski', 'Kaski'),
        ('Lamjung', 'Lamjung'),
        ('Manang', 'Manang'),
        ('Mustang', 'Mustang'),
        ('Myagdi', 'Myagdi'),
        ('Nawalpur', 'Nawalpur'),
        ('Parbat', 'Parbat'),
        ('Syangja', 'Syangja'),
        ('Tanahun', 'Tanahun'),
    ],
    'Lumbini Province': [
        ('Arghakhanchi', 'Arghakhanchi'),
        ('Banke', 'Banke'),
        ('Bardiya', 'Bardiya'),
        ('Dang', 'Dang'),
        ('Gulmi', 'Gulmi'),
        ('Kapilvastu', 'Kapilvastu'),
        ('Palpa', 'Palpa'),
        ('Parasi', 'Parasi'),
        ('Pyuthan', 'Pyuthan'),
        ('Rolpa', 'Rolpa'),
        ('Rukum East', 'Rukum East'),
        ('Rupandehi', 'Rupandehi'),
    ],
    'Karnali Province': [
        ('Dailekh', 'Dailekh'),
        ('Dolpa', 'Dolpa'),
        ('Humla', 'Humla'),
        ('Jajarkot', 'Jajarkot'),
        ('Jumla', 'Jumla'),
        ('Kalikot', 'Kalikot'),
        ('Mugu', 'Mugu'),
        ('Rukum West', 'Rukum West'),
        ('Salyan', 'Salyan'),
        ('Surkhet', 'Surkhet'),
    ],
    'Sudurpashchim Province': [
        ('Achham', 'Achham'),
        ('Baitadi', 'Baitadi'),
        ('Bajhang', 'Bajhang'),
        ('Bajura', 'Bajura'),
        ('Dadeldhura', 'Dadeldhura'),
        ('Darchula', 'Darchula'),
        ('Doti', 'Doti'),
        ('Kailali', 'Kailali'),
        ('Kanchanpur', 'Kanchanpur'),
    ],
}



def generate_unique_id():
    timestamp = int(time.time() * 1000)
    random_number = random.randint(10000, 99999)
    return f"{timestamp}{random_number}"



class Complaint(models.Model):
    complaint_id = models.CharField(default=generate_unique_id, unique=True, primary_key=True, editable=False)
    victim_Name = models.CharField(max_length=100, blank=False, null=False)
    date_of_birth = models.DateField()
    # Address fields
    country = models.CharField(max_length=100, choices=COUNTRY_CHOICES)
    province = models.CharField(max_length=50, choices=PROVINCE_CHOICES) 
    district = models.CharField(max_length=50, blank=False, null=False)
    city = models.CharField(max_length=50 , blank=False, null=False)
    ward_no = models.PositiveIntegerField()

    unique_id_number = models.CharField(max_length=100, blank=False, null=False)
    contact_no = models.CharField(max_length=15, blank=False, null=False)
    contact_email = models.EmailField()
    guardian_no = PhoneNumberField(blank=True, null=True)
    description = models.TextField(blank=False, null=False)
    medium = models.CharField(max_length=100, choices=[
        ('Select Medium', 'Select Medium'),
        ('FB', 'Facebook'),
        ('messenger', 'Messenger'),
        ('whatsapp', 'Whatsapp'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('snapchat', 'Snapchat'),
        ('linkedin', 'Linkedin'),
        ('others', 'Others')

    ])
    evidence_links = models.URLField(null=True, blank=True)
    unique_id_card = models.FileField(upload_to='pdfs/documents/' , blank=True, null=True)
    signature = models.FileField(upload_to='pdfs/documents/', blank=True, null=True)
    screenshots = models.FileField(upload_to='pdfs/documents/', blank=True, null=True)
    other_doc = models.FileField(upload_to='pdfs/documents/', blank=True, null=True)
    status = models.CharField(choices=STATUS_CHOICES, default=1, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
    
    def __str__(self):
        return f"{self.victim_Name} - {self.complaint_id}"
    
class FinancialFraudComplaint(Complaint):
    amount = models.PositiveBigIntegerField(blank=False, null=False)
    id_url = models.URLField(blank=False, null=False)
    frauder_name = models.CharField(max_length=100, blank=False, null=False)
    fraud_medium = models.CharField(max_length=100, choices=[
        ('Select Medium', 'Select Medium'),
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
    hacked_since = models.DateField()
    crime_type = models.CharField(max_length=100, choices=[
        ('Select Type', 'Select Type'),
        ('profile_modification', 'Profile Modification'),
        ('spam_posting', 'Spam Posting'),
        ('status_update', 'Status Update'),
        ('profile_deletion', 'Profile Deletion'),
        ('account_hack', 'Account Hack'),
        ('fake_account', 'Fake Account'),
        ('others', 'Others')
    ])
    activity = models.CharField(max_length=100, choices=[
        ('Select Activity', 'Select Activity'),
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('post', 'Post'),
        ('financial_activity', 'Financial Activity'),
        ('others', 'Others')
    ])
    id_url = models.URLField(max_length=100)
    profile_full_name = models.CharField(max_length=100)
    language_used = models.CharField(max_length=100)
    hacked_id_related_phone_or_email = models.CharField(max_length=100)
    device_brand = models.CharField(max_length=100)
    device_model = models.CharField(max_length=100)
    id_creation_date = models.DateField()
    present_active_id_url = models.CharField(max_length=100)
    
    

class DefamationComplaint(Complaint):
    subject = models.CharField(max_length=100)
    id_url = models.URLField(max_length=100)
    activity = models.CharField(max_length=100, choices=[
        ('Select Activity', 'Select Activity'),
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
    id_url = models.URLField(max_length=100)
    activity = models.CharField(max_length=100, choices=[
        ('Select Activity', 'Select Activity'),
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('post', 'Post'),
        ('financial_loss', 'Financial Loss')
    ])
    frauder_name = models.CharField(max_length=100)
    suspect_persons = models.TextField()


class Document(models.Model):
    file = models.FileField(upload_to='pdfs/documents/')
    file_type = models.CharField(max_length=50, choices=[
        ('pdf', 'PDF'),
        ('png', 'PNG'),
        ('jpg', 'JPEG'),
        ('docx', 'DOCX'),
        ('xlsx', 'XLSX'),
        ('txt', 'TXT'),
        ('csv', 'CSV'),
        ('zip', 'ZIP'),
        ('other', 'Other'),
    ])
    uploaded_at = models.DateTimeField(auto_now_add=True)
