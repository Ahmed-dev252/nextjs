import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  const cookieStore = await cookies();
  const firstName = cookieStore.get('firstName')?.value;
  const lastName = cookieStore.get('lastName')?.value;

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col items-center  justify-between py-24 px-50">
      <h1 className="text-3xl font-bold text-gray-800">Home</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl text-gray-800 font-bold">
          Welcome {firstName || lastName ? `${firstName ?? ''} ${lastName ?? ''}` : 'Guest'} to my app!
        </p>
        <Link href="/form" className="border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
          Go to Form
        </Link>
      </div>
    </div>
  );
}
