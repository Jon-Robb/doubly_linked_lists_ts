*This project was made using OpenAi's ChatGPT/Copilot and Codiga's code reviews


# Doubly-Linked list typescript class


## DoublyLinkedListNode<T>
This class represents a single node in a doubly linked list. It has properties for the data it contains, as well as references to the previous and next nodes in the list.

## DoublyLinkedListIterator<T>
This class implements the Iterator interface for the DoublyLinkedListNode<T> class, allowing iteration over the nodes in a doubly linked list.

## DoublyLinkedListReverseIterator<T>
This class implements the IterableIterator interface for the DoublyLinkedListNode<T> class, allowing reverse iteration over the nodes in a doubly linked list.

## DoublyLinkedList<T>
This class represents a doubly linked list data structure. It contains references to the head and tail nodes, as well as a count of the number of nodes in the list. It provides methods for adding and removing nodes, as well as iterating over the nodes and other common operations.

### addFirst(data: T): boolean
Adds a new node containing the specified data to the beginning of the list.

### addLast(data: T): boolean
Adds a new node containing the specified data to the end of the list.

### removeFirst(): T | null
Removes the first node in the list and returns its data.

### removeLast(): T | null
Removes the last node in the list and returns its data.

### insertAt(index: number, data: T): boolean
Inserts a new node containing the specified data at the specified index in the list.

### removeAt(index: number): T | null
Removes the node at the specified index in the list and returns its data.

### indexOf(data: T): number
Returns the index of the first occurrence of the specified data in the list, or -1 if it is not found.

### contains(data: T): boolean
Returns true if the specified data is found in the list, false otherwise.

### toArray(): T[]
Returns an array containing the data of all nodes in the list, in the order they appear.

### remove(data: T): boolean
Removes the first occurrence of the specified data from the list, returning true if it was found and removed, false otherwise.

### getFirstNode(): DoublyLinkedListNode<T> | null
Returns a reference to the first node in the list.

### getLastNode(): DoublyLinkedListNode<T> | null
Returns a reference to the last node in the list.

### getNodeAt(index: number): DoublyLinkedListNode<T> | null
Returns a reference to the node at the specified index in the list.

### reverse(): void
Reverses the order of the nodes in the list.

### shuffle(): void
Randomly shuffles the order of the nodes in the list.

### forEach(callback: (data: T, index: number) => void): void
Calls the specified callback function for each node in the list, passing in its data and index as arguments.

### forEachReverse(callback: (data: T, index: number) => void): void
Calls the specified callback function for each node in the list, in reverse order, passing in its data and index as arguments.

### clear(): void
Removes all nodes from the list.

### filter(predicate: (value: T, index: number) => boolean): DoublyLinkedList<T>
Returns a new DoublyLinkedList containing only the nodes whose data satisfy the specified predicate function.

### toString(): string
Returns a string representation of the list, with each node's data enclosed in parentheses and optional markers for the head and tail
