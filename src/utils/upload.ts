import fs from 'fs';

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import mime from 'mime-types';

import { SupportedFileTypes } from '../graphql-schema/generated/graphql-request';

// util currently supporting only image files via the proxy

type uploadFileRequest = {
  uploadUrl: string;
  path: string;
};

const proxyUrl = process.env.PROXY_URL as string;

const getContentType = (path: string): string => {
  const contentType = mime.lookup(path);

  if (!contentType) {
    throw Error('Invalid content type');
  }

  return contentType;
};

const getBase64Payload = (path: string, contentType: string): string => {
  const base64Payload = fs.readFileSync(path, { encoding: 'base64' });
  return `data:${contentType};base64,${base64Payload}`;
};

const getRequestParams = ({ uploadUrl, path }: uploadFileRequest) => {
  const contentType = getContentType(path);
  const payload = getBase64Payload(path, contentType);

  return {
    url: `${proxyUrl}/api/upload`,
    data: { payload, contentType, uploadUrl },
    options: {},
  };
};

export const getSupportedFileTypeForFile = (
  path: string
): SupportedFileTypes | undefined => {
  const fileExtension = path.split('.').pop() as string;
  const fileType =
    fileExtension.charAt(0).toUpperCase() + fileExtension.slice(1);

  return Object.keys(SupportedFileTypes).includes(fileType)
    ? SupportedFileTypes[fileType as keyof typeof SupportedFileTypes]
    : undefined;
};

export const uploadToAWS = (
  request: uploadFileRequest,
  config: AxiosRequestConfig = {}
) => {
  const { url, data, options } = getRequestParams(request);

  return axios.put(url, data, { ...options, ...config });
};
