import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Response,
} from "@nestjs/common";
import { Request } from "express";
import { Todo } from "./TodosModel";
import { admin } from "../firebase";

const todoFromFirestoreDocument = (document): Todo => {
  const data = document.data();
  return new Todo(document.id, data.title, data.desc);
};

@Controller("todos")
export class TodosController {
  constructor() {}
  private todos: Todo[] = [];

  @Post()
  async addTodo(
    @Body("title") title: string,
    @Body("desc") description: string,
    @Req() req: Request,
    @Response() res
  ) {
    const myTodo = { title: title, desc: description };
    const createdDocument = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .add(myTodo);
    res.status(HttpStatus.CREATED).json({
      id: createdDocument.id,
      title: title,
      desc: description,
    });
  }

  @Get()
  async getTodos(@Response() res, @Req() req: Request) {
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .get();
    const todos: Todo[] = snapshot.docs.map(todoFromFirestoreDocument);
    res.send({ todos });
  }

  @Get("/:id")
  async getOneTodo(
    @Param("id") id: string,
    @Response() res,
    @Req() req: Request
  ) {
    const document = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .doc(id)
      .get();
    const todo: Todo = todoFromFirestoreDocument(document);
    res.send({ todo });
  }

  @Patch("/:id")
  async updateTodo(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("desc") description: string,
    @Req() req: Request,
    @Response() res
  ) {
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .doc(id)
      .get();
    let document = snapshot.data();
    document.title = title ? title : document.title;
    document.desc = description ? description : document.desc;
    await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .doc(id)
      .update(document);
    res.status(HttpStatus.CREATED).json({ id: snapshot.id, ...document });
  }

  @Delete("/:id")
  async deleteTodo(
    @Req() req: Request,
    @Response() res,
    @Param("id") id: string
  ) {
    await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .doc(id)
      .delete();
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
