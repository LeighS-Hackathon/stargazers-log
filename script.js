const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

const formatStars = (stars) => `${stars.toLocaleString()} stars`;

const createRepositoryCard = (repository) => {
  const card = document.createElement("article");
  card.className = "repository";

  const language = repository.language
    ? `<span class="language">${repository.language}</span>`
    : "";

  card.innerHTML = `
    <h3><a href="${repository.url}" target="_blank" rel="noopener noreferrer">${repository.name}</a></h3>
    <p class="owner">${repository.owner} / ${repository.name}</p>
    <p class="description">${repository.description}</p>
    <div class="repository-meta">
      ${language}
      <span>${formatStars(repository.stars)}</span>
    </div>
  `;

  return card;
};

const renderRepositories = (repositories) => {
  repositoryList.replaceChildren();
  repositoryCount.textContent = `${repositories.length} repositories`;

  if (repositories.length === 0) {
    repositoryList.innerHTML = '<p class="status">No starred repositories yet.</p>';
    return;
  }

  repositories.forEach((repository) => {
    repositoryList.appendChild(createRepositoryCard(repository));
  });
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load events.json (${response.status})`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(() => {
    repositoryCount.textContent = "";
    repositoryList.innerHTML = '<p class="status">The repository list could not be loaded.</p>';
  });