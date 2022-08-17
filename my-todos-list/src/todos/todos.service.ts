import {Injectable, NotFoundException} from "@nestjs/common";
import {Todo} from "./todos.model";
import {getAuth, signInWithCustomToken, connectAuthEmulator } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import * as ServiceAccount from "./todoslist-adminsdk.json"
const firebaseConfig = {
    apiKey: "AIzaSyAO0vD-h9xhDoFOkSojdNyjHNTCVlu5agw",
    authDomain: "todoslist-c4530.firebaseapp.com",
    projectId: "todoslist-c4530",
    storageBucket: "todoslist-c4530.appspot.com",
    messagingSenderId: "943090214915",
    appId: "1:943090214915:web:096ffde8456904abdd0636"
}

initializeApp(firebaseConfig);

export let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

let db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8080);

let auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099')

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    async getToken(uid: string) {
        const customToken = await admin.auth().createCustomToken(uid, { role: 'student' }) 
        const userCredentials = await signInWithCustomToken(auth, customToken)
        return { access_token: await userCredentials.user.getIdToken(), refresh_token: userCredentials.user.refreshToken } 
    }

    async fetchTodos(myUid: string) {
        this.todos = [];
        try {
            const promise = await admin.firestore().collection(myUid).get()
            promise.forEach((todo) => {
                const theTodo = todo.data();
                this.todos.push(new Todo(theTodo.id, theTodo.title, theTodo.desc))
            })
            console.log({...this.todos})
            return {...this.todos}
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to get these TODOs');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    async fetchTodo(myId: string, myUid: string) {
        try {
            const promise = await admin.firestore().collection(myUid).doc(myId).get()
            return {...promise.data()};
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission to get this TODO');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
    }

    async updateTodo(myUid: string, myId: string, title: string, desc: string): Promise<string> {
        await this.fetchTodo(myId, myUid).then(async (myTodo) => {
            if(title) {
                myTodo.title = title;
            }
            if(desc) {
                myTodo.desc = desc;
            }
            try {
                await admin.firestore().collection(myUid).doc(myId).update(myTodo)
            } catch (e) {
                if(e.code == 'permission-denied')
                    throw new NotFoundException('Without permission to update this TODO');
                else
                    throw new NotFoundException('ERROR: ' + e);
            }
        })
        return 'TODO successfully updated'
    }

    async deleteTodo(myUid: string, myId: string): Promise<string> {
        try {
            await admin.firestore().collection(myUid).doc(myId).delete();
        } catch (e) {
            if(e.code == 'permission-denied')
                throw new NotFoundException('Without permission delete this TODO');
            else
                throw new NotFoundException('ERROR: ' + e);
        }
        return `TODO successfully deleted`;
    }
}
