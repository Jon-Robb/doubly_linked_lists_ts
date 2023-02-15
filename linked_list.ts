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
            this.head = this.head!.next
            node!.next = null
            --this.size
            return node!.data
        }
    }

}




