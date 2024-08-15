class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    console.log(sortedArray);
    const mid = Math.floor((start + end) / 2);
    const node = new Node(sortedArray[mid]);
    node.left = this.buildTree(sortedArray, start, mid - 1);
    node.right = this.buildTree(sortedArray, mid + 1, end);

    return node;
  }

  insert(value) {
    const newNode = new Node(value);
    let currentNode = this.root;
    let lastNode = currentNode;

    while (currentNode != null) {
      if (value < currentNode.data) {
        lastNode = currentNode;
        currentNode = currentNode.left;
      } else {
        lastNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    if (newNode.data > lastNode.data) {
      lastNode.right = newNode;
    } else {
      lastNode.left = newNode;
    }
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (node.data === value) return node;

    const searchLeft = this.find(value, node.left);
    const searchRight = this.find(value, node.right);
    return searchLeft || searchRight;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 10000, 4, 3, 5, 7]);
tree.insert(999);
tree.insert(2);

tree.prettyPrint(tree.root);
console.log(tree.root);
console.log(tree.find(10000));
