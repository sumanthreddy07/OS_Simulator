from django.urls import path
from . import views

app_name = 'deadlock'
urlpatterns = [

    path('', views.home, name='home'),
    path('rag/', views.rag, name='rag'),
    path('bankers/', views.bankers, name='bankers'),

]


