# ase2-quiz
Branch Structure


## We can use 3 types of branches:

Branch Type	Naming Example	Purpose
main	main	Stable production-ready code
release/*	release/1.0	Upcoming release version
feature/*	feature/quiz	Work on a specific feature

### 1. Start from the latest release branch
Example: start working on release 1.0
git checkout main
git pull
git checkout -b release/1.0
git push origin release/1.0
Do this only once per new release.
Now you can start new feature branches from it.

### 2. Create your feature branch
Each feature must have its own branch, based on a release branch.

git checkout release/1.0
git pull
git checkout -b feature/quiz
git push origin feature/quiz

### 3. Commit changes
Make small and clear commits. Use messages like:

git add .
git commit -m "Add quiz component"
git push

### 4. Open a Pull Request (PR) -- ? maybe we don't need this
Go to GitHub → Compare feature/quiz → release/1.0
Ask a teammate to review

Merge only when it’s approved and tested

### 5. When all features are ready
Merge release/1.0 → main, then create a GitHub release:

Tag: v1.0.0
Title: Release 1.0

Description: list of features added

### 6. Start the next release
After release/1.0 is done, create a new branch:

git checkout main
git pull
git checkout -b release/2.0
git push origin release/2.0
