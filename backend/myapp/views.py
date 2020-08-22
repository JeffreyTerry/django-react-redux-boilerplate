import os
import requests
from django import http
from django.conf import settings
from django.template import engines
from django.shortcuts import render
from django.views.generic import TemplateView


def index_dev(request, upstream='http://my_app_frontend:3000'):
    """
    Proxy HTTP requests to the frontend dev server in development.

    The implementation is very basic e.g. it doesn't handle HTTP headers.
    TODO this method does not work with SSL right now, so I'm having to use
    waitress to serve the fully-built react-frontend.
    """
    upstream_url = upstream + request.path
    method = request.META['REQUEST_METHOD'].lower()
    response = getattr(requests, method)(upstream_url, stream=True)
    content_type = response.headers.get('Content-Type')

    if request.META.get('HTTP_UPGRADE', '').lower() == 'websocket':
        return http.HttpResponse(
            content="WebSocket connections aren't supported",
            status=501,
            reason='Not Implemented'
        )

    elif content_type == 'text/html; charset=UTF-8':
        return http.HttpResponse(
            content=engines['django'].from_string(response.text).render(),
            status=response.status_code,
            reason=response.reason,
        )

    else:
        return http.StreamingHttpResponse(
            streaming_content=response.iter_content(2 ** 12),
            content_type=content_type,
            status=response.status_code,
            reason=response.reason,
        )


index_prod = TemplateView.as_view(template_name='index.html')

# Right now SSL only works with the prod react stuff
if settings.PRODUCTION or settings.USE_SSL:
    index = index_prod
else:
    index = index_dev