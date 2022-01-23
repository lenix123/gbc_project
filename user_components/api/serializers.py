from rest_framework import serializers
from user_components.models import UserComponent


class UserComponentsSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = UserComponent
        fields = ("pk", "user", "type", "prototype", "component_name", "params")
