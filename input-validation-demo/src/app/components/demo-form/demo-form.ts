import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputValidation } from '../../directives/input-validation';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-demo-form',
  imports: [CommonModule,
    FormsModule,
    InputValidation,
    MatFormFieldModule,
    MatInputModule, MatToolbarModule],
  templateUrl: './demo-form.html',
  styleUrl: './demo-form.scss'
})
export class DemoForm {
  quantityValue = '';
  freeValue = '';
  discountValue = '';
  monthValue = '';
  yearValue = '';
  gstValue = '';
  salesQuantityValue = '';
  batchValue = '';
  billnoValue = '';
}
