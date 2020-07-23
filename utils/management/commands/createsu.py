import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import environ


env = environ.Env()

PASSWORD_SU = env.str("PASSWORD_SU", default="passwordsoltz")
USER_SU = env.str("USER_SU", default="admin007")
EMAIL_SU = env.str("EMAIL_SU", default="")


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username=USER_SU).exists():
            User.objects.create_superuser(USER_SU, EMAIL_SU, PASSWORD_SU)
