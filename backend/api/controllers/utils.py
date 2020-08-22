from django.http import HttpResponse, JsonResponse
# ISAAC, if you ever need to log stuff thats happening on the backend,
# use this sort of code.
# import logging
# logger = logging.getLogger(__name__)
# logger.error('Hello there')


def http_error_response(code, message):
    response = HttpResponse(message)
    response.status_code = code
    response.reason_phrase = message
    return response


def json_error_response(code, message, data):
    response = JsonResponse({
        'error': message,
        'data': data
    })
    response.status_code = code
    response.reason_phrase = message
    return response


def unauthorized_error_response(delete_authorization_cookie=True):
    response = http_error_response(401, 'Unauthorized')
    response.delete_cookie('isAuthenticated')
    response.delete_cookie('userIsNotSetUp')
    response.delete_cookie('studentIsNotSetUp')
    response.delete_cookie('studentConsentIsNotSetUp')
    return response


def is_authenticated(request):
    return request.user and request.user.is_authenticated == True
