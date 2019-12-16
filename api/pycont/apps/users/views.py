from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from pycont.apps.users.serializers import UserSerializer, ObtainJwtPairSerializer


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    """Gets the user profile, what else ?"""

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class ObtainJwtPairView(TokenObtainPairView):
    serializer_class = ObtainJwtPairSerializer
