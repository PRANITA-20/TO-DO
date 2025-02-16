import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ToDoItem} from '../../models/todo';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, AfterViewInit  {
  newTaskItem:string='';
  todoItemList: ToDoItem[]=[];
  selectedValue: string='all';
  displayedColumns: string[] = ['status', 'task', 'complete','delete'];
  dataSource=new MatTableDataSource<ToDoItem>(this.todoItemList);
  ngOnInit(){
  this.updateData('All');
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
      this.updateData('all');
  }}
 
    updateData(filter: string): void {
      let filteredData: ToDoItem[];
  
      if (filter === 'completed') {
        filteredData = this.todoItemList.filter(task => task.completed);
      } else if (filter === 'pending') {
        filteredData = this.todoItemList.filter(task => !task.completed);
      } else {
        filteredData = [...this.todoItemList]; // 'all' filter
      }
  
      // Update the table's data source
      this.dataSource.data = filteredData;
  
      setTimeout(() => {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.firstPage();
        }
      });
    }
  deleteTask(id:Number):void{
    this.todoItemList = this.todoItemList.filter(item => item.id !== id);
    this.updateData('all');
  }
  toggleTaskCompletion(task: ToDoItem): void{
    task.completed = !task.completed;
    this.updateData('all');
  }
}
