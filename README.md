# Docker-Django-React-Redux-Bootstrap Boilerplate
A boilerplate full-stack web application that uses Docker, Django, React, Redux, and React-Bootstrap.
Additional built-in technologies include Django Rest Framework and Python Social Auth on the backend, and Axios, Formik, Lodash, Luxor, Tippy, and Uppy on the frontend.

<!-- TODO add Dockerhub webhook -->

-----------


## Development

### Installation
Simply install Docker.

### Running the Development Server
+ First, create a file named `myapp.env` inside of the project's root directory. Then, put the variables found in the `example_environment_variables.env` file in that file, adding the real values as necessary.
+ Then, from the project root, simply run `docker-compose up --build`. Once the docker image has finished building, you'll be able to access the website at `http://localhost:8000`. Docker will automatically rebuild the frontend and the whenever you make changes to the code (though you'll still have to refresh the page to get the updated version).
+ To bring the volumes offline once you're finished, you can run `docker-compose down` (though this step isn't strictly necessary).

### Troubleshooting
+ To ssh into the local Docker container during development, run `docker exec -it my_app_backend bash -l`. To ssh into the frontend development container, run `docker exec -it my_app_backend bash -l`.
+ To rebuild the development Docker image from scratch, run `docker system prune -a -f` then `docker-compose build --no-cache`. Note: I don't recommend running `docker system prune -a -f` often as it typically removes gigabytes of cached files (which can be pretty hard on your hard drive if done repeatedly).
+ To test the Nginx configuration file, run `docker exec -it my_app_backend nginx -t`.


-----------


## Deployment

*Note: If you're just interested in how the code is organized, skip to the "App Components" section below*

### Setting up the Production Server
1. Upload the deployment files by running `sudo scp -r -i ~/.ssh/KEY_PAIR_FILE_NAME.pem ./deployment-scripts/ ec2-user@ec2-52-27-49-179.us-west-2.compute.amazonaws.com:/home/ec2-user/` from the project root.
2. SSH into the EC2 instance via `sudo ssh -i ~/.ssh/KEY_PAIR_FILE_NAME.pem ec2-user@ec2-52-27-49-179.us-west-2.compute.amazonaws.com`.
3. Create a `myapp.env` file one directory above the new `deployment-scripts` directory and fill in the necessary variables.
4. Run `chmod a+x *.sh` to make the deployment scripts executable.
5. Run `./initializeserver.sh`. You should only have to do this once per instance.
6. To start the application, run `./start.sh`. To stop it, run `./stop.sh`.

+ Note: To renew the SSL certificate for all domains, run `certbot renew` from within the `my_app_backend` container. To renew the certificate for just one domain, run `certbot certonly -d example.com`.

### Deployment Pipeline
The deployment pipeline includes Github, Docker Hub, and Amazon EC2. To deploy the application:
1. Push the version you want to deploy to Github (on the `master` branch).
2. Once you've pushed the code to Github, Docker Hub will automatically build and test it.
3. Once all of the tests have passed, simply SSH into EC2, make sure you have the latest versions of all of the files in the `deployment-scripts` directory, then run `./start.sh` on the command line. `./start.sh` will automatically pull the latest image from Docker Hub and start the server. Run `./stop.sh` to stop the application.
+ Note: If the app is already running, you should run the shortcut command `./restart.sh` to shut it down and then start it back up.
+ Note: To set up a new EC2 instance, follow the instructions in the previous section.


-----------


## App Components
1. Django Server (found in the `backend` directory)
2. React App (found in the `react-frontend` directory)

During development, the Django Server is set up to proxy non-api requests to the React development server running on port 3000. To see how the server does this, look at the `myapp/urls.py` and `myapp/views.py` files.

During production, this project uses Nginx to serve the Django backend, which serves the pre-built and pre-packed React app statically using Whitenoise. To see how this is set up, look in the Dockerfile as well as in `myapp/settings.py`.


-----------


## 1. Django Server (`backend`)
The Django Server is a basic Django server written to do two things:
1. Serve the static React frontend.
2. Provide an API to support the frontend.

The file structure follows standard Django naming practices. The tests can be found in the individual app directories under `tests.py`. I may split these up and move them to their own folders in the same directories if they become big enough.


-----------


## 2. React App (`react-frontend`)
See the README inside of the `react-frontend` folder.
