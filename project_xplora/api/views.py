from django.views import generic
from rest_framework import generics, serializers
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.base import reverse_lazy
from .models import Problem , Solution , Stage , CUser
from django.contrib.auth.models import User
from .serializers import CUserSerializer, ProblemSerializer, StageSerializer, SolutionSerializer

from .forms import SignUpForm, EditProfileForm, PasswordUpdateForm
# Create your views here.

def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class ProblemView(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class UserRegisterView(generics.CreateAPIView):
   
    queryset = CUser.objects.all()
    serializer_class = CUserSerializer
    # success_url = reverse_lazy('login')


class UserEditView(generic.UpdateView):
    form_class = EditProfileForm
    success_url = reverse_lazy('home')

    def get_object(self):
        return self.request.user