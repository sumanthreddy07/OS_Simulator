from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request,'sockets/home.html')

def tcp(request):
    return render(request,'sockets/tcp.html')

def udp(request):
    return render(request,'sockets/udp.html')

def ftp(request):
    return render(request,'sockets/ftp.html')
