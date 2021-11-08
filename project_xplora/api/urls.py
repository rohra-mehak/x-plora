
from django.urls import path
from .views import UserRegisterView , ProblemView

urlpatterns = [
    path('big', ProblemView.as_view()),
    path('register', UserRegisterView.as_view()),

]
