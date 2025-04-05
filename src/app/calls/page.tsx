import { CallHistoryTable } from "@/components/common/datatable";
import Header from "@/components/layouts/header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 lg:px-6">
        <CallHistoryTable />
      </main>
    </div>
  );
};

export default page;
