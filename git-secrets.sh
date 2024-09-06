#!/bin/bash

# Define your repository
REPO="generic-nodejs-express-api"

# List of secret names
SECRETS=$(gh secret list --repo $REPO | awk '{print $1}')

# Fetch and print secret values
for SECRET in $SECRETS; do
  VALUE=$(gh secret list --repo $REPO | grep $SECRET | awk '{print $2}')
  echo "$SECRET=$VALUE"
done