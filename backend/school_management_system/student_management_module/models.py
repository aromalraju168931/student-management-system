from django.db import models
from django.contrib.auth.models import User

class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    photo = models.ImageField(upload_to='admin_photos/', null=True, blank=True)

    def __str__(self):
        return self.user.username
    

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    enrollment_date = models.DateField()
    image = models.ImageField(upload_to='student_images/', null=True, blank=True)
    address = models.TextField()
    dob = models.DateField(verbose_name="Date of Birth")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"