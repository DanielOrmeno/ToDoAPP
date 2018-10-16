import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service'
import { element } from 'protractor';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray:any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges().subscribe(item=>{
      this.toDoListArray=[];
      item.forEach(element=>{
        var x = element.payload.toJSON();
        x["$key"]=element.key;
        this.toDoListArray.push(x);
      })

        this.toDoListArray.sort((a,b)=>{
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle){
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value=null;
  }

  alterCheck($key:string,isChecked){
    this.toDoService.checkOrUncheckTitle($key,!isChecked);
  }

  onDelete($key:string){
    this.toDoService.removeTitle($key);
  }
}
