from django.urls import path

from .views import UserComponentList, UserComponentDetail

urlpatterns = [
    path('', UserComponentList.as_view(), name='UserComponents'),
    path('<int:pk>/', UserComponentDetail.as_view(), name='UserComponent')
]
