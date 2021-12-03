from typing import ClassVar
from django.http.response import HttpResponseNotModified, JsonResponse
from django.views import generic
from rest_framework import generics, mixins, serializers, status
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.base import reverse_lazy
from rest_framework import authentication
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from .models import Problem, Solution, Solution_Stage, CUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout, login
from rest_framework.permissions import AllowAny
from django.contrib.auth.signals import user_logged_in
import json

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from .serializers import (
    CUserSerializer,
    ProblemSerializer,
    Solution_StageSerializer,
    SolutionSerializer,
    UserSerializer,
)

# Create your views here.

# you will need authorisation header with token for all authenticated views
# EXAMPLE
# "http://127.0.0.1:8000/request-a-solution/" ,  headers={"Authorization":'token {}'.format(9246932649DKWBCDIFCB12WKLSNJEDBNEF3)} ,


def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class TestAuthView(APIView):
    """
    JUST FOR TESTING IF MY TOKEN AUTHENTICATION WORKS AND RETURNS THE USER
    WHEN A GET REQUEST IS MADE WITH AUTHORSATION HEADER FORA REGISTERED USER

     tests can be written similarly"""

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

    def post(self, request, format=None, *args, **kwargs):
        isFirstVisit = False

        areProblemsCreated = False

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        if user.last_login is None:
            isFirstVisit = True

        token, created = Token.objects.get_or_create(user=user)

        user_logged_in.send(sender=user.__class__, request=request, user=user)

        problems = list(Problem.objects.filter(author=user))

        problem_list = []
        if len(problems) != 0:
            areProblemsCreated = True
            for problem in problems:

                stage = Solution_Stage.objects.filter(belongs_to=problem).first()
                if not(stage.s_number == 5 and stage.isComplete == True):
                       problem_list.append(
                    {
                        "problem_PK": problem.pk,
                        "problem_Title": problem.title,
                        "problem_Dataset_description": problem.dataset_description,
                        "problem_stage_data": {
                            "stage_Pk": stage.pk,
                            "state": stage.state,
                            "s_number": stage.s_number,
                            "isActivated": stage.isActivated,
                            "isComplete": stage.isComplete,
                        },
                    }
                )
                print(problem_list)
        else:
            problem_list = []

        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "username": user.username,
                "isFirstVisit": isFirstVisit,
                "areProblemsCreated": areProblemsCreated,
                "problem_list": problem_list,
            }
        )


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

        problem, created = Problem.objects.update_or_create(
            author=user,
            title=request.data["title"],
            dataset_description=request.data["dataset_description"],
        )
        stage, createdd = Solution_Stage.objects.update_or_create(belongs_to=problem)
        solution, done = Solution.objects.update_or_create(solution_to=problem)
        serializer = ProblemSerializer(
            problem, data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()

        return Response(
            {
                "userData": {
                    "userID": user.pk,
                    "username": user.username,
                    "email": user.email,
                },
                "GeneratedProblemData": {
                    "problem_PK": problem.pk,
                    "problem_Title": problem.title,
                    "problem_Dataset_description": problem.dataset_description,
                    "problem_stage_data": {
                        "stage_Pk": stage.pk,
                        "state": stage.state,
                        "s_number": stage.s_number,
                        "isActivated": stage.isActivated,
                        "isComplete": stage.isComplete,
                        "solution_link": solution.solution_link,
                    },
                },
            },
        )
        # else:
        #     return Response(serializer.data, status.HTTP_200_OK)


class ProblemDetail(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):

    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

    # you will need authorisation header :token for all methods below

    """ request_method = get
    request url = http://127.0.0.1:8000/prob-detail/<int:pk>/

    will return  details of the problem with specified id  as response
    i.e  title, dataset_description , author , created_on 
    """

    def get(self, request, pk, *args, **kwargs):
        problem = Problem.objects.get(pk=pk)
        stage = Solution_Stage.objects.filter(belongs_to=problem).first()

        return JsonResponse(
            {
                "problem_PK": problem.pk,
                "problem_Title": problem.title,
                "problem_Dataset_description": problem.dataset_description,
                "problem_stage_data": {
                    "stage_Pk": stage.pk,
                    "state": stage.state,
                    "s_number": stage.s_number,
                    "isActivated": stage.isActivated,
                    "isComplete": stage.isComplete,
                },
            }
        )

    # return self.retrieve(request, *args, **kwargs)

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


class SolutionStageUpdateview(generics.UpdateAPIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Solution_Stage.objects.all()
    serializer_class = Solution_StageSerializer

    """ 
     will update the the stage details with specified id , eg 

    put http://127.0.0.1:8000/stage-detail/update/<int:pk>/
    #<int:pk> is nothing but the id of the stage you want to update, url to be sent like this -
    eg :
     url example 
    put http://127.0.0.1:8000/stage-detail/update/3/ 

    the stage id is given to you in reponse  when problem is created 

    required payload 
    payload =
    s_number  <- current syage you are at
    isActivated  <- will be true 
    state  <- its state, should be green if youve completed it
    isComplete    <- most important , should be true to update to next stage


     response ( "whether you have move to the next stage 
      s_number  <- current updated stage
     isActivated  <- will be true 
     state  <- its state, will be ssent as red
     isComplete    <-  will be updated to false
     )

     if you are at current stage 5 and if you send for update
     if will not increment but just change the isActivated to false 
     and return appropriate reponse
      """

    def update(self, request, pk, *args, **kwargs):
        stage = Solution_Stage.objects.get(pk=pk)

        deserializer = Solution_StageSerializer(
            data=request.data, context={"request": request}
        )
        deserializer.is_valid(raise_exception=True)
        print(deserializer.data)
        s_number = deserializer.data["s_number"]
        isActivated = deserializer.data["isActivated"]
        isComplete = deserializer.data["isComplete"]

        state = deserializer.data["state"]

        if s_number != stage.s_number:
            return Response(
                {
                    "text": "User is at stage {0}. Please check the current stage number , Increment to this is not possible ".format(
                        stage.s_number
                    ),
                }
            )

        if s_number == 5:
            # print(s_number , "is the stage number , its 5 ")
            if state == "GREEN" and isActivated == True:
                if isComplete == True:
                    new_data = {
                        "s_number": s_number,
                        "state": "GREEN",
                        "isActivated": False,
                        "isComplete": True,
                    }
                for key, value in new_data.items():
                    setattr(stage, key, value)
                    stage.save()

                serializer = Solution_StageSerializer(stage, data=new_data)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
                serializer.save()
                return Response(
                    {
                        "text": "This the last stage, stage is complete, problem must be finished  ",
                        "Data": serializer.data,
                    }
                )

            else:
                return Response(
                    {
                        "text": "Stage not completed by the analyst yet or is inActive, wait for state to turn green , or check your data  data not updated ",
                    }
                )

        elif state == "GREEN" and isActivated == True:
            if isComplete == False:
                if s_number != stage.s_number:
                    print(type(request.data))
                    return Response(
                        {
                            "text": "User is at stage {0}   . Please check the current stage number , Increment to this is not possible ".format(
                                stage.s_number
                            ),
                        },
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )

                new_data = {
                    "s_number": s_number,
                    "state": "YELLOW",
                    "isActivated": True,
                    "isComplete": False,
                }

                for key, value in new_data.items():
                    setattr(stage, key, value)
                    stage.save()

                serializer = Solution_StageSerializer(stage, data=new_data)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
                serializer.save()

                return Response(
                    {
                        "text": "Stage changed to yellow, data analyst will resume work    ",
                        "Data": serializer.data,
                    }
                )


        elif state == "GREEN" and isActivated == True:
            if isComplete == True:
                # print("im here updating data")
                if s_number != stage.s_number:
                    print(type(request.data))
                    return Response(
                        {
                            "text": "User is at stage {0}   . Please check the current stage number , Increment to this is not possible ".format(
                                stage.s_number
                            ),
                        },
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )

                new_data = {
                    "s_number": s_number + 1,
                    "state": "RED",
                    "isActivated": True,
                    "isComplete": False,
                }
                # track_stages(deserializer.data)
                # track_stages(new_data)
                for key, value in new_data.items():
                    setattr(stage, key, value)
                    stage.save()

                serializer = Solution_StageSerializer(stage, data=new_data)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
                serializer.save()

                return Response(
                    {
                        "text": "you have moved to the next stage   ",
                        "Data": serializer.data,
                    }
                )
            else:
                return Response(
                    {
                        "text": "Stage is not complete, you ccannot move to next stage. check if isComplete is True"
                    }
                )

        else:
            new_data = {
                "s_number": s_number,
                "state": state,
                "isActivated": isActivated,
                "isComplete": isComplete,
            }

        serializer = Solution_StageSerializer(stage, data=new_data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        serializer.save()

        return Response(
            {
                "text": "Stage not completed by the analyst yet or is inActive, wait for state to turn green , or check your data  data not updated ",
                "Data": serializer.data,
            }
        )


class GetAndDestroyStagesDetail(
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView
):

    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

    # you will need authorisation header :token for all methods below

    """ request_method = get
    request url = http://127.0.0.1:8000/stage-detail/<int:pk>/

    will return  details of the stage with specified id  as response
    i.e  s_number, state, isComplete, isActivated etc
    """

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    """ will remove the specific stage record  and its related recors from the db
        delete http://127.0.0.1:8000/stage-detail/<int:pk>/

        eg delete http://127.0.0.1:8000/stage-detail/3/

    """

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserDetail(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):

    queryset = CUser.objects.all()
    serializer_class = CUserSerializer
    permission_classes = [IsAuthenticated]

    # you will need authorisation header :token for all methods below

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
     response = user logged out successfulyyy"""

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        request.user.auth_token.delete()
        return Response("User Logged out successfully")

class SolutionLinkView(
    generics.GenericAPIView,):
    
    """ request_method = get
    request url = http://127.0.0.1:8000/solutionLink/

    will return  soltuion link with specified problem_id 
    payload = problem_id
    """


    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # print("-------------\n\n")
        print(request.data)

        problem_id = request.data["problem_id"]
        print(problem_id)

        pk = int(problem_id)

        problem = Problem.objects.filter(pk=pk).first()
        solution = Solution.objects.filter(solution_to=problem).first()

        serializer = SolutionSerializer(solution)

        return Response(serializer.data)
