from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request,'home/home.html')


def Login(request):
    return render(request,'home/Login.html')

def Desktop(request):
    return render(request,'home/Desktop.html')

def Task(request):
    return render(request,'home/Task.html')

def Terminal(request):
    return render(request,'home/terminal.html')