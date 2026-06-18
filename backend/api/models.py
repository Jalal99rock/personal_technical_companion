from django.db import models
from django.utils import timezone

class Task(models.Model):
    """Task model for personal productivity"""
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('med', 'Medium'),
        ('high', 'High'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    done = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='med')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-priority', 'created_at']
    
    def __str__(self):
        return f"{self.title} ({'✓' if self.done else '○'})"

class QAResponse(models.Model):
    """Model for storing Q&A history"""
    question = models.TextField()
    answer = models.TextField()
    category = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Q: {self.question[:50]}..."

class Goal(models.Model):
    """Goal tracking model"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    progress = models.IntegerField(default=0, help_text="Progress percentage (0-100)")
    target_date = models.DateField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['target_date']
    
    def __str__(self):
        return f"{self.title} - {self.progress}%"