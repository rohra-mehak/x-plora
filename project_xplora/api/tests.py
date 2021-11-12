from django.test import TestCase

from project_xplora.api.models import CUser

# Create your tests here.
def print():
    print(CUser.objects.all())

