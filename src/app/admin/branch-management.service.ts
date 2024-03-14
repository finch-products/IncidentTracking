import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchManagementService {
  private branches = ['Bellandur', 'Marathali', 'Gandhi Road', 'Branch 4'];

  getBranches() {
    return this.branches;
  }

  addBranch(branch: string) {
    this.branches.push(branch);
  }
}
