import { fetchTodos } from './lib/todo';
import TodoList from './components/TodoList';
import Link from 'next/link';

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search = '', status = 'all' } = await searchParams;
  const todos = await fetchTodos(search, status);

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📝 Todo App</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your tasks efficiently and stay organized.
            </p>
          </div>

          <Link
            href="/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ➕ Add New Todo
          </Link>
        </div>

       
        <form method="GET" className="flex flex-wrap gap-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search todos..."
            className="flex-1 min-w-[200px] px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            defaultValue={status}
            className="px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>

          {(search || status !== 'all') && (
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset
            </Link>
          )}
        </form>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No todos found!</p>
            <p className="text-gray-400 text-sm mt-2">
              {search || status !== 'all'
                ? 'Try clearing your search or filter.'
                : 'Create your first todo to get started.'}
            </p>
          </div>
        ) : (
          <TodoList todos={todos} />
        )}
      </div>
    </main>
  );
}
