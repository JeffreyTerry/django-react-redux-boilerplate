#!/bin/bash
sudo scp -r -i ~/.ssh/KEY_PAIR_FILE_NAME.pem ./deployment-scripts/ ec2-user@ec2-52-27-49-179.us-west-2.compute.amazonaws.com:/home/ec2-user/