"""
Django settings for My App project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import logging

logger = logging.getLogger(__name__)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The React frontend lives in FRONTEND_DIR
DJANGO_APP_DIR = BASE_DIR  # rename variable for clarity
FRONTEND_DIR = os.path.join(DJANGO_APP_DIR, '../react-frontend')

# Before deploying, see https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# Pull configuration details from environment variables.
PRODUCTION = os.environ.get('DJANGO_ENV') != 'development'
DEBUG = (os.environ.get('DJANGO_ENV') == 'development' or
         os.environ.get('DJANGO_DEBUG') == 'true')
USE_SSL = os.environ.get('USE_SSL') == 'true'

if PRODUCTION:
    ALLOWED_HOSTS = ['localhost', '0.0.0.0', 'myapp.org']
else:
    ALLOWED_HOSTS = ['localhost', '0.0.0.0', 'myapp.org']

SECURE_REFERRER_POLICY = 'same-origin'

if USE_SSL:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    # Make it really hard to accidentally set SECURE_HSTS_SECONDS
    # to a huge value on localhost.
    if PRODUCTION and not DEBUG and SECRET_KEY != 'devkey':
        # TODO uncomment this line once we're ready for primetime
        # SECURE_HSTS_SECONDS = 31536000
        SECURE_HSTS_SECONDS = 60
    else:
        SECURE_HSTS_SECONDS = 60


# Application definition
INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'social_django',
    'myapp',
    'api.apps.ApiConfig',
    'rest_framework'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'csp.middleware.CSPMiddleware',
]

ROOT_URLCONF = 'myapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(FRONTEND_DIR, 'build'),
            os.path.join(BASE_DIR, 'templates')
        ],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # PyPugJS:
            'loaders': [
                ('pypugjs.ext.django.Loader', (
                    'django.template.loaders.filesystem.Loader',
                    'django.template.loaders.app_directories.Loader',
                ))
            ],
            'builtins': [
                'pypugjs.ext.django.templatetags',
            ],
        },
    },
]

WSGI_APPLICATION = 'myapp.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'my_app_db',
        'PORT': '5432',
    }
}


# Enable the custom User model
AUTH_USER_MODEL = 'api.User'


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Content security policy header configuration
# TODO remove CSP_REPORT_ONLY = True after making sure everything works on Chrome, Safari, & Firefox
CSP_REPORT_ONLY = True
CSP_SCRIPT_SRC = ("'self'", 'https://www.google-analytics.com',
                  'www.youtube.com', 'https://s.ytimg.com')
CSP_FRAME_SRC = ('https://www.youtube.com')
CSP_FONT_SRC = ('https://fonts.gstatic.com:*')
CSP_IMG_SRC = ("'self'", 'https://www.google-analytics.com',
               'https://i.ytimg.com',
               'blob:', 'data:')
if PRODUCTION:
    CSP_STYLE_SRC = ("'self'", 'https://fonts.googleapis.com')
else:
    # The development server serves the stylesheets inline.
    CSP_STYLE_SRC = ("'self'", 'https://fonts.googleapis.com',
                     "'unsafe-inline'")

# OAuth2 stuff
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get('OAUTH_CLIENT_ID')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ.get('OAUTH_SECRET')
SOCIAL_AUTH_POSTGRES_JSONFIELD = True
SOCIAL_AUTH_URL_NAMESPACE = 'social'
LOGIN_URL = '/o/oauth2/v2/'
LOGIN_REDIRECT_URL = '/api/users/login'
LOGOUT_REDIRECT_URL = '/api/users/logout'


# Django Rest Framework stuff
DRF_DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
)

if DEBUG:
    # Only enable the browsable API during development
    DRF_DEFAULT_RENDERER_CLASSES = DRF_DEFAULT_RENDERER_CLASSES + (
        'rest_framework.renderers.BrowsableAPIRenderer',
    )

REST_FRAMEWORK = {
    # Allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_RENDERER_CLASSES': DRF_DEFAULT_RENDERER_CLASSES
}


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# S3 Configuration
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
if PRODUCTION:
    AWS_STORAGE_BUCKET_NAME = 'myapp'
else:
    AWS_STORAGE_BUCKET_NAME = 'myapp-dev'
AWS_S3_REGION_NAME = 'us-west-2'
AWS_DEFAULT_ACL = None


# Static files (CSS, JavaScript, Images)
if PRODUCTION:
    STATICFILES_DIRS = (os.path.join(FRONTEND_DIR, 'build', 'static'),)

STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')

STATIC_ROOT = os.path.join(DJANGO_APP_DIR, 'static')

STATIC_URL = '/static/'

WHITENOISE_ROOT = os.path.join(FRONTEND_DIR, 'build', 'root')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': '/code/nginx/logfile.log'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
}
