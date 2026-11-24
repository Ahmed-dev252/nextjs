'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateTodo, fetchTodoById } from "../lib/todo";
import { Priority } from "../types/todo";

export async function updateTodoAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const priority = (formData.get('priority') as Priority) || 'medium';

  if (!id) {
    return { error: 'Todo ID is required' };
  }

  if (!title || title.trim().length === 0) {
    return { error: 'Title is required' };
  }

  if (title.length > 200) {
    return { error: 'Title must be less than 200 characters' };
  }

  const existingTodo = await fetchTodoById(id);
  if (!existingTodo) {
    return { error: 'Todo not found' };
  }

  const success = await updateTodo(id, { 
    title: title.trim(),
    priority 
  });

  if (!success) {
    return { error: 'Failed to update todo' };
  }

  revalidatePath('/');
  redirect('/');
}
