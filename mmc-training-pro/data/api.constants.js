const getGithubUri = (username) =>
  `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;
export const gitToken = "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";
export default getGithubUri;
