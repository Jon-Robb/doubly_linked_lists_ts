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

}




