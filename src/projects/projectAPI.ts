import { IProject, Project } from "./Project";

const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function convertToProjectModels(data: (IProject | undefined)[]): Project[] {
  const projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: IProject | undefined): Project {
  return new Project(item);
}

const projectAPI = {
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
    .then(checkStatus)
    .then(parseJSON)
    .then(convertToProjectModels)
  },
  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error: TypeError) => {
      console.log('log client error ' + error);
      throw new Error(
        'There was an error updating the project. Please try again.'
      )
    })
  }
}

export { projectAPI }
