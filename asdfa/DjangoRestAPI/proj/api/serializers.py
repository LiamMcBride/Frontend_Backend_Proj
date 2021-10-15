from rest_framework import serializers
from proj.models import Proj, Country, State

class ProjSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proj
        fields = ["task", "completed", "timestamp", "updated", "user"]

class CountrySerializer(serializers.ModelSerializer):
    foo = serializers.SerializerMethodField("get_foo")

    def get_foo(self, country):
        return f'country: {country.id}'

    class Meta:
        model = Country
        fields = ["id", "code", "name", "foo"]

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ["id", "code", "name", "countryId"]