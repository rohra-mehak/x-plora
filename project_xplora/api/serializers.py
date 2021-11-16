from rest_framework import fields, serializers
from rest_framework.authtoken.views import ObtainAuthToken
from .models import CUser, Problem, Solution, Solution_Stage
from django.contrib.auth.models import AbstractUser, User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes

class ProblemSerializer(serializers.ModelSerializer):
      # author = serializers.ReadOnlyField(source='author.username')
      class Meta:
          model = Problem
          fields = ('title', 'dataset_description', 'created_on', 'dataset_provision_email')
          # fields = "__all__"


class SolutionSerializer(serializers.ModelSerializer):
    class Meta :
          model = Solution
          fields = ('id', 'solution_to' , 'solution_link')
        #   fields = "__all__"



class Solution_StageSerializer(serializers.ModelSerializer):
    probelem = serializers.PrimaryKeyRelatedField(many=True, queryset=Problem.objects.all())

    class Meta :
          model = Solution_Stage
        #   fields = ('id', 'belongs_to', 'title', 'description', 'state', 'isActivated', 'isComplete')
          fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email' , 'password')

class CUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = CUser
        fields = ('user', 'profession' ,'Name_of_Organization',)

    def create(self, validated_data):
        """
        Overriding the default create method of the Model serializer.
        :param validated_data: data containing all the details of Custom user
        :return: returns a successfully created custom user record
        """
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        cUser, created = CUser.objects.update_or_create(user=user,
                            profession=validated_data.pop('profession') , 
                            Name_of_Organization=validated_data.pop('Name_of_Organization'))
        token, created = Token.objects.get_or_create(user=user)
        return cUser 
    
