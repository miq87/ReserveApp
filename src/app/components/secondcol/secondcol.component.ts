import { Component, OnInit } from '@angular/core';
import { AddnameService } from 'src/app/services/addname.service';

@Component({
  selector: 'app-secondcol',
  templateUrl: './secondcol.component.html',
  styleUrls: ['./secondcol.component.scss']
})
export class SecondcolComponent implements OnInit {

  names: string[] = []

  constructor(private _addName: AddnameService) { }

  ngOnInit(): void {
    this.names = this._addName.showNames()
  }

}
