import json
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.shortcuts import redirect
from django.contrib.auth import logout as auth_logout
from api.controllers.utils import http_error_response, is_authenticated, unauthorized_error_response


# This route is automatically called by social_django once the user logs in via Google.
# Note that this method has nothing to do with password logins.
def login(request):
    if not is_authenticated(request):
        return unauthorized_error_response()
    elif request.method == 'GET':
        response = HttpResponseRedirect('/user')
        response.set_cookie('isAuthenticated', 'true',
                            secure=settings.USE_SSL,
                            expires=timezone.now() + timezone.timedelta(weeks=2))
        return response
    else:
        return http_error_response(405, 'Expecting GET')


def logout(request):
    if request.method == 'GET':
        auth_logout(request)
        response = HttpResponseRedirect('/')
        response.delete_cookie('isAuthenticated')
        return response
    else:
        return http_error_response(405, 'Expecting GET')
