from rest_framework.test import APITestCase
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED


class AccountTests(APITestCase):
    fixtures = ['users', 'accounts']

    def test_should_be_authenticated(self):
        response = self.client.get('/accounts/')
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    def test_should_only_retrieve_his(self):
        self.client.login(username='sieira', password='Pa$$word1234')
        response = self.client.get('/accounts/')
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.json(), [{
            'id': 1, 'name': 'Million dollars account', 'balance': '1000000.00', 'currency': 'USD'
        }, {
            'id': 2, 'name': 'Poor guys account', 'balance': '-747.68', 'currency': 'EUR'
        }])
