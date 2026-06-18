from rest_framework import serializers
from .models import Task, QAResponse, Goal

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model"""
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'done', 'priority', 'created_at', 'updated_at', 'due_date']
        read_only_fields = ['id', 'created_at', 'updated_at']

class QAResponseSerializer(serializers.ModelSerializer):
    """Serializer for QAResponse model"""
    class Meta:
        model = QAResponse
        fields = ['id', 'question', 'answer', 'category', 'created_at']
        read_only_fields = ['id', 'created_at']

class GoalSerializer(serializers.ModelSerializer):
    """Serializer for Goal model"""
    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'progress', 'target_date', 'completed', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']