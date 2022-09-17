import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
@Injectable()
export class FormComponent implements OnInit {
  form: FormGroup;
  formValues = {
    numberAnimals: 12,
    consumptionGrams: 3000,
    period: 30,
    feedPrice: 2.3,
  };

  constructor(private _formBuilder: FormBuilder, public router: Router
    ) {
    this.form = this._formBuilder.group({
      numberAnimals: [this.formValues.numberAnimals],
      consumptionGrams: [this.formValues.consumptionGrams],
      period: [this.formValues.period],
      feedPrice: [this.formValues.feedPrice],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();
    
    this.router.navigate(['/simulation'], {
      queryParams: this.form.value,
    });
  }
}
