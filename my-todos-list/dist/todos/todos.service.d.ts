import { Todo } from "./todos.model";
export declare let admin: any;
export declare class TodosService {
    private todos;
    getToken(uid: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    fetchTodos(uid: string): Promise<{
        [x: number]: Todo;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): Todo;
        push(...items: Todo[]): number;
        concat(...items: ConcatArray<Todo>[]): Todo[];
        concat(...items: (Todo | ConcatArray<Todo>)[]): Todo[];
        join(separator?: string): string;
        reverse(): Todo[];
        shift(): Todo;
        slice(start?: number, end?: number): Todo[];
        sort(compareFn?: (a: Todo, b: Todo) => number): Todo[];
        splice(start: number, deleteCount?: number): Todo[];
        splice(start: number, deleteCount: number, ...items: Todo[]): Todo[];
        unshift(...items: Todo[]): number;
        indexOf(searchElement: Todo, fromIndex?: number): number;
        lastIndexOf(searchElement: Todo, fromIndex?: number): number;
        every<S extends Todo>(predicate: (value: Todo, index: number, array: Todo[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: Todo, index: number, array: Todo[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: Todo, index: number, array: Todo[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: Todo, index: number, array: Todo[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: Todo, index: number, array: Todo[]) => U, thisArg?: any): U[];
        filter<S_1 extends Todo>(predicate: (value: Todo, index: number, array: Todo[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: Todo, index: number, array: Todo[]) => unknown, thisArg?: any): Todo[];
        reduce(callbackfn: (previousValue: Todo, currentValue: Todo, currentIndex: number, array: Todo[]) => Todo): Todo;
        reduce(callbackfn: (previousValue: Todo, currentValue: Todo, currentIndex: number, array: Todo[]) => Todo, initialValue: Todo): Todo;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: Todo, currentIndex: number, array: Todo[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: Todo, currentValue: Todo, currentIndex: number, array: Todo[]) => Todo): Todo;
        reduceRight(callbackfn: (previousValue: Todo, currentValue: Todo, currentIndex: number, array: Todo[]) => Todo, initialValue: Todo): Todo;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: Todo, currentIndex: number, array: Todo[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends Todo>(predicate: (this: void, value: Todo, index: number, obj: Todo[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: Todo, index: number, obj: Todo[]) => unknown, thisArg?: any): Todo;
        findIndex(predicate: (value: Todo, index: number, obj: Todo[]) => unknown, thisArg?: any): number;
        fill(value: Todo, start?: number, end?: number): Todo[];
        copyWithin(target: number, start: number, end?: number): Todo[];
        entries(): IterableIterator<[number, Todo]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<Todo>;
        includes(searchElement: Todo, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: Todo, index: number, array: Todo[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<Todo>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        at(index: number): Todo;
    }>;
    fetchTodo(uid: string, id: string): Promise<{
        [x: string]: any;
    }>;
    updateTodo(uid: string, id: string, title: string, desc: string): Promise<string>;
    deleteTodo(uid: string, id: string): Promise<string>;
}
