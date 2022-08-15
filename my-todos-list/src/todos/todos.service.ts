import {Injectable, NotFoundException} from "@nestjs/common";
import {Todo} from "./todos.model";
import {getAuth, signInWithCustomToken} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore, setDoc, doc, getDocs, getDoc, collection, updateDoc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAO0vD-h9xhDoFOkSojdNyjHNTCVlu5agw",
    authDomain: "todoslist-c4530.firebaseapp.com",
    projectId: "todoslist-c4530",
    storageBucket: "todoslist-c4530.appspot.com",
    messagingSenderId: "943090214915",
    appId: "1:943090214915:web:096ffde8456904abdd0636"
};

let app = initializeApp(firebaseConfig);
let admin = require('firebase-admin');
const ServiceAccount = require('./todoslist-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

let db = getFirestore(app)
let auth = getAuth(app);

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    async getToken(uid: string) {
        return await admin.auth().createCustomToken(uid)
            .then(async (CustomToken) => {
                return await signInWithCustomToken(auth, CustomToken)
                    .then((Cred) => {
                        return Cred;
                    })
            })
    }

    async addTodo(uid: string, title: string, desc: string) {
        const myId = new Date().getTime().toString();
        const myTodo = {id: myId, title: title, desc: desc};
        try {
            await setDoc(doc(db, uid, myId), myTodo)
            return 'TODO successfully added'
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to add a TODO here');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    async fetchTodos(uid: string) {
        this.todos = [];
        try {
            const query = await getDocs(collection(db, uid));
            query.forEach((myTodo) => {
                const theTodo = myTodo.data();
                this.todos.push(new Todo(theTodo.id, theTodo.title, theTodo.desc))
            })
            return {...this.todos}
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to get these TODOs');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    async fetchTodo(uid: string, id: string) {
        try {
            const query = await getDoc(doc(db, uid, id));
            return {...query.data()};
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to get this TODO');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    async updateTodo(uid: string, id: string, title: string, desc: string): Promise<string> {
        await this.fetchTodo(uid, id).then(async (myTodo) => {
            if(title) {
                myTodo.title = title;
            }
            if(desc) {
                myTodo.desc = desc;
            }
            try {
                await updateDoc(doc(db, uid, id), myTodo)
            } catch (e) {
                if(e.code == 'permission-denied')
                    throw new NotFoundException('Without permission to update this TODO');
                else
                    throw new NotFoundException('ERROR: ' + e);
            }
        })
        return 'TODO successfully updated'
    }

    async deleteTodo(uid: string, id: string): Promise<string> {
        try {
            await deleteDoc(doc(db, uid, id))
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission delete this TODO');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
        return `TODO successfully deleted`;
    }
}