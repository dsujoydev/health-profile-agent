import { Loader2 } from "lucide-react";

export const SkeletonLoader = ({ lines = 1, className = "" }: { lines?: number; className?: string }) => (
  <div className={className}>
    <div className="flex items-center justify-center mb-3">
      <Loader2 className="w-6 h-6 text-blue-600 mr-2 animate-spin" />
      <span className="text-sm font-semibold text-blue-600">AI is thinking...</span>
    </div>
    <div className="animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded h-4 ${i > 0 ? "mt-2" : ""}`} />
      ))}
    </div>
  </div>
);
