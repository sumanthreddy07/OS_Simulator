from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class boot(TemplateView):
	template_name = "boot.html"

class powerdown(TemplateView):
	template_name = "try.html"
