---
title: Building Database with Node
excerpt: This is smallest key value store (database) which can be implemented by Node!
image: ''
isFeatured: true
date: '2023-04-15'
---
# Building a Simple Database with Node.js (babybase.js)

This is smallest key value store (database) which can be implemented by Node.js




## Tech Stack

**Server:** Node (built-in `fs` module)



## Source Code

```js
const fs = require('fs');

// This is a class named "Database"
class Database {
	// Constructor takes two parameters filename and pageSize with default value of 4096 (4KB)
	constructor(filename, pageSize = 4096) {
		this.filename = filename;
		this.pageSize = pageSize;
	}

	// This method writes data to a specific page
	async writePage(pageNum, data) {
		// Open the file in "a+" mode
		const fd = await fs.promises.open(this.filename, 'a+');
		// Calculate the offset based on pageNum and pageSize
		const offset = pageNum * this.pageSize;
		// Write the data to the file
		await fd.write(data, 0, this.pageSize, offset);
		// Close the file
		await fd.close();
	}

	// This method reads data from a specific page
	async readPage(pageNum) {
		// Open the file in "r" mode
		const fd = await fs.promises.open(this.filename, 'r');
		// Calculate the offset based on pageNum and pageSize
		const offset = pageNum * this.pageSize;
		// Create a buffer to hold the data
		const buffer = Buffer.alloc(this.pageSize);
		// Read the data from the file
		await fd.read(buffer, 0, this.pageSize, offset);
		// Close the file
		await fd.close();
		// Return the buffer
		return buffer;
	}

	// This method writes a record to the database
	async writeRecord(key, value) {
		// Create an object to hold the key and value
		const record = { key, value };
		// Convert the object to a string
		const serialized = JSON.stringify(record);
		// Get a free page
		const pageNum = await this.getFreePage();
		// Create a buffer to hold the data
		const data = Buffer.alloc(this.pageSize);
		// Write the serialized record to the buffer
		data.write(serialized);
		// Write the buffer to the specified page
		await this.writePage(pageNum, data);
	}

	// This method gets a free page in the database
	async getFreePage() {
		// Get the stats for the file
		const stats = await fs.promises.stat(this.filename);
		// Calculate the number of pages based on the file size and page size
		const numPages = Math.ceil(stats.size / this.pageSize);
		// Return the number of pages
		return numPages;
	}

	// This method searches the database for a record with the specified key
	async search(key) {
		// Get the stats for the file
		const stats = await fs.promises.stat(this.filename);
		// Calculate the number of pages based on the file size and page size
		const numPages = Math.ceil(stats.size / this.pageSize);

		// Loop through each page in the database
		for (let i = 0; i < numPages; i++) {
			// Read the page into a buffer
			const buffer = await this.readPage(i);
			// Convert the buffer to a string and remove any null characters
			let data = buffer.toString('utf-8').trim().replace(/\0/g, '');

			// If the data is not empty
			if (data) {
				// Convert the data to a JSON object
				const record = JSON.parse(data);
				// If the key of the record matches the specified key, return the value
				if (record.key === key) {
					return record.value;
				}
			}
		}

		// If no record is found, return null
		return null

	}
}

(async () => {
	// const Database = require('./Database');
	const db = new Database('./data.db', 1024); //Page size 1KB
	await db.writeRecord('name', 'name_example_key');
	// await db.writeRecord('key2', 'value2');
	console.log(await db.search('name'))

})()


module.exports = Database;

```

