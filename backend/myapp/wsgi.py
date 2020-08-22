"""
WSGI config for AutoDuo project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Enable remote debugging with VSCode
if settings.DEBUG:
    try:
        import ptvsd
        ptvsd.enable_attach(address=('0.0.0.0', 5678))
        # ptvsd.wait_for_attach()  # We can remove this line it gives you trouble,
                                    # but it's good to know if the debugger started or not
                                # blocking the execution for a while :-)
    except Exception as ex:
        logger.error('Ptvsd not working: ' + str(ex))

application = get_wsgi_application()
