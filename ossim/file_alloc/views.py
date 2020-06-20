from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.



class home(TemplateView):
	template_name = "home.html"
class contiguous(TemplateView):
	template_name = "index1.html"
class linked(TemplateView):
	template_name = "linked1.html"
class indexed(TemplateView):
	template_name = "indexed1.html"


