@echo off
cd /d K:\develper\angular-projects\Boardly-app

echo 🔧 Starte Angular Build...
ng build --configuration=production

echo 🟢 Build abgeschlossen. Git-Vorgang beginnt...

git remote set-url origin git@github.com:BekirLabjani/Boardly-app.git

git add .
git commit -m "Update 0.1"
git push origin main

echo ✅ Fertig!
pause
