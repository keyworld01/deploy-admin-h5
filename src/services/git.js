import ServiceManager from './ServiceManager';

export function queryGitInfo(gitId, projectId) {
  return ServiceManager.get(`/amsapi/api/v1/git/${gitId}/projects/${projectId}`);
}

export function queryGitBranch(gitId, projectId, keyword) {
  const encodedProjectId = encodeURIComponent(projectId);
  // GitHub project_id 含 / 需用 query param 传入，避免路由匹配失败
  const base = `/amsapi/api/v1/git/${gitId}/projects/branch?project_id=${encodedProjectId}`;
  const urlParams = keyword ? `${base}&keyword=${keyword}` : base;
  return ServiceManager.get(urlParams);
}

export function queryGitInfoByProject(projectId) {
  return ServiceManager.get(`/amsapi/api/v1/projects/${projectId}/git`);
}