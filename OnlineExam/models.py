from django.db import models

# Create your models here.


class Student(models.Model):
    objects = None
    student_name = models.CharField(max_length=32)
    #Email = models.EmailField(max_length=100, unique=True)
    Student_Reg_No = models.IntegerField(unique=True)

    def __str__(self):
        return self.student_name


class Answer(models.Model):


    Answer = models.CharField(max_length=50)


class Question(models.Model):
    objects = None
    question = models.CharField(max_length=1000)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    Answer1 = models.BooleanField(default=False)
    #Answer = models.CharField(max_length=100)

    def __str__(self):
        return self.question
