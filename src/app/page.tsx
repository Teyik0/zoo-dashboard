import { AreasView, SpeciesView, TableWithUsers, TopCard } from '@/components';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main>
      <TopCard />
      <Toaster />
      <AreasView />
      <SpeciesView />
      <TableWithUsers />
    </main>
  );
}
