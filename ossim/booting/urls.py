from django.conf.urls import url,include
from django.urls import path
from django.contrib import admin
from . import views

app_name = 'booting'
urlpatterns =[
    path('',views.boot.as_view(), name = 'boot'),
    path('powerdown/',views.powerdown.as_view(), name = 'powerdown'),

]
