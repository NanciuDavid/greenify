import { ScrollArea } from "@/components/ui/scroll-area";
import { Recycle } from "lucide-react";
import { RecyclingRecord, RecyclingRecordType } from "./RecyclingRecord";

interface HistoryProps {
  records: RecyclingRecordType[];
}

export function History({ records }: HistoryProps) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Recycle className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-semibold">Recycling History</h2>
      </div>

      <ScrollArea className="rounded-lg border h-[735px]">
        <div className="flex flex-col gap-4 p-4">
          {records.map((record) => (
            <RecyclingRecord key={record.id} record={record} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
