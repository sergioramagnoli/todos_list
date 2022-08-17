import {Controller, Post, Body, Get, Patch, Delete, Req, NotFoundException, Response} from "@nestjs/common";
import {admin, TodosService} from "./todos.service";
import {Request} from "express";

@Controller()
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    // login
    @Post('/login')
    getCustomToken(@Body('uid') uid: string) {
        return this.todosService.getToken(uid)
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
            admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).set(myTodo).then( () => {
                return 'TODO successfully added'
            })
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to add a TODO here');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    // traer todos los todos
    @Get('getTodos')
    getTodos(
        @Response() res,
        @Req() req: Request,
    ) {
        return this.todosService.fetchTodos(res.locals.decodedToken.uid);
    } 

    //traer un solo todo
    @Get('getTodo')
    GetOneTodo(
        @Body('id') myId: string,
        @Response() res,
        @Req() req: Request,
    ) {
        return this.todosService.fetchTodo(res.locals.decodedToken.uid, myId)
    }

    // actualizar todo
    @Patch('updateTodo')
    updateTodo(
        @Req() req: Request,
        @Response() res,
        @Body('id') myId: string,
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string
    ) {
        return this.todosService.updateTodo(res.locals.decodedToken.uid, myId, myTitle, myDesc);
    }

    // eliminar todo
    @Delete('deleteTodo')
    deleteTodo(
        @Req() req: Request,
        @Response() res,
        @Body('id') myId: string
    ) {
        return this.todosService.deleteTodo(res.locals.decodedToken.uid, myId);
    }
}
