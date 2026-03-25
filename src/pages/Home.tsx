import { LucideCalendarCheck2, LucidePlus } from "lucide-react";
import { TaskStatistics } from "../features/task/components/TaskStatistics";
import { TaskForm } from "../features/task/components/TaskForm";
import { TaskSearchBar } from "../features/task/components/TaskSearchBar";
import { TaskFilterTabs } from "../features/task/components/TaskFilterTabs";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../features/task/components/TaskList";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { loadTasksFromStorage } from "../features/task";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks);
        dispatch(loadTasksFromStorage(tasks));
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto container px-4 py-4 md:py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start space-x-4">
            <LucideCalendarCheck2 className="text-green-500 w-10 h-10 md:w-15 md:h-15" />

            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                Task Manager
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Organize your tasks efficiently
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <div className="task_statistics_block">
            <TaskStatistics />
          </div>
          <div>
            <div className="flex justify-between p-4 bg-white rounded-2xl mt-4">
              <div className="task_search_filter_block flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                <TaskSearchBar className="grow-0 focus-within:grow duration-500" />
                <TaskFilterTabs />
              </div>
              <div className="task_button_function">
                <Button
                  className="rounded-xl p-0 text-base bg-transparent md:bg-blue-600 text-blue-600 md:text-white hover:bg-blue-700 not-md:fixed not-md:bottom-4 not-md:right-4 not-md:border not-md:border-blue-600"
                  size={"icon-xl"}
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  <LucidePlus className="md:hidden size-6" />
                  <span className="not-md:hidden">Add Task</span>
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    ease: [0.7, 0, 0.3, 1],
                    duration: 0.3,
                  }}
                >
                  <TaskForm
                    onSubmit={() => setIsFormOpen(false)}
                    onCancel={() => setIsFormOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}
