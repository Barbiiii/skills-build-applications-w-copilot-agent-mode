from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardEntrySerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutSerializer,
)


@api_view(['GET'])
def api_root(request):
    return Response({
        'teams': reverse('team-list', request=request),
        'users': reverse('userprofile-list', request=request),
        'activities': reverse('activity-list', request=request),
        'leaderboard': reverse('leaderboardentry-list', request=request),
        'workouts': reverse('workout-list', request=request),
    })


class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class ActivityViewSet(ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardEntryViewSet(ModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer


class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
