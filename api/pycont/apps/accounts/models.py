from django.contrib.auth.models import User
from django.db import models

from pycont.utils import PycontModel, CURRENCIES


class Account(PycontModel):
    class Meta:
        unique_together = ['name', 'user']

    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    balance = models.DecimalField(
        decimal_places=2,
        blank=False,
        max_digits=30,  # Should work for Venezuela's national debt in Bolivar
        default=0
    )
    currency = models.CharField(
        choices=CURRENCIES.items(),
        default='EUR',
        blank=False,
        max_length=3,
    )
