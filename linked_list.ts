class LinkedListNode<T> {
    data: T
    next: LinkedListNode<T> | null

    constructor(data: T) {
        this.data = data
        this.next = null
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null
    tail: LinkedListNode<T> | null
    size: number

    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    getSize(): number {
        return this.size
    }

    isEmpty(): boolean {
        return this.size === 0
    }

    addFirst(data: T) {
        const node = new LinkedListNode<T>(data)
        if (this.isEmpty()) {
            this.head = node
            this.tail = node
        } else {
            node.next = this.head
            this.head = node
        }
        ++this.size
    }

    addLast(data: T) {
        const node = new LinkedListNode<T>(data)
        if (this.isEmpty()) {
            this.head = node
            this.tail = node
        } else {
            // ! -> non-null assertion operator
            this.tail!.next = node
            this.tail = node
        }
        ++this.size
    }

    // remove first node and return its data
    removeFirst(): T | null {
        if (this.isEmpty()) {
            return null
        }
        else if (this.head === this.tail) {
            const node = this.head
            this.head = null
            this.tail = null
            --this.size
            return node!.data
        }
        else {
            const node = this.head
            // head is now the second node
            this.head = this.head!.next
            // remove the first node
            node!.next = null
            --this.size
            return node!.data
        }
    }

    // remove last node and return its data
    removeLast(): T | null {
        if (this.isEmpty()) {
            return null
        }
        else if (this.head === this.tail) {
            const node = this.tail
            this.head = null
            this.tail = null
            --this.size
            return node!.data
        }
        else {
            let current = this.head
            // find the second last node
            while (current!.next !== this.tail) {
                current = current!.next
            }
            const node = this.tail
            // remove the last node
            current!.next = null
            // tail is now the second last node
            this.tail = current
            --this.size
            return node!.data
        }
    }

    // insert a node at a given index
    insertAt(index: number, data: T): boolean {
        if (index < 0 || index > this.size) {
            return false
        }
        else if (index === 0) {
            this.addFirst(data)
        }
        else if (index === this.size) {
            this.addLast(data)
        }
        else {
            let current = this.head
            // find the node at the given index
            for (let i = 0; i < index - 1; ++i) {
                current = current!.next
            }
            const node = new LinkedListNode<T>(data)
            // insert the node
            node.next = current!.next
            // update the next node
            current!.next = node
            ++this.size
        }
        return true
    }

    // remove a node at a given index
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size) {
            return null
        }
        else if (index === 0) {
            return this.removeFirst()
        }
        else if (index === this.size - 1) {
            return this.removeLast()
        }
        else {
            let current = this.head
            // find the node at the given index
            for (let i = 0; i < index - 1; ++i) {
                current = current!.next
            }
            // remove the node
            const node = current!.next
            current!.next = node!.next
            node!.next = null
            --this.size
            return node!.data
        }
    }

    // find the index of a node with a given data
    indexOf(data: T): number {
        let current = this.head
        let index = 0
        while (current !== null) {
            if (current.data === data) {
                return index
            }
            current = current.next
            ++index
        }
        return -1
    }

    // check if a node with a given data exists
    contains(data: T): boolean {
        return this.indexOf(data) !== -1
    }

    // convert the linked list to an array
    toArray(): T[] {
        const array: T[] = []
        let current = this.head
        while (current !== null) {
            array.push(current.data)
            current = current.next
        }
        return array
    }

    // remove a node with a given data
    remove(data: T): boolean {
        const index = this.indexOf(data)
        if (index === -1) {
            return false
        }
        this.removeAt(index)
        return true
    }

    // get the first node
    getFirst(): LinkedListNode<T> | null {
        return this.head
    }

    // get the last node
    getLast(): LinkedListNode<T> | null {
        return this.tail
    }

    // get the node at a given index
    getNodeAt(index: number): LinkedListNode<T> | null {
        if (index < 0 || index >= this.size) {
            return null
        }
        let current = this.head
        for (let i = 0; i < index; ++i) {
            current = current!.next
        }
        return current
    }

    // reverse the linked list
    reverse(): void {
        let current = this.head
        let previous: LinkedListNode<T> | null  = null
        let next : LinkedListNode<T> | null  = null

        while (current !== null) {
            next = current.next
            current.next = previous
            previous = current
            current = next
        }
        this.tail = this.head
        this.head = previous
    }

    // swap two nodes
    swapNodes(index1: number, index2: number): boolean {
        if (index1 < 0 || index1 >= this.size || index2 < 0 || index2 >= this.size || index1 === index2) {
            return false
        }
        
        if (index1 > index2) {
            [index1, index2] = [index2, index1]
        }

        let node1 = this.getNodeAt(index1)
        let node2 = this.getNodeAt(index2)
        let prev1 = this.getNodeAt(index1 - 1)
        let prev2 = this.getNodeAt(index2 - 1)
        let next1 = node1!.next
        let next2 = node2!.next

        if (node1 === this.head) {
            this.head = node2
        }
        else {
            prev1!.next = node2
        }

        if (node2 === this.tail) {
            this.tail = node1
        }
        else {
            prev2!.next = node1
        }

        node1!.next = next2
        node2!.next = next1

        return true
    }

    // shuffle the linked list
    public shuffle(): void {
        const arr: T[] = [];
      
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
        const newList = new LinkedList<T>();
        arr.forEach((data) => {
            newList.addLast(data);
        });
        this.head = newList.head;
        this.tail = newList.tail;
        this.size = newList.size;

    }

    forEach(callback: (value:T, index: number) => void): void {
        let current = this.head
        let index = 0
        while (current !== null) {
            callback(current.data, index)
            current = current.next
            ++index
        }
    }

    filter(predicate: (value : T, index: number) => boolean): LinkedList<T> {
        const newList = new LinkedList<T>()

        this.forEach((value, index) => {
            if (predicate(value, index)) {
                newList.addLast(value)
            }
        })
        return newList
    }



    // clear the linked list
    clear() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    // print the linked list
    print(): void {
        let current = this.head
        let str = ''
        while (current !== null) {
            str += current.data + ' -> '
            current = current.next
        }
        str += 'null'
        console.log(str)
    }

}

let list = new LinkedList<number>()
list.addFirst(1)
list.addFirst(2)
list.addFirst(3)
list.addFirst(4)
list.addFirst(5)
list.print()
list.addLast(6)
list.print()
console.log(list.insertAt(2, 3))
list.print()
console.log(list.indexOf(6))
console.log(list.contains(6))
console.log(list.removeAt(3))
console.log(list.remove(6))
list.print()
list.forEach((value, index) => {
    console.log(value, index)
})
console.log(list.toArray())
console.log(list.getFirst())
console.log(list.getLast())
console.log(list.getNodeAt(3))
list.reverse()
list.print()
list.swapNodes(0, 3)
list.print()
list.shuffle()
list.print()
console.log(list.getSize())
console.log(list.isEmpty())
list.filter((value, index) => {
    return value % 2 === 0
}).print()
list.clear()
list.print()



