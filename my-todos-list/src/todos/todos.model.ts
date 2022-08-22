export class Todo {
  constructor(public id: string, public title: string, public desc: string) {}
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.desc,
    };
  }
}
