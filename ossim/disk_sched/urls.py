from django.conf.urls import url,include
from django.contrib import admin
from . import views

app_name='disk'
urlpatterns =[

    url(r'^$',views.main,name='home' ),



]
