from datetime import date, datetime, timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing Octofit data...')
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel', description='Earths mightiest heroes')
        team_dc = Team.objects.create(name='Team DC', description='Justice League heroes')

        self.stdout.write('Creating users...')
        users = [
            UserProfile.objects.create(
                name='Tony Stark',
                email='tony.stark@marvel.com',
                age=45,
                weight_kg=82.0,
                height_cm=185,
                team=team_marvel,
            ),
            UserProfile.objects.create(
                name='Natasha Romanoff',
                email='natasha.romanoff@marvel.com',
                age=35,
                weight_kg=60.0,
                height_cm=170,
                team=team_marvel,
            ),
            UserProfile.objects.create(
                name='Bruce Wayne',
                email='bruce.wayne@dc.com',
                age=40,
                weight_kg=91.0,
                height_cm=188,
                team=team_dc,
            ),
            UserProfile.objects.create(
                name='Diana Prince',
                email='diana.prince@dc.com',
                age=3000,
                weight_kg=75.0,
                height_cm=178,
                team=team_dc,
            ),
        ]

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout.objects.create(
                name='Arc Reactor HIIT',
                description='High intensity training with tech twists',
                duration_minutes=35,
                difficulty='Advanced',
                created_by=users[0],
            ),
            Workout.objects.create(
                name='Widow Agility',
                description='Agility and mobility drill set',
                duration_minutes=40,
                difficulty='Intermediate',
                created_by=users[1],
            ),
            Workout.objects.create(
                name='Gotham Strength',
                description='Strength session focused on endurance',
                duration_minutes=50,
                difficulty='Advanced',
                created_by=users[2],
            ),
            Workout.objects.create(
                name='Amazon Conditioning',
                description='Balanced conditioning workout',
                duration_minutes=45,
                difficulty='Intermediate',
                created_by=users[3],
            ),
        ]

        self.stdout.write('Creating activities...')
        for index, user in enumerate(users):
            Activity.objects.create(
                user=user,
                activity_type='Training',
                duration_minutes=30 + index * 10,
                calories_burned=300 + index * 50,
                performed_at=timezone.now() - timedelta(days=index),
            )

        self.stdout.write('Creating leaderboard entries...')
        for index, user in enumerate(users, start=1):
            LeaderboardEntry.objects.create(
                user=user,
                points=1000 - index * 50,
                rank=index,
                week_start=date.today(),
            )

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))

