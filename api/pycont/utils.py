"""Contains utilities that extend the Django framework."""
from django.db import models

from pycont.apps.users.serializers import UserSerializer


def jwt_response_handler(token, user=None, request=None):
    """Add the user profile to the authentication response."""
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


class PycontModel(models.Model):
    """Base model for the entire application, adding created_at and last_updated_at columns."""

    class Meta:
        """Make it abstract."""

        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
