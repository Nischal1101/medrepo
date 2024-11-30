"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { toggleDoctorVerification } from "@/actions/User";
import { useState } from "react";
import { toast } from "sonner";

interface Doctor {
  doctorId: number;
  doctorName: string | null;
  specialization: string;
  email: string;
  isVerified: boolean | null;
  joinedAt: Date;
  userId: number;
}

interface DoctorsTableProps {
  doctors: Doctor[];
}

export function DoctorsTable({ doctors: initialDoctors }: DoctorsTableProps) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [loading, setLoading] = useState(false);

  const handleVerificationToggle = async (doctor: Doctor) => {
    try {
      setLoading(true);
      const result = await toggleDoctorVerification(doctor.userId);

      setLoading(false);
      if (result.success) {
        // Update the local state
        setDoctors((currentDoctors) =>
          currentDoctors.map((d) =>
            d.userId === doctor.userId
              ? { ...d, isVerified: result.newStatus ?? d.isVerified }
              : d
          )
        );

        toast.success(`Doctor verification status updated successfully`);
      } else {
        throw new Error(result.error);
      }
    } catch (error: unknown) {
      toast.error("Failed to update verification status " + error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.doctorId}>
            <TableCell className="font-medium">{doctor.doctorName}</TableCell>
            <TableCell>{doctor.specialization}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>
              <Badge variant={doctor.isVerified ? "default" : "secondary"}>
                {doctor.isVerified ? "Verified" : "Pending"}
              </Badge>
            </TableCell>
            <TableCell>{format(doctor.joinedAt, "PP")}</TableCell>
            <TableCell>
              <Button
                disabled={loading}
                variant="outline"
                size="sm"
                onClick={() => handleVerificationToggle(doctor)}
              >
                {doctor.isVerified ? "Revoke Verification" : "Verify Doctor"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
