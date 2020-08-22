from django.db import models
from django.contrib.auth.models import AbstractUser


# Override Django's default User model.
class User(AbstractUser):
    pass
