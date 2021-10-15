from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import IntegerField

class Proj(models.Model):
    task = models.CharField(max_length = 180)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    completed = models.BooleanField(default = False, blank = True)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.task

class Country(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(max_length=10)    
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class State(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(max_length=10)    
    name = models.CharField(max_length=50)
    countryId = models.IntegerField()

    def __str__(self):
        return self.name
