---
title: "Implementing LRU-Cache"
date: "2023-04-29"
image: implementing-lru-cache.png
excerpt: LRU Cache is a data structure that stores a fixed number of items in memory.
isFeatured: true
---

# LRU Cache.

LRU stands for "Least Recently Used," and an LRU Cache is a data structure that stores a fixed number of items in memory. The cache has a limited capacity, and when it is full, the least recently used item is removed from the cache to make room for new items.

## Uses

The idea behind an LRU Cache is to keep frequently accessed items in memory to improve performance. For example, imagine a web browser that caches the most recently visited web pages. If you visit a web page, it is added to the cache. If you visit the same web page again, the browser can retrieve it from the cache instead of fetching it from the web server again. This can significantly improve the speed of browsing.

## An example of how? LRU Cache work:

- The cache is initially empty.
- You request an item from the cache. Since the cache is empty, the item is not found, and the cache returns a "cache miss" result.
- The cache fetches the item from the underlying storage and adds it to the cache.
- You request the same item again. This time, the cache finds the item in memory and returns it, resulting in a "cache hit."
- You request a new item that is not in the cache. Since the cache is full, the least recently used item is removed from the cache to make room for the new item.
- The new item is fetched from the underlying storage and added to the cache.
- You request another item that is not in the cache. Again, the least recently used item is removed from the cache to make room for the new item.
- This process continues until the cache reaches its maximum capacity, at which point every new item added to the cache will displace the least recently used item.

## Why? We are using map and DLL dataStructure.

![map and DLL dataStructure + usecase](lazybaby.png)

## How both dataStructures liked togather.

![map and DLL dataStructure + usecase](key-node-diagram.png)

## Steps to implement the LRUCache

_We can implement the LRUCache using a combination of a hash table (for fast retrieval of values) and a doubly linked list (for efficient eviction of the least recently used item). The hash table allows us to retrieve the value associated with a key in O(1) time, while the doubly linked list allows us to efficiently remove the least recently used item from the cache._

---

#### BASIC OPERATIONS:

1. Inserting key-value pairs with the insertKeyValuePair method.
2. Retrieving a key's value with the getValueFromKey method.
3. Retrieving the most recently used key with the getMostRecentKey method.

---

#### Here are the steps to implement the LRUCache class:

1. Define a Node class to represent a node in the doubly linked list. Each node should have a key, a value, a prev pointer (to the previous node in the list), and a next pointer (to the next node in the list).

2. Define the LRUCache class with a constructor that takes a maxSize argument and initializes the following instance variables:

   - a hash table called cache to store the key-value pairs
   - a dummy head node called head (with prev and next pointers set to None)
   - a dummy tail node called tail (with prev and next pointers set to None)
   - a size variable initialized to 0 (to keep track of the current size of the cache)

3. Implement the insertKeyValuePair method that inserts a key-value pair into the cache. The method should first check if the key is already in the cache. If it is, it should update the value associated with the key and move the corresponding node to the front of the list (to mark it as the most recently used item). If the key is not in the cache, it should create a new node and add it to the front of the list. If the cache is full, the method should remove the least recently used item (the node at the tail of the list) from the cache and remove it from the list. Finally, the method should update the size of the cache.

4. Implement the getValueFromKey method that retrieves the value associated with a key from the cache. The method should first check if the key is in the cache. If it is, it should move the corresponding node to the front of the list (to mark it as the most recently used item) and return the value associated with the key. If the key is not in the cache, the method should return None.

5. Implement the getMostRecentKey method that retrieves the most recently used key from the cache. The method should return the key associated with the node at the front of the list.
## LRU cache implementation (in JS)

```javascript
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = {};
    this.list = new DoublyLinkedList();
  }

  insertKeyValuePair(key, value) {
    if (key in this.cache) {
      const node = this.cache[key];
      node.value = value;
      this.list.moveToFront(node);
    } else {
      const node = new DoublyLinkedListNode(key, value);
      this.cache[key] = node;
      this.list.addToFront(node);
      if (Object.keys(this.cache).length > this.maxSize) {
        const removedNode = this.list.removeFromEnd();
        delete this.cache[removedNode.key];
      }
    }
  }

  getValueFromKey(key) {
    if (key in this.cache) {
      const node = this.cache[key];
      this.list.moveToFront(node);
      return node.value;
    }
    return null;
  }

  getMostRecentKey() {
    if (this.list.head) {
      return this.list.head.key;
    }
    return null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToFront(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  moveToFront(node) {
    if (node === this.head) {
      return;
    } else if (node === this.tail) {
      this.removeFromEnd();
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    this.addToFront(node);
  }

  removeFromEnd() {
    const removedNode = this.tail;
    if (!this.tail) {
      return null;
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    removedNode.prev = null;
    return removedNode;
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
```
