from django.conf.urls import url,include
from django.contrib import admin
from . import views

app_name = 'sockets'
urlpatterns =[

    url(r'^$',views.main,name='home' ),
    url(r'^tcp$',views.tcp),
    url(r'^udp$',views.udp),
    url(r'^ftp$',views.ftp),


]
