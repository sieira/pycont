from rest_framework.test import APITestCase
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN


class AccountTests(APITestCase):
    fixtures = ['users', 'accounts']

    def test_should_be_authenticated(self):
        response = self.client.get('/api/accounts/')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    def test_should_only_retrieve_his(self):
        self.client.login(username='sieira', password='Pa$$word1234')
        response = self.client.get('/api/accounts/')
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.json(), [
            {'id': 1, 'name': 'Million dollars account'}, {'id': 2, 'name': 'Poor guys account'}
        ])
