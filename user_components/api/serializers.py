from rest_framework import serializers
from user_components.models import UserComponent


class UserComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComponent
        fields = ("pk", "type", "prototype", "component_name", "params")


class CreateUserComponent(serializers.ModelSerializer):
    class Meta:
        model = UserComponent
        fields = ("type", "prototype", "component_name", "params")
