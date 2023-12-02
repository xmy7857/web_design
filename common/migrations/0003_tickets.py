# Generated by Django 4.2.5 on 2023-10-09 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_orders_ticket_fare'),
    ]

    operations = [
        migrations.CreateModel(
            name='tickets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.IntegerField()),
                ('ticket_type', models.CharField(max_length=10)),
                ('ticket_cost', models.IntegerField()),
                ('identify', models.CharField(max_length=30)),
                ('travel_date', models.CharField(max_length=30)),
            ],
        ),
    ]
