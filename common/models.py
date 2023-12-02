from django.db import models

# Create your models here.
class user(models.Model):
    username=models.CharField(max_length=20,primary_key=True)
    nickname=models.CharField(max_length=20)
    password=models.CharField(max_length=200)
    is_active=models.BooleanField()


class ticket_fare(models.Model):
    scenic=models.CharField(max_length=30,primary_key=True)
    adult=models.IntegerField()
    student=models.IntegerField()
    kid=models.IntegerField()

class orders(models.Model):
    username=models.CharField(max_length=20)
    scenic=models.CharField(max_length=20)
    time=models.CharField(max_length=200)
    cost=models.IntegerField()

class tickets(models.Model):
    order_id=models.IntegerField()
    ticket_type=models.CharField(max_length=10)
    ticket_cost=models.IntegerField()
    identify=models.CharField(max_length=30)
    travel_date=models.CharField(max_length=30)

class ticket(models.Model):
    order_id=models.IntegerField()
    ticket_type=models.CharField(max_length=10)
    ticket_cost=models.IntegerField()
    identify=models.CharField(max_length=30)
    travel_date=models.CharField(max_length=30)


