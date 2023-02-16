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

class DoublyLinkedList<T> {
    private head : DoublyLinkedListNode<T> | null;
    private tail : DoublyLinkedListNode<T> | null;
    private size : number;

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

    public addFirst(data: T): void {
        const newNode = new DoublyLinkedListNode<T>(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else{
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }
        ++this.size;
    }

    public addLast(data: T): void {
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

    public print(): void {
        let current = this.head;
        let result = "";
        while (current) {
          result += current === this.head ? `head(${current.data.toString()})` : current === this.tail ? `tail(${current.data.toString()})` : current.data.toString();
          result += current.next ? " <=> " : "";
          current = current.next;
        }
        console.log(result);
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
      


}


//let node = new DoublyLinkedListNode<number>(8)
//console.log(node.data)
let list = new DoublyLinkedList<number>()
list.addFirst(1)
list.addFirst(2)
list.addFirst(3)
console.log("size : "+ list.getSize())
console.log("is empty : " + list.isEmpty())
list.addLast(4)
console.log("size : "+ list.getSize())
console.log("remove first : " + list.removeFirst())
console.log("remove last : " + list.removeLast())
list.print()
