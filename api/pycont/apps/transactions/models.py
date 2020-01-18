from django.core.exceptions import ValidationError
from django.db import models

from pycont.utils import PycontModel, CURRENCIES
from pycont.apps.accounts.models import Account


class Transaction(PycontModel):
    amount = models.DecimalField(
        decimal_places=2,
        blank=False,
        max_digits=30  # Should work for Venezuela's national debt in Bolivar
    )
    currency = models.CharField(
        choices=CURRENCIES.items(),
        default='EUR',
        blank=False,
        max_length=3,
    )
    emitter = models.ForeignKey(
        Account,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='emitted_transactions'
    )
    receiver = models.ForeignKey(
        Account,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='received_transactions'
    )

    def clean(self):
        if self.emitter is None and self.receiver is None:
            error = 'At least one of emitter/receiver has to be provided'
            raise ValidationError({
                'emitter': error,
                'receiver': error
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
