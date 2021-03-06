const Node = require('./Node');

const defineProperty = Object.defineProperty;

/**
 * Initializes a new instance of a Queue
 * @constructor Queue
 */
function Queue() {
  /**
   * First Node in the Queue
   * @name Queue#_first
   * @type {(Node|null)}
   */
  this._first;

  defineProperty(this, '_first', {
    writable: true,
    value: null /* default */
  });

  return this;
}

/**
 * Checks if the queue is empty.
 * @function Queue#isEmpty
 */
Queue.prototype.isEmpty = function () {
  return this._first === null;
};

/**
 * Adds a new item at the end of the queue.
 * @function Queue#enqueue
 * @param {*} value Value to be enqueued
 */
Queue.prototype.enqueue = function (value) {
  const node = new Node(value);

  if (this.isEmpty()) {
    this._first = node;
  } else {
    let lastNode = this._first;

    while (lastNode.hasNext()) {
      lastNode = lastNode.next;
    }

    lastNode.next = node;
  }

  return this;
};

/**
 * Removes and returns the first item in the queue. 
 * @function Queue#dequeue
 */
Queue.prototype.dequeue = function () {
  if (this.isEmpty()) {
    throw new Error('Queue is empty.');
  }

  const currentFirst = this._first;

  if (currentFirst.hasNext()) {
    this._first = currentFirst.next;
  } else {
    this._first = null;
  }

  return currentFirst._value;
};

/**
 * Returns the queue as string
 * @function Queue#toString
 */
Queue.prototype.toString = function () {
  if (this.isEmpty()) {
    return '[Empty Queue]'
  }

  let queueAsString = '';
  let currentNode = this._first;

  while (currentNode) {
    queueAsString += String(currentNode);
    currentNode = currentNode.next;

    if (currentNode) {
      queueAsString += ',';
    }
  }

  return queueAsString;
};

module.exports = Queue;
