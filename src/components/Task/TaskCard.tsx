import { Task } from "@/types/task";
import dayjs from "dayjs";

interface Props {
    task: Task;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
    return (
        <div className="border p-4 rounded shadow-sm bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{task.title}</h2>
                <span className={`text-sm px-2 py-1 rounded-full ${task.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : task.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}>
                    {task.status}
                </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Due: {dayjs(task.due_date).format("DD MMM YYYY")}</p>
            <div className="mt-3 space-x-2">
                <a href={`/tasks/${task.id}`} className="text-blue-600 hover:underline">View</a>
                <a href={`/tasks/${task.id}/edit`} className="text-yellow-600 hover:underline">Edit</a>
                <button onClick={() => onDelete(task.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    );
}