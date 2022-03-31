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

    def validate_component_name(self, value):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if UserComponent.objects.filter(user=user, component_name=value).exists():
                raise serializers.ValidationError("Component name must be unique.")
        return value
