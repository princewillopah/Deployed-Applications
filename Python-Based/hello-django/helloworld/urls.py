# """
# URL configuration for helloworld project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from core.models import Message


def hello_world(request):
    messages = Message.objects.all()
    content = "<h1>Hello from Django!</h1><ul>"
    for msg in messages:
        content += f"<li>{msg.content} (added on {msg.created_at})</li>"
    content += "</ul>"
    return HttpResponse(content)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', hello_world),
]