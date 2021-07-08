from django.contrib.auth.models import User

from django.test import TestCase

from pycont.apps.users.models import AuditEntry


class AuditModelTestCase(TestCase):
    def setUp(self):
        User.objects.create_user('Chuck', password='Norris')

    def test_audit_successful_login(self):
        self.client.post(
            '/auth/',
            data={'username': 'Chuck', 'password': 'Norris'},
        )
        self.assertEqual(len(AuditEntry.objects.all()), 1)
        self.assertEqual(str(AuditEntry.objects.first()), 'Log In: Chuck from 192.168.1.42')

    def test_audit_failed_login(self):
        self.client.post(
            '/auth/',
            data={'username': 'Alanis', 'password': 'Morrisette'},
        )
        self.assertEqual(len(AuditEntry.objects.all()), 1)
        self.assertEqual(str(AuditEntry.objects.first()), 'Log In Failed: Alanis from 192.168.1.42')

    def test_successful_logout(self):
        self.client.post(
            '/auth/delete/',
        )
        self.assertEqual(len(AuditEntry.objects.all()), 1)
        self.assertEqual(str(AuditEntry.objects.first()), 'Log Out: Chuck from 192.168.1.42')
