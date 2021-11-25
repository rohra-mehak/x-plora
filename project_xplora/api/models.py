from enum import auto
from functools import reduce
from django.db import models
from django.contrib.auth.models import User
from django.db.models.enums import Choices
from django.urls import reverse
from datetime import datetime, date
from enum import Enum

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
Problem/ Data set Description  vv
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

   # class State(models.TextChoices):
   RED =  'RED' 
   YELLOW = 'YELLOW'
   GREEN = 'GREEN'
   
   state_list = [
       ( RED ,('red')), 
       ( YELLOW, ('yellow')),
       ( GREEN, ('green')),
   ]
   # class Stage_Number(models.TextChoices):
   #     One ="1. Data Acuisition",
   #     Two ="2. Data Cleaning and Reorganisation",
   #     Three = "3. Data visualization and initial feature assessment",
   #     Four =" 4. Data Modelling",
   #     Five = "5. Results and Conclusions"
   
   One =   1
   Two =   2
   Three = 3
   Four =  4
   Five =  5

   stage_number = [       
      ( One ,('1. Data Acquisition')),
      ( Two ,('2. Data Cleaning and Reorganisation')),
      (  Three , ('3. Data visualization and initial feature assessment')),
      (  Four , ('4. Data Modelling')),
      ( Five , ('5. Results and Conclusions'))
   ]

   @classmethod
   def get_stage_number(self, index):
       return self.stage_number[index]
   
   @classmethod
   def increment_stage_and_update(self , isCompleted , stage_number):
          if stage_number == 5:
             if isCompleted == True:
                 print("Last stage complete , problem is finished")
                 return {
                        self.isComplete : True,
                        self.s_number : stage_number  ,
                        self.isActivated  : False, 
                        self.state : "GREEN"
             }
          if isCompleted == True:
             ("im here perofrming update")
             return {
             self.isComplete : False , 
             self.s_number : stage_number +1  ,
             self.isActivated  : True, 
             self.state : "RED"
          }
          else :
             return {
                self.isComplete : isCompleted,
                self.s_number : stage_number,
             }

          
             
   belongs_to = models.OneToOneField(Problem, on_delete=models.CASCADE)
   s_number = models.IntegerField( choices=stage_number, default= 1)
   state = models.CharField( max_length =6 ,choices= state_list, default= YELLOW )
   isActivated = models.BooleanField(default=True)
   isComplete = models.BooleanField(default=False)


class Solution(models.Model):
      solution_to =  models.OneToOneField(Problem, on_delete=models.CASCADE)
      solution_link = models.URLField(default="https://docs.google.com/document/d/1ZVbLLNmL3h5gdxOO1oTnSguBiw37y0KTnOfRvNyLRx8/edit?usp=sharing")



