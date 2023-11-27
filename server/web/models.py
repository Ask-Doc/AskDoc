from django.db import models
from user_authentication.utils import generate_id, generate_token
from user_authentication.models import User



class Chats(models.Model):
    id = models.CharField(primary_key=True, max_length=128, unique=True, default=generate_id)
    user = models.ForeignKey(User, related_name="user_chats", on_delete=models.CASCADE)
    problem = models.CharField(max_length=500, blank=False, null=False)
    symptoms = models.CharField(max_length=500, blank=False, null=False)
    diagnosis = models.CharField(max_length=100000, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.problem[:15]+"..."