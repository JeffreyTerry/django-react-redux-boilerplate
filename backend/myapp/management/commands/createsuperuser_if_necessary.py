from api.models import User
from django.core.management.base import BaseCommand
from django.core.management.base import CommandError
import os


class Command(BaseCommand):
    # def add_arguments(self, parser):
    #     parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not username:
            raise CommandError('You must set the environment variable DJANGO_SUPERUSER_USERNAME before using this command.')
        if not password:
            raise CommandError('Please set the environment variable DJANGO_SUPERUSER_PASSWORD before using this command.')

        try:
            user = User.objects.get(username=username, is_superuser=True)
            self.stdout.write('Superuser already exists. Doing nothing.')
        except User.DoesNotExist:
            self.stdout.write('Superuser does not exist. Creating a new one...')
            User.objects.create_superuser(username, password=password, license_tier=User.LicenseTier.PRO)
            self.stdout.write('Finished creating the new superuser.')
