from django.contrib import admin
from .models import Task, QAResponse, Goal

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'done', 'priority', 'created_at')
    list_filter = ('done', 'priority')
    search_fields = ('title',)

@admin.register(QAResponse)
class QAResponseAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer', 'created_at')
    search_fields = ('question', 'answer')

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('title', 'progress', 'target_date')
    list_filter = ('target_date',)