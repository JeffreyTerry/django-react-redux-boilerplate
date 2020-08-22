from rest_framework import permissions
from api.models import User


##### Permissions for Djangorestframework #####


class IsAllowedToViewObject(permissions.BasePermission):
    """
    Restricts read-access for private information.
    """
    def has_object_permission(self, request, view, obj):
        # User should only be able to view their own user object.
        if isinstance(obj, User):
            return obj == request.user

        self.message = 'Django Rest Framework Permission Error: Object class not recognized, unable to locate owner attribute'
        return False


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allows read/write access to the database as appropriate.
    Allows read-only access to all users.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # We'll be more picky about write permissions.
        if isinstance(obj, User):
            return obj == request.user

        self.message = 'Django Rest Framework Permission Error: Object class not recognized, unable to locate owner attribute'
        return False
