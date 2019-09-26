#!/bin/sh
# https://help.github.com/en/articles/virtual-environments-for-github-actions#limits-for-secrets

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
  --output .github/actions/gcloud_sdk/$1 \
  .github/scripts/$1.gpg
