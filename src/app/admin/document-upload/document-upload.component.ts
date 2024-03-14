// document-upload.component.ts
import { Component, OnInit } from '@angular/core';
import { Document } from '../../model/document.model';
import { BranchManagementService } from '../branch-management.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-document-upload',
  styleUrls: ['./document-upload.component.scss'],
  templateUrl: './document-upload.component.html',
})
export class DocumentUploadComponent implements OnInit {
  documents: Document[] = [];
  uploadedDocuments: Document[] = [];
  branches = this.branchService.getBranches();
  nextId = 3;

  constructor(
    private branchService: BranchManagementService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http.get<Document[]>('assets/document.json').subscribe((data) => {
      this.uploadedDocuments = data;
      console.log(this.uploadedDocuments);
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar',
    });
  }
  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.documents.push({
        id: this.nextId++,
        file: files[i].name,
        allBranches: true,
        selectedBranch: null,
        sentOn: new Date().toISOString(),
        status: 'Successful',
      });
    }
  }

  uploadDocuments(): void {
    this.uploadedDocuments = this.uploadedDocuments.concat(this.documents);
    this.openSnackBar('Notices uploaded!', 'Close');
    this.documents = [];
  }
}
