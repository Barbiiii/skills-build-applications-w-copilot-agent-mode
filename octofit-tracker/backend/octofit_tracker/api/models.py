from djongo import models


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    weight_kg = models.FloatField(null=True, blank=True)
    height_cm = models.FloatField(null=True, blank=True)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL, related_name='members')

    def __str__(self):
        return f"{self.name} ({self.email})"


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField(null=True, blank=True)
    performed_at = models.DateTimeField()

    def __str__(self):
        return f"{self.activity_type} - {self.user.name}"


class LeaderboardEntry(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='leaderboard_entries')
    points = models.PositiveIntegerField()
    rank = models.PositiveIntegerField()
    week_start = models.DateField()

    def __str__(self):
        return f"{self.user.name} - {self.points}"


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField()
    difficulty = models.CharField(max_length=50)
    created_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.SET_NULL, related_name='workouts')

    def __str__(self):
        return self.name

