from enum import auto
from django.db import models
from django.contrib.auth.models import User
from django.db.models.expressions import Value
from django.urls import reverse
from datetime import datetime, date
from ckeditor.fields import RichTextField


# Create your models here.


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
   dataset_provision_email = "xyz@somemail.com"

class  Stage(models.Model):
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
        

   belongs_to = models.ForeignKey(Problem, on_delete=models.CASCADE)
   title  = models.CharField(max_length=255)
   description = models.TextField()
   state = models.CharField( max_length =6 ,choices= State.choices, default= State.RED )
   isActivated = models.BooleanField(default=False)
   isComplete = models.BooleanField(default=False)


class Solution(models.Model):
      solution_to =  models.OneToOneField(Problem, on_delete=models.CASCADE)
      solution_link = models.URLField(default="", unique=True)
