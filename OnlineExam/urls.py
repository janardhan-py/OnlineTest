from . import views
from django.urls import path



urlpatterns = [
    path('',views.Student,name='Student Portal'),
    path('Rules',views.Rules),
    path('index/',views.Index,name='index'),
    path('mail/',views.mail)
]