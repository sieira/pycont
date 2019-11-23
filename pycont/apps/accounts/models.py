from django.contrib.auth.models import User
from django.db import models

from pycont.utils import PycontModel


class Account(PycontModel):
    class Meta:
        unique_together = ['name', 'user']

    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
