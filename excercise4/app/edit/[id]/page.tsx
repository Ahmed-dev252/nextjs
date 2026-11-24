import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTodoById } from '../../lib/todo';
import EditForm from './EditForm';

interface EditTodoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await fetchTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Todo</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Todos
          </Link>
        </div>

        
        <EditForm todo={todo} />
      </div>
    </main>
  );
}
