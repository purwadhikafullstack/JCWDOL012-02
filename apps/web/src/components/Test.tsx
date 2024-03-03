'use client';

import React from 'react';
import { useSession } from '@/services/getSession';

export default function Test() {
  const { data: session, error, isFetched } = useSession();

  console.log(session, error, isFetched);

  return <div>Test</div>;
}
