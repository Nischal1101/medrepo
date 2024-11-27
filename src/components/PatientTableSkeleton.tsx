import { Skeleton } from "./ui/skeleton";

const PatientTableSkeleton = () => {
  return (
    <div className="mt-12 space-y-4">
      <Skeleton className="h-10 w-full "></Skeleton>
      <Skeleton className="h-10 w-full "></Skeleton>
      <Skeleton className="h-10 w-full"></Skeleton>
    </div>
  );
};

export default PatientTableSkeleton;
