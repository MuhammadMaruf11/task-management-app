'use client'
import { getTask } from "@/lib/api";
import { Task } from "@/types/task";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

export default function ViewTask({ taskId }: { taskId: string }) {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await getTask(taskId);
                if (!data) notFound();
                setTask(data);
            } catch (error) {
                console.error('error: ', error);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    if (loading) return <Spinner />;

    if (!task) return null;

    return (
        <section className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-foreground">
                Task Details
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    {task.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
                        <span className="font-semibold">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs font-semibold ${task.status === "completed" ? "bg-green-600" : "bg-red-500"}`}>
                            {task.status}
                        </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Due Date:</span>
                        <span className="ml-2">
                            {dayjs(task.due_date).format("DD MMM YYYY")}
                        </span>
                    </p>
                </div>

                <div className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
                    <p className="mb-2 font-semibold">Description:</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        {task.description || "No description provided."}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href={`/tasks/${task.id}/edit`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        Edit Task
                    </Link>
                    <Link
                        href="/"
                        className="inline-block border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </section>

    );
}
