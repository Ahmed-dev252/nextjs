'use client'

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Todo, Priority } from '../types/todo';
import { toggleTodo } from '../actions/toggle';
import { deleteTodo } from '../actions/delete';
import { bulkDeleteAction, markAllAction } from '../actions/bulk';
import { timeAgo } from '../lib/timeAgo';

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === todos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(todos.map((t) => t._id));
    }
  };

  const handleBulkDelete = () => {
    startTransition(async () => {
      await bulkDeleteAction(selectedIds);
      setSelectedIds([]);
    });
  };

  const handleMarkAll = (completed: boolean) => {
    startTransition(async () => {
      await markAllAction(completed);
    });
  };

  return (
    <div>
      {/* Bulk Operations Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todos.length > 0 && selectedIds.length === todos.length}
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select All'}
          </span>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isPending}
              className="ml-2 px-3 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? 'Deleting...' : `Delete Selected (${selectedIds.length})`}
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleMarkAll(true)}
            disabled={isPending}
            className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 disabled:opacity-50"
          >
            ✓ Mark All Complete
          </button>
          <button
            onClick={() => handleMarkAll(false)}
            disabled={isPending}
            className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            ↺ Mark All Incomplete
          </button>
        </div>
      </div>

      {/* Todos List */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox for Bulk Selection */}
              <input
                type="checkbox"
                checked={selectedIds.includes(todo._id)}
                onChange={() => toggleSelect(todo._id)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              />

              {/* Toggle Complete */}
              <form action={toggleTodo.bind(null, todo._id)}>
                <button
                  type="submit"
                  className="text-2xl hover:scale-110 transition-transform"
                  title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {todo.completed ? '✅' : '⬜'}
                </button>
              </form>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-medium ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-semibold uppercase ${
                      priorityColors[todo.priority]
                    }`}
                  >
                    {todo.priority}
                  </span>
                </div>

             
                <p className="text-xs text-gray-400 mt-0.5">
                  Created {timeAgo(todo.createdAt)}
                  {todo.updatedAt && ` • Updated ${timeAgo(todo.updatedAt)}`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={`/edit/${todo._id}`}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                title="Edit todo"
              >
                ✏️
              </Link>

              <form action={deleteTodo.bind(null, todo._id)}>
                <button
                  type="submit"
                  className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                  title="Delete todo"
                >
                  🗑️
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
