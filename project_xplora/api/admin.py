from django.contrib import admin
from .models import CUser, Problem , Stage, Solution
# Register your models here.
admin.site.register(Problem)
admin.site.register(Stage)
admin.site.register(Solution)
admin.site.register(CUser)