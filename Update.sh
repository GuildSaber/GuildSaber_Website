#!/bin/sh
sh ./Kill.sh
npm install
npm run build
screen -dmS GuildSaber_Website bash -c "npx vite --host --port 5200"