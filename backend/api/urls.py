from django.urls import include, path, re_path
from api.controllers import users
from rest_framework import routers
from api.view_sets import UserViewSet

# Django Rest Framework Router -- this code provides an easy way of automatically generating the URL conf.
router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Users
    path('users/login', users.login),  # GET
    path('users/logout', users.logout),  # GET

    # Django Rest Framework urls
    re_path(r'^', include(router.urls)),
]
