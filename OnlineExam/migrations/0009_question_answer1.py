# Generated by Django 3.1.6 on 2021-02-20 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OnlineExam', '0008_auto_20210218_2032'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='Answer1',
            field=models.BooleanField(default=False),
        ),
    ]
