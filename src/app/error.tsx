"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Uncaught error:", error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-700 mb-2">
          Something went wrong
        </h2>
        <p className="text-text mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="inline-flex items-center bg-blue-600 text-white justify-center gap-2 px-6 py-3  rounded-lg  transition-colors"
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
          </Button>
          <Button
            onClick={handleRefresh}
            className="inline-flex items-center bg-blue-600 text-white justify-center gap-2 px-6 py-3  rounded-lg  transition-colors"
          >
            <RefreshCw size={18} />
            <span>Refresh Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
