import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  myForm: FormGroup

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      firstName: [],
      lastName: [],
      city: [],
      age: []
    })
  }

}
