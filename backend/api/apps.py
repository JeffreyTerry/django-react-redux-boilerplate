from django.apps import AppConfig
import logging


# This is just the standard Django configuration code for the API.
# "ready" will be called once, on application startup, so we can
# register signal listeners here, etc...
class ApiConfig(AppConfig):
    name = 'api'
    verbose_name = 'My App API'

    def ready(self):
        # Turn boto logging level down so it doesn't pollute the log files.
        for name in ['boto', 'urllib3', 's3transfer', 'boto3', 'botocore', 'nose']:
            logging.getLogger(name).setLevel(logging.CRITICAL)
