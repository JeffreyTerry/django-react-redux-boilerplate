from django.test import TestCase
from django.http import HttpResponse
from api.controllers.utils import http_error_response

### Utility Functions ###
class HttpUtilities(TestCase):
    def test_http_error_response(self):
        e = http_error_response(500, 'test message')
        self.assertIsInstance(e, HttpResponse)
        self.assertIsNotNone(e)
        self.assertEquals(e.status_code, 500)
        self.assertEquals(e.reason_phrase, 'test message')


