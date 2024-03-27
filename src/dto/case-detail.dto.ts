import { Employee } from "./employee.dto";

export interface CaseAttachment {
    filename: string;
    fileurl: string;
}

export interface CaseStatus {
    status: string;
    statusDesc: string;
    comment: string;
    updateOn: Date;
    updatedBy: Employee;
    attachment?: CaseAttachment[]
}

export interface CaseDetail {
    caseNo: string;
    departmentName: string;
    branchName: string;
    reporter: Employee;
    reportedOn: string;
    closedOn?: string | null;
    subject: string;
    description: string;
    employeeInvolved: Employee[];
    status: string;
    name?: string;
    statusHistory?: CaseStatus[];

}
