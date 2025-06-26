"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import Spinner from "@/components/ui/spinner";
import TaskCard from "@/components/Task/TaskCard";
import ThemeToggle from "@/components/Theme/ThemeToggle";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filtered, setFiltered] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

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

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <ThemeToggle />
                </div>
                <a
                    href="/tasks/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Add Task
                </a>
            </div>


            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {completedCount} completed / {tasks.length} total
            </p>

            <div className="mb-4 space-x-2">
                {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded border ${filter === status
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                            } transition`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <Spinner />
            ) : filtered.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="space-y-4">
                    {filtered.map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </main>
    );
}
