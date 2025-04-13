import ServiceManager from './ServiceManager';

export function queryGitInfo(gitId, projectId) {
  return ServiceManager.get(`/amsapi/api/v1/git/${gitId}/projects/${projectId}`);
}

export function queryGitBranch(gitId, projectId, keyword) {
  const urlParams = keyword
    ? `/amsapi/api/v1/git/${gitId}/projects/${projectId}/branch?keyword=${keyword}`
    : `/amsapi/api/v1/git/${gitId}/projects/${projectId}/branch`;
  return ServiceManager.get(urlParams);
}

export function queryGitInfoByProject(projectId) {
  return ServiceManager.get(`/amsapi/api/v1/projects/${projectId}/git`);
}