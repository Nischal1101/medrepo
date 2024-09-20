import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ReportsPage = () => {
  return (
    <MaxWidthWrapper>
      <h1 className="text-2xl md:text-4xl mt-12 md:mt-20 ">User's Reports </h1>
      <Table className="mt-12">
        <TableHeader className="md:text-lg">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead className="text-right">Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell className="text-right">view</TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell className="text-right">view</TableCell>
          </TableRow>
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell className="text-right">view</TableCell>
          </TableRow>{" "}
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell className="text-right">view</TableCell>
          </TableRow>{" "}
          <TableRow className="md:text-lg">
            <TableCell className="font-medium ">001</TableCell>
            <TableCell>Nobel</TableCell>
            <TableCell>Godatwa Prasad</TableCell>
            <TableCell className="text-right">view</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
