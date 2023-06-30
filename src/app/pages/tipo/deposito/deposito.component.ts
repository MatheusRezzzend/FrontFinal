import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposito',
  templateUrl: 'deposito.component.html',
})
export class DepositoComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      valorDeposito: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const valorDeposito = this.formGroup.get('valorDeposito')?.value;
      console.log('Valor do depósito:', valorDeposito);
    }
  }

  handleError(controlName: string, errorName: string): boolean {
    const control = this.formGroup.get(controlName);
    if (control) {
      return control.touched && control.hasError(errorName);
    }
    return false;
  }
}
