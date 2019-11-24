from django.core.exceptions import ValidationError
from django.test import TestCase

from pycont.apps.accounts.models import Account
from pycont.apps.transactions.models import Transaction


class AccountModelTestCase(TestCase):
    fixtures = ['users', 'accounts']

    def test_created(self):
        emitter = Account.objects.get(id=1)
        receiver = Account.objects.get(id=2)
        new_transaction = Transaction.objects.create(amount=42, emitter=emitter, receiver=receiver)
        self.assertIsInstance(new_transaction, Transaction)

    def test_defaults_euro(self):
        emitter = Account.objects.get(id=1)
        receiver = Account.objects.get(id=2)
        new_transaction = Transaction.objects.create(amount=42, emitter=emitter, receiver=receiver)
        self.assertEquals(new_transaction.currency, 'EUR')

    def test_dont_accept_simolean(self):
        receiver = Account.objects.get(id=2)
        with self.assertRaises(ValidationError):
            Transaction.objects.create(amount=42, receiver=receiver, currency='SIM')

    def test_at_least_one_end(self):
        account = Account.objects.get(id=1)
        no_receiver = Transaction.objects.create(amount=42, emitter=account)
        no_emitter = Transaction.objects.create(amount=12, receiver=account)
        self.assertIsInstance(no_receiver, Transaction)
        self.assertIsInstance(no_emitter, Transaction)

    def test_validation_error_if_no_end(self):
        with self.assertRaises(ValidationError):
            Transaction.objects.create(amount=42)

    def test_not_empty(self):
        emitter = Account.objects.get(id=1)
        receiver = Account.objects.get(id=2)
        with self.assertRaises(ValidationError):
            Transaction.objects.create(emitter=emitter, receiver=receiver)
