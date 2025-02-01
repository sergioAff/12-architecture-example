import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ControlInputComponent } from '../control-input/control-input.component';

@Component({
  selector: 'lib-custom-form',
  imports: [ControlInputComponent, ReactiveFormsModule],
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss',
})
export class CustomFormComponent implements OnInit, OnChanges {
  @Input() formConfig!: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: any }[];
  }[];
  @Input() formData!: any;
  @Input() submitAction!: (data: any) => void;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData && this.formGroup) {
      this.formGroup.patchValue(this.formData);
    }
  }

  initializeForm(): void {
    this.formGroup = this.fb.group(
      this.formConfig.reduce((acc, curr) => {
        if (curr.type === 'array') {
          acc[curr.name] = this.fb.array([]);
        } else {
          acc[curr.name] = [
            curr.type === 'checkbox' ? false : '',
            Validators.required,
          ];
        }
        return acc;
      }, {} as any)
    );

    if (this.formData) {
      this.formGroup.patchValue(this.formData);
    }
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.submitAction(this.formGroup.value);
    }
  }

  cancel(): void {
    this.location.back();
  }
}
