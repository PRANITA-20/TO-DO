import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoComponent } from './to-do.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoComponent],
      imports: [
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //test cases
  it('should create the To-do component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new task on addNewTask getting triggered', () => {
    component.newTaskItem = 'New Task 1';
    component.addNewTask();
    expect(component.todoItemList.length).toBe(1);
    expect(component.todoItemList[0].task).toBe('New Task 1');
    expect(component.todoItemList[0].completed).toBeFalse();
  });

  it('should not add an empty task i.e if value of newTaskItem is " " ', () => {
    component.newTaskItem = '   ';
    component.addNewTask();
    expect(component.todoItemList.length).toBe(0);
  });
  
  it('should toggle task completion status on selecting the checkbox', () => {
    component.newTaskItem = 'New Task to Toggle';
    component.addNewTask();
    const newTask = component.todoItemList[0];

    component.toggleTaskCompletion(newTask);
    expect(newTask.completed).toBeTrue();

    component.toggleTaskCompletion(newTask);
    expect(newTask.completed).toBeFalse();
  });

  it('should delete a task on calling deleteTask method', () => {
    component.newTaskItem = 'Delete this Task';
    component.addNewTask();
    const id = component.todoItemList[0].id;
    component.deleteTask(id); 
    expect(component.todoItemList.length).toBe(0);
  });
  it('should filter pending tasks on selecting pending from the dropdown', () => {
    component.todoItemList = [
      { id: 1, task: 'Completed', completed: true },
      { id: 2, task: 'Pending', completed: false },
    ];
    component.updateData('pending');
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].task).toBe('Pending');
  });

  it('should filter the completed tasks on selecting completed from the dropdown', () => {
    component.todoItemList = [
      { id: 1, task: 'Completed', completed: true },
      { id: 2, task: 'Pending', completed: false },
    ];
    component.updateData('completed');
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].task).toBe('Completed');
  });

  it('should show all tasks when all is selected from the dropdown', () => {
    component.todoItemList = [
      { id: 1, task: 'Pending', completed: false },
      { id: 2, task: 'Completed', completed: true }
    ];
    component.updateData('all');
    expect(component.dataSource.data.length).toBe(2);
  });
});
