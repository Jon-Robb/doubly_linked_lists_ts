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
        return true;
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
        return true;
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
            return this.addFirst(data);
        }
        if (index === this.size) {
            return this.addLast(data);
        }
        const node = new DoublyLinkedListNode(data);
        const current = this.getNodeAt(index);
        const prev = current.prev;
        node.prev = prev;
        node.next = current;
        current.prev = node;
        prev.next = node;
        ++this.size;
        return true;
    }
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        let current = this.getNodeAt(index);
        const prev = current.prev;
        const next = current.next;
        if (current === this.head) {
            this.head = next;
        }
        else {
            prev.next = next;
            current.prev = null;
        }
        if (current === this.tail) {
            this.tail = prev;
        }
        else {
            next.prev = prev;
            current.next = null;
        }
        --this.size;
        return current.data;
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
    getFirstNode() {
        return this.head;
    }
    getLastNode() {
        return this.tail;
    }
    getNodeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        let current;
        if (index <= this.size / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        }
        else {
            current = this.tail;
            for (let i = this.size - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }
    reverse() {
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
    shuffle() {
        const arr = [];
        // Initialize an array of indices from 0 to size - 1
        let node = this.head;
        while (node !== null) {
            arr.push(node.data);
            node = node.next;
        }
        // Shuffle the indices using the Fisher-Yates shuffle algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Clear the linked list and add the nodes back in the shuffled order
        const newList = new DoublyLinkedList();
        arr.forEach((data) => {
            newList.addLast(data);
        });
        this.head = newList.head;
        this.tail = newList.tail;
        this.size = newList.size;
    }
    forEach(callback) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            callback(current.data, index);
            current = current.next;
            ++index;
        }
    }
    forEachReverse(callback) {
        let current = this.tail;
        let index = this.size - 1;
        while (current !== null) {
            callback(current.data, index);
            current = current.prev;
            --index;
        }
    }
    clear() {
        let current = this.head;
        while (current !== null) {
            const next = current.next;
            current.data = null;
            current.next = null;
            current.prev = null;
            current = next;
        }
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    filter(predicate) {
        const newList = new DoublyLinkedList();
        this.forEach((value, index) => {
            if (predicate(value, index)) {
                newList.addLast(value);
            }
        });
        return newList;
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
// console.log(list.getFirstNode())
// console.log(list.getLastNode())
// console.log(list.getNodeAt(0))
// console.log(list.getNodeAt(list.getSize() - 1))
// console.log(list.getNodeAt(50))
// console.log(list.getNodeAt(2))
list.reverse();
list.print();
list.shuffle();
list.print();
list.forEach((data, index) => {
    console.log(`index : ${index}, data : ${data}`);
});
list.print();
list.forEachReverse((data, index) => {
    console.log(`index : ${index}, data : ${data}`);
});
for (let i = 0; i < 100; i++) {
    list.addLast(i);
}
list.filter((value, index) => {
    return value % 2 === 0;
}).print();
