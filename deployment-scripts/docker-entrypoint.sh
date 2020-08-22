#!/bin/bash

# Turn on bash's job control
set -m

# Start uwsgi and put it in the background
uwsgi --ini /code/deployment-scripts/uwsgi-config.ini --show-config &

# Restart nginx
service nginx restart

# Now bring uwsgi back into the foreground
fg %1
