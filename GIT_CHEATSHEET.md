# Git Commands Quick Reference

## Basic Commands

### Clone & Setup
```bash
git clone <repo-url>                    # Clone repository
git config user.name "Name"             # Set name
git config user.email "email"           # Set email
git init                                # Initialize new repo
```

### Check Status
```bash
git status                              # Show current status
git status -s                           # Short format
git log --oneline -10                   # Last 10 commits
git log --graph --oneline --all         # Visual branch graph
```

---

## Branching

### Create & Switch
```bash
git branch <branch-name>                # Create branch
git checkout <branch-name>              # Switch branch
git checkout -b <branch-name>           # Create and switch
git switch <branch-name>                # Switch (newer syntax)
git switch -c <branch-name>             # Create and switch (newer)
```

### List Branches
```bash
git branch                              # Local branches
git branch -a                           # All branches
git branch -v                           # With last commit
git branch -d <branch>                  # Delete branch
git branch -D <branch>                  # Force delete
```

### Remote Branches
```bash
git fetch origin                        # Fetch all branches
git push origin <branch>                # Push branch
git push origin --all                   # Push all branches
git push origin --delete <branch>       # Delete remote branch
git pull origin <branch>                # Fetch and merge
```

---

## Making Changes

### Stage & Commit
```bash
git add <file>                          # Stage file
git add .                               # Stage all changes
git add *.js                            # Stage pattern
git commit -m "message"                 # Commit with message
git commit --amend                      # Modify last commit
git commit -am "message"                # Add & commit tracked files
```

### View Changes
```bash
git diff                                # Unstaged changes
git diff --staged                       # Staged changes
git diff <branch1> <branch2>            # Compare branches
git diff HEAD~1 HEAD                    # Compare commits
git show <commit>                       # Show commit details
git log -p <file>                       # File history with diffs
```

---

## Merging

### Merge Operations
```bash
git merge <branch>                      # Merge branch
git merge --no-ff <branch>              # Force merge commit
git merge --squash <branch>             # Squash before merge
git merge --abort                       # Cancel merge
git merge <branch> --strategy=ours      # Keep local version
git merge <branch> --strategy=theirs    # Keep incoming version
```

### Rebase (Be careful!)
```bash
git rebase <branch>                     # Rebase on branch
git rebase -i HEAD~3                    # Interactive rebase
git rebase --continue                   # Continue after resolving
git rebase --abort                      # Cancel rebase
```

---

## Conflict Resolution

### During Merge
```bash
git status                              # See conflicted files
git diff                                # View conflicts
git diff --cached                       # View staged changes
git add <file>                          # Mark as resolved
git commit -m "message"                 # Complete merge
```

### Conflict Markers
```
<<<<<<< HEAD
  Your changes
=======
  Their changes
>>>>>>> branch-name
```

---

## Undo & Revert

### Revert (Safe - Creates new commit)
```bash
git revert <commit>                     # Create undo commit
git revert <commit> -m 1                # Revert merge commit
git revert HEAD~1                       # Revert last commit
```

### Reset (Destructive - Rewrites history)
```bash
git reset --soft HEAD~1                 # Undo commit, keep changes staged
git reset --mixed HEAD~1                # Undo commit, keep changes unstaged
git reset --hard HEAD~1                 # Undo commit, discard changes
git reset --hard origin/main            # Reset to upstream
```

### Restore (Selective undo)
```bash
git restore <file>                      # Discard changes in file
git restore --staged <file>             # Unstage file
git restore --source=<commit> <file>    # Restore from commit
```

### Cherry-Pick (Apply specific commit)
```bash
git cherry-pick <commit>                # Apply commit to current branch
git cherry-pick <commit1> <commit2>     # Apply multiple commits
git cherry-pick --continue              # Continue after resolving conflicts
git cherry-pick --abort                 # Cancel cherry-pick
```

---

## History & Search

### View Commits
```bash
git log                                 # Full log
git log --oneline                       # Short format
git log --graph --all --oneline         # Branch visualization
git log --author="Name"                 # By author
git log --since="2024-01-01"            # Since date
git log -n 5                            # Last 5 commits
git log -p                              # With diffs
git log --stat                          # With statistics
```

### Search Commits
```bash
git log --grep="keyword"                # Search message
git log -S "code"                       # Search code changes
git log --all -- <file>                 # File history
git blame <file>                        # Line by line history
```

### Find Commits
```bash
git log --oneline | grep "keyword"      # Search history
git reflog                              # All reference changes
git fsck --lost-found                   # Find lost commits
```

---

## Remote Operations

### Push & Pull
```bash
git push origin <branch>                # Push to remote
git push origin --all                   # Push all branches
git push origin --tags                  # Push all tags
git pull origin <branch>                # Fetch and merge
git fetch origin                        # Fetch only
git fetch origin <branch>               # Fetch specific branch
```

### Upstream Tracking
```bash
git push -u origin <branch>             # Push and set upstream
git branch -u origin/main               # Set tracking branch
git branch --unset-upstream             # Remove tracking
```

### Sync with Remote
```bash
git fetch origin                        # Get latest
git rebase origin/main                  # Rebase on latest
git pull origin main --rebase           # Pull with rebase
git reset --hard origin/main            # Discard local, use remote
```

---

## Tags

### Create Tags
```bash
git tag <tag-name>                      # Create lightweight tag
git tag -a <tag-name> -m "message"      # Create annotated tag
git tag -l                              # List tags
git tag -d <tag-name>                   # Delete tag
```

### Push Tags
```bash
git push origin <tag-name>              # Push specific tag
git push origin --tags                  # Push all tags
git push origin --delete <tag-name>     # Delete remote tag
```

---

## Stashing

### Save Work Temporarily
```bash
git stash                               # Save current changes
git stash save "message"                # Save with message
git stash list                          # List saved stashes
git stash pop                           # Apply and remove latest
git stash apply                         # Apply but keep latest
git stash apply stash@{0}               # Apply specific stash
git stash drop                          # Delete latest stash
git stash clear                         # Delete all stashes
```

---

## Configuration

### Set Config
```bash
git config user.name "Name"             # Local config
git config --global user.name "Name"    # Global config
git config --list                       # Show all config
git config --show-origin <key>          # Show config location
```

### Useful Aliases
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.graph "log --graph --oneline --all"
git config --global alias.undo "reset --soft HEAD~1"
```

---

## Cleaning

### Remove Files
```bash
git clean -fd                           # Remove untracked files
git clean -fdx                          # Include ignored files
git rm <file>                           # Remove and stage
git rm --cached <file>                  # Unstage and keep local copy
```

### Archive
```bash
git archive --format zip HEAD > repo.zip    # Export as zip
git archive --format tar HEAD | gzip > repo.tar.gz
```

---

## Branch Management

### Compare Branches
```bash
git diff main develop                   # Compare branches
git log main..develop                   # Commits in develop not in main
git log develop..main                   # Commits in main not in develop
git log --oneline --graph main develop  # Visual comparison
```

### Rename Branch
```bash
git branch -m <old-name> <new-name>     # Rename local
git push origin -u <new-name>           # Push new name
git push origin --delete <old-name>     # Delete old remote
```

### Protect Branch
```bash
# Usually done on GitHub/GitLab, not Git CLI
# Prevents accidental pushes to main
git config --local receive.denyPushes true
```

---

## Emergency Commands

### Recover Deleted Branch
```bash
git reflog                              # Find lost commit
git checkout -b <recovered> <commit>    # Recreate from reflog
```

### Recover Deleted File
```bash
git log -p -- <file>                    # Find deletion
git restore --source=<commit> <file>    # Restore
```

### Undo Last Push
```bash
git reset --hard HEAD~1                 # Reset locally
git push origin <branch> --force-with-lease    # Force push
# ⚠️ WARNING: Only if not shared yet!
```

### Fix Detached HEAD
```bash
git reflog                              # Find your commits
git checkout -b <new-branch> <commit>   # Create branch
```

---

## Common Workflows

### Feature Branch Workflow
```bash
git checkout -b feature/description     # Create feature
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin feature/description
# ... create PR ...
git checkout main
git pull origin main
git merge feature/description --no-ff
git push origin main
```

### Fix a Bug
```bash
git checkout -b hotfix/bug-name         # Create hotfix
# ... fix bug ...
git commit -am "fix: description"
git push origin hotfix/bug-name
# ... create PR ...
git checkout main
git merge hotfix/bug-name --no-ff
git push origin main
```

### Update Feature from Main
```bash
git checkout main
git pull origin main
git checkout feature/description
git merge main --no-ff
# ... resolve conflicts if any ...
git push origin feature/description
```

### Sync Fork with Upstream
```bash
git remote add upstream <upstream-url>
git fetch upstream
git rebase upstream/main
git push origin main
```

---

## Debug Tips

### Find Breaking Change
```bash
git bisect start
git bisect bad HEAD
git bisect good <old-commit>
# Git will checkout commits to test
# Use: git bisect bad (if broken) or git bisect good (if works)
git bisect reset  # Back to original
```

### View Changes by Author
```bash
git log --author="Name" --oneline
git log --since="1 week ago" --author="Name"
```

### Find Code History
```bash
git log -p -S "function_name"           # Code appears/disappears
git log -p -- src/components/File.jsx   # File history with diffs
git blame src/components/File.jsx       # Line-by-line history
```

---

## Performance

### Large Repositories
```bash
git sparse-checkout init --cone         # Clone only needed files
git clone --depth 1 <url>               # Shallow clone
git clone --branch main --depth 1 <url>
git gc                                  # Garbage collection
git fsck --full                         # Check integrity
```

---

## Common Problems & Solutions

| Problem | Command |
|---------|---------|
| Undo last commit | `git reset --soft HEAD~1` |
| Undo last push | `git revert <commit>` |
| Switch branch | `git checkout <branch>` |
| Discard changes | `git restore <file>` |
| Stage all | `git add .` |
| Unstage file | `git restore --staged <file>` |
| Merge branches | `git merge <branch>` |
| Save work | `git stash` |
| View history | `git log --oneline` |
| Compare branches | `git diff main develop` |
| Find commit | `git log --grep="text"` |
| Delete branch | `git branch -d <branch>` |
| Rename branch | `git branch -m <old> <new>` |
| See who changed | `git blame <file>` |
| Recover deleted file | `git restore --source=HEAD~1 <file>` |

---

## Quick Reference by Task

### "I need to..."

**...save my changes temporarily**
```bash
git stash
```

**...review what I changed**
```bash
git diff
git status
```

**...undo my last commit**
```bash
git reset --soft HEAD~1
```

**...fix my last commit**
```bash
git commit --amend
```

**...see who made this change**
```bash
git blame <file>
```

**...recover deleted code**
```bash
git reflog
git show <commit>
```

**...compare my branch with main**
```bash
git diff main...HEAD
```

**...update my branch with latest main**
```bash
git merge main
```

**...create a backup branch**
```bash
git branch backup-<date>
```

**...clean up old branches**
```bash
git branch | grep -v main | xargs git branch -d
```

---

## Remember

✓ **BEFORE YOU PUSH**: Use `git diff` to review changes  
✓ **FREQUENTLY PULL**: Keep your branch updated  
✓ **CLEAR MESSAGES**: Write descriptive commit messages  
✓ **SMALL COMMITS**: Make focused, logical commits  
✓ **TEST FIRST**: Verify code works before pushing  
✗ **AVOID FORCE PUSH**: Use `--force-with-lease` if you must  
✗ **DON'T REBASE SHARED**: Don't rebase commits already pushed  
✗ **NEVER DELETE HISTORY**: Unless absolutely necessary  

---

Last Updated: 2024
For detailed explanations, see GIT_SCENARIOS.md and GIT_SETUP.md
