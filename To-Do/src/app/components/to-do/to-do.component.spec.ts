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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty task list', () => {
    expect(component.todoItemList.length).toBe(0);
  });

  it('should add a new task', () => {
    component.newTaskItem = 'Test Task';
    component.addNewTask();
    expect(component.todoItemList.length).toBe(1);
    expect(component.todoItemList[0].task).toBe('Test Task');
    expect(component.todoItemList[0].completed).toBeFalse();
  });

  it('should not add an empty task', () => {
    component.newTaskItem = '   ';
    component.addNewTask();
    expect(component.todoItemList.length).toBe(0);
  });

  it('should delete a task', () => {
    component.newTaskItem = 'Task to Delete';
    component.addNewTask();
    const taskId = component.todoItemList[0].id;
    
    component.deleteTask(taskId);
    
    expect(component.todoItemList.length).toBe(0);
  });

  it('should toggle task completion status', () => {
    component.newTaskItem = 'Task to Toggle';
    component.addNewTask();
    const task = component.todoItemList[0];

    component.toggleTaskCompletion(task);
    expect(task.completed).toBeTrue();

    component.toggleTaskCompletion(task);
    expect(task.completed).toBeFalse();
  });

  it('should filter completed tasks', () => {
    component.todoItemList = [
      { id: 1, task: 'Completed Task', completed: true },
      { id: 2, task: 'Pending Task', completed: false },
    ];
    component.updateData('completed');
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].task).toBe('Completed Task');
  });

  it('should filter pending tasks', () => {
    component.todoItemList = [
      { id: 1, task: 'Completed Task', completed: true },
      { id: 2, task: 'Pending Task', completed: false },
    ];
    component.updateData('pending');
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].task).toBe('Pending Task');
  });

  it('should show all tasks when "all" filter is selected', () => {
    component.todoItemList = [
      { id: 1, task: 'Completed Task', completed: true },
      { id: 2, task: 'Pending Task', completed: false },
    ];
    component.updateData('all');
    expect(component.dataSource.data.length).toBe(2);
  });
});
