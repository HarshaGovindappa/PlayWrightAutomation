const { expect } = require("@playwright/test");

// Class to handle interactions with the Open Library API
class OpenLibraryApi {
    constructor(request) {
        // Store the request object for making API calls
        this.request = request;
    }

    // Method to search for a book by title and author
    async searchForBook(title, author) {
        // Send a GET request to the Open Library search endpoint with title and author as query parameters
        const response = await this.request.get(`https://openlibrary.org/search.json?title=${title}&author=${author}`);
        
        // Assert that the response status is OK (status code 200)
        expect(response.ok()).toBeTruthy();
        
        // Parse and return the response as JSON
        return await response.json();
    }

    // Method to fetch author details using an author key
    async fetchAuthorDetails(authorKey) {
        // Send a GET request to the author details endpoint using the authorKey
        const response = await this.request.get(`https://openlibrary.org/authors/${authorKey}.json`);
        
        // Assert that the response status is OK (status code 200)
        expect(response.ok()).toBeTruthy();
        
        // Parse and return the response as JSON
        return await response.json();
    }

    // Method to handle fetching details for an invalid author key
    async fetchInvalidAuthorDetails(authorKey) {
        // Send a GET request to the author details endpoint using an invalid authorKey
        const response = await this.request.get(`https://openlibrary.org/authors/${authorKey}.json`);
        
        // Assert that the response status is NOT OK (expecting an error response)
        expect(response.ok()).toBeFalsy();
        
        // Parse and return the response as JSON
        return await response.json();
    }
}

// Export the OpenLibraryApi class to be used in other test files
module.exports = OpenLibraryApi;
