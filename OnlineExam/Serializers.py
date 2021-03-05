from rest_framework import serializers
from .models import Student,Question


# TO connect Json
class StudentSerializers(serializers.ModelSerializer):

    class Meta:
        model = Student

        # to print all
        fields = '__all__'
        # To print particular one
        # fields = ['student_name','Student_Reg_No']


class QuestionSerializers(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'
