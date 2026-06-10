from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Student, AdminProfile

# Serializer for Student
class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=Student.objects.all(),
                message="email already exists"
            )
        ]
    )

    class Meta:
        model = Student
        fields = '__all__'

    # Validation for dates
    def validate(self, data):
        if data['dob'] > data['enrollment_date']:
            raise serializers.ValidationError({"dob": "Date of birth cannot be after enrollment."})
        return data


# Serializer for Admin Profile
class AdminProfileSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name', allow_blank=True)
    last_name = serializers.CharField(source='user.last_name', allow_blank=True)

    class Meta:
        model = AdminProfile
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'photo']

    def update(self, instance, validated_data):
    
        user_data = validated_data.pop('user', {})
        user = instance.user

        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance