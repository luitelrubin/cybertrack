from rest_framework.permissions import BasePermission

class IsOfficerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and (
            request.user.groups.filter(name='Officer').exists() or
            request.user.groups.filter(name='Admin').exists()
        )
