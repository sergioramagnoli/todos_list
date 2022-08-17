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
    getCustomToken(uid) {
        return this.todosService.getToken(uid);
    }
    async addTodo(myTitle, myDesc, req, res) {
        const myId = new Date().getTime().toString();
        const myTodo = { id: myId, title: myTitle, desc: myDesc };
        try {
            todos_service_1.admin.firestore().collection(res.locals.decodedToken.uid).doc(myId).set(myTodo).then(() => {
                return 'TODO successfully added';
            });
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to add a TODO here');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    getTodos(res, req) {
        return this.todosService.fetchTodos(res.locals.decodedToken.uid);
    }
    GetOneTodo(myId, res, req) {
        return this.todosService.fetchTodo(res.locals.decodedToken.uid, myId);
    }
    updateTodo(req, res, myId, myTitle, myDesc) {
        return this.todosService.updateTodo(res.locals.decodedToken.uid, myId, myTitle, myDesc);
    }
    deleteTodo(req, res, myId) {
        return this.todosService.deleteTodo(res.locals.decodedToken.uid, myId);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getCustomToken", null);
__decorate([
    (0, common_1.Post)('newTodo'),
    __param(0, (0, common_1.Body)('title')),
    __param(1, (0, common_1.Body)('desc')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "addTodo", null);
__decorate([
    (0, common_1.Get)('getTodos'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Get)('getTodo'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "GetOneTodo", null);
__decorate([
    (0, common_1.Patch)('updateTodo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)('id')),
    __param(3, (0, common_1.Body)('title')),
    __param(4, (0, common_1.Body)('desc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)('deleteTodo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "deleteTodo", null);
TodosController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map