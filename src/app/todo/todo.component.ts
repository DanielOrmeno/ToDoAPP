import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges().subscribe(item => this.onSnapshotChanged(item));
  }

  onSnapshotChanged(item) {
    this.toDoListArray = [];
    item.forEach(element => {
      const x = element.payload.toJSON();
      x['$key'] = element.key;
      this.toDoListArray.push(x);
    });

    this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
    });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked: boolean) {
    this.toDoService.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
