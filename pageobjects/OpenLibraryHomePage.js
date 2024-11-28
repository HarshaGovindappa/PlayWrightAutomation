// Import necessary modules from Playwright
const { expect, Locator, Page } = require('@playwright/test');

// Define the OpenLibraryHomePage class to encapsulate all interactions with the Open Library homepage
class OpenLibraryHomePage {

  // Constructor initializes the page and locates the necessary elements on the Open Library page
  constructor(page) {
    // Playwright's page object, representing a browser tab
    this.page = page;

    // Locate the title input field in the search form
    this.searchInputTitle = page.locator('#qtop-title');

    // Locate the author input field in the search form
    this.searchInputAuthor = page.locator('#qtop-author');

    // Locate the search button
    this.searchButton = page.locator('button[type="submit"]');

    // Locate the dropdown for advanced search options
    this.advancedSearchDropdown = page.locator('label.search-facet-selector');

    // Locate the dropdown menu for sorting results
    this.sortDropdown = page.locator('.sort-dropper');

    // Locate the "Top Rated" sorting option
    this.sortTopRatedOption = page.locator('a[data-ol-link-track$="SearchSort|Rating"]');

    // Locate the label displaying the selected sorting method
    this.sortSelectedLabel = page.locator('.sort-selected');

    // Locate the first search result item from the result list
    this.firstSearchResult = page.locator('.searchResultItem').first();

    // Locate the message displayed when no search results are found
    this.noResultsMessage = page.getByText("No books directly matched your search");
  }

  // Navigate to the Open Library homepage
  async goto() {
    await this.page.goto('https://openlibrary.org/');
  }

  // Select an advanced search option (e.g., by title, author, etc.)
  async selectAdvancedSearch(advanceSelect) {
    await this.advancedSearchDropdown.selectOption(advanceSelect); // Interact with the dropdown
  }

  // Fill the title field in the search form
  async fillTitle(title) {
    await this.searchInputTitle.fill(title); // Input the book title into the title field
  }

  // Fill the author field in the search form
  async fillAuthor(author) {
    await this.searchInputAuthor.fill(author); // Input the author's name into the author field
  }

  // Submit the search form by clicking the search button
  async submitSearch() {
    await this.searchButton.click(); // Trigger the search action
  }

  // Select the "Top Rated" sorting option for search results
  async selectTopRatedSort() {
    await this.sortDropdown.click(); // Open the sorting dropdown
    await this.sortTopRatedOption.click(); // Select the "Top Rated" option
  }

  // Verify that "Top Rated" sorting is selected
  async verifyTopRatedSortSelected() {
    await expect(this.sortSelectedLabel).toContainText('Top Rated'); // Check if the label contains "Top Rated"
  }

  // Retrieve the title of the first search result item
  async getFirstSearchResultTitle() {
    const titleElement = await this.firstSearchResult.locator('.resultTitle'); // Locate the title within the first result
    return await titleElement.textContent(); // Return the text content of the title
  }

  // Verify that the "No results" message is displayed
  async verifyNoResults() {
    await expect(this.noResultsMessage).toBeVisible(); // Check if the "No results" message is visible
  }
}

// Export the class for use in test scripts
module.exports = { OpenLibraryHomePage };
