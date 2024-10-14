"use client";
import DownloadButton from "@/components/DownloadButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useParams } from "next/navigation";

const ReportsPage = () => {
  // const { userid } = useParams();
  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        User&apos;s Reports{" "}
      </h1>
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
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell>2081-02-05</TableCell>
            <TableCell className="text-right">
              <DownloadButton url="https://pdfobject.com/pdf/sample.pdf" />
            </TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell>2081-02-05</TableCell>
            <TableCell className="text-right">
              <DownloadButton url="https://pdfobject.com/pdf/sample.pdf" />
            </TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell>2081-02-05</TableCell>
            <TableCell className="text-right">
              <DownloadButton url="https://pdfobject.com/pdf/sample.pdf" />
            </TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell>2081-02-05</TableCell>
            <TableCell className="text-right">
              <DownloadButton url="https://pdfobject.com/pdf/sample.pdf" />
            </TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell>2081-02-05</TableCell>
            <TableCell className="text-right">
              <DownloadButton url="https://pdfobject.com/pdf/sample.pdf" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
