from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK

from pycont.apps.users.serializers import UserSerializer


class AuthTest(APITestCase):
    fixtures = ['users']

    def test_should_return_user_profile(self):
        response = self.client.post(
            '/auth/', data={'username': 'sieira', 'password': 'Pa$$word1234'}
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            response.json()['user'],
            UserSerializer(User.objects.get(username='sieira')).data
        )

    def test_profile_requires_auth(self):
        response = self.client.get('/profile/')
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)
        self.client.login(username='sieira', password='Pa$$word1234')
        response = self.client.get('/profile/')
        self.assertEqual(response.status_code, HTTP_200_OK)
