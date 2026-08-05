@echo off
setlocal enabledelayedexpansion

rem -- deploy.bat - lint, test, build, preview locally, then commit + push --
rem Usage: double-click, or run `deploy.bat` from a terminal in the repo.
rem   1. npm install
rem   2. npm run lint    (aborts here if lint fails)
rem   3. npm test        (aborts here if a test fails)
rem   4. npm run build   (aborts here if the build fails)
rem   5. npm run preview, opened in its OWN window (not this one) - check
rem      the site in your browser, then close that window (or Ctrl+C in
rem      IT), and press any key back in this window to continue. Running
rem      it in a separate window avoids cmd.exe's "Terminate batch job?"
rem      prompt, which would otherwise kill this whole script on Ctrl+C
rem      before it ever reaches the commit step.
rem   6. Prompts before committing and pushing to origin/main.
rem This mirrors what CI (.github/workflows/ci.yml, deploy.yml) checks on
rem every push, so a red run here means the GitHub Actions run would fail too.
rem
rem IMPORTANT: this file must live in the ROOT of your actual local git
rem clone of VanshShah-Portfolio (the folder that already has a .git
rem subfolder from when you ran `git clone`) - not a folder with just a
rem couple of loose files copied into it.

cd /d "%~dp0"

if not exist ".git" (
    echo.
    echo ERROR: This folder is not a git repository ^(no .git found here^).
    echo.
    echo deploy.bat needs to be in the ROOT of your actual local clone of
    echo VanshShah-Portfolio - the folder you originally ran "git clone"
    echo into - not a folder with just a couple of files dropped in.
    echo.
    echo Move this file into that folder ^(overwriting the old deploy.bat^)
    echo and run it from there.
    echo.
    pause
    exit /b 1
)

echo.
echo ==============================================
echo   Vansh Shah Portfolio - build + deploy
echo ==============================================
echo.

echo [1/6] Installing dependencies...
call npm install
if errorlevel 1 (
    echo.
    echo npm install failed. Aborting.
    goto :end
)

echo.
echo [2/6] Linting...
call npm run lint
if errorlevel 1 (
    echo.
    echo Lint failed. Nothing was committed or pushed. Aborting.
    goto :end
)

echo.
echo [3/6] Running tests...
call npm test
if errorlevel 1 (
    echo.
    echo Tests failed. Nothing was committed or pushed. Aborting.
    goto :end
)

echo.
echo [4/6] Building...
call npm run build
if errorlevel 1 (
    echo.
    echo Build failed. Nothing was committed or pushed. Aborting.
    goto :end
)

echo.
echo [5/6] Opening local preview in a separate window...
echo        Check the site in your browser. When you're done, close THAT
echo        window (or press Ctrl+C in it), then come back here and press
echo        any key to continue.
echo.
start "Portfolio Preview" cmd /k npm run preview
pause

echo.
echo Stopping the preview server (if it's still running)...
taskkill /FI "WINDOWTITLE eq Portfolio Preview*" /T /F >nul 2>&1

echo.
echo [6/6] Build checked out?
set /p CONFIRM="Commit and push to origin/main now? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo Skipped commit/push. Your build output is still in dist\.
    goto :end
)

set /p MSG="Commit message (leave blank for a default message): "
if "%MSG%"=="" set MSG=Update portfolio content

git add -A
git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo Nothing to commit, or commit failed - check the output above.
    goto :end
)

git push origin main
if errorlevel 1 (
    echo.
    echo Push failed - check your network/credentials and push manually with:
    echo   git push origin main
    goto :end
)

echo.
echo Pushed to main. GitHub Actions will lint, test, build and deploy to
echo GitHub Pages automatically - check the Actions tab on GitHub for progress.

:end
echo.
pause
