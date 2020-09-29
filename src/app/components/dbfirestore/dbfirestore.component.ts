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
  title: string = '...'
  author: string = '...'

  constructor(private db: AngularFirestore) {
    this.books = db.collection('books').valueChanges()
  }

  ngOnInit(): void {
  }

  makeCollection() {
  }

  addBook(form) {
    console.log('Form value: ' + JSON.stringify(form.value))

    this.db.collection('books').add({
      title: form.value.title,
      author: form.value.author,
      year: "2020"
    }).then(() => {
      console.log('Added new book!')
    })
    .catch((err) => {
      console.log(err)
    })

  }

}
