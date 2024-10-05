import { Component } from '@angular/core';
import { Complaint } from './complaints.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent {
  newComplaint: Complaint = new Complaint();
  complaints: Complaint[] = [];

  addComplaint() {
  
    this.newComplaint.status = 'Pending';
    this.complaints.push({ ...this.newComplaint });
    this.newComplaint = new Complaint();
  }


}
