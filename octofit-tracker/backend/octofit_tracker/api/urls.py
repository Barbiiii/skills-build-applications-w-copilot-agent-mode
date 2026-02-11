from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
)

router = DefaultRouter()
router.register('teams', TeamViewSet)
router.register('users', UserProfileViewSet)
router.register('activities', ActivityViewSet)
router.register('leaderboard', LeaderboardEntryViewSet)
router.register('workouts', WorkoutViewSet)

urlpatterns = router.urls

