import axios from "axios";
import getGithubUri, { gitToken } from "../data/api.constants.js";

const headers = {
  "user-agent": "node.js",
  Authorization: "token " + gitToken,
};

const getGithubRepositories = async (username) => {
  const gitHubResponse = await axios.get(getGithubUri(username), { headers });
  return gitHubResponse;
};

export default getGithubRepositories;
