from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team')
    search_fields = ('name', 'email')
    list_filter = ('team',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_type', 'user', 'duration_minutes', 'performed_at')
    list_filter = ('activity_type',)
    search_fields = ('activity_type', 'user__name')


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'rank', 'week_start')
    list_filter = ('week_start',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty', 'duration_minutes', 'created_by')
    list_filter = ('difficulty',)
    search_fields = ('name',)

