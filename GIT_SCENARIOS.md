# Git Workflow Demo - Comprehensive Scenarios

This document demonstrates real-world Git workflows, branching strategies, and conflict resolution in a team environment with a React Task Management application.

## Project Context
- **Project**: React Todo List Application  
- **Main Feature**: View Mode Switch (Kanban / List)
- **Team Size**: 3 Developers (Dev A, Dev B, Dev C)
- **Environments**: main (production), develop (integration), UAT (user acceptance testing)

## Branching Rules

### 1. Feature Branch Creation
When receiving a new task, create from `main`:
```
feature/<ticket-id>-<task-name>
```

### 2. Subtask Branches
Create sub-branches from the main feature branch:
```
feature/<ticket-id>-<subtask-name>
```

### 3. Workflow
```
Subtask → Pull Request → Main Feature Branch (protected, DRAFT)
    ↓
After approval → Lead merges into develop
    ↓
After testing → Merge into main
```

### 4. Conflict Handling
If conflict occurs:
```
conflict/<ticket-id>-<environment>
```

---

## SCENARIO 1: Commit Behind - Merge Conflicts Due to Outdated Code

**Situation**: Dev A merges first, Dev B doesn't pull latest code, Dev B creates PR → conflict happens

### Initial Setup
```bash
# Configure git user (if needed)
git config user.name "Dev A"
git config user.email "dev-a@company.com"

# Check current branch
git branch -a

# Ensure we're on main
git checkout main
git pull origin main
```

### Dev A's Work - Filter Feature
Dev A creates a feature for adding task filtering:

```bash
# Dev A: Create feature branch from main
git checkout -b feature/TASK-001-add-filter

# Dev A: Modify constants file to add new filter options
# Edit src/constants/taskConstants.js
```

**File: src/constants/taskConstants.js** (Dev A's changes)
```javascript
// Add new filter constants
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'dueDate', label: 'By Due Date' }  // <-- Dev A adds this
];
```

```bash
# Dev A: Modify TaskList component to use filters
# Edit src/components/TaskList.jsx to add filter UI
```

**File: src/components/TaskList.jsx** (Dev A's changes to line 50)
```jsx
      <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Filters</label>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
              Show Filters
            </button>
          </div>  {/* <-- Dev A adds this */}
        </div>
```

```bash
# Dev A: Commit changes
git add src/constants/taskConstants.js src/components/TaskList.jsx
git commit -m "feat(TASK-001): Add filter UI to TaskList component

- Added filter options constants
- Added advanced filters button
- Integrated filter UI with state management"

# Dev A: Push to remote
git push origin feature/TASK-001-add-filter
```

### Dev A: Create and Merge PR to develop
```bash
# Dev A: Create PR from feature/TASK-001-add-filter to develop
# (Simulated - in real workflow, this would be on GitHub/GitLab)

# Dev A: After PR approval, merge into develop
git checkout develop
git pull origin develop
git merge feature/TASK-001-add-filter --no-ff

# Dev A: Push merged develop
git push origin develop

# Output: Successfully merged feature/TASK-001-add-filter into develop
```

### Dev B's Work - Search Feature (WITHOUT pulling latest)
Dev B is working on search feature but hasn't pulled the latest changes:

```bash
# Dev B: Create feature branch (from outdated main)
# NOTE: Dev B did NOT pull latest code, so main is outdated
git checkout -b feature/TASK-002-add-search

# Dev B: Modify the SAME files as Dev A (conflict trigger!)
# Edit src/constants/taskConstants.js
```

**File: src/constants/taskConstants.js** (Dev B's changes)
```javascript
// Dev B adds a different export
export const SEARCH_FILTERS = {
  FULL_TEXT: 'full_text',
  TITLE_ONLY: 'title_only',
  DESCRIPTION_ONLY: 'description_only'
};

// Dev B also modifies the same FILTER_OPTIONS differently
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'createdDate', label: 'By Created Date' }  // <-- Dev B adds this instead
];
```

```bash
# Dev B: Also modifies TaskList.jsx similarly but differently
# Edit src/components/TaskList.jsx
```

**File: src/components/TaskList.jsx** (Dev B's different changes)
```jsx
      <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Tasks</label>
            <input 
              type="text"
              placeholder="Search by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
```

```bash
# Dev B: Commit changes
git add src/constants/taskConstants.js src/components/TaskList.jsx
git commit -m "feat(TASK-002): Add search functionality to TaskList

- Added search filters constants
- Added search input field
- Integrated search with filter system"

# Dev B: Push to remote
git push origin feature/TASK-002-add-search
```

### THE CONFLICT HAPPENS!
```bash
# Dev B: Try to create PR to develop WITHOUT pulling latest changes
# This simulates creating PR on GitHub without syncing local repo

# To simulate the conflict locally:
git checkout develop
git pull origin develop  # Now gets Dev A's merged changes

# Try to merge Dev B's branch
git merge feature/TASK-002-add-search

# ❌ CONFLICT! Auto-merge failed
```

### Conflict Output
```
Auto-merging src/components/TaskList.jsx
CONFLICT (content): Merge conflict in src/components/TaskList.jsx
Auto-merging src/constants/taskConstants.js
CONFLICT (content): Merge conflict in src/constants/taskConstants.js
Automatic merge failed; fix conflicts and then commit the result.
```

### View Conflicts
```bash
# Dev B: Check status
git status

# Output:
# On branch develop
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#     both modified:   src/components/TaskList.jsx
#     both modified:   src/constants/taskConstants.js
```

### View Actual Conflict Markers
```bash
# Dev B: Check the conflicted file
git diff src/constants/taskConstants.js

# Output shows:
<<<<<<< HEAD
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'createdDate', label: 'By Created Date' }  // Dev B's version
];
=======
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'dueDate', label: 'By Due Date' }  // Dev A's version
];
>>>>>>> feature/TASK-002-add-search
```

### RESOLUTION: Manually Merge Conflicts
```bash
# Dev B: OPTION 1 - Keep both changes
# Edit src/constants/taskConstants.js manually:
```

**Resolved src/constants/taskConstants.js**
```javascript
// Combined from both branches
export const FILTER_OPTIONS = [
  { value: 'status', label: 'By Status' },
  { value: 'priority', label: 'By Priority' },
  { value: 'assignee', label: 'By Assignee' },
  { value: 'dueDate', label: 'By Due Date' },
  { value: 'createdDate', label: 'By Created Date' }
];

export const SEARCH_FILTERS = {
  FULL_TEXT: 'full_text',
  TITLE_ONLY: 'title_only',
  DESCRIPTION_ONLY: 'description_only'
};
```

```bash
# Dev B: Also resolve TaskList.jsx conflict
# Edit src/components/TaskList.jsx:
```

**Resolved src/components/TaskList.jsx**
```jsx
      <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Tasks</label>
            <input 
              type="text"
              placeholder="Search by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Filters</label>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
              Show Filters
            </button>
          </div>
        </div>
```

```bash
# Dev B: Mark conflicts as resolved
git add src/constants/taskConstants.js src/components/TaskList.jsx

# Dev B: Complete the merge
git commit -m "merge: resolve conflicts between TASK-001 and TASK-002

Conflicts resolved:
- TASK-001 added dueDate filter
- TASK-002 added createdDate filter and search functionality
- Combined both features while maintaining code structure"

# Output:
# [develop 7a8c9d2] merge: resolve conflicts between TASK-001 and TASK-002
#  2 files changed, 15 insertions(+), 5 deletions(-)
```

### Verify Merge
```bash
# Dev B: View merge log
git log --oneline -5 develop

# Output:
# 7a8c9d2 merge: resolve conflicts between TASK-001 and TASK-002
# a1b2c3d Merge branch 'feature/TASK-001-add-filter' into develop
# e2f3g4h feat(TASK-002): Add search functionality to TaskList
# i5j6k7l feat(TASK-001): Add filter UI to TaskList component
# m8n9o0p Initial commit

# Dev B: Push merged develop
git push origin develop
```

---

## SCENARIO 2: Feature Deployed to UAT but Customer Cancels It

**Situation**: Feature is deployed to UAT environment but customer decides to cancel it. How to safely remove it?

### Setup: Deploy to UAT
```bash
# Dev C: Create feature for "Task Comments"
git checkout -b feature/TASK-003-add-comments

# Edit src/components/TaskCard.jsx to add comments section
# ... make changes ...

git add .
git commit -m "feat(TASK-003): Add task comments feature

- Added comments section to task cards
- Integrated with TaskContext
- Added comment submission form"

git push origin feature/TASK-003-add-comments

# After PR approval and testing in develop:
git checkout develop
git merge feature/TASK-003-add-comments --no-ff
git push origin develop

# Deploy develop to UAT
git checkout UAT
git pull origin develop
git push origin UAT

# ✅ Feature now in UAT
```

### Customer Cancels Feature
```bash
# OPTION 1: Revert the Merge Commit (Recommended for merged features)
git log --oneline -10

# Output:
# abc123f Merge branch 'feature/TASK-003-add-comments' into develop
# def456g feat(TASK-003): Add task comments feature
# ghi789j Previous commit

# Revert the merge
git revert abc123f -m 1

# This creates a NEW commit that undoes the merge
# Message: "Revert 'Merge branch feature/TASK-003-add-comments into develop'"

git push origin develop
```

### Update UAT
```bash
git checkout UAT
git pull origin develop
git push origin UAT

# ✅ Feature removed from UAT safely
# ✅ History is preserved (can still see what was done)
# ✅ If feature is reactivated later, history is clear
```

### View Revert in History
```bash
git log --oneline -10

# Output:
# xqr987s Revert "Merge branch 'feature/TASK-003-add-comments' into develop"
# abc123f Merge branch 'feature/TASK-003-add-comments' into develop
# def456g feat(TASK-003): Add task comments feature
# ghi789j Previous commit
```

---

## SCENARIO 3: Feature Comes Back Later - Restore Using Multiple Methods

**Situation**: Customer wants the comments feature back. How to restore it?

### METHOD 1: Cherry-Pick the Original Commits
```bash
# View the original feature commits
git log --oneline | grep "feat(TASK-003)"

# Output:
# def456g feat(TASK-003): Add task comments feature

# Create a new branch for the restored feature
git checkout develop
git checkout -b feature/TASK-003-restore-comments

# Cherry-pick the original commit
git cherry-pick def456g

# ✅ Feature is back with original commit message
# Fix any conflicts if needed

git push origin feature/TASK-003-restore-comments

# Create PR and merge back to develop
git checkout develop
git merge feature/TASK-003-restore-comments --no-ff
git push origin develop
```

### METHOD 2: Revert the Revert
```bash
# Find the revert commit
git log --oneline | grep -i "revert"

# Output:
# xqr987s Revert "Merge branch 'feature/TASK-003-add-comments' into develop"

# Revert the revert (undo the undo)
git revert xqr987s

# This creates a commit that re-applies the reverted changes
git push origin develop

# ✅ Feature is back with clean history
```

### METHOD 3: Re-open and Re-implement Feature Branch
```bash
# If the original branch still exists
git branch -a | grep feature/TASK-003

# Output:
# feature/TASK-003-add-comments

# Checkout the old branch
git checkout feature/TASK-003-add-comments

# Create new branch from it
git checkout -b feature/TASK-003-add-comments-v2

# Update with latest develop
git merge develop --no-ff

# Push and create PR
git push origin feature/TASK-003-add-comments-v2

# Create PR and merge after approval
```

### Compare Methods
```
METHOD 1 (Cherry-Pick):
  ✓ Clean history
  ✓ Re-uses original commits
  ✗ Need to identify specific commits

METHOD 2 (Revert the Revert):
  ✓ Simplest approach
  ✓ Clearest audit trail
  ✓ Shows the full story

METHOD 3 (Re-implement):
  ✓ Can make improvements
  ✗ Duplicates commit history
  ✗ More manual work
```

---

## SCENARIO 4: Resolve Conflict, But New Conflicts Appear (Chained Conflicts)

**Situation**: After fixing and merging Scenario 1, Dev C creates another feature that conflicts with the merged result.

### Setup: Dev C Starts New Feature
```bash
# Dev C: Create feature for "Task Labels"
git checkout -b feature/TASK-004-add-labels

# Dev C: Modifies the SAME TaskCard.jsx file

# Edit src/components/TaskCard.jsx
```

**File: src/components/TaskCard.jsx** (Dev C's changes)
```jsx
const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { updateTask } = useContext(TaskContext);
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  // Dev C adds label functionality
  const [labels, setLabels] = useState(task.labels || []);
  const handleAddLabel = (newLabel) => {
    const updated = [...labels, newLabel];
    setLabels(updated);
    updateTask(task.id, { labels: updated });
  };

  // ... rest of component ...

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      {/* ... existing code ... */}

      <div className="mt-3 flex gap-2 flex-wrap">
        <select>
          {/* Status select */}
        </select>
        <select>
          {/* Priority select */}
        </select>
        <button onClick={() => handleAddLabel('urgent')} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
          + Label
        </button>
      </div>

      {/* Dev C adds label section */}
      <div className="mt-3 flex flex-wrap gap-2">
        {labels.map(label => (
          <span key={label} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
```

```bash
# Dev C: Commit
git add src/components/TaskCard.jsx
git commit -m "feat(TASK-004): Add labels feature to task cards"
git push origin feature/TASK-004-add-labels
```

### Try to Merge: NEW CONFLICT APPEARS
```bash
# Dev C: Try to merge feature/TASK-004-add-labels into develop
git checkout develop
git pull origin develop

# This gets the ALREADY MERGED version from Scenario 1
# which includes Dev A's and Dev B's changes

# Attempt merge
git merge feature/TASK-004-add-labels

# ❌ CONFLICT AGAIN in same file (TaskCard.jsx)
```

### View Chained Conflict
```
<<<<<<< HEAD (current develop with Scenario 1 changes)
      <div className="mt-3 flex gap-2 flex-wrap">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select
          value={task.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
=======
      <div className="mt-3 flex gap-2 flex-wrap">
        <select>
          {/* Status select */}
        </select>
        <select>
          {/* Priority select */}
        </select>
        <button onClick={() => handleAddLabel('urgent')} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
          + Label
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {labels.map(label => (
          <span key={label} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {label}
          </span>
        ))}
      </div>
>>>>>>> feature/TASK-004-add-labels
```

### Resolve Chained Conflict
```bash
# Dev C: Manually merge both features
```

**Resolved src/components/TaskCard.jsx**
```jsx
const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { updateTask } = useContext(TaskContext);
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const [labels, setLabels] = useState(task.labels || []);

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
    onUpdate && onUpdate({ ...task, status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    updateTask(task.id, { priority: newPriority });
    onUpdate && onUpdate({ ...task, priority: newPriority });
  };

  const handleAddLabel = (newLabel) => {
    const updated = [...labels, newLabel];
    setLabels(updated);
    updateTask(task.id, { labels: updated });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 flex-1 break-words">{task.title}</h3>
        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-gray-600 mb-3">{task.description || 'No description'}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-medium px-2 py-1 rounded ${statusConfig.color} ${statusConfig.textColor}`}>
          {statusConfig.icon} {statusConfig.label}
        </span>
        <span className={`text-xs font-medium px-2 py-1 rounded ${priorityConfig.color} ${priorityConfig.textColor}`}>
          {priorityConfig.label}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Assigned to:</span>
          <span className="font-medium text-gray-700">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Due:</span>
          <span className="font-medium text-gray-700">{formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select
          value={task.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button 
          onClick={() => handleAddLabel('urgent')} 
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600"
        >
          + Label
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {labels.map(label => (
          <span key={label} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
```

```bash
# Dev C: Mark as resolved and commit
git add src/components/TaskCard.jsx
git commit -m "merge: resolve chained conflicts TASK-001, TASK-002, TASK-004

Previous conflicts (Scenario 1):
- TASK-001: Added filter UI
- TASK-002: Added search functionality

Current merge (Scenario 4):
- TASK-004: Added labels feature
- Combined all features into single TaskCard component
- All functionality now working together"

git push origin develop
```

---

## SCENARIO 5: New Developer Continues Old Feature

**Situation**: New developer joins team and needs to understand and continue an old feature branch.

### New Developer Reviews History
```bash
# New Dev: Clone and explore
git clone <repo-url>
cd task_management_project

# New Dev: View all branches
git branch -a

# Output:
# * main
#   develop
#   feature/TASK-001-add-filter
#   feature/TASK-002-add-search
#   feature/TASK-003-add-comments
#   feature/TASK-004-add-labels
#   feature/TASK-005-api-integration (Old branch, incomplete)
```

### Investigate the Old Feature
```bash
# New Dev: Checkout the old feature branch
git checkout feature/TASK-005-api-integration

# New Dev: View commits on this branch
git log --oneline feature/TASK-005-api-integration ^main

# Output:
# a7b8c9d feat(TASK-005): Add API integration layer
# d8e9f0g feat(TASK-005): Add task API endpoints
# g9h0i1j feat(TASK-005): Setup axios client
```

### Read Commit Details
```bash
# New Dev: View full commit message
git show a7b8c9d

# Output:
# commit a7b8c9d
# Author: Original Dev <original@company.com>
# Date:   Wed Apr 10 14:23:45 2024 -0500
#
#     feat(TASK-005): Add API integration layer
#
#     - Created utils/api.js with axios client
#     - Added endpoints for CRUD operations
#     - Configured base URL and default headers
#     - Added error handling and request/response interceptors
#
#     Closes: #105
```

### View Code Changes
```bash
# New Dev: See what files were changed
git show a7b8c9d --stat

# Output:
#  src/utils/api.js              | 145 +++++++++++++++++++++++++++++++
#  src/services/taskService.js   |  87 ++++++++++++++++++++
#  2 files changed, 232 insertions(+)

# New Dev: View the actual changes
git show a7b8c9d

# Output shows full diff of the commit
```

### Compare with develop
```bash
# New Dev: See differences between feature and develop
git diff develop..feature/TASK-005-api-integration

# Output shows all differences

# New Dev: Get summary
git diff --stat develop..feature/TASK-005-api-integration

# Output:
#  src/utils/api.js              |  145 +++++++
#  src/services/taskService.js   |   87 ++++++
#  src/context/TaskContext.jsx   |   34 +++-
#  3 files changed, 266 insertions(+), 4 deletions(-)
```

### Continue the Feature
```bash
# New Dev: Update branch with latest develop changes
git checkout feature/TASK-005-api-integration
git merge develop --no-ff

# Fix any conflicts if needed

# New Dev: Review what's left to do
git log --oneline develop..feature/TASK-005-api-integration

# New Dev: Make new commits to continue feature
git checkout -b feature/TASK-005-api-integration-continued

# Add new functionality based on understanding
git add .
git commit -m "feat(TASK-005): Continue API integration

Previous work (commits from original dev):
- a7b8c9d: API layer setup
- d8e9f0g: Task endpoints
- g9h0i1j: Axios client

New work (continued by New Dev):
- Add error boundary for API calls
- Add loading states
- Integrate with TaskContext

Closes: #105"

git push origin feature/TASK-005-api-integration-continued
```

---

## SCENARIO 6: Undo Bad Implementation - Reset vs Revert vs Restore

**Situation**: Developer pushes code that has bugs. How to undo it?

### Three Methods Compared

#### METHOD 1: git revert (Safe - Creates new commit)
```bash
# View the bad commit
git log --oneline -5

# Output:
# bad123cd feat(TASK-006): Bad implementation
# prev456e Previous good commit

# Revert it (creates NEW commit that undoes changes)
git revert bad123cd

# Git creates a revert commit automatically
# This is SAFE for public/shared branches

git push origin develop
```

**History after revert:**
```
commit undo789f (HEAD -> develop)
Author: Dev <dev@company.com>
  Revert "feat(TASK-006): Bad implementation"

commit bad123cd
Author: Dev <dev@company.com>
  feat(TASK-006): Bad implementation

commit prev456e
Author: Dev <dev@company.com>
  Previous good commit
```

#### METHOD 2: git reset (Destructive - Rewrites history)
```bash
# ⚠️  WARNING: Only use on LOCAL or private branches!

# Reset to previous commit
git reset --soft HEAD~1      # Keeps changes staged
git reset --mixed HEAD~1     # Keeps changes unstaged
git reset --hard HEAD~1      # Discards changes completely

# Force push (only if local)
git push origin develop --force-with-lease
```

#### METHOD 3: git restore (New Git 2.23+)
```bash
# Restore specific file to previous version
git restore --source=prev456e src/utils/badFile.js

# Or use older syntax
git checkout prev456e -- src/utils/badFile.js

# Commit the restored version
git add src/utils/badFile.js
git commit -m "restore: revert badFile.js to previous working version"

git push origin develop
```

### RECOMMENDATION FOR EACH SCENARIO

**Already pushed to shared branch (develop/main):**
```bash
# ✓ Use: git revert
# - Creates audit trail
# - Doesn't rewrite history
# - Safe for team
git revert <bad-commit>
```

**Local/private branch not pushed:**
```bash
# ✓ Use: git reset
# - Cleaner history
# - No unnecessary revert commits
git reset --hard HEAD~1
```

**Only specific files are bad:**
```bash
# ✓ Use: git restore
# - Surgical fix
# - Leaves other changes intact
git restore --source=<good-commit> <file>
```

---

## Summary Table: All Scenarios

| Scenario | Situation | Solution | Key Command |
|----------|-----------|----------|-------------|
| 1 | Commit behind → conflicts | Manual merge + mark resolved | `git merge`, `git add`, `git commit` |
| 2 | Feature deployed but cancelled | Revert the merge | `git revert <merge-commit>` |
| 3 | Feature needs to come back | Cherry-pick or revert revert | `git cherry-pick` or `git revert revert` |
| 4 | Conflicts after fix → more conflicts | Resolve manually, merge features | `git merge`, `git add`, `git commit` |
| 5 | New dev continues feature | Study history, compare, continue | `git show`, `git diff`, `git log` |
| 6 | Bad code pushed | Revert (safe) or reset (risky) | `git revert` or `git reset` |

---

## Best Practices

### DO ✓
- `git pull` before starting new work
- `git pull origin <branch>` before creating PR
- Use descriptive commit messages
- Test before pushing
- Always use `git diff` to review changes
- Use `git revert` for shared branches
- Keep feature branches focused
- Merge often from main/develop

### DON'T ✗
- Force push to shared branches
- Commit without reading what you're committing
- Work on detached HEAD unless intentional
- Merge without understanding conflicts
- Use `git reset --hard` on shared code
- Rebase public history
- Ignore merge conflicts
- Push directly to main/develop

---

## Commands Reference

```bash
# Branching
git checkout -b <new-branch>              # Create new branch
git branch -a                              # List all branches
git branch -d <branch>                     # Delete branch

# Updates
git pull origin <branch>                  # Fetch and merge
git fetch origin                           # Fetch only

# Inspection
git log --oneline -10                     # View history
git diff <branch1> <branch2>              # Compare branches
git show <commit>                         # View commit details
git status                                 # Check status

# Merging
git merge <branch> --no-ff                # Merge with merge commit
git merge --abort                         # Cancel merge

# Conflict Resolution
git add <file>                            # Mark resolved
git merge --continue                      # Continue after resolve
git reset HEAD <file>                     # Unstage file

# Undo Operations
git revert <commit>                       # Safe undo
git reset --hard HEAD~1                   # Destructive undo
git restore <file>                        # Restore file
git cherry-pick <commit>                  # Re-apply commit

# History Rewriting (Use with caution!)
git rebase <branch>                       # Rebase commits
git rebase --interactive HEAD~3           # Interactive rebase
```

---

## Additional Resources

- [Git Conflicts Documentation](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [GitHub Resolving Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Pro Git Book - Free Online](https://git-scm.com/book/en)
