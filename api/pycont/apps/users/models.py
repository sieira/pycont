from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.db import models
from django.dispatch import receiver


class AuditActions(models.TextChoices):
    LOG_IN = 'user_logged_in'
    LOG_OUT = 'user_logged_out'
    LOG_IN_FAILED = 'user_login_failed'


class AuditEntry(models.Model):
    action = models.CharField(max_length=42, choices=AuditActions.choices)
    ip = models.GenericIPAddressField(null=True)
    username = models.CharField(max_length=256, null=True)

    def __str__(self):
        return f'{AuditActions(self.action).label}: {self.username} from {self.ip}'


@receiver(user_logged_in)
def user_logged_in_callback(sender, request, user, **kwargs):
    ip = request.META.get('HTTP_X_FORWARDED_FOR') or request.META.get('REMOTE_ADDR')
    AuditEntry.objects.create(action=AuditActions.LOG_IN, ip=ip, username=user.username)


@receiver(user_logged_out)
def user_logged_out_callback(sender, request, user, **kwargs):
    ip = request.META.get('HTTP_X_FORWARDED_FOR') or request.META.get('REMOTE_ADDR')
    AuditEntry.objects.create(action=AuditActions.LOG_OUT, ip=ip, username=user.username)


@receiver(user_login_failed)
def user_login_failed_callback(sender, credentials, **kwargs):
    username = credentials.get('username', None)
    AuditEntry.objects.create(action=AuditActions.LOG_IN_FAILED, username=username)
