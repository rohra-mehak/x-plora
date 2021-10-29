from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def main(request):
    return HttpResponse("HELLO REACT STUFF, THIS An endpoint FROM THE BACK ")

