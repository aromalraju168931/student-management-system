from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Student, AdminProfile
from .serializers import StudentSerializer, AdminProfileSerializer

class StudentListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def patch(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Admin Profile Management
class AdminProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, created = AdminProfile.objects.get_or_create(user=request.user)
        serializer = AdminProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request):
        profile = AdminProfile.objects.get(user=request.user)
        serializer = AdminProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"error": "Wrong old password"}, status=400)
        
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated"})