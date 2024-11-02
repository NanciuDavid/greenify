import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin } from "lucide-react";
import { formatDistance } from "date-fns";

export interface RecyclingRecordType {
  id: string;
  date: string;
  location: string;
  code: string;
  weight: number;
  credits: number;
  materials: string[];
}

interface RecyclingRecordProps {
  record: RecyclingRecordType;
}

export function RecyclingRecord({ record }: RecyclingRecordProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">
                {formatDistance(new Date(record.date), new Date(), { addSuffix: true })}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p className="font-medium">{record.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-600 dark:text-green-400">{record.credits} credits</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {record.materials.map((material) => (
              <Badge
                key={material}
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800"
              >
                {material}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Weight:</span>
              <span className="font-medium">{record.weight} kg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Code:</span>
              <code className="px-2 py-1 bg-secondary rounded-md font-mono text-sm">{record.code}</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
