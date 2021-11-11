
from django.urls import path
from .views import UserRegisterView , ProblemView , GetView
from django.urls import path, include
from rest_framework import routers

# router = routers.SimpleRouter()
# router.register(r'big', ProblemView.as_view())
# router.register(r'register', UserRegisterView.as_view() )

urlpatterns = [
    path('big', ProblemView.as_view()),
    path('register', UserRegisterView.as_view()),
    path('users' , GetView.as_view() )
    # path('', include(router.urls)),

]
