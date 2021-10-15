# drf_guide/urls.py : Main urls.py
from django.conf.urls import url
from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('projs/', include('proj.urls')),
]