import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
@Injectable()
export class FormComponent implements OnInit {
  form: FormGroup;
  formValues = {
    qtdAnimais: 12,
    consumoGramas: 3000,
    periodo: 30,
  };
  
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      qtdAnimais: [this.formValues.qtdAnimais],
      consumoGramas: [this.formValues.consumoGramas],
      periodo: [this.formValues.periodo],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log(this.form.value);
  }
}
