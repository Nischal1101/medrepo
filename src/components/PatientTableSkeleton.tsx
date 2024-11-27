import MaxWidthWrapper from "./MaxWidthWrapper";
import { Skeleton } from "./ui/skeleton";

const PatientTableSkeleton = () => {
  return (
    <MaxWidthWrapper className="mt-12 space-y-4">
      <Skeleton className="h-10 w-full "></Skeleton>
      <Skeleton className="h-10 w-full "></Skeleton>
      <Skeleton className="h-10 w-full"></Skeleton>
    </MaxWidthWrapper>
  );
};

export default PatientTableSkeleton;
