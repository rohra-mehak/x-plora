from django.test import TestCase

from project_xplora.api.models import CUser


""" write your test cases here @ania

to understand class based views : 
https://www.django-rest-framework.org/tutorial/3-class-based-views/

https://www.geeksforgeeks.org/class-based-views-django-rest-framework/#:~:text=Class-based%20views%20help%20in%20composing%20reusable%20bits%20of,the%20different%20class-based%20views%20in%20Django%20REST%20Framework.


to write unit test cases in djago rest

https://tech.people-doc.com/django-unit-test-your-views.html

https://code.djangoproject.com/ticket/20456#:~:text=When%20django%20users%20create%20class-based%20views%2C%20they%20create,class-based%20views%20is%20using%20the%20builtin%20test%20client.
# Create your tests here. """

def print():
    print(CUser.objects.all())

