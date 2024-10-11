import { request } from '@umijs/max';
import type { BasicListItemDataType, DocumenyType } from './data.d';

type ParamsType = {
  count?: number;
} & Partial<BasicListItemDataType>;

type ParamsFileType = {
  count?: number;
} & Partial<DocumenyType>;

export async function queryFileList(
  params: ParamsFileType,
): Promise<{ data: { list: DocumenyType[] } }> {
  return request('/api/files', {
    params,
  });
}

export async function removeFile(
  params: ParamsFileType,
): Promise<{ data: { list: DocumenyType[] } }> {
  return request('/api/post_file', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFile(
  params: ParamsFileType,
): Promise<{ data: { list: DocumenyType[] } }> {
  return request('/api/post_file', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFile(
  params: ParamsFileType,
): Promise<{ data: { list: DocumenyType[] } }> {
  return request('/api/post_file', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/get_list', {
    params,
  });
}

export async function removeFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
