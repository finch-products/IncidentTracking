import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-template',
  styleUrls: ['./email-template.component.scss'],
  templateUrl: './email-template.component.html'
})
export class EmailTemplateComponent {
  subject: string = 'Reminder: New Notices';
  body: string = 'Dear EC Members,<br><br>New notices have been sent to your branch. Please review and acknowledge.<br><br>Thank you,<br>HRHQ';


  subject1: string = 'Confirmation Received: Posted Notices';
  body1: string = 'Dear HRHQ,<br><br>Branch [Branch Name] has posted the notices and sent the confirmation pictures. Please review the attachments.<br><br>Thank you,<br>[EC Members Name]<br>[Branch Name]';


  subject2: string = 'Daily Reminder: Notices Pending';
  body2: string = 'Dear [EC Members Name],<br><br>This is a reminder that there are [number] notices pending for your branch. Please take action accordingly.<br><br>Thank you,<br>HRHQ';
}
