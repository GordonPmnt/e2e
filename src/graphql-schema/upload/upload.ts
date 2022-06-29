import { getSupportedFileTypeForFile, uploadToAWS } from '../../utils/upload';
import type { UploadImage } from '../generated/graphql-request';
import { UploadImageMutationDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const uploadFile = async (
  user: string,
  path: string
): Promise<string | undefined> => {
  try {
    const uploadImage = await upload(user, path);
    const uploadUrl = uploadImage?.url;
    const id = uploadImage?.id;

    if (!uploadUrl || !id) {
      return;
    }

    await uploadToAWS({ uploadUrl, path });

    return id;
  } catch (err) {
    throw Error(err as string);
  }
};

const upload = async (
  user: string,
  path: string
): Promise<UploadImage | undefined> => {
  const client = await getGraphQLClient(user);
  const uploadData = await client.queryWithRetries({
    query: UploadImageMutationDocument,
    variables: {
      input: { fileType: getSupportedFileTypeForFile(path) },
    },
  });
  await client.closeSession();

  return uploadData.data?.uploadImage
    ? uploadData.data?.uploadImage
    : undefined;
};
