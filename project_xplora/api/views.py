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

#you will need authorisation header with token for all authenticated views 
# EXAMPLE 
# "http://127.0.0.1:8000/request-a-solution/" ,  headers={"Authorization":'token {}'.format(9246932649DKWBCDIFCB12WKLSNJEDBNEF3)} ,


def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class TestAuthView(APIView):
    """
    JUST FOR TESTING IF MY TOKEN AUTHENTICATION WORKS AND RETURNS THE USER
    WHEN A GET REQUEST IS MADE WITH AUTHORSATION HEADER FORA REGISTERED USER
     
     tests can be written similarly 
"""

    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        return Response("Hello {0}!".format(request.user))

class UserRegisterView(generics.CreateAPIView):
    
    queryset = CUser.objects.all()
    serializer_class = CUserSerializer
    permission_classes = [AllowAny]

    # request_method = post
    # request url = http://127.0.0.1:8000/register/
    # payload = 
    # username, first_name , last_name , email , password, Profession , Name_Of_Organization
    # response = 
    #         "user  ":             user.username,
    #         'email  ':            user.email ,     
    #         'Problem  ':          problem.pk,
    #         'problem_title   ':   problem.title,
    #         'datadescription   ': problem.dataset_description,
    #         'problem_date   ':    problem.created_on,
    #         "stage_pk  "     :    stage.pk,
    #         'stage_number  ' :    stage.s_number,
    #         "stage_state   " :    stage.state,
    #         "isActivated  "  :    stage.isActivated,
    #         "isComplete   "  :    stage.isComplete 
    # """


class CustomAuthToken(ObtainAuthToken):

  permission_classes = [AllowAny]

  """ 
   Our LOGIN class with right username and password it fetches the token 
  for the user if it exists in the database and if not TokenAuthenticationg enerates the token 
  for the user provided the username and password  are correct

  request method = post
  url = http://127.0.0.1:8000/login/
  payload = username , password
  response  = token , user email ,username, userid , """

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


class CreateProblemView(generics.ListCreateAPIView):

    """ 
    the post method inside this class creates a problem object in the database 
    and automatically generates the first stage data for the user when he 
    provides the title and the dataset description of the problem . 
    the front sends a post request . 
    
    eg :
    requests.get("http://127.0.0.1:8000/request-a-solution/" ,  
    headers={"Authorization":'token {}'.format(dcbfiewbfiewg485y932y439r)}
    data = {title: " " . dataset_description : " "})

    request_method = post
    request url = http://127.0.0.1:8000/request-a-solution/
    payload = title , dataset_description
    response = 
     "user  ":                    user.username,
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
    """

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
    
    #you will need authorisation header :token for all methods below

    """ request_method = get
    request url = http://127.0.0.1:8000/prob-detail/<int:pk>/

    will return  details of the problem with specified id  as response
    i.e  title, dataset_description , author , created_on 
    """

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    

    """ request_method = put
    request url = http://127.0.0.1:8000/prob-detail/<int:pk>/
    payload = title , dataset_description  or just 1 or both whatever you want to update

    will update the the problem details with specified id , eg 

    put http://127.0.0.1:8000/prob-detail/3/
    datatset_description =newchanges 
    """

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    """ will remove the specific problem record  and its related recors from the db
        delete http://127.0.0.1:8000/prob-detail/<int:pk>/

        eg delete http://127.0.0.1:8000/prob-detail/3/

    """
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


#THIS is yet to be discussed if we take the approach of the dynamic model 
# not to be tested yet or dealt with yet. 
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

    #you will need authorisation header :token for all methods below

    """ request_method = get
    request url = http://127.0.0.1:8000/user-detail/<int:pk>/

    will return  details of the user with specified id  as response
    i.e  user_id , username , email , password , first_name, last_name , profession, 
    name of organisation
    """
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    



    """ request_method = put
    request url = http://127.0.0.1:8000/prob-detail/<int:pk>/
    payload = whichever attribute you want to update

    will update the the user details with specified id , eg 
    reuquest method = put 
    url = http://127.0.0.1:8000/user-detail/3/
    payload =  last_name = ROHRA
    """

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    """ will remove the specific user record  and its related recors from the db
        delete http://127.0.0.1:8000/user-detail/<int:pk>/

        eg delete http://127.0.0.1:8000/user-detail/3/

    """
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



class GetView(generics.ListAPIView):
   
    # API endpoint that allows users to be viewed or edited. 

    queryset = CUser.objects.all()
    serializer_class = CUserSerializer





class UserLogoutView(generics.ListAPIView):
     
    """  
    authorisation header with request .
     request method = get 
     request url = http://127.0.0.1:8000/logout/
     response = user logged out successfulyyy """
   
    permission_classes =([IsAuthenticated])
    def get( self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response('User Logged out successfully')

