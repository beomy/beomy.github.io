import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import AboutView from '@/views/AboutView';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  path: '/about/',
});

export default function Page() {
  return <AboutView />;
}
