import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-involved',
  templateUrl: './employee-involved.component.html',
  styleUrls: ['./employee-involved.component.scss']
})
export class EmployeeInvolvedComponent {
  @Input() employeeInvolvedForm!: FormGroup;

}
