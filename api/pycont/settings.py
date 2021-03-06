"""Global settings for pycont."""
import os

__SECURE_COOKIES__ = bool(int(os.getenv('SECURE_COOKIES', '1')))

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

ALLOWED_HOSTS = ['*']

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSRF_COOKIE_SECURE = __SECURE_COOKIES__

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('MYSQL_DB_NAME', 'pycont'),
        'USER': os.getenv('MYSQL_DB_USER', 'pycont'),
        'HOST': os.getenv('MYSQL_DB_HOST', 'pycont-mariadb'),
        'PASSWORD': os.getenv('MYSQL_PASSWORD', 'pycont'),
        'PORT': os.getenv('MYSQL_DB_NAME', '3306'),
    }
}


DEBUG = os.environ.get('DJANGO_DEBUG')

FORCE_SCRIPT_NAME = os.environ.get('FORCE_SCRIPT_NAME', '/')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'drf_yasg',
    'rest_framework_simplejwt.token_blacklist',
    'pycont.apps.users',
    'pycont.apps.accounts',
    'pycont.apps.transactions',
]

LANGUAGE_CODE = 'en-us'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

ROOT_URLCONF = 'pycont.urls'

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

SESSION_COOKIE_SECURE = __SECURE_COOKIES__

SIMPLE_JWT = {
    'AUTH_COOKIE': 'Authorization',
    'AUTH_COOKIE_SAMESITE': 'Strict',
    'AUTH_COOKIE_SECURE': __SECURE_COOKIES__,
    'BLACKLIST_AFTER_ROTATION': True,
    'ROTATE_REFRESH_TOKENS': True,
}

STATIC_ROOT = './static/'
STATIC_URL = os.environ.get('STATIC_URL', '/api/static/')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

USE_X_FORWARDED_HOST = True

WSGI_APPLICATION = 'pycont.wsgi.application'
