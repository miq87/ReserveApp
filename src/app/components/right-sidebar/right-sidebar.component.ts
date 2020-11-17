import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  currentUser: any

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.getCurrentUser((user) => {
      this.currentUser = user
    })
  }

}
