@echo off
title MindBodyRitual - Dev Server
cd /d "%~dp0"
echo.
echo  Checking dependencies...
npm install
echo.
echo  Starting MindBodyRitual dev server...
echo  Open your browser at: http://localhost:3000
echo  Press Ctrl+C to stop the server.
echo.
npm run dev
pause
