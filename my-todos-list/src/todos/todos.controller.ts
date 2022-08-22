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
import { Todo } from "./todos.model";
import { signInWithCustomToken } from "firebase/auth";
import { admin, auth } from "../firebase";

const todoFromFirestoreDocument = (document): Todo => {
  const data = document.data();
  return new Todo(document.id, data.title, data.desc);
};

@Controller("todos")
export class TodosController {
  constructor() {}
  private todos: Todo[] = [];

  // login
  @Post("/login")
  async getCustomToken(@Body("uid") uid: string) {
    const customToken = await admin
      .auth()
      .createCustomToken(uid, { role: "student" });
    const userCredentials = await signInWithCustomToken(auth, customToken);
    return {
      access_token: await userCredentials.user.getIdToken(),
      refresh_token: userCredentials.user.refreshToken,
    };
  }

  @Post()
  async addTodo(
    @Body("title") myTitle: string,
    @Body("desc") myDesc: string,
    @Req() req: Request,
    @Response() res
  ) {
    const myTodo = { title: myTitle, desc: myDesc };
    const createdDocument = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .collection("todos")
      .add(myTodo);
    res.status(HttpStatus.CREATED).json({
      id: createdDocument.id,
      title: myTitle,
      desc: myDesc,
    });
  }

  @Get()
  async getTodos(@Response() res, @Req() req: Request) {
    const snapshot = await admin
      .firestore()
      .collection(res.locals.decodedToken.uid)
      .get();
    const todos = snapshot.docs.map(todoFromFirestoreDocument);
    res.send({ todos });
  }

  @Get("/:id")
  async GetOneTodo(
    @Param("id") myId: string,
    @Response() res,
    @Req() req: Request
  ) {
    const document = await admin
      .firestore()
      .collection(res.locals.decodedToken.uid)
      .doc(myId)
      .get();
    const todo = todoFromFirestoreDocument(document);
    res.send({ todo });
  }

  @Patch("/:id")
  async updateTodo(
    @Req() req: Request,
    @Response() res,
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("desc") description: string
  ) {
    const document = await admin
      .firestore()
      .collection(res.locals.decodedToken.uid)
      .doc(id)
      .get();
    let todo = todoFromFirestoreDocument(document);
    await admin
      .firestore()
      .collection(res.locals.decodedToken.uid)
      .doc(id)
      .update(todo);
    res.status(HttpStatus.CREATED).json(todo.toJSON());
  }

  @Delete("/:id")
  async deleteTodo(
    @Req() req: Request,
    @Response() res,
    @Param("id") myId: string
  ) {
    await admin
      .firestore()
      .collection(res.locals.decodedToken.uid)
      .doc(myId)
      .delete();
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
