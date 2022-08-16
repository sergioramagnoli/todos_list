import {Controller, Post, Body, Get, Param, Patch, Delete, Req, NotFoundException} from "@nestjs/common";
import {admin, TodosService} from "./todos.service";
import {Request} from "express";


@Controller()
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
    @Post(':uid/newTodo')
    async addTodo(
        @Param('uid') myUid: string,
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string,
        @Req() req: Request
    ) {  
        const accessToken = req.headers.authorization.split(" ")[1]
        const decodedToken = await admin.auth().verifyIdToken(accessToken)
        const myId = new Date().getTime().toString(); 
        const myTodo = {id: myId, title: myTitle, desc: myDesc};
        try {  
            await admin.firestore().collection(decodedToken.uid).doc(myId).set(myTodo)
            return 'TODO successfully added'
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to add a TODO here');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    @Post('/login')
    getCustomToken(@Body('uid') uid: string) {
        return this.todosService.getToken(uid)
    }

    @Get(':uid/todos')
    getTodos(@Param('uid') myUid: string) {
        return this.todosService.fetchTodos(myUid);
    } 

    @Get(':uid/todos/:id')
    GetOneTodo(
        @Param('uid') myUid: string,
        @Param('id') myId: string,
    ) {
        return this.todosService.fetchTodo(myUid, myId)
    }

    @Patch(':uid/updateTodo/:id')
    updateTodo(
        @Param('uid') myUid: string,
        @Param('id') myId: string,
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string
    ) {
        return this.todosService.updateTodo(myUid, myId, myTitle, myDesc);
    }

    @Delete(':uid/deleteTodo/:id')
    deleteTodo(
        @Param('uid') myUid: string,
        @Param('id') myId: string
    ) {
        return this.todosService.deleteTodo(myUid, myId);
    }
}
