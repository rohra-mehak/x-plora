from django.views import generic
from rest_framework import generics, mixins, serializers, status
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.base import reverse_lazy
from rest_framework import authentication
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from .models import Problem , Solution, Solution_Stage  , CUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout, login
from rest_framework.permissions import AllowAny

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CUserSerializer, ProblemSerializer, Solution_StageSerializer, SolutionSerializer , UserSerializer
# Create your views here.


def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class TestAuthView(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        return Response("Hello {0}!".format(request.user))
        

class CreateProblemView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    
    
    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=request.user.username)
       
        problem, created = Problem.objects.update_or_create(author = user,
                                                           title= request.data['title'],
                                                           dataset_description= request.data['dataset_description']
                                                           )                                  
        stage, createdd = Solution_Stage.objects.update_or_create(belongs_to = problem)
        serializer = ProblemSerializer(problem, data=request.data, context={'request': request})
        
        # s_s.save()
        if serializer.is_valid():
           serializer.save()
            
        return Response(
                {
            "user  ":             user.username,
            'email  ':            user.email ,     
            'Problem  ':          problem.pk,
            'problem_title   ':   problem.title,
            'datadescription   ': problem.dataset_description,
            'problem_date   ':    problem.created_on,
            "stage_pk  "     :    stage.pk,
            'stage_number  ' :    stage.s_number,
            "stage_state   " :    stage.state,
            "isActivated  "  :    stage.isActivated,
            "isComplete   "  :    stage.isComplete

            },)
        # else:
        #     return Response(serializer.data, status.HTTP_200_OK)

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
    
class SolutionStageview(generics.UpdateAPIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Solution_Stage.objects.all()
    serializer_class = Solution_StageSerializer


    def update(self , request , pk,  *args, **kwargs):
        stage, = Solution_Stage.objects.get(pk=pk)
        stage.isActivated = request.data.get("isActivated")
        stage.state = request.data.get("state")
        stage.isComplete = request.data.get("isComplete")
       
        stage.save()
        serializer = self.get_serializer(stage)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)




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
        # logout(request)
        return Response('User Logged out successfully')

