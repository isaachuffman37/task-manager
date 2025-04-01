import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  congratulateMessage: string;
  encourageMessage: string;
  source: string = "- Albert Einstein"

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(action: string = null, task: Task = null): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.filter((task) => !task.completed);
      this.completedTasks = tasks.filter((task) => task.completed);
      if ( action == 'done' && this.tasks.length < 1){
        this.congratulateMessage = "You did it! You completed your tasks!"
      } else if (action == 'delete' && this.tasks.length < 1 && !task?.completed){
        this.encourageMessage = "Oh, so you think you're a big man, huh? Just throwing your tasks away because it will make life easier? Typical. You're not a man. You're barely equivalent to the chewed up peice of gum under your seat. Pfft, heck if I were you, I wouldn't even get out of bed in the morning. What's the point? You're just gonna cut corners anyway. Do your day right, or don't do it at all. "
      } else {
        if (this.congratulateMessage){
          this.congratulateMessage = null;
        }
        if (this.encourageMessage){
          this.encourageMessage = null;
        }
      }
    });
  }

  completeAllTasks() {
    this.taskService.completeAllTasks().subscribe(()=>this.loadTasks());
  }
  uncompleteAllTasks() {
    this.taskService.uncompleteAllTasks().subscribe(()=>this.loadTasks());
  }

  deleteAllTasks() {
    this.taskService.deleteAllTasks().subscribe(() => this.loadTasks());
  }

  addTask(description: string): void {
    if (!description.trim()) return;
    const newTask = new Task(description);
    this.taskService.addTask(newTask).subscribe(() => this.loadTasks());
  }

  markAsDone(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task).subscribe(() => this.loadTasks('done'));
  }

  undoTask(task: Task): void {
    task.completed = false;
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(() => this.loadTasks('delete', task));
  }
}
