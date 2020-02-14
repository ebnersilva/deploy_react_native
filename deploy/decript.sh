#!/bin/sh

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output ./deploy/buyzerapp.keystore ./deploy/buyzerapp.keystore.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output ./deploy/Service_Key_Account_Android.json ./deploy/Service_Key_Account_Android.json.gpg