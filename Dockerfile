# Start with Python and Node
FROM nikolaik/python-nodejs:latest as dev

# Install Nginx and Certbot
RUN apt-get update && apt-get install -y nginx python-certbot-nginx

# Copy over and install the project's Python dependencies
WORKDIR /code/backend
COPY ./backend/requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt

# Copy files over
WORKDIR /code
COPY . /code/

# Set up the dev environment. For production, Nginx will listen on port 80.
ENV DJANGO_SETTINGS_MODULE=myapp.settings
EXPOSE 8000
EXPOSE 5678

# Call collectstatic with DJANGO_ENV set to development so that we don't try to copy files
# from the non-existent react-frontend/build/static directory.
# I've included all of the environment variables necessary to run collectstatic, but note
# that none of these variables hold the true production values.
WORKDIR /code/backend
RUN DJANGO_ENV=development DJANGO_SECRET_KEY=dsljkf93584klsdjfasdkjlfh33498348jfd POSTGRES_NAME=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=kjslfh87345h932hskdfjjhf8 python manage.py collectstatic --noinput



# If this script is called with <target> set to "dev", we've now finished building the <dev> image.
# If this script is called with <target> set to "prod", we will run the following additional
# build steps. These steps set up uWSGI and build and package the React frontend for production.
FROM dev as prod

# Copy over the project's node dependencies
WORKDIR /code/react-frontend
COPY ./react-frontend/package*.json ./
RUN npm install

# Build the frontend
RUN npm run sitemap && npm run build
RUN ./move-static-files.sh

# Now that we've built the frontend, let's collect the static
# files again (this time without setting DJANGO_ENV to "development")
WORKDIR /code/backend
RUN DJANGO_SECRET_KEY=dsljkf93584klsdjfasdkjlfh33498348jfd POSTGRES_NAME=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=kjslfh87345h932hskdfjjhf8 python manage.py collectstatic --noinput

# Create a group and user to run our app
RUN chown -R www-data:www-data /code/nginx \
    && chown -R www-data:www-data /code/backend/static

# Tell uWSGI where to find the wsgi file:
ENV UWSGI_WSGI_FILE=/code/backend/myapp/wsgi.py

# Base uWSGI configuration (see deployment-scripts/uwsgi-config.ini for the full configuration)
ENV UWSGI_MASTER=1
# ENV UWSGI_HTTP=:8000 UWSGI_MASTER=1 UWSGI_HTTP_AUTO_CHUNKED=1 UWSGI_HTTP_KEEPALIVE=1 UWSGI_LAZY_APPS=1 UWSGI_WSGI_ENV_BEHAVIOR=holy

# Number of uWSGI workers and threads per worker (I can customize these as needed):
ENV UWSGI_WORKERS=2 UWSGI_THREADS=4

# Configure Nginx
WORKDIR /etc/nginx/sites-enabled
RUN rm /etc/nginx/sites-enabled/default
COPY ./nginx/nginx-config-dev.conf ./myapp

WORKDIR /code

# Expose port 80
EXPOSE 80
