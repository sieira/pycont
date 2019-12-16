from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from pycont.apps.users.serializers import UserSerializer


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    """Gets the user profile, what else ?"""

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
