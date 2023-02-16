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
    // remove a node with a given data
    LinkedList.prototype.remove = function (data) {
        var index = this.indexOf(data);
        if (index === -1) {
            return false;
        }
        this.removeAt(index);
        return true;
    };
    // get the first node
    LinkedList.prototype.getFirst = function () {
        return this.head;
    };
    // get the last node
    LinkedList.prototype.getLast = function () {
        return this.tail;
    };
    // get the node at a given index
    LinkedList.prototype.getNodeAt = function (index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        var current = this.head;
        for (var i = 0; i < index; ++i) {
            current = current.next;
        }
        return current;
    };
    // reverse the linked list
    LinkedList.prototype.reverse = function () {
        var current = this.head;
        var previous = null;
        var next = null;
        while (current !== null) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        this.tail = this.head;
        this.head = previous;
    };
    // swap two nodes
    LinkedList.prototype.swapNodes = function (index1, index2) {
        var _a;
        if (index1 < 0 || index1 >= this.size || index2 < 0 || index2 >= this.size || index1 === index2) {
            return false;
        }
        if (index1 > index2) {
            _a = [index2, index1], index1 = _a[0], index2 = _a[1];
        }
        var node1 = this.getNodeAt(index1);
        var node2 = this.getNodeAt(index2);
        var prev1 = this.getNodeAt(index1 - 1);
        var prev2 = this.getNodeAt(index2 - 1);
        var next1 = node1.next;
        var next2 = node2.next;
        if (node1 === this.head) {
            this.head = node2;
        }
        else {
            prev1.next = node2;
        }
        if (node2 === this.tail) {
            this.tail = node1;
        }
        else {
            prev2.next = node1;
        }
        node1.next = next2;
        node2.next = next1;
        return true;
    };
    // shuffle the linked list
    LinkedList.prototype.shuffle = function () {
        var _a;
        var arr = [];
        // Initialize an array of indices from 0 to size - 1
        var node = this.head;
        while (node !== null) {
            arr.push(node.data);
            node = node.next;
        }
        // Shuffle the indices using the Fisher-Yates shuffle algorithm
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
        }
        // Clear the linked list and add the nodes back in the shuffled order
        var newList = new LinkedList();
        arr.forEach(function (data) {
            newList.addLast(data);
        });
        this.head = newList.head;
        this.tail = newList.tail;
        this.size = newList.size;
    };
    LinkedList.prototype.forEach = function (callback) {
        var current = this.head;
        var index = 0;
        while (current !== null) {
            callback(current.data, index);
            current = current.next;
            ++index;
        }
    };
    LinkedList.prototype.filter = function (predicate) {
        var newList = new LinkedList();
        this.forEach(function (value, index) {
            if (predicate(value, index)) {
                newList.addLast(value);
            }
        });
        return newList;
    };
    // clear the linked list
    LinkedList.prototype.clear = function () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };
    // print the linked list
    LinkedList.prototype.print = function () {
        var current = this.head;
        var str = '';
        while (current !== null) {
            str += current.data + ' -> ';
            current = current.next;
        }
        str += 'null';
        console.log(str);
    };
    return LinkedList;
}());
var list = new LinkedList();
list.addFirst(1);
list.addFirst(2);
list.addFirst(3);
list.addFirst(4);
list.addFirst(5);
list.print();
list.addLast(6);
list.print();
console.log(list.insertAt(2, 3));
list.print();
console.log(list.indexOf(6));
console.log(list.contains(6));
console.log(list.removeAt(3));
console.log(list.remove(6));
list.print();
list.forEach(function (value, index) {
    console.log(value, index);
});
console.log(list.toArray());
console.log(list.getFirst());
console.log(list.getLast());
console.log(list.getNodeAt(3));
list.reverse();
list.print();
list.swapNodes(0, 3);
list.print();
list.shuffle();
list.print();
console.log(list.getSize());
console.log(list.isEmpty());
list.filter(function (value, index) {
    return value % 2 === 0;
}).print();
list.clear();
list.print();
