import { LucideCalendarCheck2 } from "lucide-react";
import { TaskStatistics } from "../features/task/components/TaskStatistics";
import { TaskForm } from "../features/task/components/TaskForm";
import { TaskSearchBar } from "../features/task/components/TaskSearchBar";
import { TaskFilterTabs } from "../features/task/components/TaskFilterTabs";
import { Button } from "../components/ui/button";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../features/task/components/TaskList";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto container px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start space-x-4">
            <LucideCalendarCheck2 className="text-green-500 w-15 h-15" />

            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
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
              <div className="task_search_filter_block flex gap-x-4 w-1/2">
                <TaskSearchBar className="grow-0 focus-within:grow duration-500" />
                <TaskFilterTabs />
              </div>
              <div className="task_button_function relative">
                <Button
                  className="rounded-xl p-4 text-base bg-blue-600 text-white hover:bg-blue-700"
                  size={"lg"}
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  Add Task
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
