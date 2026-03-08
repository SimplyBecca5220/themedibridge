import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const SkeletonCard = () => (
  <Card>
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-8 w-24" />
    </CardContent>
  </Card>
);

export default SkeletonCard;
