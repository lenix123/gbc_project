from django.urls import path

from .views import UserComponentList

urlpatterns = [
    path('', UserComponentList.as_view(), name='UserComponents')
]
