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
const firebaseConfig = {
    apiKey: "AIzaSyAO0vD-h9xhDoFOkSojdNyjHNTCVlu5agw",
    authDomain: "todoslist-c4530.firebaseapp.com",
    projectId: "todoslist-c4530",
    storageBucket: "todoslist-c4530.appspot.com",
    messagingSenderId: "943090214915",
    appId: "1:943090214915:web:096ffde8456904abdd0636"
};
let app = (0, app_1.initializeApp)(firebaseConfig);
exports.admin = require('firebase-admin');
const ServiceAccount = require("./todoslist-adminsdk.json");
exports.admin.initializeApp({
    credential: exports.admin.credential.cert(ServiceAccount)
});
let db = (0, firestore_1.getFirestore)(app);
let auth = (0, auth_1.getAuth)(app);
(0, auth_1.connectAuthEmulator)(auth, "http://localhost:9099");
let TodosService = class TodosService {
    constructor() {
        this.todos = [];
    }
    async getToken(uid) {
        const customToken = await exports.admin.auth().createCustomToken(uid, { role: 'student' });
        const userCredentials = await (0, auth_1.signInWithCustomToken)(auth, customToken);
        return { access_token: await userCredentials.user.getIdToken(), refresh_token: userCredentials.user.refreshToken };
    }
    async fetchTodos(uid) {
        this.todos = [];
        try {
            const query = await (0, firestore_1.getDocs)((0, firestore_1.collection)(db, uid));
            query.forEach((myTodo) => {
                const theTodo = myTodo.data();
                this.todos.push(new todos_model_1.Todo(theTodo.id, theTodo.title, theTodo.desc));
            });
            return Object.assign({}, this.todos);
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to get these TODOs');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    async fetchTodo(uid, id) {
        try {
            const query = await (0, firestore_1.getDoc)((0, firestore_1.doc)(db, uid, id));
            return Object.assign({}, query.data());
        }
        catch (e) {
            if (e.code == 'permission-denied')
                throw new common_1.NotFoundException('Without permission to get this TODO');
            else
                throw new common_1.NotFoundException('ERROR: ' + e);
        }
    }
    async updateTodo(uid, id, title, desc) {
        await this.fetchTodo(uid, id).then(async (myTodo) => {
            if (title) {
                myTodo.title = title;
            }
            if (desc) {
                myTodo.desc = desc;
            }
            try {
                await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, uid, id), myTodo);
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
    async deleteTodo(uid, id) {
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(db, uid, id));
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