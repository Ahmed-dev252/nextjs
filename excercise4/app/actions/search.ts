'use server'

import { redirect } from 'next/navigation';

export async function searchTodosAction(formData: FormData) {
  const search = (formData.get('search') as string)?.trim() || '';
  const status = (formData.get('status') as string) || 'all';

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status && status !== 'all') params.set('status', status);

  const queryString = params.toString();
  redirect(queryString ? `/?${queryString}` : '/');
}
