"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import Spinner from "@/components/ui/spinner";
import TaskCard from "@/components/Task/TaskCard";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filtered, setFiltered] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
            setFiltered(data);
            setLoading(false);
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        if (filter === "all") {
            setFiltered(tasks);
        } else {
            setFiltered(tasks.filter((t) => t.status === filter));
        }
    }, [filter, tasks]);

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    const completedCount = tasks.filter((t) => t.status === "completed").length;

    const filteredTasks = tasks.filter((task) =>
        filter === "all" ? true : task.status === filter
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const dateA = new Date(a.due_date).getTime();
        const dateB = new Date(b.due_date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return (
        <main className="p-6 max-w-4xl mx-auto">

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
                {completedCount} completed / {tasks.length} total
            </p>

            <div className="flex item-center justify-between">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {['all', 'pending', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full border font-medium shadow-sm transition-colors duration-300 ease-in-out text-sm
                                    ${filter === status
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"}`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="mb-6 text-center">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                        className="px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    >
                        <option value="asc">Due Date ↑</option>
                        <option value="desc">Due Date ↓</option>
                    </select>
                </div>
            </div>


            {loading ? (
                <Spinner />
            ) : filtered.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="space-y-4">
                    {sortedTasks.map((task) => <TaskCard key={task.id} task={task} onDelete={handleDelete} />)}
                </div>
            )}
        </main>
    );
}
