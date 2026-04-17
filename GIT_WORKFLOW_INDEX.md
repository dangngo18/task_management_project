# Git Workflow Demo - Complete Project Index

## Overview
This is a comprehensive Git workflow practice project featuring a React task management application. The project is designed to teach Git concepts through realistic scenarios and hands-on practice with merge conflicts, rebasing, and collaborative workflows.

## Quick Start
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# View all available branches
git branch -a

# Start with Scenario 1
git checkout git-workflow-demo
```

## Project Structure

### Source Code (`src/`)
- **`App.tsx`** - Main application component with view switching
- **`components/`**
  - `TaskCard.jsx` - Individual task display component
  - `TaskList.jsx` - List view of all tasks
  - `KanbanBoard.jsx` - Kanban board view with drag-and-drop
  - `ViewSwitcher.jsx` - Toggle between list and Kanban views
- **`context/`**
  - `TaskContext.jsx` - React Context for task state management
- **`constants/`**
  - `taskConstants.js` - Task-related enums and configurations
- **`utils/`**
  - `taskUtils.js` - Utility functions for task operations
- **`styles/`**
  - `App.css` - Application styling

### Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| **README_GIT_WORKFLOW.md** | Project overview and setup | Getting started |
| **GIT_SCENARIOS.md** | Detailed scenario descriptions | Understanding what to practice |
| **GIT_SETUP.md** | Step-by-step scenario execution | Following along |
| **GIT_CHEATSHEET.md** | Git commands reference | Quick lookups |
| **GIT_WORKFLOW_INDEX.md** | This file - Navigation guide | Project overview |

## Available Git Scenarios

### Feature Branches Overview

```
git-workflow-demo (main branch)
├── feature/update-task-context       [Scenario 2: Merge Conflict]
├── feature/add-task-priorities       [Scenario 3: Constants Conflict]
├── feature/task-filtering-enhancement [Scenario 4: Complex Changes]
├── feature/add-deadlines             [Scenario 5: Multiple Files]
├── feature/task-validation           [Scenario 6: Validation Logic]
├── feature/notification-system       [Scenario 7: New Feature]
├── feature/styling-updates           [Scenario 8: Style Changes]
└── feature/styling-rebase            [Bonus: Rebase Practice]
```

### Scenario Details

**Scenario 1: Commit Behind** [START HERE]
- **Branch**: `git-workflow-demo`
- **Goal**: Understand fetching and rebasing when your branch is behind
- **Key Concepts**: `git fetch`, `git rebase`, commit history
- **Conflict Level**: None
- **Estimated Time**: 10-15 minutes

**Scenario 2: Merge Conflict in Context**
- **Branch**: `feature/update-task-context`
- **Goal**: Resolve merge conflicts in the TaskContext.jsx file
- **Key Concepts**: `git merge`, conflict markers, manual resolution
- **Conflict Level**: Medium (same function modified differently)
- **Estimated Time**: 15-20 minutes

**Scenario 3: Constants File Conflict**
- **Branch**: `feature/add-task-priorities`
- **Goal**: Handle conflicts when adding new constants
- **Key Concepts**: Merging, understanding both versions
- **Conflict Level**: Medium (different approaches to constants)
- **Estimated Time**: 15-20 minutes

**Scenarios 4-7: Multi-file Changes**
- **Branches**: Various feature branches with different scopes
- **Goal**: Practice merging features with multiple files changed
- **Key Concepts**: Tree conflicts, merge strategy selection
- **Conflict Level**: Low to Medium
- **Estimated Time**: 20-30 minutes each

**Bonus: Styling Rebase**
- **Branch**: `feature/styling-rebase`
- **Goal**: Practice interactive rebase and commit history cleanup
- **Key Concepts**: `git rebase -i`, squashing commits, force push
- **Conflict Level**: Advanced
- **Estimated Time**: 30+ minutes

## How to Use This Project

### For Learning Git Workflows

1. **Read the Documentation**
   - Start with `README_GIT_WORKFLOW.md` for context
   - Review `GIT_SCENARIOS.md` to understand what you'll practice
   - Keep `GIT_CHEATSHEET.md` open while working

2. **Follow the Scenarios**
   - Begin with Scenario 1 (Commit Behind) - simplest case
   - Progress through Scenario 2-3 (merge conflicts)
   - Advance to Scenarios 4-7 (complex workflows)
   - Finish with the bonus rebase scenario

3. **Run the Commands**
   - Use `GIT_SETUP.md` for detailed step-by-step instructions
   - Execute commands exactly as shown
   - Observe the output and understand what's happening
   - Practice resolving conflicts when they appear

4. **Repeat and Modify**
   - Run scenarios multiple times to build muscle memory
   - Modify the code in your own ways to create different conflicts
   - Try different merge strategies and approaches

### For Teaching Others

1. **Prepare the Environment**
   - Clone the repository
   - Run `bun install`
   - Ensure git is configured with user name and email

2. **Walk Through Scenarios**
   - Use the provided documentation
   - Live-code the Git commands
   - Show the result after each step
   - Explain what happened and why

3. **Interactive Practice**
   - Have students try scenarios themselves
   - Help them resolve conflicts
   - Discuss different approaches
   - Celebrate successful merges!

### For Practice Sessions

**15-Minute Quick Session**
- Scenario 1 (Commit Behind)
- Practice: `git fetch`, `git rebase origin/git-workflow-demo`

**30-Minute Standard Session**
- Scenarios 1-2
- Practice merge conflicts and resolution

**60-Minute Deep Dive**
- Scenarios 1-4
- Explore different merge strategies
- Practice conflict resolution techniques

**90-Minute Comprehensive**
- All scenarios 1-7
- Bonus rebase practice
- Discussion of team workflows

## React Application Features

The task management app itself demonstrates modern React patterns:

- **State Management**: React Context API with hooks
- **Component Composition**: Reusable components with clear separation of concerns
- **View Switching**: Toggle between list and Kanban board views
- **Task Operations**: Create, update, delete, and filter tasks
- **Responsive Design**: Works on mobile and desktop devices
- **Modern Styling**: Tailwind CSS with semantic class names

## Key Files for Each Scenario

| Scenario | Primary Files | Secondary Files |
|----------|--------------|-----------------|
| 1 | App.tsx | - |
| 2 | TaskContext.jsx | App.tsx |
| 3 | taskConstants.js | TaskCard.jsx, TaskList.jsx |
| 4-5 | Multiple files | All components |
| 6 | TaskContext.jsx, taskUtils.js | - |
| 7 | TaskList.jsx, ViewSwitcher.jsx | CSS files |
| Bonus | Any file | All files |

## Common Git Commands Used

```bash
# Fetching and Rebasing
git fetch origin
git rebase origin/git-workflow-demo
git rebase -i HEAD~3

# Merging
git merge feature/branch-name
git merge --no-ff feature/branch-name
git merge -s recursive feature/branch-name

# Conflict Resolution
git status
git diff
git add <file>
git commit

# History Management
git log --oneline --graph
git log --all --graph --decorate
git reset --hard HEAD~1
git cherry-pick <commit>

# Stashing
git stash
git stash pop
git stash list
```

## Tips for Success

1. **Read the Error Messages** - Git provides helpful information about conflicts
2. **Use --dry-run** - Test operations without committing: `git merge --no-commit --no-ff`
3. **Keep a Backup** - Before complex operations: `git branch backup-before-rebase`
4. **Understand the Graph** - Use `git log --graph` to visualize history
5. **Practice Repeatedly** - Each scenario can be repeated and modified
6. **Ask Questions** - Use Git's help: `git help merge`, `git help rebase`

## Troubleshooting

**"You have divergent branches"**
- This is intentional in the scenarios!
- Follow the scenario instructions to resolve it

**"Merge conflict in [file]"**
- Open the file and look for conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
- Edit to choose which changes to keep
- Use `git add` and `git commit` to complete the merge

**"Permission denied (publickey)"**
- Not needed for local practice
- All scenarios work locally

**"Detached HEAD state"**
- You checked out a commit instead of a branch
- Run `git checkout git-workflow-demo` to return to main branch

## Next Steps After Scenarios

Once you've completed all scenarios:

1. **Create Your Own Scenarios** - Modify files and create conflicts intentionally
2. **Explore Other Commands** - Try `git stash`, `git cherry-pick`, `git bisect`
3. **Team Workflow** - Clone the repo multiple times and practice pair programming
4. **Advanced Topics** - Explore GitHub workflows, CI/CD integration, code review processes

## Resources

- **Git Official Documentation**: https://git-scm.com/doc
- **Atlassian Git Tutorials**: https://www.atlassian.com/git/tutorials
- **GitHub Skills**: https://skills.github.com/
- **Interactive Git Learning**: https://learngitbranching.js.org/

## Project Information

- **Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Node Version**: 18+
- **Total Scenarios**: 8 main + 1 bonus

## Contributing to This Project

Want to add more scenarios or improve the documentation?

1. Create a new feature branch
2. Add your scenario to the appropriate files
3. Test it thoroughly
4. Create a pull request with detailed description

## Questions or Issues?

- Check `GIT_SCENARIOS.md` for detailed scenario descriptions
- Review `GIT_SETUP.md` for step-by-step guidance
- Consult `GIT_CHEATSHEET.md` for command reference
- Refer to Git's official help: `git help <command>`

---

**Last Updated**: April 17, 2024
**Project Version**: 2.0
**Git Workflow Scenarios**: 8 Main + 1 Bonus = 9 Total

Happy learning! 🚀
