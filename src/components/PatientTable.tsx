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
          <TableHead className="max-w-[100px]">Id</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Report</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="md:text-lg" key={item.id}>
            <TableCell className="font-medium ">
              <Link href={`/reports/patient/access/${item.id}`}>{item.id}</Link>
            </TableCell>
            <TableCell>{item.hospitalName}</TableCell>
            <TableCell>{item.doctorName}</TableCell>
            <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <DownloadButton url={item.attachmentUrl as string} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientTable;
