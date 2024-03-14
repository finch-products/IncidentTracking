import { AuthService } from 'src/app/auth.service';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Notice {
  title: string;
  document: string;
  uploadedOn: string;
  proof: string | null;
  status: number;
  status_time: Date | null;
  count: number;
  branch_wise_status: {
    branch_name: string;
    status: number;
    status_time: Date | null;
  }[]
}

@Component({
  selector: 'app-notice-detail',
  styleUrls: ['./notice-detail.component.scss'],
  templateUrl: './notice-detail.component.html',
})
export class NoticeDetailComponent {
  mockNotices: Notice[] = [
    { title: 'Bonus Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-11-14', proof: null, status: 0, status_time: null, count: 0, branch_wise_status: [{branch_name: 'Gandhi Road', status: 0, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 0, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Marathali', status: 0, status_time: new Date(2021, 10, 16, 5, 8)}] },
    { title: 'Policy Changes Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-10-25', proof: null, status: 1, status_time: null, count: 1, branch_wise_status: [{branch_name: 'Gandhi Road', status: 1, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 0, status_time: new Date(2021, 10, 16, 5, 8)}]  },
    { title: 'Branch Specific Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-10-15', proof: null, status: 1, status_time: new Date(2021, 10, 16, 5, 8), count: 1, branch_wise_status: [{branch_name: 'Marathali', status: 1, status_time: new Date(2021, 10, 16, 5, 8)}]  },
    { title: 'Common Notice', document: 'assets/notices/notice-2.jpeg', uploadedOn: '2021-10-13', proof: 'assets/notices/notice-2.jpeg', status: 5, status_time: new Date(2021, 10, 13, 17, 9), count: 1, branch_wise_status: [{branch_name: 'Gandhi Road', status: 1, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 1, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Marathali', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}]  },
    { title: 'Common Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-10-10', proof: 'assets/notices/notice-1.jpeg', status: 5, status_time: new Date(2021, 10, 10, 19, 0), count: 3, branch_wise_status: [{branch_name: 'Gandhi Road', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Marathali', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}]  },
    { title: 'Branch Specific Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-10-05', proof: 'assets/notices/notice-1.jpeg', status: 5, status_time: new Date(2021, 10, 7, 8, 52), count: 2, branch_wise_status: [{branch_name: 'Gandhi Road', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}]  },
    { title: 'Branch Specific Notice', document: 'assets/notices/notice-1.jpeg', uploadedOn: '2021-10-01', proof: 'assets/notices/notice-1.jpeg', status: 5, status_time: new Date(2021, 10, 1, 17, 30), count: 3, branch_wise_status: [{branch_name: 'Gandhi Road', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Bellandur', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}, {branch_name: 'Marathali', status: 5, status_time: new Date(2021, 10, 16, 5, 8)}]  },
  ];

  @Input() notices: Notice[] = [];
  uploadedProofs: File[][] = [];
  panelOpenState: boolean = false;


  constructor(public authService: AuthService, private snackBar: MatSnackBar) {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar'
    });
  }

  uploadProof(index: number, files: FileList | null): void {
    if (files) {
      this.uploadedProofs[index] = Array.from(files);
      this.openSnackBar('File uploaded!', 'Close');
    }
  }
}
