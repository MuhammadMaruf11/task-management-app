// lib/api.ts
import { Task } from "@/types/task";

const BASE_URL = "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks";

// GET all tasks
export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  return res.json();
};

// GET a single task
export const getTask = async (id: string): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  return res.json();
};

// CREATE a new task
export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// UPDATE a task
export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
};

// DELETE a task
export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
