export class Task {
  _id?: string;
  description: string;
  completed: boolean;

  constructor(description: string, completed: boolean = false) {
    this.description = description;
    this.completed = completed;
  }
}