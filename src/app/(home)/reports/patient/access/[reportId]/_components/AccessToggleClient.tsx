/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateDoctorAccess } from "@/actions/User";
import { Switch } from "@/components/ui/switch";
import { LockIcon } from "lucide-react";
import React, { useTransition, useActionState } from "react";

import { toast } from "sonner";

function AccessToggleClient({
  reportid,
  access,
  isCreator,
}: {
  reportid: number;
  access: {
    doctorId: number;
    doctorName: string | null;
    specialization: string;
    canAccess: boolean | null;
  };
  isCreator: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(updateDoctorAccess, null);

  React.useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success) {
      toast.message("Access Updated", {
        description: `Access for ${access.doctorName} has been updated.`,
      });
    }
  }, [state, access.doctorName]);

  const handleAccessToggle = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.set("reportId", reportid.toString());
      formData.set("doctorId", access.doctorId.toString());
      formData.set("canAccess", (!access.canAccess).toString());
      formAction(formData);
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="flex items-center gap-2 font-medium">
          {access.doctorName}
          {isCreator && (
            <span className="inline-flex items-center text-sm text-muted-foreground">
              <LockIcon className="mr-1 size-3 " />
              Creator
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">{access.specialization}</div>
      </div>
      <Switch
        checked={access.canAccess || false}
        onCheckedChange={handleAccessToggle}
        disabled={isPending}
        className="ml-4"
      />
    </div>
  );
}
export default AccessToggleClient;
