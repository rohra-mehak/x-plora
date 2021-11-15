from enum import auto
from django.db import models
from django.contrib.auth.models import User
from django.db.models.enums import Choices
from django.urls import reverse
from datetime import datetime, date

# Create your models here.

class CUser(models.Model):
      user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
      Name_of_Organization = models.CharField( name= "Name_of_Organization" ,max_length=500, blank = True)
      profession =models.CharField(name ="profession", max_length=100 , blank=True)

class Problem(models.Model):
   """ Entity Problem: 
Problem ID 
User ID -> foreign key 
Problem Title
Problem/ Data set Description  
  """
   author = models.ForeignKey(User, on_delete=models.CASCADE)
   title  = models.CharField( max_length =500 ,unique=True)
   dataset_description = models.TextField()
   created_on = models.DateTimeField(auto_now_add=True)
   dataset_provision_email =  "Please attach your data to - xyz@somemail.com"

class  Solution_Stage(models.Model):
   """  StageID
    Problem ID /belongs_to -> foreign key 
    title  text
    description text ( what is being done at the stage)
    state   choice ( Green , yellow , Red )
    isActivated  boolean 
    isComplete boolean  """

   class State(models.TextChoices):
        RED =  "RED" ,
        YELLOW = "YELLOW",
        GREEN = "GREEN"
   
   class Stage_Number(models.TextChoices):
       One ="One",
       Two ="2_Data_Cleaning",
       Three = "3",
       Four ="4",
       Five = "5",
       Six = "6"


   belongs_to = models.OneToOneField(Problem, on_delete=models.CASCADE)
   s_number = models.CharField(max_length =30 ,choices= Stage_Number.choices, default=Stage_Number.One)
   # title  = models.CharField(max_length=255)
   # description = models.TextField()
   state = models.CharField( max_length =6 ,choices= State.choices, default= State.RED )
   isActivated = models.BooleanField(default=False)
   isComplete = models.BooleanField(default=False)


class Solution(models.Model):
      solution_to =  models.OneToOneField(Problem, on_delete=models.CASCADE)
      solution_link = models.URLField(default="", unique=True)



