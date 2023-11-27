from rest_framework import serializers
from .models import Chats


class ChatSerializer(serializers.Serializer):
    problem = serializers.CharField(max_length=300)
    symptoms = serializers.CharField(max_length=300)
    medical_history = serializers.CharField(max_length=300)

class ChatModelSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()

    class Meta:
        model = Chats
        fields = ['id', 'user', 'problem', 'symptoms', 'diagnosis', 'created_at']