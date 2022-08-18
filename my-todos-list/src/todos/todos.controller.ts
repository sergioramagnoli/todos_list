import {Controller, Post, Body, Get, Patch, Delete, Req, NotFoundException, Response} from "@nestjs/common";
import {admin, auth, TodosService} from "./todos.service";
import {Request} from "express";
import {Todo} from "./todos.model";
import {signInWithCustomToken} from "firebase/auth";

@Controller()
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
    private todos: Todo[] = [];

    // login
    @Post('/login')
    async getCustomToken(@Body('uid') uid: string) {
        const customToken = await admin.auth().createCustomToken(uid, { role: 'student' })
        const userCredentials = await signInWithCustomToken(auth, customToken)
        return { access_token: await userCredentials.user.getIdToken(), refresh_token: userCredentials.user.refreshToken }
    }

    // agregar todo
    @Post('newTodo')
    async addTodo(
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string,
        @Req() req: Request,
        @Response() res
    ) {
        const myId = new Date().getTime().toString(); 
        const myTodo = {id: myId, title: myTitle, desc: myDesc};
        try {  
            await admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).set(myTodo);
            res.send('TODO successfully added');
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to add a TODO here');
            else
                throw new NotFoundException(`ERROR: ${e}`);
        }
    }

    // traer todos los todos
    @Get('getTodos')
    async getTodos(
        @Response() res,
        @Req() req: Request,
    ) {
        this.todos = [];
        try {
            const promise = await admin.firestore().collection(res.locals.decodedToken.uid).get()
            promise.forEach((todo) => {
                const theTodo = todo.data();
                this.todos.push(new Todo(theTodo.id, theTodo.title, theTodo.desc))
            })
            res.send({...this.todos});
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to get these TODOs');
            else
                throw new NotFoundException(`ERROR: ${e}`);
        }
    } 

    //traer un solo todo
    @Get('getTodo')
    async GetOneTodo(
        @Body('id') myId: string,
        @Response() res,
        @Req() req: Request,
    ) {
            try {
                const promise = await admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).get()
                res.send({...promise.data()});
            } catch (e) {
                if(e.code == 'permission-denied')
                    throw new NotFoundException('Without permission to get this TODO');
                else
                    throw new NotFoundException(`ERROR: ${e}`);
            }
    }

    // actualizar todo
    @Patch('updateTodo')
    async updateTodo(
        @Req() req: Request,
        @Response() res,
        @Body('id') myId: string,
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string
    ) {
        try {
            const promise = await admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).get()
            let myTodo =  promise.data()
            if(myTitle) {
                myTodo.title = myTitle;
            }
            if(myDesc) {
                myTodo.desc = myDesc;
            }
            await admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).update(myTodo)
        } catch (e) {
            if (e.code == 'permission-denied')
                throw new NotFoundException('Without permission to update this TODO');
            else
                throw new NotFoundException(`ERROR: ${e}`);
        }
        res.send('TODO successfully updated');
    }

    // eliminar todo
    @Delete('deleteTodo')
    async deleteTodo(
        @Req() req: Request,
        @Response() res,
        @Body('id') myId: string
    ) {
        try {
            await admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).delete();
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission delete this TODO');
            else
                throw new NotFoundException(`ERROR: ${e}`);
        }
        res.send(`TODO successfully deleted`);
    }
}
