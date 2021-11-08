from django.views import generic
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.base import reverse_lazy

from .forms import SignUpForm, EditProfileForm, PasswordUpdateForm
# Create your views here.

def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")


class UserRegisterView(generic.CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('login')


class UserEditView(generic.UpdateView):
    form_class = EditProfileForm
    success_url = reverse_lazy('home')

    def get_object(self):
        return self.request.user