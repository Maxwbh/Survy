import os
from django.utils.translation import gettext_noop

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ksz7$0l97o7biqh-13ywx3=jcp(_!4*=ag$=)f*kpnqm7jg#3='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'suit',
    'django.contrib.admin',
    'django.contrib.humanize',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    # others app
    'django_extensions',
    'redactor',
    'sorl.thumbnail',
    'bootstrap3',
    'floppyforms',
    'ordered_model',
    'dajaxice',
    'dajax',
    # Apps
    'apps.order',
    'apps.answer',
    'apps.configuration',
    'apps.customer',
    'apps.plan',
    'apps.questionnaire',
    'apps.response',
    'apps.website',
    'apps.survey',
    'apps.mailinglist',
    'apps.manager',
    'apps.partner',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

SITE_ID = 1

ROOT_URLCONF = 'gooreports.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(ROOT_DIR, 'templates')
        ],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.core.context_processors.media',
                'django.core.context_processors.static',
                'apps.website.processor.website',
            ],
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
                'django.template.loaders.eggs.Loader'
            ]
        },
    },
]

WSGI_APPLICATION = 'gooreports.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases
use_sqlite = True
if use_sqlite:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'gooreports.db')
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'gooreports',
            'USER': 'root',
            'PASSWORD': 'h4ck3r',
            'HOST': '127.0.0.1',
            'PORT': '3306'
        }
    }
# Other Application definition

# TEMPLATE_CONTEXT_PROCESSORS = TCP + (
#     'django.contrib.messages.context_processors.messages',
#     'django.core.context_processors.request',
#     'django.core.context_processors.static',
#     'django.core.context_processors.i18n'
# )

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'dajaxice.finders.DajaxiceFinder',
)

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/
LANGUAGE_CODE = 'en'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
if DEBUG:
    _STATIC_ROOT = os.path.join(ROOT_DIR, 'static')
    STATICFILES_DIRS = (_STATIC_ROOT,)
else:
    STATIC_ROOT = os.path.join(ROOT_DIR, 'static')

MEDIA_ROOT = os.path.join(ROOT_DIR, 'media')

LOGIN_REDIRECT_URL = '/survey/dashboard/'
TPL_NAME = 'smarty/'

LANGUAGES = [
    ('en', gettext_noop('English')),
    ('pt-br', gettext_noop('Brazilian Portuguese'))
]

# REDACTOR
REDACTOR_OPTIONS = {'lang': 'pt_br'}
REDACTOR_UPLOAD = 'uploads/'

FILE_UPLOAD_HANDLERS = (
    "django.core.files.uploadhandler.MemoryFileUploadHandler",
)

# LOG ------------------------------------------------------------------------------------------------------------------
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(ROOT_DIR, 'django.log'),
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
DAJAXICE_XMLHTTPREQUEST_JS_IMPORT = False