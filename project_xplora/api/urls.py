
from django.urls import path
from .views import  ProblemView , GetView , UserRegisterView, UserDetail,CustomAuthToken , ProblemDetail , UserLogoutView
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken import views


# router = routers.SimpleRouter()
# router.register(r'big', ProblemView.as_view())
# router.register(r'register', UserRegisterView.as_view() )

urlpatterns = [
    path('request-a-solution/', ProblemView.as_view()),
    path('register', UserRegisterView.as_view()), 
    path('prob-detail',ProblemDetail.as_view() ),
    path('user-detail/<int:pk>/', UserDetail.as_view()),
    path('users' , GetView.as_view() ),
    path('login/', CustomAuthToken.as_view()),
    path('token/login/ ', obtain_auth_token, name='api_token_auth'),  
    path('token/logout/',UserLogoutView.as_view()),
    # path('', include(router.urls)),

]
