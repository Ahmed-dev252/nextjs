'use server'

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, markAllTodos } from "../lib/todo";

export async function bulkDeleteAction(ids: string[]) {
  if (!ids || ids.length === 0) return;
  await bulkDeleteTodos(ids);
  revalidatePath('/');
}

export async function markAllAction(completed: boolean) {
  await markAllTodos(completed);
  revalidatePath('/');
}
