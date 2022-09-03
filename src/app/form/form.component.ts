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
    qtdAnimais: 12,
    consumoGramas: 3000,
    periodo: 30,
    precoRacao: 2.3,
  };

  constructor(private _formBuilder: FormBuilder, public router: Router) {
    this.form = this._formBuilder.group({
      qtdAnimais: [this.formValues.qtdAnimais],
      consumoGramas: [this.formValues.consumoGramas],
      periodo: [this.formValues.periodo],
      precoRacao: [this.formValues.precoRacao],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log(this.form.value);
    this.router.navigate(['/simulation'], {
      queryParams: this.form.value,
    });
  }
}
