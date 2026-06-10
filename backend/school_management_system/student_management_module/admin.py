from django.contrib import admin
from .models import Student

# Register your model here
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'enrollment_date')
    
    search_fields = ('first_name', 'last_name', 'email')
    
    list_filter = ('enrollment_date',)