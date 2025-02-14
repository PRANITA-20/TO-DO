import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ToDoItem} from '../../models/todo';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, AfterViewInit  {
  newTaskItem:string='';
  todoItemList: ToDoItem[]=[];
  displayedColumns: string[] = ['status', 'task', 'complete','delete'];
  dataSource=new MatTableDataSource<ToDoItem>(this.todoItemList);
  ngOnInit(){
  this.updateData();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  addNewTask():void{
    if(this.newTaskItem.trim()!==''){
      const todoItem: ToDoItem={
        id:Date.now(),
        task:this.newTaskItem,
        completed:false
      }
      this.todoItemList.push(todoItem);
      this.newTaskItem='';
      this.updateData();
  }}
   updateData():void{
    this.dataSource.data = this.todoItemList; 
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; 
    }
   }
  deleteTask(id:Number):void{
    this.todoItemList = this.todoItemList.filter(item => item.id !== id);
    this.updateData();
  }
  toggleTaskCompletion(task: ToDoItem): void{
    task.completed = !task.completed;
  }
}
