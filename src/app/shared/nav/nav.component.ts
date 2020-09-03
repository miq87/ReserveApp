import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  displayName: string

  constructor(private auth_: AuthService) { }

  ngOnInit(): void {
    
  }

  getUser() {
    this.auth_.authState$.pipe(first()).subscribe(data => {
      //this.displayName = data.displayName
    })
    //console.log(this.displayName)
  }

}
