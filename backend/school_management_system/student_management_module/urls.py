from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import StudentListCreateView, StudentDetailView, AdminProfileView, ChangePasswordView

urlpatterns = [
    path('login/', obtain_auth_token), 
    
    path('students/', StudentListCreateView.as_view()), 
    
    path('students/<int:pk>/', StudentDetailView.as_view()),

    path('profile/', AdminProfileView.as_view()),

    path('change-password/', ChangePasswordView.as_view()),
]