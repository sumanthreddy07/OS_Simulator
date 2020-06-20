from django.conf.urls import url,include
from django.urls import path
from django.contrib import admin
from . import views

app_name = 'file_alloc'
urlpatterns =[
    path('',views.home.as_view(), name = 'home'),
    path('contiguous',views.contiguous.as_view(), name = 'contiguous' ),
    path('linked',views.linked.as_view() ,name = 'linked'),
    path('indexed',views.indexed.as_view(), name = 'indexed' ),

]
