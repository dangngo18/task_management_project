# Task Manager Application - Git Workflow Demo

A modern, responsive task management web application built with React, TypeScript, and Tailwind CSS. This project is specifically designed to demonstrate real-world Git workflows, merge conflicts, branch management, and collaborative development scenarios.

## Purpose

This repository serves as a **practical learning environment** for Git workflows. It includes:

- A realistic React application with multiple features
- Pre-configured branches demonstrating common scenarios
- Detailed documentation on merge conflicts and resolution
- Step-by-step guides for Git operations

## Project Overview

### Features

- **Task Management**: Create, read, update, and delete tasks
- **Multiple Views**: Kanban board and list view
- **Status Tracking**: Track tasks through TODO, IN_PROGRESS, and DONE states
- **Filtering & Search**: Filter tasks by status and search by title
- **Task Context Management**: Global state using React Context API
- **Responsive Design**: Works on desktop and mobile devices

### Tech Stack

- **Frontend**: React 19+, TypeScript
- **Styling**: Tailwind CSS 3/4
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: bun/npm

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/dangngo18/task_management_project.git
cd task_management_project

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx          # Individual task card component
│   ├── TaskList.jsx          # List view of tasks
│   ├── KanbanBoard.jsx       # Kanban board view
│   └── ViewSwitcher.jsx      # Toggle between views
├── context/
│   └── TaskContext.jsx       # React Context for state management
├── constants/
│   └── taskConstants.js      # Application constants
├── utils/
│   └── taskUtils.js          # Utility functions
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## Git Workflow Scenarios

This repository includes comprehensive documentation on various Git scenarios:

### Available Documentation

1. **GIT_SCENARIOS.md** - Detailed explanation of each scenario with:
   - Scenario setup and objectives
   - Expected outcomes
   - Resolution steps
   - Learning objectives

2. **GIT_SETUP.md** - Step-by-step guide to:
   - Set up branches locally
   - Create the scenario conditions
   - Reset to specific states
   - Verify branch configurations

3. **GIT_CHEATSHEET.md** - Quick reference for:
   - Common Git commands
   - Conflict resolution
   - Branch management
   - Rebase vs Merge strategies

## Scenario Summary

### Scenario 1: Commit Behind (main branch ahead)
**Branch**: `git-workflow-demo`  
**Goal**: Learn how to bring a feature branch up-to-date with main  
**Key Concepts**: `git rebase`, `git merge`, branch tracking

### Scenario 2: Merge Conflict (TaskContext)
**Branch**: `feature/update-task-context`  
**Goal**: Resolve conflicts in TaskContext.jsx  
**Key Concepts**: Conflict markers, manual resolution, testing after merge

### Scenario 3: Merge Conflict (Constants)
**Branch**: `feature/add-task-priorities`  
**Goal**: Resolve conflicts in taskConstants.js  
**Key Concepts**: Simple text conflicts, strategic merging

### Scenario 4: Complex Merge Conflict (Multiple Files)
**Branch**: `feature/task-filtering-enhancement`  
**Goal**: Resolve multiple file conflicts  
**Key Concepts**: Multi-file merges, dependency between changes

### Scenario 5: Rebase Workflow
**Branch**: `feature/add-deadlines`  
**Goal**: Practice interactive rebasing and conflict resolution  
**Key Concepts**: `git rebase -i`, commit history cleanliness

### Scenario 6: Cherry-pick Scenario
**Branch**: `feature/task-validation`  
**Goal**: Learn selective commit application  
**Key Concepts**: `git cherry-pick`, commit selection

### Scenario 7: Squash & Rebase
**Branch**: `feature/notification-system`  
**Goal**: Clean up commit history before merging  
**Key Concepts**: `git rebase -i`, `git merge --squash`

### Scenario 8: Merge vs Rebase Comparison
**Branches**: `feature/styling-updates` and `feature/styling-rebase`  
**Goal**: Compare merge and rebase strategies  
**Key Concepts**: Linear vs branching history, when to use each

## Running Scenarios

### Quick Start a Scenario

```bash
# Read the scenario details
cat GIT_SCENARIOS.md

# Switch to the scenario branch
git checkout feature/update-task-context

# Follow the step-by-step guide in GIT_SETUP.md
cat GIT_SETUP.md

# Practice the resolution
# Then check your work in the app
bun dev
```

### Reset a Scenario

If you want to try a scenario again:

```bash
# Abort current merge
git merge --abort

# Abort current rebase
git rebase --abort

# Reset to branch start
git reset --hard origin/branch-name

# Or checkout fresh copy
git checkout -f feature/branch-name
```

## File Changes by Scenario

### Scenario 1: Commit Behind
- **Modified**: App.tsx (version mismatch)
- **Key Files**: TaskContext.jsx, taskUtils.js

### Scenario 2: Merge Conflict (TaskContext)
- **Conflict in**: src/context/TaskContext.jsx
- **Issue**: Different implementations of task creation logic

### Scenario 3: Merge Conflict (Constants)
- **Conflict in**: src/constants/taskConstants.js
- **Issue**: Different constant definitions

### Scenario 4: Complex Merge Conflict
- **Conflicts in**: TaskContext.jsx, taskUtils.js, TaskCard.jsx, TaskList.jsx
- **Issue**: Related changes across multiple files

### Scenario 5: Rebase Workflow
- **Files**: src/components/KanbanBoard.jsx, taskUtils.js
- **Goal**: Practice clean history through rebasing

### Scenario 6: Cherry-pick Scenario
- **Files**: Various validation-related files
- **Goal**: Selective commit application

### Scenario 7: Squash & Rebase
- **Files**: Styling and UI component files
- **Goal**: Consolidate multiple commits

### Scenario 8: Merge vs Rebase
- **Branches**: Two parallel implementations
- **Goal**: Compare resulting histories

## Learning Outcomes

After working through these scenarios, you'll understand:

- How to identify when branches are out of sync
- How to resolve merge conflicts strategically
- Differences between merging and rebasing
- Best practices for clean commit history
- How to use interactive rebase
- Cherry-pick use cases
- When to squash commits
- Team collaboration workflows

## Tips for Effective Learning

1. **Read first**: Always read the scenario description before starting
2. **Understand the goal**: Know what you're trying to achieve
3. **Use the cheatsheet**: Refer to GIT_CHEATSHEET.md for commands
4. **Test the app**: Run `bun dev` to verify functionality after conflicts
5. **Experiment**: Try different approaches to see outcomes
6. **Reset and retry**: Use git reset to practice multiple times
7. **Compare histories**: Use `git log --oneline` to see the differences

## Troubleshooting

### Merge conflicts won't resolve
```bash
# Check status
git status

# View the conflict markers
cat src/context/TaskContext.jsx

# After editing, mark as resolved
git add src/context/TaskContext.jsx
```

### Rebase seems stuck
```bash
# Check rebase status
git rebase --status

# Continue after resolving conflicts
git rebase --continue

# Or abort and start over
git rebase --abort
```

### Lost commits
```bash
# Find lost commits in reflog
git reflog

# Recover a branch
git checkout -b recovered-branch <commit-hash>
```

## Development

### Building for Production

```bash
bun run build
# or
npm run build
```

### Running Tests

```bash
bun test
# or
npm test
```

## Contributing

This is a learning repository. Feel free to:
- Create your own feature branches
- Practice merging and rebasing
- Create new scenarios
- Improve documentation

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [GitHub Learning Lab](https://lab.github.com/)
- [Interactive Git Branching](https://learngitbranching.js.org/)

## License

MIT - This project is provided for educational purposes.

---

**Note**: This project intentionally includes scenarios designed for learning. The branches and conflicts are created to simulate real-world situations. Always work on a copy when learning to avoid confusion with production work.

For detailed scenario walkthroughs, see **GIT_SCENARIOS.md** and **GIT_SETUP.md**.
