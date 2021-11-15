from django.views import generic
from rest_framework import generics, mixins, serializers, status
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.base import reverse_lazy
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from .models import Problem , Solution , Solution_Stage , CUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout, login
from rest_framework.permissions import AllowAny

from rest_framework.decorators import api_view, permission_classes
from .serializers import CUserSerializer, ProblemSerializer, Solution_StageSerializer, SolutionSerializer , UserSerializer
# Create your views here.

def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class ProblemView(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [AllowAny]

    

class ProblemDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class UserDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    
    queryset = CUser.objects.all()
    serializer_class = CUserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class UserRegisterView(generics.CreateAPIView):
    
    queryset = CUser.objects.all()
    serializer_class = CUserSerializer
    permission_classes = [AllowAny]

class GetView(generics.ListAPIView):
   
    # API endpoint that allows users to be viewed or edited. 

    queryset = CUser.objects.all()
    serializer_class = CUserSerializer

class CustomAuthToken(ObtainAuthToken):

  permission_classes = [AllowAny]

#   def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

  def post(self, request, *args, **kwargs):
      serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
      serializer.is_valid(raise_exception=True)
      user = serializer.validated_data['user']
      token, created = Token.objects.get_or_create(user=user)
      return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username' : user.username
        })

class UserLogoutView(APIView):

    permission_classes =([IsAuthenticated])
    def get(request):
        request.user.auth_token.delete()
        logout(request)
        return Response('User Logged out successfully')

#title, description , state 


class Solution_StagesView(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):

      queryset = Solution_Stage.objects.all()
      serializer_class = Solution_StageSerializer
      permission_classes = [IsAuthenticated]
      
    #   def get_queryset(self):
    #     queryset = super(Solution_StagesView, self).get_queryset()
    #     return queryset.filter(professor__pk=self.kwargs.get('pk'))

      def get(self, request, *args, **kwargs):
           return self.retrieve(request, *args, **kwargs)

class InitialSolutionStageView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = Solution_StageSerializer
    def get(self, request, format=None):
        """
        reuturn Stage data
        """
        stage = Solution_Stage(s_number="ONE",state="RED", isActivated= True, isComplete=False)
        stage.save()
        # usernames = [user.username for user in User.objects.all()]
        return Response(stage)
