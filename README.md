# Playwright Test Automation Framework

This framework provides a comprehensive suite of automated tests for the Open Library website. It leverages Playwright for end-to-end testing of both the User Interface (UI) and the backend Application Programming Interface (API).

**The rationale behind choosing playwright is** 
  - Auto wait capablity
  - Cross browser compatablity
  - Multiple programming language support
  - Fast debugging and reporting
  - Mocking request/response capablity.

## Prerequisites

### System Requirements

- **Node.js:** Version 14.x or higher.
- **npm:** Installed alongside Node.js.
- **Git:** For cloning the repository (optional).

### Playwright Installation

Playwright automatically installs the necessary browser binaries during setup.

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_folder>

2. **Install Dependencies**

   Install the required Node.js and playwright modules:
   ```bash
    npm install
    npx playwright install


## Running the Tests

1. **Run All Tests**

    Execute both UI and API tests:

     ```bash
      npx playwright test

2. **Run Only UI Tests**
    To execute tests related to Open Library's UI:

    ```bash
    npx playwright test --grep @UI

3. **Run Only API Tests**
  To execute tests for API endpoints:
   ```bash
    npx playwright test --grep @API

4. **Generate HTML Report**
  After running the tests, generate a detailed HTML report:
   ```bash
   npx playwright show-report

## Project Structure

### Key Files and Directories

- **tests/**:
  - **UITest.spec.js**: Contains UI tests for advanced search and sorting functionality using the dataset in AuthorTopRated.json.

  - **apiTest.spec.js**: Contains API tests to validate book search and author details using AuthorData.json.

- **utils/**: Directory holding JSON datasets used for test execution:
  - **AuthorData.json**
  - **AuthorTopRated.json**

- **pageobjects/**: Contains reusable page object classes:
  - **OpenLibraryHomePage.js**: Encapsulates UI interactions for Open Library's homepage.
  - **OpenLibraryApi.js**: Encapsulates API calls to the Open Library endpoints.
    
