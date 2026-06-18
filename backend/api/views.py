from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Task, QAResponse, Goal
from .serializers import TaskSerializer, QAResponseSerializer, GoalSerializer
from .utils.nlp_helpers import get_technical_answer

class TaskViewSet(viewsets.ModelViewSet):
    """ViewSet for Task CRUD operations"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get all pending tasks"""
        pending_tasks = Task.objects.filter(done=False)
        serializer = self.get_serializer(pending_tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def completed(self, request):
        """Get all completed tasks"""
        completed_tasks = Task.objects.filter(done=True)
        serializer = self.get_serializer(completed_tasks, many=True)
        return Response(serializer.data)

class QAResponseViewSet(viewsets.ModelViewSet):
    """ViewSet for Q&A operations with NLP integration"""
    queryset = QAResponse.objects.all()
    serializer_class = QAResponseSerializer
    
    @action(detail=False, methods=['post'])
    def ask(self, request):
        """Ask a question and get a technical answer"""
        question = request.data.get('question', '').strip()
        if not question:
            return Response(
                {'error': 'Question cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get answer from NLP helper
        answer = get_technical_answer(question)
        
        # Save to history
        qa_entry = QAResponse.objects.create(
            question=question,
            answer=answer,
            category='general'
        )
        
        serializer = self.get_serializer(qa_entry)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search Q&A history"""
        query = request.query_params.get('q', '')
        if query:
            results = QAResponse.objects.filter(
                Q(question__icontains=query) | Q(answer__icontains=query)
            )
            serializer = self.get_serializer(results, many=True)
            return Response(serializer.data)
        return Response([])

class GoalViewSet(viewsets.ModelViewSet):
    """ViewSet for Goal CRUD operations"""
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active (non-completed) goals"""
        active_goals = Goal.objects.filter(completed=False)
        serializer = self.get_serializer(active_goals, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        """Update goal progress percentage"""
        goal = self.get_object()
        progress = request.data.get('progress')
        
        if progress is None:
            return Response(
                {'error': 'Progress value is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            progress = int(progress)
            if 0 <= progress <= 100:
                goal.progress = progress
                if progress == 100:
                    goal.completed = True
                goal.save()
                serializer = self.get_serializer(goal)
                return Response(serializer.data)
            else:
                return Response(
                    {'error': 'Progress must be between 0 and 100'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response(
                {'error': 'Invalid progress value'}, 
                status=status.HTTP_400_BAD_REQUEST
            )