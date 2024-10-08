#!/bin/sh
npm install
npm update
npm run build
git status
git add --all
echo "Please enter a commit message"
read message
git commit -m "'$message'"
git push origin main
npm publish