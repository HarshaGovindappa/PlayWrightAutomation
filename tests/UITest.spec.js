const { test, expect } = require('@playwright/test');
const { OpenLibraryHomePage } = require('../pageobjects/OpenLibraryHomePage');

// Load test data from a JSON file and parse it into a JavaScript object
const dataset = JSON.parse(JSON.stringify(require("../utils/AuthorTopRated.json")));

// A hook that runs before each test to navigate to the Open Library homepage
test.beforeEach(async ({ page }) => {
  const openLibraryHomePage = new OpenLibraryHomePage(page);
  await openLibraryHomePage.goto(); // Open the homepage
});

// A hook that runs after each test to close the browser page
test.afterEach(async ({ page }) => {
  await page.close(); // Ensure the page is closed to clean up resources
});

// Dynamically create test cases for each entry in the dataset
for (const data of dataset) {
  test(`@UI Advance Search for top-rated book ${data.title} by ${data.author}`, async ({ page }) => {
    // Initialize the Open Library home page object
    const openLibraryHomePage = new OpenLibraryHomePage(page);

    const advanceSelect = "advanced"; // Select the advanced search option
    await openLibraryHomePage.goto(); // Navigate to the homepage
    await openLibraryHomePage.selectAdvancedSearch(advanceSelect); // Open advanced search form
    await openLibraryHomePage.fillTitle(data.title); // Fill in the book title
    await openLibraryHomePage.fillAuthor(data.author); // Fill in the author name
    await openLibraryHomePage.submitSearch(); // Submit the search form

    // Sort the results by top-rated and verify the sort functionality
    await openLibraryHomePage.selectTopRatedSort();
    await openLibraryHomePage.verifyTopRatedSortSelected();

    // Fetch the title of the first result and verify it matches the expected result
    const firstResultTitle = await openLibraryHomePage.getFirstSearchResultTitle();
    await expect(firstResultTitle).toContain(data.Expected_Result); // Ensure the result matches the dataset
  });
}

// Test case for invalid title-author combination
test('@UI Advance Search author with invalid title', async ({ page }) => {
  // Initialize the Open Library home page object
  const openLibraryHomePage = new OpenLibraryHomePage(page);

  const advanceSelect = "advanced"; // Select the advanced search option
  await openLibraryHomePage.goto(); // Navigate to the homepage
  await openLibraryHomePage.selectAdvancedSearch(advanceSelect); // Open advanced search form
  await openLibraryHomePage.fillTitle("Lord of the Rings"); // Fill in an invalid title
  await openLibraryHomePage.fillAuthor("Rowling"); // Fill in an invalid author
  await openLibraryHomePage.submitSearch(); // Submit the search form

  // Verify that no results are displayed for the invalid search criteria
  await openLibraryHomePage.verifyNoResults();
});
