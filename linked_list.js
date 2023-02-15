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
    return LinkedList;
}());
