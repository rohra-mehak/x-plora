
from django.urls import path
from .views import  CreateProblemView , SolutionStageUpdateview, GetAndDestroyStagesDetail, GetView , UserRegisterView, UserDetail,CustomAuthToken , ProblemDetail , UserLogoutView, TestAuthView
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken import views
from rest_framework.urlpatterns import format_suffix_patterns


# router = routers.SimpleRouter()
# router.register(r'big', ProblemView.as_view())
# router.register(r'register', UserRegisterView.as_view() )

urlpatterns = [
    path('test-auth/', TestAuthView.as_view()),
    path('request-a-solution/', CreateProblemView.as_view()),
    path('register/', UserRegisterView.as_view()), 
    path('prob-detail<int:pk>',ProblemDetail.as_view() ),
    path('user-detail/<int:pk>/', UserDetail.as_view()),
    path('stage-detail/update/<int:pk>/', SolutionStageUpdateview.as_view()),
    path('stage-detail/<int:pk>/', GetAndDestroyStagesDetail.as_view()),
    path('users' , GetView.as_view() ),
    path('login/', CustomAuthToken.as_view()),
    path('logout/',UserLogoutView.as_view()),
    # path('', include(router.urls)),

]

urlpatterns = format_suffix_patterns(urlpatterns)