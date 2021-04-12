from typing import Any

from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from .Serializers import StudentSerializers, QuestionSerializers
import OnlineExam.models as Online_exam
from django.template import context,loader
from django.core.mail import send_mail
from django.contrib.auth.models import User,auth
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.


class StudentList(APIView):
    #To get data
    def get(self,request,format=None):

        Students = Online_exam.Student.objects.all()
        serializer = StudentSerializers(Students, many=True)
        # to return json format
        return Response(serializer.data)

    @csrf_exempt
    def post(self,request,format=None):
        if request.method == 'POST':
            print(request.data)
            data = JSONParser().parse(request)
            serializer = StudentSerializers(data=data)
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#craeting Api class to get, update and delete the data


class StudentDetails(APIView):
    def get_object(self, pk):
        try:
            return Online_exam.Student.objects.all(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):

        Students = self.get_object(pk)
        serializer = StudentSerializers(Students)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        Students = self.get_object(pk)
        serializer = StudentSerializers(Students,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return HttpResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        Students=self.get_object(pk)
        Students.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionList(APIView):

    def get(self,request):

        questions = Online_exam.Question.objects.all()

        Serializer1 = QuestionSerializers(questions,many=True)

        return Response(Serializer1.data)


def Student(request):
    request.POST.get('username', '')
    return render(request,'base.html')


def Index(request):
    #template = loader.get_template("index.html")
    #return HttpResponse(template.render())
    return render(request,'index.html')

#to send mail response
def mail(request):
    sender = settings.EMAIL_HOST_USER
    subject = "Greetings"
    message = "Congratulations for your success"
    to      = "janardhanajohn98@gmail.com"
    res     = send_mail(subject, message, sender, [to],fail_silently=True)
    if(res == 0):
        msg = "Mail Sent Successfuly"
    else:
        msg = "Mail could not sent"
    return HttpResponse(msg)

#creating registration form


def registration(request):
    if request.method == 'POST':
        first_name=request.POST("first name")
        last_name = request.POST("last name")
        email = request.POST("email")
        password1 = request.POST("password")
        password2 = request.POST("confirm password")


        if password1==password2:

            user= User.objects.create_user(first_name=first_name,last_name=last_name,email=email,password=password1)
            user.save();
            print("registration  successful")


        else:
            print("password not matched")
            return redirect('/')

    else:
        print("registration unsuccessful")
        return render(request,'Registration.html')


