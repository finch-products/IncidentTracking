import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

interface AlertTemplate {
  type: string;
  template: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: AlertTemplate[] = [
    {
      type: 'Email',
      template: `<p>Dear [Name],<br>Your case #[CaseNo] is approaching its resolution deadline. Please check your dashboard for more details.</p>`
    },
    {
      type: 'WhatsApp',
      template: `Dear [Name], Your case #[CaseNo] is approaching its resolution deadline. Please check your dashboard for more details.`
    },
    {
      type: 'App Notification',
      template: `<p>Your case #[CaseNo] is nearing its resolution deadline. Tap here to view.</p>`
    },
    {
      type: 'SMS',
      template: `Your case #[CaseNo] is close to its resolution TAT. Check your dashboard for details.`
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
