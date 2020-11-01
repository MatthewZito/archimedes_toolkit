#!/bin/bash

# archives all home dirs for users, supplied as uname args
echo "Executing script: $0"
for USER in $@
do
  echo "Archiving user: $USER"
  # lock account
  passwd -l $USER
  # archive home dir
  tar cf /archives/${USER}.tar.gz /home/${USER}
done
