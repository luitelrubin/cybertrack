from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Notice
from .serializers import NoticeSerializer
from rest_framework.response import Response


# Create your views here.


# List and Create Notices
class NoticeCreateView(generics.CreateAPIView):
    queryset = Notice.objects.all().order_by("-created_at")
    serializer_class = NoticeSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]  # Allow everyone to view, but only authenticated users to create


class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all().order_by("-created_at")
    serializer_class = NoticeSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]  # Allow everyone to view, but only authenticated users to create
    def get_queryset(self):
        return Notice.objects.filter(is_public=True).order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = NoticeSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = NoticeSerializer(queryset, many=True)
        return Response(serializer.data)


# Retrieve, Update, and Delete Notices
class NoticeUpdateView(generics.GenericAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    # permission_classes = [IsAdminUser]  # Restrict to admins

    def get(self, request, id, *args, **kwargs):
        # Retrieve a specific notice
        notice = get_object_or_404(Notice, id=id)
        serializer = NoticeSerializer(notice)
        return Response(serializer.data)

    def put(self, request, id, *args, **kwargs):
        # Update a specific notice
        notice = get_object_or_404(Notice, id=id)
        serializer = NoticeSerializer(notice, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        # Delete a specific notice
        notice = get_object_or_404(Notice, id=id)
        notice.delete()
        return Response(
            {"message": "Notice deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
