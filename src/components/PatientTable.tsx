/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import DownloadButton from "./DownloadButton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { fetchUserReport } from "@/utils/FetchReports";
import Link from "next/link";

const PatientTable = async ({ userid }: { userid: number }) => {
  const data = await fetchUserReport(userid);
  if (data.length === 0) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center text-2xl">
        No data found
      </div>
    );
  }
  return (
    <Table className="mt-12">
      <TableHeader className="md:text-lg">
        <TableRow>
          <TableHead className=" invisible max-w-px">Id</TableHead>
          <TableHead className="max-w-[100px]">Id</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Report</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} className="group relative md:text-lg">
            {/* Clickable overlay */}
            <Link
              href={`/reports/patient/access/${item.id}`}
              className="absolute inset-0 z-10 group-hover:bg-muted/50"
            >
              <span className="sr-only hidden">View report details</span>
            </Link>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.hospitalName}</TableCell>
            <TableCell>{item.doctorName}</TableCell>
            <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              {/* Prevent the download button from triggering row click */}
              <div className="relative z-20">
                <DownloadButton url={item.attachmentUrl as string} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientTable;
