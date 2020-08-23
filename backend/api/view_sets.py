from api.serializers import UserSerializer
from api.models import User
from api.controllers.utils import unauthorized_error_response
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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

    @action(detail=False, methods=['get'], permission_classes=[IsOwnerOrReadOnly, IsAllowedToViewObject])
    def current(self, request):
        """
        Returns the current user if they are logged in.
        """
        if request.user:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        else:
            return unauthorized_error_response()
