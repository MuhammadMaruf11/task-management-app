import { Task } from "@/types/task";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
    task: Task;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
    return (
        <section className="border p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {task.title}
                </h2>
                <span
                    className={`text-sm px-3 py-1 rounded-full font-medium shadow-md ${task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                >
                    {task.status}
                </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Due: {dayjs(task.due_date).format("DD MMM YYYY")}
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                    href={`/tasks/${task.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                    View
                </Link>
                <Link
                    href={`/tasks/${task.id}/edit`}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline font-medium"
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 dark:text-red-400 hover:underline font-medium"
                >
                    Delete
                </button>
            </div>
        </section>

    );
}