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
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [RouterModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {
  complaint:FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.complaint = this.fb.group({
      id: [''],
      victim_Name: [''],
      date_of_birth: [''],
      address: [''],
      unique_id: [''],
      contact_no: [''],
      contact_email: [''],
      guardian_no: [''],
      description: [''],
      medium: [''],
      evidence_links: [''],
      unique_id_card: [null],
      signature: [null],
      screenshots: [null],
      other_doc: [null],
      status: ['Pending'],
      created_at: [''],
      updated_at: [''],
    });
  }
  onSubmit() {
    console.log(this.complaint.value);
    this.router.navigate(['/success']);

  }
  onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.complaint.patchValue({
        [fieldName]: file
      });
    }
  }
}
