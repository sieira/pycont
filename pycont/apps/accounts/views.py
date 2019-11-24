from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from pycont.apps.accounts.serializers import AccountSerializer


class AccountViewSet(ModelViewSet):
    """ViewSet for Account objects."""

    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.accounts
