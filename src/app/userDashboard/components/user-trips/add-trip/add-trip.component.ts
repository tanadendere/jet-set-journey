import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
})
export class AddTripComponent {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    tripName: ['', Validators.required],
    destination: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
  }
}
