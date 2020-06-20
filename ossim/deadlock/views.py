from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request):
    return render(request, 'deadlock/index.html')


def rag(request):
    return render(request, 'deadlock/rag.html', { 'd': 7})


def bankers(request):
    return render(request, 'deadlock/bankers.html')