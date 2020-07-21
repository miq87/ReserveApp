import { Component, OnInit } from '@angular/core';
import { AddnameService } from 'src/app/services/addname.service';

@Component({
  selector: 'app-firstcol',
  templateUrl: './firstcol.component.html',
  styleUrls: ['./firstcol.component.scss']
})
export class FirstcolComponent implements OnInit {

  firstName: string

  constructor(private _addName: AddnameService) { }

  ngOnInit(): void {
  }

  onAdd() {
    console.log('onAdd Clicked')
    this._addName.addName(this.firstName)
  }
  onShow() {
    console.log('onShow Clicked')
    this._addName.showNames()
  }

}
