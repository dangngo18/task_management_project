import { useState } from 'react';
import { TaskProvider } from "./context/TaskContext";
import ViewSwitcher from "./components/ViewSwitcher";
import KanbanBoard from "./components/KanbanBoard";
import TaskList from "./components/TaskList";
import { VIEW_MODES } from "./constants/taskConstants";
import "./styles/App.css";

function App() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.KANBAN || 'kanban');

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <ViewSwitcher onViewChange={setViewMode} />
        
        <main className="pt-6">
          {viewMode === VIEW_MODES.KANBAN ? <KanbanBoard /> : <TaskList />}
        </main>

        <footer className="bg-gray-900 text-white p-6 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">Task Management Application © 2024</p>
            <p className="text-xs text-gray-400 mt-2">For Git Workflow Demo - Scenario Simulation</p>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
