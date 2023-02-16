class DoublyLinkedListNode {
    constructor(data) {
        this._data = data;
        this._prev = null;
        this._next = null;
    }
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = data;
    }
    get next() {
        return this._next;
    }
    set next(node) {
        this._next = node;
    }
    get prev() {
        return this._prev;
    }
    set prev(node) {
        this._prev = node;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    addFirst(data) {
        const newNode = new DoublyLinkedListNode(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        ++this.size;
    }
    addLast(data) {
        const newNode = new DoublyLinkedListNode(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        ++this.size;
    }
    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this.head;
        if (this.getSize() === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
            removedNode.next = null;
        }
        --this.size;
        return removedNode.data;
    }
    removeLast() {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this.tail;
        if (this.getSize() === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removedNode.prev = null;
        }
        --this.size;
        return removedNode.data;
    }
    insertAt(index, data) {
        if (index < 0 || index > this.size) {
            return false;
        }
        if (index === 0) {
            this.addFirst(data);
        }
        else if (index === this.size) {
            this.addLast(data);
        }
        else {
            const newNode = new DoublyLinkedListNode(data);
            let current = this.head;
            // find the node at the index
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            // insert the new node switching the pointers
            const nextNode = current.next;
            current.next = newNode;
            newNode.prev = current;
            newNode.next = nextNode;
            nextNode.prev = newNode;
            ++this.size;
        }
        return true;
    }
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        let removedNode = null;
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
            this.head.prev = null;
        }
        else if (index === this.size - 1) {
            removedNode = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            removedNode = current.next;
            const nextNode = removedNode.next;
            current.next = nextNode;
            nextNode.prev = current;
        }
        --this.size;
        return removedNode.data;
    }
    indexOf(data) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }
    contains(data) {
        return this.indexOf(data) !== -1;
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
    remove(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.prev = null;
                    }
                    else {
                        this.tail = null;
                    }
                }
                else if (current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    }
                    else {
                        this.head = null;
                    }
                }
                else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
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
    toString() {
        let current = this.head;
        let str = "";
        while (current) {
            if (typeof current.data === "object" && current.data !== null && !("toString" in current.data)) {
                str += `[${typeof current.data}] `;
            }
            else {
                str += `${current === this.head ? "head" : ""}${current === this.tail ? "tail" : ""}`;
                str += `(${current.data}) `;
            }
            current = current.next;
        }
        return str;
    }
    print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current === this.head ? `head(${current.data.toString()})` : current === this.tail ? `tail(${current.data.toString()})` : current.data.toString();
            result += current.next ? " <=> " : "";
            current = current.next;
        }
        console.log(result);
    }
}
//let node = new DoublyLinkedListNode<number>(8)
//console.log(node.data)
let list = new DoublyLinkedList();
list.addFirst(1);
list.addFirst(2);
list.addFirst(3);
console.log("size : " + list.getSize());
console.log("is empty : " + list.isEmpty());
list.addLast(4);
console.log("size : " + list.getSize());
console.log("remove first : " + list.removeFirst());
console.log("remove last : " + list.removeLast());
list.print();
list.insertAt(0, 5);
list.insertAt(list.getSize(), 6);
console.log(list.insertAt(50, 7));
list.insertAt(2, 7);
// list.print()
// list.removeAt(0)
// list.removeAt(list.getSize() - 1)
// console.log(list.removeAt(50))
// list.print()
// list.removeAt(1)
// list.print()
console.log("index of 7 : " + list.indexOf(7));
console.log("contains 7 : " + list.contains(7));
console.log("contains 8 : " + list.contains(8));
console.log('index of 8 : ' + list.indexOf(8));
console.log(list.toArray());
console.log(list.remove(7));
console.log(list.remove(8));
list.print();
