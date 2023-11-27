from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .chat import get_response
from .models import Chats
from .serializers import ChatSerializer, ChatModelSerializer
from rest_framework.generics import GenericAPIView
from pathlib import Path
from django.http import FileResponse
import pandas as pd


class Chat(GenericAPIView):
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            result = get_response(problem=serializer.data['problem'], symptoms=serializer.data['symptoms'], medical_history=serializer.data['medical_history'])
            response = serializer.data
            response["response"] = str(result)
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ChatModelView(GenericAPIView):
    serializer_class = ChatModelSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            result = Chats.objects.create(**serializer.validated_data)
            result.save()
            response = serializer.validated_data
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Download(APIView):
    def get(self, request, id=None):
        convert = chats_to_csv(id)
        
        file_path = Path(__file__).resolve().parent.absolute() / f'chats/{str(id)}.csv'
        
        file_name = f'{str(id)}.csv'
        try:
            response = FileResponse(open(file_path, 'rb'), status=status.HTTP_200_OK)
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'
            return response
        except FileNotFoundError:
            content = {'RESULT': 'files cannot be found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        

def chats_to_csv(id):

    df = pd.DataFrame(Chats.objects.filter(id=id).values()).drop(columns=["id", "created_at"])
    df.to_excel(Path(__file__).resolve().parent.absolute() / f'chats/{str(id)}.csv', index=False)
