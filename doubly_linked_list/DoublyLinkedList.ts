class DoublyLinkedListNode<T> {
    private _data: T;
    private _prev: DoublyLinkedListNode<T> | null;
    private _next: DoublyLinkedListNode<T> | null;

    constructor(data: T) {
        this._data = data;
        this._prev = null;
        this._next = null;
    }

    get data(): T {
        return this._data;
    }

    set data(data: T) {
        this._data = data;
    }

    get next(): DoublyLinkedListNode<T> | null {
        return this._next;
    }

    set next(node: DoublyLinkedListNode<T> | null) {
        this._next = node;
    }

    get prev(): DoublyLinkedListNode<T> | null {
        return this._prev;
    }

    set prev(node: DoublyLinkedListNode<T> | null) {
        this._prev = node;
    }

}

class DoublyLinkedListIterator<T> implements Iterator<DoublyLinkedListNode<T>> {
    private current: DoublyLinkedListNode<T> | null;

    constructor(startNode: DoublyLinkedListNode<T> | null) {
        this.current = startNode;
    }

    public next(): IteratorResult<DoublyLinkedListNode<T>> {
        if (this.current) {
            const value = this.current;
            this.current = this.current.next;
            return { done: false, value };
        } else {
            return { done: true, value: null };
        }
    }
}

class DoublyLinkedListReverseIterator<T> implements IterableIterator<DoublyLinkedListNode<T>> {
  private current: DoublyLinkedListNode<T> | null;

  constructor(node: DoublyLinkedListNode<T>) {
    this.current = node;
  }

  public next(): IteratorResult<DoublyLinkedListNode<T>> {
    if (this.current === null) {
      return { done: true, value: null };
    }

    const value = this.current;
    this.current = this.current.prev;

    return { done: false, value: value };
  }

  [Symbol.iterator](): IterableIterator<DoublyLinkedListNode<T>> {
    return this;
  }
}

interface ObjectWithToString {
    toString(): string;
}
class DoublyLinkedList<T extends ObjectWithToString> {
    private head: DoublyLinkedListNode<T> | null;
    private tail: DoublyLinkedListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public getSize(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public [Symbol.iterator](): Iterator<DoublyLinkedListNode<T>> {
        return new DoublyLinkedListIterator<T>(this.head);
    }

   
    public addFirst(data: T): boolean {
        const newNode = new DoublyLinkedListNode<T>(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }
        ++this.size;
        return true;
    }

    public addLast(data: T): boolean {
        const newNode = new DoublyLinkedListNode<T>(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        ++this.size;
        return true;
    }

    public removeFirst(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this.head;
        if (this.getSize() === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
            removedNode!.next = null;
        }
        --this.size;
        return removedNode!.data;
    }

    public removeLast(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this.tail;
        if (this.getSize() === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
            removedNode!.prev = null;
        }
        --this.size;
        return removedNode!.data;
    }

    public insertAt(index: number, data: T): boolean {
        if (index < 0 || index > this.size) {
            return false
        }

        if (index === 0) {
            return this.addFirst(data)
        }

        if (index === this.size) {
            return this.addLast(data)
        }

        const node = new DoublyLinkedListNode<T>(data)
        const current = this.getNodeAt(index)
        const prev = current!.prev

        node.prev = prev
        node.next = current
        current!.prev = node
        prev!.next = node
        ++this.size

        return true
    }

    public removeAt(index: number): T | null {
        if (index < 0 || index >= this.size) {
            return null
        }

        let current = this.getNodeAt(index)
        const prev = current!.prev
        const next = current!.next

        if (current === this.head) {
            this.head = next
        } else {
            prev!.next = next
            current!.prev = null
        }

        if (current === this.tail) {
            this.tail = prev
        } else {
            next!.prev = prev
            current!.next = null
        }

        --this.size
        return current!.data
    }

    public indexOf(data: T): number {
        let index = 0;

        for (const node of this) {
            if (node.data === data) {
                return index;
            }
            ++index;
        }
        return -1;
    }

    public contains(data: T): boolean {
        return this.indexOf(data) !== -1;
    }

    public toArray(): T[] {
        const result: T[] = [];

        let current = this.head;
        for (const node of this) {
            result.push(node.data);
        }
        return result;
    }

    public remove(data: T): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.prev = null;
                    } else {
                        this.tail = null;
                    }
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    } else {
                        this.head = null;
                    }
                } else {
                    current.prev!.next = current.next;
                    current.next!.prev = current.prev;
                }
                current.prev = null;
                current.next = null;
                this.size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    public getFirstNode(): DoublyLinkedListNode<T> | null {
        return this.head;
    }

    public getLastNode(): DoublyLinkedListNode<T> | null {
        return this.tail;
    }

    public getNodeAt(index: number): DoublyLinkedListNode<T> | null {
        if (index < 0 || index >= this.size) {
            return null;
        }
        let current: DoublyLinkedListNode<T> | null;
        if (index <= this.size / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current!.next;
            }
        } else {
            current = this.tail;
            for (let i = this.size - 1; i > index; i--) {
                current = current!.prev;
            }
        }
        return current;
    }

    public reverse(): void {
        if (this.size <= 1) {
            return;
        }

        let current = this.head;
        this.head = this.tail;
        this.tail = current;

        while (current) {
            const next = current.next;
            current.next = current.prev;
            current.prev = next;
            current = next;
        }
    }

    public shuffle(): void {
        const arr: T[] = [];

        // Initialize an array of indices from 0 to size - 1
        for (const node of this) {
            arr.push(node.data);
        }

        // Shuffle the indices using the Fisher-Yates shuffle algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        // Clear the linked list and add the nodes back in the shuffled order
        const newList = new DoublyLinkedList<T>();
        arr.forEach((data) => {
            newList.addLast(data);
        });
        this.head = newList.head;
        this.tail = newList.tail;
        this.size = newList.size;

    }

    public forEach(callback: (data: T, index: number) => void): void {
        let index = 0;
        for (const node of this) {
            callback(node.data, index);
            index++;
        }
    }


    public forEachReverse(callback: (data: T, index: number) => void): void {
        let index = this.size - 1;
        const reverseIterator = new DoublyLinkedListReverseIterator(this.tail!);
        for (const node of reverseIterator) {
            callback(node.data, index);
            index--;
        }
    }


    public clear(): void {
        for (const node of this) {
            node.prev = null;
            node.next = null;
        }
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public filter(predicate: (value: T, index: number) => boolean): DoublyLinkedList<T> {
        const newList = new DoublyLinkedList<T>()

        this.forEach((value, index) => {
            if (predicate(value, index)) {
                newList.addLast(value)
            }
        })
        return newList
    }


    public toString(): string {
        let current = this.head;
        let str = "";
        while (current) {
            if (typeof current.data === "object" && current.data !== null && !("toString" in current.data)) {
                str += `[${typeof current.data}] `;
            } else {
                str += `${current === this.head ? "head" : ""}${current === this.tail ? "tail" : ""}`;
                str += `(${current.data}) `;
            }
            current = current.next;
        }
        return str;
    }

    public print(): void {
        let current = this.head;
        let result = "";
        while (current) {
            result += current === this.head ? `head(${current.data.toString()})` : current === this.tail ? `tail(${current.data.toString()})` : current.data.toString();
            result += current.next ? " <=> " : "";
            current = current.next;
        }
        if (result === "") {
            result = "empty";
        }
        console.log(result);
    }

}


// //let node = new DoublyLinkedListNode<number>(8)
// //console.log(node.data)
// let list = new DoublyLinkedList<number>()
// list.addFirst(1)
// list.addFirst(2)
// list.addFirst(3)
// console.log("size : " + list.getSize())
// console.log("is empty : " + list.isEmpty())
// list.addLast(4)
// console.log("size : " + list.getSize())
// console.log("remove first : " + list.removeFirst())
// console.log("remove last : " + list.removeLast())
// list.print()
// list.insertAt(0, 5)
// list.insertAt(list.getSize(), 6)
// console.log(list.insertAt(50, 7))
// list.insertAt(2, 7)
// list.clear()
// // list.print()
// // list.removeAt(0)
// // list.removeAt(list.getSize() - 1)
// // console.log(list.removeAt(50))
// // list.print()
// // list.removeAt(1)
// // list.print()
// console.log("index of 7 : " + list.indexOf(7))
// console.log("contains 7 : " + list.contains(7))
// console.log("contains 8 : " + list.contains(8))
// console.log('index of 8 : ' + list.indexOf(8))
// console.log(list.toArray())
// console.log(list.remove(7))
// console.log(list.remove(8))
// list.print()
// // console.log(list.getFirstNode())
// // console.log(list.getLastNode())
// // console.log(list.getNodeAt(0))
// // console.log(list.getNodeAt(list.getSize() - 1))
// // console.log(list.getNodeAt(50))
// // console.log(list.getNodeAt(2))
// list.reverse()
// list.print()
// list.shuffle()
// list.print()
// list.forEach((data, index) => {
//     console.log(`index : ${index}, data : ${data}`)
// })
// list.print()
// list.forEachReverse((data, index) => {
//     console.log(`index : ${index}, data : ${data}`)
// })
// for (let i = 0; i < 100; i++) {
//     list.addLast(i)
// }
// list.filter((value, index) => {
//     return value % 2 === 0
// }).print()
// // for (const value of list) {
// //     console.log(value)
// // }
// list.forEachReverse((data, index) => {
//     console.log(`index : ${index}, data : ${data}`)
// })
// list.print()
// list.shuffle()
// list.print()
// console.log(list.clear())
// list.print()

let list = new DoublyLinkedList<number>()
for (let i = 0; i < 100; i++) {
    list.addLast(i)
}
list.print()
console.log(list.getSize())
list.clear()
console.log(list.getSize())
list.print()