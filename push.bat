@echo off
set /p msg=input commit content:
echo git add .
cmd /c "git add ."
echo git commit -m'%msg%'
cmd /c "git commit -m '%msg%'"
echo git push
cmd /c "git push"
exit