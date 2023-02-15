var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(data) {
        this.data = data;
        this.next = null;
    }
    return LinkedListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    LinkedList.prototype.getSize = function () {
        return this.size;
    };
    LinkedList.prototype.isEmpty = function () {
        return this.size === 0;
    };
    LinkedList.prototype.addFirst = function (data) {
        var node = new LinkedListNode(data);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        }
        else {
            node.next = this.head;
            this.head = node;
        }
        ++this.size;
    };
    LinkedList.prototype.addLast = function (data) {
        var node = new LinkedListNode(data);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        }
        else {
            // ! -> non-null assertion operator
            this.tail.next = node;
            this.tail = node;
        }
        ++this.size;
    };
    // remove first node and return its data
    LinkedList.prototype.removeFirst = function () {
        if (this.isEmpty()) {
            return null;
        }
        else if (this.head === this.tail) {
            var node = this.head;
            this.head = null;
            this.tail = null;
            --this.size;
            return node.data;
        }
        else {
            var node = this.head;
            // head is now the second node
            this.head = this.head.next;
            // remove the first node
            node.next = null;
            --this.size;
            return node.data;
        }
    };
    // remove last node and return its data
    LinkedList.prototype.removeLast = function () {
        if (this.isEmpty()) {
            return null;
        }
        else if (this.head === this.tail) {
            var node = this.tail;
            this.head = null;
            this.tail = null;
            --this.size;
            return node.data;
        }
        else {
            var current = this.head;
            // find the second last node
            while (current.next !== this.tail) {
                current = current.next;
            }
            var node = this.tail;
            // remove the last node
            current.next = null;
            // tail is now the second last node
            this.tail = current;
            --this.size;
            return node.data;
        }
    };
    // insert a node at a given index
    LinkedList.prototype.insertAt = function (index, data) {
        if (index < 0 || index > this.size) {
            return false;
        }
        else if (index === 0) {
            this.addFirst(data);
        }
        else if (index === this.size) {
            this.addLast(data);
        }
        else {
            var current = this.head;
            // find the node at the given index
            for (var i = 0; i < index - 1; ++i) {
                current = current.next;
            }
            var node = new LinkedListNode(data);
            // insert the node
            node.next = current.next;
            // update the next node
            current.next = node;
            ++this.size;
        }
        return true;
    };
    // remove a node at a given index
    LinkedList.prototype.removeAt = function (index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        else if (index === 0) {
            return this.removeFirst();
        }
        else if (index === this.size - 1) {
            return this.removeLast();
        }
        else {
            var current = this.head;
            // find the node at the given index
            for (var i = 0; i < index - 1; ++i) {
                current = current.next;
            }
            // remove the node
            var node = current.next;
            current.next = node.next;
            node.next = null;
            --this.size;
            return node.data;
        }
    };
    // find the index of a node with a given data
    LinkedList.prototype.indexOf = function (data) {
        var current = this.head;
        var index = 0;
        while (current !== null) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            ++index;
        }
        return -1;
    };
    // check if a node with a given data exists
    LinkedList.prototype.contains = function (data) {
        return this.indexOf(data) !== -1;
    };
    // convert the linked list to an array
    LinkedList.prototype.toArray = function () {
        var array = [];
        var current = this.head;
        while (current !== null) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    };
    // clear the linked list
    LinkedList.prototype.clear = function () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };
    return LinkedList;
}());
