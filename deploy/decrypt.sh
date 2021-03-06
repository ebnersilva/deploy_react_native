#!/bin/sh

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output android/app/buyzerapp.keystore deploy/buyzerapp.keystore.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output android/key_service_google.json deploy/key_service_google.json.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output android/gradle.properties deploy/gradle.properties.gpg