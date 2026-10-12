// Model answer for Task 1 (teacher copy).
// If GitHub blocks requests (error 403), change USE_LOCAL_FILE to true.
// Open the page with Live Server so the local file can be read.
const USE_LOCAL_FILE = false;
const USERNAME = 'pixijs';

/**
 * Fetches the public repositories of a GitHub user.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Object[]>} The repository objects.
 */
async function getRepos(username) {
  const address = USE_LOCAL_FILE
    ? 'repos.json'
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
function showRepos(repos) {
  const list = document.querySelector('#repos');
  list.innerHTML = '';
  if (repos.length === 0) {
    list.textContent = 'No public repositories found.';
    return;
  }
  for (const repo of repos) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.textContent = repo.name;
    item.append(link);
    list.append(item);
  }
}

/** Loads the repositories and shows them, or shows a message if it fails. */
async function init() {
  try {
    showRepos(await getRepos(USERNAME));
  } catch (error) {
    console.error(error);
    document.querySelector('#repos').textContent =
      'Sorry, the repositories could not be loaded.';
  }
}

init();
