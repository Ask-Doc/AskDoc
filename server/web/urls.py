from django.urls import path
from .views import Chat, ChatModelView, Download


urlpatterns = [
    path('diagnosis/', Chat.as_view(), name="diagnose-patient"),
    path('diagnosis/chats', ChatModelView.as_view(), name="save_chats"),
    path('diagnosis/history', Download.as_view(), name="download_chats")
]