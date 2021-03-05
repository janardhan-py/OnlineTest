from . import views
from django.urls import path

from .views import StudentDetails

urlpatterns = [
    path('',views.Student,name='Student Portal'),
    #path('students/<int:pk>',StudentDetails.as_view()),
    path('index/',views.Index,name='index'),
    path('mail/',views.mail),
    path('register/',views.registration,name='registration')
]