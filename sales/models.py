from django.db import models

# Create your models here.
class sale(models.Model):
    Date=models.CharField(max_length=200)
    salesman=models.CharField(max_length=200)
    customer=models.CharField(max_length=200)