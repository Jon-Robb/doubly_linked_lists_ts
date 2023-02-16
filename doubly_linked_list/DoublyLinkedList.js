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
class DoublyLinkedListIterator {
    constructor(startNode) {
        this.current = startNode;
    }
    next() {
        if (this.current) {
            const value = this.current;
            this.current = this.current.next;
            return { done: false, value };
        }
        else {
            return { done: true, value: null };
        }
    }
}
class DoublyLinkedListReverseIterator {
    constructor(node) {
        this.current = node;
    }
    next() {
        if (this.current === null) {
            return { done: true, value: null };
        }
        const value = this.current;
        this.current = this.current.prev;
        return { done: false, value: value };
    }
    [Symbol.iterator]() {
        return this;
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
    [Symbol.iterator]() {
        return new DoublyLinkedListIterator(this.head);
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
        let index = 0;
        for (const node of this) {
            if (node.data === data) {
                return index;
            }
            ++index;
        }
        return -1;
    }
    contains(data) {
        return this.indexOf(data) !== -1;
    }
    toArray() {
        // const result: T[] = [];
        // let current = this.head;
        // for (const node of this) {
        //     result.push(node.data);
        // }
        // return result;
        return [...this].map(node => node.data);
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
    swapNodes(node1, node2) {
        if (node1 === node2) {
            return;
        }
        let temp = node1.data;
        node1.data = node2.data;
        node2.data = temp;
        // if nodes are adjacent
        if (node1.next === node2) {
            const prev = node1.prev;
            const next = node2.next;
            if (prev) {
                prev.next = node2;
            }
            if (next) {
                next.prev = node1;
            }
            node1.prev = node2;
            node1.next = next;
            node2.prev = prev;
            node2.next = node1;
        }
        else if (node2.next === node1) {
            const prev = node2.prev;
            const next = node1.next;
            if (prev) {
                prev.next = node1;
            }
            if (next) {
                next.prev = node2;
            }
            node2.prev = node1;
            node2.next = next;
            node1.prev = prev;
            node1.next = node2;
        }
        else {
            const tempPrev = node1.prev;
            const tempNext = node1.next;
            node1.prev = node2.prev;
            node1.next = node2.next;
            node2.prev = tempPrev;
            node2.next = tempNext;
            if (node1.prev) {
                node1.prev.next = node1;
            }
            if (node1.next) {
                node1.next.prev = node1;
            }
            if (node2.prev) {
                node2.prev.next = node2;
            }
            if (node2.next) {
                node2.next.prev = node2;
            }
        }
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
        for (const node of this) {
            arr.push(node.data);
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
        let index = 0;
        for (const node of this) {
            callback(node.data, index);
            index++;
        }
    }
    forEachReverse(callback) {
        let index = this.size - 1;
        const reverseIterator = new DoublyLinkedListReverseIterator(this.tail);
        for (const node of reverseIterator) {
            callback(node.data, index);
            index--;
        }
    }
    clear() {
        for (const node of this) {
            node.prev = null;
            node.next = null;
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
        if (result === "") {
            result = "empty";
        }
        console.log(result);
    }
}
let list = new DoublyLinkedList();
for (let i = 0; i < 10; i++) {
    list.addLast(i);
}
list.print();
