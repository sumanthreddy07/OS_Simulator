from django.conf.urls import url,include
from django.contrib import admin
from django.urls import path

from . import views

app_name = 'home'
urlpatterns =[

    url(r'^$',views.main ),
    path('desktop/',views.Desktop ,name='desktop'),

    path('desktop/Task.html/', views.Task,name='task'),
    path('desktop/terminal/',views.Terminal,name = 'terminal')


]