PLP Bookstore MongoDB Queries Project

This repository contains the necessary scripts and queries to set up a plp_bookstore database, populate it with book data, and execute various MongoDB operations, ranging from basic CRUD to advanced aggregation and performance indexing.

Prerequisites

To run these scripts, you must have:

MongoDB Server: Installed locally or connected via a MongoDB Atlas cluster.

mongosh: The MongoDB Shell, installed and configured to connect to your MongoDB server.

The insert_books.js file (not provided here, but required to populate the data).

Setup Instructions

1. Database and Collection Creation

The first line in both script files (insert_books.js and queries.js) is use plp_bookstore;. This command handles the database creation automatically if it doesn't already exist. The books collection is created when the first document is inserted.

2. Running the Scripts

All scripts are designed to be run directly using the mongosh utility.

Step 1: Insert Data

You must run the insertion script first to populate the books collection with data.

# Assuming you have an insert_books.js file with the 10 book documents
mongosh < insert_books.js


Step 2: Run Queries

Execute the queries in the queries.js file to perform the CRUD, advanced, and indexing tasks.

mongosh < queries.js


Query Breakdown (from queries.js)

The queries.js file contains queries categorized by task.

T3. Advanced Queries

ID

Description

Concepts Demonstrated

A1

Find books in stock AND published after 2010.

Compound Query, $gt operator.

A2

Return only title, author, and price.

Projection ({field: 1}), Hiding _id.

A3

Display books sorted by price (Asc/Desc).

.sort() method (1 for Asc, -1 for Desc).

A4

Implement 5-book pagination.

.limit() and .skip() methods.

T4. Aggregation Pipelines

ID

Description

Pipeline Stages

T4.1

Calculate the average price of books per genre.

$group with $avg.

T4.2

Find the single author with the most books.

Chaining $group, $sort, and $limit.

T4.3

Group and count books by their publication decade.

$project (for calculated fields), $group, and $sort.

T5. Indexing and Performance

This section manages and demonstrates index creation.

ID

Description

Index Type

T5.1

Creates a single index on the title field.

Single-Field Index

T5.2

Creates a combined index on author and published_year.

Compound Index

T5.4

Uses db.books.find().explain("executionStats") to verify that MongoDB is using the created indexes (IXSCAN).

Performance Testing

Cleanup

To remove the database and all its contents when finished:

use plp_bookstore;
db.dropDatabase();
