import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHospitalPatients } from "@/utils/FetchHospitalPatients";
import { format } from "date-fns";

export function PatientsTable({
  patients,
}: {
  patients: Awaited<ReturnType<typeof getHospitalPatients>>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.patientId}>
            <TableCell>
              <div>
                <div className="font-medium">{patient.patientName}</div>
                <div className="text-sm text-muted-foreground">
                  {format(patient.dob as string, "PP")}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{patient.email}</div>
                <div className="text-muted-foreground">{patient.phone}</div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
