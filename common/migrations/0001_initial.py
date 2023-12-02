# Generated by Django 4.2.5 on 2023-10-02 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('username', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=200)),
                ('is_active', models.BooleanField()),
            ],
        ),
    ]