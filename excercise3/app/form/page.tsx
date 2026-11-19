
'use client';

import { useActionState } from 'react';
import { greet } from './actions';

const initialState = {
  success: false,
  message: '',
  error: ''

};


export default function FormPage() {
  const [state, formAction] = useActionState(greet, initialState);

  return (
    <form action={formAction} className="  space-y-4 p-6 max-w-md mx-auto">

      
      <input
        name="firstName"
        placeholder="Enter your first name"
        className="border p-2 w-full"
      />
      <input
        name="lastName"
        placeholder="Enter your last name"
        className="border p-2 w-full"
      />
      <input
        name="email"
        placeholder="Enter your email"
        className="border p-2 w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>

      {state.success && (
        <p className="text-green-600 mt-4 font-medium">{state.message}</p>
      )}
      {!state.success && state.error && (
        <p className="text-red-600 mt-4 font-medium">{state.error}</p>
      )}
    </form>
  );
}
