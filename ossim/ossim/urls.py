
from django.contrib import admin
from django.urls import path
from django.conf.urls import include,url
from . import views

app_name='ossim'
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^login/',include('home.urls')),
    url(r'^',include('booting.urls')),
    url(r'^sockets/',include('sockets.urls')),
    url(r'^synchro/',include('synchro.urls')),
    url(r'^file_allocation/',include('file_alloc.urls')),
    url(r'^deadlock/',include('deadlock.urls')),
    path('page/',include('page.urls')),
    url(r'^matdemo/', include('mat.urls')),
    #url(r'^mat/', views.matindex),
    path('disk/',include('disk_sched.urls'),name='disk'),
    path('process/',include('process.urls'))
]
