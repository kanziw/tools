#!/bin/sh
# https://help.github.com/en/articles/creating-a-docker-container-action

gcloud auth activate-service-account --key-file=/tools-kanziw-dev-deploy-keys.json
gcloud app deploy --project=tools-kanziw-dev
