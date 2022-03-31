from django.db import models
from django.contrib.auth.models import User


class UserComponent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField("Type", max_length=50)
    prototype = models.CharField('Prototype', max_length=50)
    component_name = models.CharField('Component Name', max_length=50)
    params = models.JSONField('Parameters', default=dict, blank=True)

    def __str__(self):
        return self.component_name
