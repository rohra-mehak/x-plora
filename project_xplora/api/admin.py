from django.contrib import admin
from .models import CUser, Problem ,  Solution_Stage, Solution
# Register your models here.
admin.site.register(Problem)
admin.site.register(Solution)
admin.site.register(Solution_Stage)
admin.site.register(CUser)