class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode < 0 ? hashCode + this.capacity : hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size > this.capacity * this.loadFactor) {
      this._resize();
    }
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;

    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      for (let j = 0; j < bucket.length; j++) {
        const item = bucket[j];
        const newIndex = this.hash(item[0]);
        this.buckets[newIndex].push(item);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }

    const index = hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    let allKeys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        allKeys.push(bucket[j][0]);
      }
    }

    return allKeys;
  }

  values() {
    let allValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        allValues.push(bucket[j][1]);
      }
    }

    return allValues;
  }

  entries() {
    let allEntries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        allEntries.push(bucket[j]);
      }
    }

    return allEntries;
  }
}
