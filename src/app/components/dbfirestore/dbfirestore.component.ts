import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dbfirestore',
  templateUrl: './dbfirestore.component.html',
  styleUrls: ['./dbfirestore.component.scss']
})
export class DbfirestoreComponent implements OnInit {

  books: Observable<any[]>

  constructor(db: AngularFirestore) {
    this.books = db.collection('books').valueChanges()
   }

  ngOnInit(): void {
  }

  makeCollection() {
  }

}
