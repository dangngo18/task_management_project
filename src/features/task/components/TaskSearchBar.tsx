import { LucideSearch } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebouce";
import { useTaskActions } from "../hooks/useTaskActions";
import { useEffect, useState } from "react";

export const TaskSearchBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { searchQuery, handleSetSearchQuery } = useTaskActions();
  const [query, setQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    handleSetSearchQuery(debouncedQuery);
  }, [debouncedQuery, handleSetSearchQuery]);

  return (
    <div className={`relative ${className}`}>
      <LucideSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-2xl border pl-10 pr-4 py-2 text-base bg-gray-100 border-gray-50 focus:outline-none duration-200 focus:border-gray-300 focus:bg-white"
      />
    </div>
  );
};
