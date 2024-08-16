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

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    const doesExist = this.find(value);
    if (doesExist) {
      return console.log('The value is already inserted on the tree');
    }

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

  remove(value) {
    let node = this.find(value);
    let hasLeftChild = node.left;
    let hasRightChild = node.right;
    let parentNode = this.findParent(node.data);

    //remove when a node has two children
    if (hasLeftChild && hasRightChild) {
      const successor = this.findSuccessor(node);
      const tempValue = node.data;
      node.data = successor.data;
      successor.data = tempValue;
      node = successor;
      hasLeftChild = node.left;
      hasRightChild = node.right;
      parentNode = this.findParent(node.data);
      // continues to the next code blocks depending on the condition
    }

    //remove a leaf node
    if (!hasLeftChild && !hasRightChild) {
      const isLeftChild = parentNode && parentNode.left.data === value;
      isLeftChild ? (parentNode.left = null) : (parentNode.right = null);
      return;
    }

    const hasChild = node.left || node.right;
    if (parentNode.left && parentNode.left.data === value) {
      parentNode.left = hasChild;
      return;
    } else {
      parentNode.right = hasChild;
    }
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (node.data === value) return node;

    const searchLeft = this.find(value, node.left);
    const searchRight = this.find(value, node.right);
    return searchLeft || searchRight;
  }

  findSuccessor(node) {
    let successor = node.right;
    const hasLeftChild = node.left;

    if (hasLeftChild) {
      while (successor.left !== null) {
        successor = successor.left;
      }
      return successor;
    } else {
      return successor;
    }
  }

  findParent(value, node = this.root) {
    if (node === null) return null;
    if (node.right && node.right.data === value) return node;
    if (node.left && node.left.data === value) return node;

    const searchLeft = this.findParent(value, node.left);
    const searchRight = this.findParent(value, node.right);
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
tree.insert(0);
tree.insert(888);
tree.insert(24);
tree.insert(24);
tree.remove(8);
tree.remove(0);
tree.prettyPrint(tree.root);
