"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FileUpload } from "./FileUpload";
import { useState } from "react";
import { toast } from "sonner";
import { uploadReport } from "@/actions/User";

const reportTypes = [
  "lab_test",
  "imaging",
  "prescription",
  "diagnosis",
  "surgery",
  "other",
];

interface Props {
  patientId: number;
}

export function UploadReportForm({ patientId }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      const result = await uploadReport(formData);

      if (result.success) {
        toast.success("Report uploaded successfully");
        router.push("/hospital");
        router.refresh();
      } else {
        toast(result.error || "Failed to upload report");
      }
    } catch (error) {
      toast.error("An unexpected error occurred " + error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="patientId" value={patientId} />

      <div className="space-y-2">
        <Label htmlFor="reportType">Report Type</Label>
        <Select name="reportType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            {reportTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Report Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter report details..."
          className="h-32"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Upload File</Label>
        <FileUpload name="file" maxSize={5 * 1024 * 1024} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => router.back()}
          type="button"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Report"}
        </Button>
      </div>
    </form>
  );
}
