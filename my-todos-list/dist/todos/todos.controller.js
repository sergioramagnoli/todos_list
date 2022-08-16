"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    async addTodo(myUid, myTitle, myDesc, req) {
        const accessToken = req.headers.authorization.split(" ")[1];
        const decodedToken = await todos_service_1.admin.auth().verifyIdToken(accessToken);
        const myId = new Date().getTime().toString();
        const myTodo = { id: myId, title: myTitle, desc: myDesc };
        try {
            await todos_service_1.admin.firestore().collection(decodedToken.uid).doc(myId).set(myTodo);
            return 'TODO successfully added';
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to add a TODO here');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    getCustomToken(uid) {
        return this.todosService.getToken(uid);
    }
    getTodos(myUid) {
        return this.todosService.fetchTodos(myUid);
    }
    GetOneTodo(myUid, myId) {
        return this.todosService.fetchTodo(myUid, myId);
    }
    updateTodo(myUid, myId, myTitle, myDesc) {
        return this.todosService.updateTodo(myUid, myId, myTitle, myDesc);
    }
    deleteTodo(myUid, myId) {
        return this.todosService.deleteTodo(myUid, myId);
    }
};
__decorate([
    (0, common_1.Post)(':uid/newTodo'),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('desc')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "addTodo", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getCustomToken", null);
__decorate([
    (0, common_1.Get)(':uid/todos'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Get)(':uid/todos/:id'),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "GetOneTodo", null);
__decorate([
    (0, common_1.Patch)(':uid/updateTodo/:id'),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('title')),
    __param(3, (0, common_1.Body)('desc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)(':uid/deleteTodo/:id'),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "deleteTodo", null);
TodosController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map