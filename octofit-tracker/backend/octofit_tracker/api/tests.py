from datetime import date, datetime

from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class ApiSmokeTests(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Marvel', description='Heroic team')
        self.user = UserProfile.objects.create(
            name='Carol Danvers',
            email='carol@example.com',
            age=30,
            weight_kg=68.5,
            height_cm=172,
            team=self.team,
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration_minutes=45,
            calories_burned=420,
            performed_at=datetime.utcnow(),
        )
        self.leaderboard_entry = LeaderboardEntry.objects.create(
            user=self.user,
            points=1200,
            rank=1,
            week_start=date.today(),
        )
        self.workout = Workout.objects.create(
            name='Hero Circuit',
            description='Strength and cardio mix',
            duration_minutes=60,
            difficulty='Intermediate',
            created_by=self.user,
        )

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('teams', response.data)
        self.assertIn('users', response.data)

    def test_list_endpoints(self):
        endpoints = [
            reverse('team-list'),
            reverse('userprofile-list'),
            reverse('activity-list'),
            reverse('leaderboardentry-list'),
            reverse('workout-list'),
        ]
        for endpoint in endpoints:
            response = self.client.get(endpoint)
            self.assertEqual(response.status_code, 200)

    def test_create_workout(self):
        response = self.client.post(
            reverse('workout-list'),
            {
                'name': 'Power Session',
                'description': 'Core focus',
                'duration_minutes': 30,
                'difficulty': 'Beginner',
                'created_by': str(self.user.id),
            },
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Workout.objects.count(), 2)

