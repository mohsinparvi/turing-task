import { CallHistoryTable } from "@/components/common/datatable";
import Header from "@/components/layouts/header";

export default function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-6">
      <Header />

      <CallHistoryTable />
    </div>
  );
}
