from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class BaseObjectIdSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        for key, value in data.items():
            if value is None or isinstance(value, (bool, int, float, str)):
                continue
            data[key] = str(value)
        if 'id' in data and data['id'] is not None:
            data['id'] = str(data['id'])
        return data


class TeamSerializer(BaseObjectIdSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class UserProfileSerializer(BaseObjectIdSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class ActivitySerializer(BaseObjectIdSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class LeaderboardEntrySerializer(BaseObjectIdSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = '__all__'


class WorkoutSerializer(BaseObjectIdSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

