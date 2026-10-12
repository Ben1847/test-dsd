// Task 1: GitHub repositories page
// Steps:
// 1. Write getRepos(username) using fetch and async/await. Check response.ok.
// 2. Write showRepos(repos): one link per repository. Use textContent, not innerHTML.
// 3. Write init(): call getRepos inside try/catch and show a message if it fails.
// 4. Add a JSDoc comment above every function.
// 5. Call init() at the bottom of the file.
const USE_LOCAL_FILE = false;
const USERNAME = "pixijs";

/**
* Fetches the public repositories of a GitHub user.
* @param {string} username - The GitHub username.
* @returns {Promise<Object[]>} The repositories.
*/
async function getRepos(username) {
        const address = USE_LOCAL_FILE
    ? "repos.json"
    : `https://api.github.com/users/${username}/repos?per_page=100`;
    const response = await fetch(address);
    if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

/**
 * Displays repositories as a list of links.
 * @param {Object[]} repos - The repository objects.
 */
async function showRepos(repos) {
    const list = document.querySelector("#repos")
    list.innerHTML = "";
    if (repos.length === 0) {
        list.textContent = "No public repositories found.";
        return;
    }
    for (const repo of repos) {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.href = repo.html_url;
        link.textContent = repo.name;
        item.append(link);
        list.append(item);
    }
}
async function init(){
    try{
    showRepos(await getRepos(USERNAME))
    } catch(error){
        console.error(error)
        document.querySelector("#repos").textContent= "Sorry, The repository could not be loaded";
    }
}

init();