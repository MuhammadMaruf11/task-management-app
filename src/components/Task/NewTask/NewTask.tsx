"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import { createTask } from "@/lib/api";
import { useState } from "react";
import { taskSchema } from "@/schema/taskSchema";
import { z } from "zod";

type TaskFormData = z.infer<typeof taskSchema>;

export default function NewTask() {
    const router = useRouter();
    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            status: "pending",
        },
    });

    const onSubmit = async (data: TaskFormData) => {
        try {
            await createTask({
                ...data,
                description: data.description ?? "",
            });
            router.push("/");
        } catch (error) {
            console.log(error);
            setApiError("Failed to create task. Try again.");
        }
    };


    return (
        <section className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-foreground">
                Add New Task
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
                    {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
            </form>
        </section>

    );
}
