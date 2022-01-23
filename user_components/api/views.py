from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserComponentsSerializer
from ..models import UserComponent
from rest_framework import status


class UserComponentList(APIView):

    def get(self, request):
        user_components = UserComponent.objects.all()
        serializer = UserComponentsSerializer(user_components, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserComponentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)