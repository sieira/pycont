from django.db.utils import IntegrityError

from django.test import TestCase

from pycont.apps.accounts.models import Account


class AccountModelTestCase(TestCase):
    fixtures = ['users', 'accounts']

    def test_unique_name_per_user(self):
        existing_account = Account.objects.first()

        with self.assertRaises(IntegrityError):
            Account.objects.create(user=existing_account.user, name=existing_account.name)
