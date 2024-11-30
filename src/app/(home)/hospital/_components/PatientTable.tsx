import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getHospitalPatients } from "@/utils/FetchHospitalPatients";

export function PatientsTable({ patients }: { 
  patients: Awaited<ReturnType<typeof getHospitalPatients>> 
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Discharge Date</TableHead>
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
            <TableCell>{format(patient.registrationDate, "PP")}</TableCell>
            <TableCell>
              <Badge 
                variant={
                  patient.status === "discharged" 
                    ? "secondary" 
                    : patient.status === "admitted" 
                    ? "destructive" 
                    : "default"
                }
              >
                {patient.status}
              </Badge>
            </TableCell>
            <TableCell>
              {patient.dischargeDate 
                ? format(patient.dischargeDate, "PP")
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
