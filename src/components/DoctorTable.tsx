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
import { getAllAccessibleReportsWithDetails } from "@/utils/FetchDocReports";

const DoctorTable = async ({ userid }: { userid: number }) => {
  const data = await getAllAccessibleReportsWithDetails({ doctorId: userid });
  console.log("The doctor array is", data);
  if (data.length === 0) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center text-2xl">
        No data found
      </div>
    );
  }
  return (
    <>
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
            <TableRow className="md:text-lg" key={item.reportId}>
              <TableCell className="font-medium ">{item.reportId}</TableCell>
              <TableCell>{item.hospitalName}</TableCell>
              <TableCell>{item.creatingDoctorName}</TableCell>
              <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DownloadButton url={item.attachmentUrl as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DoctorTable;
