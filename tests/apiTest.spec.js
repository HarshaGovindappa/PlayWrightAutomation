const { test, expect, request } = require('@playwright/test');
const OpenLibraryApi = require('../pageobjects/OpenLibraryApi');

// Load test data from a JSON file and parse it into a JavaScript object
const dataset = JSON.parse(JSON.stringify(require("../utils/AuthorData.json")));

// Loop through each data entry in the dataset to create dynamic test cases
for (const data of dataset) {
    test(`@API Fetch author details for ${data.title} by ${data.author}`, async () => {
        // Set up an API context for making HTTP requests
        const apiContext = await request.newContext();
        const openLibraryApi = new OpenLibraryApi(apiContext);

        // Search for a book using the title and author provided in the dataset
        const searchResult = await openLibraryApi.searchForBook(data.title, data.author);

        // Extract the first `author_key` from the search results
        const authorKey = searchResult.docs[0].author_key;
        console.log(authorKey); // Log the extracted author key for debugging purposes

        // Fetch details of the author using the extracted `author_key`
        const authorDetails = await openLibraryApi.fetchAuthorDetails(authorKey);

        // Log the fetched author details for debugging purposes
        console.log(authorDetails.name);

        // Verify the fetched author details match the expected data from the dataset
        expect(authorDetails.name).toBe(data.name); // Check if the author name matches
        expect(authorDetails.links[0].url).toBe(data.website); // Check if the author website matches
    });
}

// Test case for fetching author details with an invalid `author_key`
test(`@API Fetch author details with invalid author_key`, async () => {
    // Set up an API context for making HTTP requests
    const apiContext = await request.newContext();
    const openLibraryApi = new OpenLibraryApi(apiContext);

    // Search for a book using the title and author from the dataset
    const searchResult = await openLibraryApi.searchForBook(dataset.title, dataset.author);

    // Extract the `author_key` from the search results
    const authorKey = searchResult.docs[0].author_key;
    console.log(authorKey); // Log the extracted author key for debugging purposes

    // Attempt to fetch author details using an invalid `author_key`
    const authorDetails = await openLibraryApi.fetchInvalidAuthorDetails("01234");

    // Log the fetched details for debugging purposes
    console.log(authorDetails);

    // Verify that the API response indicates the author details were not found
    expect(authorDetails.error).toBe("notfound"); 

});
