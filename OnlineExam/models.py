from django.db import models
#from . import Register_no
# Create your models here.


class Student(models.Model):
    objects = None
    student_name = models.CharField(max_length=32)
    #mail = models.EmailField(max_length=100, unique=True)
    Student_Reg_No = models.CharField(default="HC",unique=True,max_length=10)

    def __str__(self):
        return self.student_name



class Question(models.Model):
    objects = None
    question = models.CharField(max_length=1000)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    #Answer1 = models.BooleanField(default=False)
    Answer = models.CharField(max_length=100)

    def __str__(self):
        return self.question


class Answer(models.Model):
    Answer = models.CharField(max_length=50)

