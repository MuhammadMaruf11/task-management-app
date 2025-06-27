"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import Button from "@/components/ui/button";
import { taskSchema } from "@/schema/taskSchema";


type TaskFormData = z.infer<typeof taskSchema>;

export default function EditTask({ taskId }: { taskId: string }) {
    const [loading, setLoading] = useState(true);
    const [taskNotFound, setTaskNotFound] = useState(false);
    const [apiError, setApiError] = useState("");

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "pending",
            due_date: "",
        },
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await getTask(taskId);
                if (data) {
                    reset({
                        title: data.title,
                        description: data.description || "",
                        status: data.status,
                        due_date: data.due_date.slice(0, 10),
                    });
                } else {
                    setTaskNotFound(true);
                }
            } catch {
                setTaskNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId, reset]);

    const onSubmit = async (data: TaskFormData) => {
        setApiError("");
        try {
            await updateTask(taskId, {
                ...data,
                description: data.description ?? "",
            });
            router.push("/");
        } catch (error) {
            console.error("error: ", error);
            setApiError("Failed to update task. Try again.");
        }
    };

    if (loading) return <Spinner />;
    if (taskNotFound) return <p className="text-red-500">Task not found.</p>;

    return (
        <section className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-foreground">
                Edit Task
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6 transition-all"
            >
                {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

                <div>
                    <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                        Title *
                    </label>
                    <input
                        type="text"
                        {...register("title")}
                        className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                        Status
                    </label>
                    <select
                        {...register("status")}
                        className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                        Due Date *
                    </label>
                    <input
                        type="date"
                        {...register("due_date")}
                        className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    />
                    {errors.due_date && (
                        <p className="text-red-500 text-xs mt-1">{errors.due_date.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Task"}
                </Button>
            </form>
        </section>

    );
}
