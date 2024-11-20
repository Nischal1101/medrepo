import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
const AuthBtn = ({
  title,
  className,
  pending,
}: {
  title: string;
  className?: string;
  pending: boolean;
}) => {
  return (
    <Button
      type="submit"
      disabled={pending}
      className={`mt-4 w-full max-w-xs ${className}`}
    >
      {pending && <LoaderCircle className="mr-3  animate-spin" />}
      {title}
    </Button>
  );
};
export default AuthBtn;
