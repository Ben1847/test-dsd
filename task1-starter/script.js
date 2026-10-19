// Task 1: GitHub repositories page
// Steps:
// 1. Write getRepos(username) using fetch and async/await. Check response.ok.
// 2. Write showRepos(repos): one link per repository. Use textContent, not innerHTML.
// 3. Write init(): call getRepos inside try/catch and show a message if it fails.
// 4. Add a JSDoc comment above every function.
// 5. Call init() at the bottom of the file.

// Global constants
// Varaible decides whever the program uses the local file or not
const USE_LOCAL_FILE = false;
// So the program gets repositories from this user
const USERNAME = "Ben1847";

/**
* Fetches the public repositories of a GitHub user.
* @param {string} username - The GitHub username.
* @returns {Promise<Object[]>} The repositories.
*/
async function getRepos(username) {
    const address = USE_LOCAL_FILE // local file (true or false)
    ? "repos.json" // if it is true use local file
    : `https://api.github.com/users/${username}/repos?per_page=100`; // If it is false use the github user
    const response = await fetch(address); // contacts the links server and gets the repositories from the page
    if (!response.ok) { // if its false and fails
    throw new Error(`Request failed with status ${response.status}`); // Creates an error and stops the execution
    }
    return response.json(); // Converts the response to json and returns it
}

/**
 * Displays repositories as a list of links.
 * @param {Object[]} repos - The repository objects.
 */
async function showRepos(repos) {
    const list = document.querySelector("#repos") // Stores the list with the ID
    list.innerHTML = ""; // Removes everything inside the list by setting it to nothing
    if (repos.length === 0) { // Checks if there are no repositories
        list.textContent = "No public repositories found."; // Shows this text on the HTML 
        return; // Exits the function
    }
    for (const repo of repos) { // It is a loop going through all the repositories in the array
        const item = document.createElement("li") // This creates a new HTML list element
        const link = document.createElement("a") // This creates a new HTML link element
        link.href = repo.html_url; // This makes the URL go into the link element
        link.textContent = repo.name; // This makes the repo name the links clickable text
        item.append(link); // Puts the link inside the list item
        list.append(item); // Adds the list onto the webpage
    }
}
async function init(){
    try{ // try to run the code
    showRepos(await getRepos(USERNAME)) // This runs the functions, gets the repositories and displays them on the page
    } catch(error){ // catches the error
        console.error(error) // Logs the error on the console
        document.querySelector("#repos").textContent= "Sorry, The repository could not be loaded"; // Show a error message on the webpage
    }
}

init(); // Calls the function to run everything