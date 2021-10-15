from django.conf.urls import url
from django.urls import path, include
from .views import (
    ProjListApiView,
    CountryListApiView,
    StateListApiView,
)

urlpatterns = [
    path('', ProjListApiView.as_view()),
    path('countries/', CountryListApiView.as_view()),
    path('states/', StateListApiView.as_view()),
    path('countries/<str:countryId>/states/', CountryListApiView.statesById),
]