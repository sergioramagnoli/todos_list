import { TodosService } from "./todos.service";
import { Request } from "express";
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    getCustomToken(uid: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    addTodo(myTitle: string, myDesc: string, req: Request, res: any): Promise<void>;
    getTodos(res: any, req: Request): Promise<{
        [x: number]: import("./todos.model").Todo;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): import("./todos.model").Todo;
        push(...items: import("./todos.model").Todo[]): number;
        concat(...items: ConcatArray<import("./todos.model").Todo>[]): import("./todos.model").Todo[];
        concat(...items: (import("./todos.model").Todo | ConcatArray<import("./todos.model").Todo>)[]): import("./todos.model").Todo[];
        join(separator?: string): string;
        reverse(): import("./todos.model").Todo[];
        shift(): import("./todos.model").Todo;
        slice(start?: number, end?: number): import("./todos.model").Todo[];
        sort(compareFn?: (a: import("./todos.model").Todo, b: import("./todos.model").Todo) => number): import("./todos.model").Todo[];
        splice(start: number, deleteCount?: number): import("./todos.model").Todo[];
        splice(start: number, deleteCount: number, ...items: import("./todos.model").Todo[]): import("./todos.model").Todo[];
        unshift(...items: import("./todos.model").Todo[]): number;
        indexOf(searchElement: import("./todos.model").Todo, fromIndex?: number): number;
        lastIndexOf(searchElement: import("./todos.model").Todo, fromIndex?: number): number;
        every<S extends import("./todos.model").Todo>(predicate: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => U, thisArg?: any): U[];
        filter<S_1 extends import("./todos.model").Todo>(predicate: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => unknown, thisArg?: any): import("./todos.model").Todo[];
        reduce(callbackfn: (previousValue: import("./todos.model").Todo, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => import("./todos.model").Todo): import("./todos.model").Todo;
        reduce(callbackfn: (previousValue: import("./todos.model").Todo, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => import("./todos.model").Todo, initialValue: import("./todos.model").Todo): import("./todos.model").Todo;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: import("./todos.model").Todo, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => import("./todos.model").Todo): import("./todos.model").Todo;
        reduceRight(callbackfn: (previousValue: import("./todos.model").Todo, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => import("./todos.model").Todo, initialValue: import("./todos.model").Todo): import("./todos.model").Todo;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("./todos.model").Todo, currentIndex: number, array: import("./todos.model").Todo[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends import("./todos.model").Todo>(predicate: (this: void, value: import("./todos.model").Todo, index: number, obj: import("./todos.model").Todo[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: import("./todos.model").Todo, index: number, obj: import("./todos.model").Todo[]) => unknown, thisArg?: any): import("./todos.model").Todo;
        findIndex(predicate: (value: import("./todos.model").Todo, index: number, obj: import("./todos.model").Todo[]) => unknown, thisArg?: any): number;
        fill(value: import("./todos.model").Todo, start?: number, end?: number): import("./todos.model").Todo[];
        copyWithin(target: number, start: number, end?: number): import("./todos.model").Todo[];
        entries(): IterableIterator<[number, import("./todos.model").Todo]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<import("./todos.model").Todo>;
        includes(searchElement: import("./todos.model").Todo, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: import("./todos.model").Todo, index: number, array: import("./todos.model").Todo[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<import("./todos.model").Todo>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        at(index: number): import("./todos.model").Todo;
    }>;
    GetOneTodo(myId: string, res: any, req: Request): Promise<any>;
    updateTodo(req: Request, res: any, myId: string, myTitle: string, myDesc: string): Promise<string>;
    deleteTodo(req: Request, res: any, myId: string): Promise<string>;
}
