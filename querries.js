Task1:
mongosh
use plp_bookstore 
db.createCollection("books")
show collections

Task2:
// Script to insert 10 book documents into the 'books' collection
// Assumes you have already switched to the 'plp_bookstore' database using 'use plp_bookstore'

// To run this file: 
// 1. Ensure your MongoDB server/Atlas connection is active.
// 2. Open your terminal and run: mongosh < insert_books.js

// Switch to the correct database (if not already done)
use plp_bookstore; 

print("--- Starting Bulk Insertion into 'books' Collection ---");

const booksData = [
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller",
        published_year: 2019,
        price: 15.99,
        in_stock: true,
        pages: 336,
        publisher: "Celadon Books"
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Science Fiction",
        published_year: 2021,
        price: 18.50,
        in_stock: true,
        pages: 496,
        publisher: "Ballantine Books"
    },
    {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        genre: "Literary Fiction",
        published_year: 2018,
        price: 14.25,
        in_stock: false,
        pages: 384,
        publisher: "G.P. Putnam's Sons"
    },
    {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        published_year: 2018,
        price: 17.00,
        in_stock: true,
        pages: 352,
        publisher: "Random House"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        published_year: 1965,
        price: 12.99,
        in_stock: true,
        pages: 688,
        publisher: "Chilton Books"
    },
    {
        title: "The Guest List",
        author: "Lucy Fokley",
        genre: "Thriller",
        published_year: 2020,
        price: 16.99,
        in_stock: true,
        pages: 400,
        publisher: "William Morrow"
    },
    {
        title: "The Secret History",
        author: "Donna Tartt",
        genre: "Literary Fiction",
        published_year: 1992,
        price: 13.50,
        in_stock: true,
        pages: 559,
        publisher: "Alfred A. Knopf"
    },
    {
        title: "Circe",
        author: "Madeline Miller",
        genre: "Fantasy",
        published_year: 2018,
        price: 18.99,
        in_stock: true,
        pages: 393,
        publisher: "Little, Brown and Company"
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        published_year: 2014,
        price: 22.00,
        in_stock: false,
        pages: 443,
        publisher: "Harper"
    },
    {
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fantasy",
        published_year: 2020,
        price: 14.50,
        in_stock: true,
        pages: 304,
        publisher: "Viking"
    }
];

try {
    const result = db.books.insertMany(booksData);
    print(`Successfully inserted ${result.insertedIds.length} documents.`);
} catch (e) {
    print(`An error occurred during insertion: ${e}`);
}

print("--- Insertion Complete ---");

// CRUD Operations on the 'books' collection
// Run these commands directly in your mongosh session after data insertion.

use plp_bookstore;

// ====================================================================
// R (Read): Find all books in a specific genre (e.g., 'Thriller')
// ====================================================================
print("\n--- 1. Find all books in the 'Thriller' genre ---");
db.books.find({ genre: "Thriller" }).pretty();


// ====================================================================
// R (Read): Find books published after a certain year (e.g., 2019)
// The $gt operator means "Greater Than"
// ====================================================================
print("\n--- 2. Find books published after 2019 ---");
db.books.find({ published_year: { $gt: 2019 } }).pretty();


// ====================================================================
// R (Read): Find books by a specific author (e.g., 'Donna Tartt')
// ====================================================================
print("\n--- 3. Find books by 'Donna Tartt' ---");
db.books.find({ author: "Donna Tartt" }).pretty();


// ====================================================================
// U (Update): Update the price of a specific book (e.g., 'Dune')
// We use $set to modify only the 'price' field.
// ====================================================================
print("\n--- 4. Update the price of 'Dune' to 14.99 ---");
db.books.updateOne(
    { title: "Dune" },
    { $set: { price: 14.99 } }
);

// Verify the update
print("Verifying 'Dune' price update:");
db.books.find({ title: "Dune" }).pretty();


// ====================================================================
// D (Delete): Delete a book by its title (e.g., 'Educated')
// ====================================================================
print("\n--- 5. Delete the book titled 'Educated' ---");
db.books.deleteOne(
    { title: "Educated" }
);

// Verify the deletion (it should return null or an empty set)
print("Verifying deletion of 'Educated':");
db.books.find({ title: "Educated" }).pretty();

Task3:
// Advanced Queries on the 'books' collection
// Run these commands directly in your mongosh session after data insertion.

use plp_bookstore;

// ====================================================================
// A1. Find books that are both in stock AND published after 2010
// Uses implicit AND for multiple conditions in the query object.
// ====================================================================
print("\n--- A1. Books In Stock and Published After 2010 ---");
db.books.find({ 
    in_stock: true, 
    published_year: { $gt: 2010 } 
}).pretty();


// ====================================================================
// A2. Use Projection to return only title, author, and price
// 1 = include field, 0 = exclude field. _id: 0 excludes the default ID.
// ====================================================================
print("\n--- A2. Projection: Title, Author, Price of all books ---");
db.books.find(
    {}, // Query: Find all documents
    { title: 1, author: 1, price: 1, _id: 0 } // Projection
).pretty();


// ====================================================================
// A3. Implement Sorting
// Sort by price: 1 for ascending (low to high), -1 for descending (high to low).
// ====================================================================
print("\n--- A3a. Books Sorted by Price (Ascending) ---");
db.books.find().sort({ price: 1 }).pretty();

print("\n--- A3b. Books Sorted by Price (Descending) ---");
db.books.find().sort({ price: -1 }).pretty();


// ====================================================================
// A4. Implement Pagination (5 books per page)
// .limit(N) restricts results to N documents.
// .skip(M) skips the first M documents.
// ====================================================================
print("\n--- A4a. Pagination: Page 1 (Limit 5, Skip 0) ---");
db.books.find().limit(5).skip(0).pretty();

print("\n--- A4b. Pagination: Page 2 (Limit 5, Skip 5) ---");
db.books.find().limit(5).skip(5).pretty();

Task4:
// Advanced Queries on the 'books' collection
// Run these commands directly in your mongosh session after data insertion.

use plp_bookstore;

// ====================================================================
// A1. Find books that are both in stock AND published after 2010
// Uses implicit AND for multiple conditions in the query object.
// ====================================================================
print("\n--- A1. Books In Stock and Published After 2010 ---");
db.books.find({ 
    in_stock: true, 
    published_year: { $gt: 2010 } 
}).pretty();


// ====================================================================
// A2. Use Projection to return only title, author, and price
// 1 = include field, 0 = exclude field. _id: 0 excludes the default ID.
// ====================================================================
print("\n--- A2. Projection: Title, Author, Price of all books ---");
db.books.find(
    {}, // Query: Find all documents
    { title: 1, author: 1, price: 1, _id: 0 } // Projection
).pretty();


// ====================================================================
// A3. Implement Sorting
// Sort by price: 1 for ascending (low to high), -1 for descending (high to low).
// ====================================================================
print("\n--- A3a. Books Sorted by Price (Ascending) ---");
db.books.find().sort({ price: 1 }).pretty();

print("\n--- A3b. Books Sorted by Price (Descending) ---");
db.books.find().sort({ price: -1 }).pretty();


// ====================================================================
// A4. Implement Pagination (5 books per page)
// .limit(N) restricts results to N documents.
// .skip(M) skips the first M documents.
// ====================================================================
print("\n--- A4a. Pagination: Page 1 (Limit 5, Skip 0) ---");
db.books.find().limit(5).skip(0).pretty();

print("\n--- A4b. Pagination: Page 2 (Limit 5, Skip 5) ---");
db.books.find().limit(5).skip(5).pretty();

// ====================================================================
// T4. AGGREGATION PIPELINES
// ====================================================================

// --- T4.1: Average Price by Genre ---
// $group stage groups documents by the 'genre' field ($_id) 
// and calculates the average price ($avg) for each group.
print("\n--- T4.1: Average Price of Books by Genre ---");
db.books.aggregate([
    { $group: {
        _id: "$genre",
        average_price: { $avg: "$price" }
    }}
]).pretty();

// --- T4.2: Author with the Most Books ---
// 1. $group by author and count the documents ($sum: 1).
// 2. $sort the results in descending order by book_count.
// 3. $limit the result to 1 to get the top author.
print("\n--- T4.2: Author with the Most Books ---");
db.books.aggregate([
    { $group: {
        _id: "$author",
        book_count: { $sum: 1 } // Sum of 1 for each document in the group
    }},
    { $sort: { book_count: -1 } }, // Sort descending
    { $limit: 1 } // Take the top result
]).pretty();

// --- T4.3: Group Books by Publication Decade and Count ---
// 1. $project creates a new field 'publication_decade' using math expressions.
//    (published_year / 10, floor, multiply by 10, then convert to string and append 's').
// 2. $group by the calculated 'publication_decade' and count them.
// 3. $sort by decade for cleaner output.
print("\n--- T4.3: Group Books by Publication Decade and Count ---");
db.books.aggregate([
    // Stage 1: Calculate the decade field
    { $project: {
        _id: 0,
        title: 1,
        publication_decade: {
            $concat: [ 
                { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, 
                "s" 
            ]
        }
    }},
    // Stage 2: Group by the new decade field and count
    { $group: {
        _id: "$publication_decade",
        total_books: { $sum: 1 }
    }},
    // Stage 3: Sort by decade
    { $sort: { _id: 1 } }
]).pretty();

Task5:
// Advanced Queries on the 'books' collection
// Run these commands directly in your mongosh session after data insertion.

use plp_bookstore;

// ====================================================================
// A1. Find books that are both in stock AND published after 2010
// Uses implicit AND for multiple conditions in the query object.
// ====================================================================
print("\n--- A1. Books In Stock and Published After 2010 ---");
db.books.find({ 
    in_stock: true, 
    published_year: { $gt: 2010 } 
}).pretty();


// ====================================================================
// A2. Use Projection to return only title, author, and price
// 1 = include field, 0 = exclude field. _id: 0 excludes the default ID.
// ====================================================================
print("\n--- A2. Projection: Title, Author, Price of all books ---");
db.books.find(
    {}, // Query: Find all documents
    { title: 1, author: 1, price: 1, _id: 0 } // Projection
).pretty();


// ====================================================================
// A3. Implement Sorting
// Sort by price: 1 for ascending (low to high), -1 for descending (high to low).
// ====================================================================
print("\n--- A3a. Books Sorted by Price (Ascending) ---");
db.books.find().sort({ price: 1 }).pretty();

print("\n--- A3b. Books Sorted by Price (Descending) ---");
db.books.find().sort({ price: -1 }).pretty();


// ====================================================================
// A4. Implement Pagination (5 books per page)
// .limit(N) restricts results to N documents.
// .skip(M) skips the first M documents.
// ====================================================================
print("\n--- A4a. Pagination: Page 1 (Limit 5, Skip 0) ---");
db.books.find().limit(5).skip(0).pretty();

print("\n--- A4b. Pagination: Page 2 (Limit 5, Skip 5) ---");
db.books.find().limit(5).skip(5).pretty();

// ====================================================================
// T4. AGGREGATION PIPELINES
// ====================================================================

// --- T4.1: Average Price by Genre ---
// $group stage groups documents by the 'genre' field ($_id) 
// and calculates the average price ($avg) for each group.
print("\n--- T4.1: Average Price of Books by Genre ---");
db.books.aggregate([
    { $group: {
        _id: "$genre",
        average_price: { $avg: "$price" }
    }}
]).pretty();

// --- T4.2: Author with the Most Books ---
// 1. $group by author and count the documents ($sum: 1).
// 2. $sort the results in descending order by book_count.
// 3. $limit the result to 1 to get the top author.
print("\n--- T4.2: Author with the Most Books ---");
db.books.aggregate([
    { $group: {
        _id: "$author",
        book_count: { $sum: 1 } // Sum of 1 for each document in the group
    }},
    { $sort: { book_count: -1 } }, // Sort descending
    { $limit: 1 } // Take the top result
]).pretty();


print("\n--- T4.3: Group Books by Publication Decade and Count ---");
db.books.aggregate([
    
    { $project: {
        _id: 0,
        title: 1,
        publication_decade: {
            $concat: [ 
                { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, 
                "s" 
            ]
        }
    }},
    { $group: {
        _id: "$publication_decade",
        total_books: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
]).pretty();

print("\n--- T5. Indexing: Dropping existing custom indexes ---");
db.books.dropIndexes();

print("\n--- T5.1: Creating index on { title: 1 } ---");
db.books.createIndex({ title: 1 });

print("\n--- T5.2: Creating compound index on { author: 1, published_year: -1 } ---");
db.books.createIndex({ author: 1, published_year: -1 });

print("\n--- T5.3: Listing all indexes in the collection ---");
db.books.getIndexes();

print("\n--- T5.4a: Explain query using the 'title' index (Key: IXSCAN) ---");
db.books.find({ title: "Project Hail Mary" }).explain("executionStats");



print("\n--- T5.4b: Explain query using the compound index (Key: IXSCAN) ---");
db.books.find({ author: "Matt Haig", published_year: { $lt: 2025 } }).explain("executionStats");

