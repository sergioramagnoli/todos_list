import {Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import {TodosService} from "./todos.service";


@Controller()
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
    @Post(':uid/newTodo')
    addTodo(
        @Param('uid') myUid: string,
        @Body('title') myTitle: string,
        @Body('desc') myDesc: string
    ) {
        return this.todosService.addTodo(myUid, myTitle, myDesc);
    }

    @Post('login/:uid')
    getCustomToken(@Param('uid') myUid: string) {
        return this.todosService.getToken(myUid)
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