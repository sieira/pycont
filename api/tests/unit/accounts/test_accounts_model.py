from django.db.utils import IntegrityError

from django.test import TestCase

from pycont.apps.accounts.models import Account


class AccountModelTestCase(TestCase):
    fixtures = ['users', 'accounts']

    def test_currency_is_EUR_by_default(self):
        account = Account.objects.create(name="YOLO", user_id=1)
        self.assertEqual(account.currency, 'EUR')

    def test_balance_is_0_by_default(self):
        account = Account.objects.create(name="YOLO", currency='USD', user_id=1)
        self.assertEqual(account.balance, 0)

    def test_unique_name_per_user(self):
        existing_account = Account.objects.first()

        with self.assertRaises(IntegrityError):
            Account.objects.create(user=existing_account.user, name=existing_account.name)
