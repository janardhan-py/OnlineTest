from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .Serializers import StudentSerializers, QuestionSerializers
import OnlineExam.models as Online_exam


# Create your views here.

class StudentList(APIView):
    #To get data
    def get(self,request):

        Students = Online_exam.Student.objects.all()
        Serializer = StudentSerializers(Students, many=True)
        # to return json format
        return Response(Serializer.data)

    def post(self):
        pass


class QuestionList(APIView):

    def get(self,request):

        questions = Online_exam.Question.objects.all()

        Serializer1 = QuestionSerializers(questions,many=True)

        return Response(Serializer1.data)


def Student(request):
    return HttpResponse("<h1>welcome student <h1/>")


def Rules(request):
    return HttpResponse('student has 1 minute for each question',)


def Index(request):
    return render(request,'index.html')

