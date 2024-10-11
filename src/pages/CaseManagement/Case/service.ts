import { request } from '@umijs/max';
import type { caseData } from './data';


//get
export async function getFakeCases(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<caseData>('/api/cases', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function getFakeStations(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>('/api/policeStations', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function getFakeCaseDocs(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>('/api/uploadedFiles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
