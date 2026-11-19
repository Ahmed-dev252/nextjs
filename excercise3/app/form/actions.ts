'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type FormState = {
  success: boolean;
  message: string;
  error: string;
};

export async function greet(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!firstName || firstName.trim() === '') {
    return {
      success: false,
      message: '',
      error: 'First name is required.',
    };
  }

  if (!lastName || lastName.trim() === '') {
    return {
      success: false,
      message: '',
      error: 'Last name is required.',
    };
  }

  if (!email || email.trim() === '') {
    return {
      success: false,
      message: '',
      error: 'Email is required.',
    };
  }

  if (!password || password.trim() === '' || password.length < 6) {
    return {
      success: false,
      message: '',
      error: 'Password is required and must be at least 6 characters long.',
    };
  }


  const cookieStore = await cookies();
  cookieStore.set('firstName', firstName);
  cookieStore.set('lastName', lastName);

  redirect('/');
}
