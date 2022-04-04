from django.contrib import admin
from django.contrib.auth.models import Group

# Register your models here.
from .models import UserComponent


class UserComponentAdmin(admin.ModelAdmin):
    list_display = ('component_name', 'user', 'prototype')
    list_filter = (
        ('user', admin.RelatedOnlyFieldListFilter),
        'type'
    )
    search_fields = ('component_name', 'prototype')
    readonly_fields = ('user', )
    save_as = True


admin.site.register(UserComponent, UserComponentAdmin)
admin.site.unregister(Group)
