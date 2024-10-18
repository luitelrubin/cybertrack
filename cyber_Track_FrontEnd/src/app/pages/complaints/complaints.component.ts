import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup , FormBuilder, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for datepicker
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { FinancialComponent } from './financial/financial.component';
import { DefamationComponent } from './defamation/defamation.component';
import { SocialComponent } from './social/social.component';
import { OthersComponent } from './others/others.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [MatLabel, CommonModule, FinancialComponent, DefamationComponent, SocialComponent, OthersComponent ,ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent {
  complaintType: string='';
  onComplaintTypeChange(event: Event){
    this.complaintType = (event.target as HTMLInputElement).value;
  }

}
