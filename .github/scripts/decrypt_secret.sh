#!/bin/sh
# https://help.github.com/en/articles/virtual-environments-for-github-actions#limits-for-secrets

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
  --output $HOME/secrets/$1 .github/scripts/$1.gpg
