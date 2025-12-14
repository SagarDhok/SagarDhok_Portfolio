from django.shortcuts import render

# Create your views here.

def home(request):
    projects = [
        {
            "title": "Smart ATS",
            "desc": "Enterprise Applicant Tracking System built with Django & DRF",
            "tech": "Django, DRF, MySQL",
            "link": "https://github.com/yourname/smart-ats"
        },
        {
            "title": "Portfolio Website",
            "desc": "Minimal Django-based portfolio without database",
            "tech": "Django, HTML, CSS",
            "link": "#"
        }
    ]
    return render(request, "index.html", {"projects": projects})
