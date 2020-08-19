"""Contains utilities that extend the Django framework."""
from django.db import models


CURRENCIES = {
    'USD': 'United States Dollars',
    'EUR': 'Euros',
}


class PycontModel(models.Model):
    """Base model for the entire application, adding created_at and last_updated_at columns."""

    class Meta:
        """Make it abstract."""

        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
