"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = exports.admin = void 0;
const common_1 = require("@nestjs/common");
const todos_model_1 = require("./todos.model");
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const ServiceAccount = require("./todoslist-adminsdk.json");
const firebaseConfig = {
    apiKey: "AIzaSyAO0vD-h9xhDoFOkSojdNyjHNTCVlu5agw",
    authDomain: "todoslist-c4530.firebaseapp.com",
    projectId: "todoslist-c4530",
    storageBucket: "todoslist-c4530.appspot.com",
    messagingSenderId: "943090214915",
    appId: "1:943090214915:web:096ffde8456904abdd0636"
};
(0, app_1.initializeApp)(firebaseConfig);
exports.admin = require('firebase-admin');
exports.admin.initializeApp({
    credential: exports.admin.credential.cert(ServiceAccount)
});
let db = (0, firestore_1.getFirestore)();
(0, firestore_1.connectFirestoreEmulator)(db, 'localhost', 8080);
let auth = (0, auth_1.getAuth)();
(0, auth_1.connectAuthEmulator)(auth, 'http://localhost:9099');
let TodosService = class TodosService {
    constructor() {
        this.todos = [];
    }
    async getToken(uid) {
        const customToken = await exports.admin.auth().createCustomToken(uid, { role: 'student' });
        const userCredentials = await (0, auth_1.signInWithCustomToken)(auth, customToken);
        return { access_token: await userCredentials.user.getIdToken(), refresh_token: userCredentials.user.refreshToken };
    }
    async fetchTodos(myUid) {
        this.todos = [];
        try {
            const promise = await exports.admin.firestore().collection(myUid).get();
            promise.forEach((todo) => {
                const theTodo = todo.data();
                this.todos.push(new todos_model_1.Todo(theTodo.id, theTodo.title, theTodo.desc));
            });
            console.log(Object.assign({}, this.todos));
            return Object.assign({}, this.todos);
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to get these TODOs');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    async fetchTodo(myId, myUid) {
        try {
            const promise = await exports.admin.firestore().collection(myUid).doc(myId).get();
            return Object.assign({}, promise.data());
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to get this TODO');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    async updateTodo(myUid, myId, title, desc) {
        await this.fetchTodo(myId, myUid).then(async (myTodo) => {
            if (title) {
                myTodo.title = title;
            }
            if (desc) {
                myTodo.desc = desc;
            }
            try {
                await exports.admin.firestore().collection(myUid).doc(myId).update(myTodo);
            }
            catch (e) {
                if (e.code == 'permission-denied')
                    throw new common_1.NotFoundException('Without permission to update this TODO');
                else
                    throw new common_1.NotFoundException('ERROR: ' + e);
            }
        });
        return 'TODO successfully updated';
    }
    async deleteTodo(myUid, myId) {
        try {
            await exports.admin.firestore().collection(myUid).doc(myId).delete();
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission delete this TODO');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
        return `TODO successfully deleted`;
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map