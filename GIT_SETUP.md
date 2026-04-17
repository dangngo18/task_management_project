# Git Scenarios - Setup & Execution Guide

This guide helps you execute the Git workflow scenarios locally to learn branching, merging, and conflict resolution.

## Prerequisites

```bash
# Check Git is installed
git --version  # Should be 2.20+

# Configure Git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Navigate to project
cd task_management_project
```

## Quick Start: Execute All Scenarios

### Option 1: Automated Setup Script
```bash
# (Create a bash script to automate all scenarios)
# See SCENARIO_AUTOMATION.sh in this project
bash SCENARIO_AUTOMATION.sh
```

### Option 2: Manual Execution (Recommended for Learning)
Follow the step-by-step guide below

---

## SCENARIO 1: Commit Behind - Manual Steps

### Step 1: Initialize Scenario
```bash
# Ensure you're on main
git checkout main
git pull origin main

# Create develop branch if it doesn't exist
git branch develop origin/develop || git checkout -b develop

# Verify current state
git log --oneline -3
```

### Step 2: Dev A - Create Filter Feature
```bash
# Create feature branch
git checkout -b feature/TASK-001-add-filter

# Make changes to constants
cat > src/constants/taskConstants.js << 'EOF'
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'dueDate', label: 'By Due Date' }
];
// ... rest of file ...
EOF

# Commit
git add src/constants/taskConstants.js
git commit -m "feat(TASK-001): Add filter options to constants"

# Push (simulate remote)
git push origin feature/TASK-001-add-filter || true
```

### Step 3: Dev A - Merge to Develop
```bash
# Checkout develop
git checkout develop

# Merge feature (no-ff creates merge commit)
git merge feature/TASK-001-add-filter --no-ff -m "Merge feature/TASK-001-add-filter"

# Push develop
git push origin develop || true

# View log to confirm
git log --oneline -5
```

### Step 4: Dev B - Create Without Pulling Latest
```bash
# Create from older version of main (don't pull develop!)
git checkout -b feature/TASK-002-add-search

# Make conflicting changes
# Edit same file differently
cat > src/constants/taskConstants.js << 'EOF'
export const SEARCH_FILTERS = {
  FULL_TEXT: 'full_text',
  TITLE_ONLY: 'title_only'
};

export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'createdDate', label: 'By Created Date' }
];
// ... rest of file ...
EOF

git add src/constants/taskConstants.js
git commit -m "feat(TASK-002): Add search filters"
git push origin feature/TASK-002-add-search || true
```

### Step 5: Trigger Conflict
```bash
# Try to merge Dev B's branch into develop
git checkout develop

# This should cause conflict
git merge feature/TASK-002-add-search

# ❌ Expected: CONFLICT message
# Check status
git status

# View conflict markers
git diff src/constants/taskConstants.js
```

### Step 6: Resolve Conflict
```bash
# Manually fix the file
cat > src/constants/taskConstants.js << 'EOF'
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'dueDate', label: 'By Due Date' },
  { value: 'createdDate', label: 'By Created Date' }
];

export const SEARCH_FILTERS = {
  FULL_TEXT: 'full_text',
  TITLE_ONLY: 'title_only'
};
// ... rest of file ...
EOF

# Mark as resolved
git add src/constants/taskConstants.js

# Complete merge
git commit -m "merge: resolve conflicts between TASK-001 and TASK-002"

# Verify
git log --oneline -5
```

---

## SCENARIO 2: Deploy and Revert

### Create Feature
```bash
# Create feature branch
git checkout -b feature/TASK-003-add-comments
git push origin feature/TASK-003-add-comments || true

# Make a change and commit
echo "// Task comments feature" >> src/components/TaskCard.jsx
git add src/components/TaskCard.jsx
git commit -m "feat(TASK-003): Add comments to task cards"
git push origin feature/TASK-003-add-comments || true

# Merge to develop
git checkout develop
git merge feature/TASK-003-add-comments --no-ff -m "Merge feature/TASK-003-add-comments"
git push origin develop || true
```

### Simulate Deployment to UAT
```bash
# Create UAT branch if needed
git branch UAT origin/UAT || git checkout -b UAT

# Deploy: merge develop to UAT
git merge develop --no-ff -m "Deploy develop to UAT"
git push origin UAT || true

# View log
git log --oneline -5
```

### Revert the Feature (Customer Cancels)
```bash
# View recent merge commit
git log --oneline -5

# Find the merge commit (should be recent)
# Example: abc123f Merge feature/TASK-003-add-comments

# Revert it (replace abc123f with actual commit hash)
git revert abc123f -m 1 --no-edit

# Push
git push origin develop || true

# Verify revert
git log --oneline -5
```

### Update UAT
```bash
git checkout UAT
git pull origin develop
git push origin UAT || true
```

---

## SCENARIO 3: Restore Feature

### Method 1: Cherry-Pick
```bash
# View available commits
git log --oneline develop | grep "feat(TASK-003)"

# Create restore branch
git checkout -b feature/TASK-003-restore-comments

# Cherry-pick original commit (replace hash)
git cherry-pick <original-commit-hash>

# Push and merge
git push origin feature/TASK-003-restore-comments || true
git checkout develop
git merge feature/TASK-003-restore-comments --no-ff -m "Restore TASK-003"
```

### Method 2: Revert the Revert
```bash
# Find revert commit
git log --oneline develop | grep -i "Revert"

# Revert the revert (replace hash)
git revert <revert-commit-hash> --no-edit

# Push
git push origin develop || true
```

---

## SCENARIO 4: Chained Conflicts

### Create Another Feature
```bash
# Create feature
git checkout -b feature/TASK-004-add-labels
git push origin feature/TASK-004-add-labels || true

# Edit TaskCard.jsx (same file as TASK-003)
echo "// Task labels feature" >> src/components/TaskCard.jsx
git add src/components/TaskCard.jsx
git commit -m "feat(TASK-004): Add labels to tasks"
git push origin feature/TASK-004-add-labels || true
```

### Trigger Conflict
```bash
# Try to merge after TASK-003 (restored) is merged
git checkout develop
git merge feature/TASK-004-add-labels

# ❌ Conflict expected in TaskCard.jsx
```

### Resolve
```bash
# Fix the file
# Edit src/components/TaskCard.jsx to include both features

# Mark resolved
git add src/components/TaskCard.jsx
git commit -m "merge: resolve TASK-004 conflicts"
git push origin develop || true
```

---

## SCENARIO 5: Review Old Feature

### Set Up Scenario
```bash
# Create an incomplete feature branch
git checkout -b feature/TASK-005-api-integration
git push origin feature/TASK-005-api-integration || true

# Make some commits
echo "// API client setup" >> src/utils/api.js
git add src/utils/api.js
git commit -m "feat(TASK-005): Add API client

- Setup axios client
- Configure base URL
- Add interceptors"

git push origin feature/TASK-005-api-integration || true
```

### New Developer Reviews It
```bash
# New dev checks out the branch
git checkout feature/TASK-005-api-integration

# View commit history
git log --oneline feature/TASK-005-api-integration ^main

# View commits in detail
git log --oneline -5
git show <commit-hash>

# Compare with develop
git diff develop..feature/TASK-005-api-integration

# Continue development
git merge develop --no-ff

# Make new commits
echo "// API endpoints" >> src/services/taskService.js
git add src/services/taskService.js
git commit -m "feat(TASK-005): Add task API endpoints"

git push origin feature/TASK-005-api-integration || true
```

---

## SCENARIO 6: Undo Bad Implementation

### Create Bad Code
```bash
# Create feature with intentional bug
git checkout -b feature/TASK-006-bad-feature

# Add buggy code
cat > src/utils/badFile.js << 'EOF'
// This is buggy code
export const buggyFunction = () => {
  return undefined.length;  // ❌ Bug: Cannot read property 'length' of undefined
};
EOF

git add src/utils/badFile.js
git commit -m "feat(TASK-006): Add bad implementation"

# Push and merge (simulating team pushing bad code)
git push origin feature/TASK-006-bad-feature || true
git checkout develop
git merge feature/TASK-006-bad-feature --no-ff -m "Merge bad feature"
git push origin develop || true
```

### Undo Using Revert (Recommended)
```bash
# View bad commit
git log --oneline -5

# Revert it (replace hash)
git revert <bad-commit-hash> -m 1 --no-edit

# Push
git push origin develop || true

# View log (shows both bad and revert commits)
git log --oneline -5
```

### Alternative: Restore Specific File
```bash
# If only specific file is bad, restore it
git restore --source=HEAD~2 src/utils/badFile.js

# Or use checkout syntax
git checkout HEAD~2 -- src/utils/badFile.js

# Commit
git add src/utils/badFile.js
git commit -m "restore: fix badFile.js from previous version"

git push origin develop || true
```

---

## Inspection & Debugging Commands

### View Commits
```bash
# View last 10 commits
git log --oneline -10

# View commits with graph
git log --graph --oneline --all -10

# View commits by author
git log --oneline --author="Dev A"

# View commits with file changes
git log --oneline --name-status -5
```

### View Changes
```bash
# View unstaged changes
git diff

# View staged changes
git diff --cached

# View changes in specific file
git diff src/components/TaskCard.jsx

# Compare branches
git diff main..develop

# View summary of differences
git diff --stat main..develop
```

### View Status
```bash
# Current status
git status

# Short status
git status -s

# View untracked files
git status --ignored
```

### View Branches
```bash
# Local branches
git branch

# All branches
git branch -a

# Branches with last commit
git branch -v

# Find branches containing commit
git branch --contains <commit-hash>
```

---

## Clean Up & Reset

### Remove Test Branches
```bash
# List branches to delete
git branch -a

# Delete local branches
git branch -d feature/TASK-001-add-filter

# Delete remote branches (if using actual remote)
git push origin --delete feature/TASK-001-add-filter

# Delete all local branches except main and develop
git branch | grep -v "main\|develop" | xargs git branch -d
```

### Reset to Clean State
```bash
# Abort merge (if in middle of merge)
git merge --abort

# Reset to a specific commit
git reset --hard <commit-hash>

# Reset to upstream (discard all local changes)
git reset --hard origin/main

# Clean working directory
git clean -fd  # Remove untracked files and directories
```

---

## Tips & Tricks

### Useful Aliases
```bash
# Add these to ~/.gitconfig or use git config
git config --global alias.graph "log --graph --oneline --all"
git config --global alias.branches "branch -a -v"
git config --global alias.status "status -s"
git config --global alias.unstage "restore --staged"

# Usage
git graph
git branches
git status
```

### Understanding Conflicts
```bash
# When merging, if conflict occurs:
git status          # See conflicted files
git diff            # View conflict markers
git diff --cached   # View staged changes

# Merge tools (interactive conflict resolution)
git mergetool       # Opens configured merge tool

# Abort merge if confused
git merge --abort
```

### Before Pushing
```bash
# Always review what you're pushing
git log -p origin/develop..develop  # View commits to push

# Check diff
git diff origin/develop..develop

# Dry run
git push --dry-run origin develop
```

---

## Troubleshooting

### "Everything up-to-date" but branch exists?
```bash
# Fetch latest
git fetch origin

# Check branch
git branch -a
```

### Detached HEAD state?
```bash
# View current state
git status

# Recover by creating branch
git branch recovery-<timestamp>

# Switch back to main
git checkout main
```

### Need to find old commit?
```bash
# Use reflog
git reflog

# Show all commits (even deleted)
git log --all --graph --oneline

# Search for commit message
git log --all --oneline | grep "keyword"
```

### Accidentally deleted a file?
```bash
# See when it was deleted
git log -p -- src/components/DeletedFile.jsx

# Restore it
git restore --source=<commit-hash> src/components/DeletedFile.jsx

# Or from specific branch
git restore --source=develop -- src/components/DeletedFile.jsx
```

---

## Next Steps

1. **Execute Scenarios**: Follow the step-by-step guides above
2. **Experiment**: Try different approaches to conflict resolution
3. **Review**: Use `git log` and `git show` to understand what happened
4. **Practice**: Create your own scenarios with teammates
5. **Document**: Keep notes on techniques that work for your team

---

## Additional Resources

- **Man pages**: `git help <command>`
- **Official docs**: https://git-scm.com/doc
- **Interactive tutorial**: https://learngitbranching.js.org
- **Visualization**: https://git-school.github.io/visualizing-git/
- **Cheat sheet**: https://education.github.com/git-cheat-sheet-education.pdf
