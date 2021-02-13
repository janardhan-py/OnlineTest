from . import views
from django.urls import path

urlpatterns = [
    path('',views.Student,name='Student Portal'),
    path('Rules',views.Rules),
    path('Home',views.Home)
]