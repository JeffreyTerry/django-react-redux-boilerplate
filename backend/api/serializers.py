from rest_framework import serializers
from api.models import User


##### Django Rest Framework Serializers #####
##### These serializers define how the API moves objects in and out of the database #####


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')

    class Meta:
        model = User
        fields = ['id', 'email', 'firstName', 'lastName']
