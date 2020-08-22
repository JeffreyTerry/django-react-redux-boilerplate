from api.serializers import UserSerializer
from api.models import User
from rest_framework import viewsets
from api.permissions import IsOwnerOrReadOnly, IsAllowedToViewObject

##### Django Rest Framework ViewSets #####
# These ViewSets combine serializers and permissions in order to
# define how the API works.


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAllowedToViewObject]

    def get_queryset(self):
        """
        Return just the current user.
        """
        return User.objects.filter(id=self.request.user.id)
