import {
  AreasView,
  SpeciesView,
  TableWithAnimals,
  TableWithUsers,
  TopCard,
} from '@/components';
import TableWithVisitors from '@/components/tables/TableWithVisitors';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main>
      <TopCard />
      <Toaster />
      <AreasView />
      <SpeciesView />
      <TableWithUsers />
      <TableWithAnimals />
      <TableWithVisitors />
    </main>
  );
}
