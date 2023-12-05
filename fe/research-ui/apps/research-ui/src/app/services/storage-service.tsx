import axios from 'axios';
import * as Minio from 'minio';
import { environment } from '../../environments/environment';
import UserService from './user-service';

const http_client = axios.create({
  baseURL: environment.MINIO_URL,
});

let minioclient: Minio.Client;

const getClient = (): Minio.Client => {
  return minioclient;
};

const initStorage = () => {
  http_client
    .post(
      `?Action=AssumeRoleWithWebIdentity&Version=2011-06-15&DurationSeconds=86000&WebIdentityToken=${UserService.getToken()}`,
      {}
    )
    .then((response: { data: string }) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');

      minioclient = new Minio.Client({
        endPoint: environment.MINIO_HOST,
        port: 9000,
        useSSL: false,
        accessKey:
          xmlDoc
            .getElementsByTagName('AccessKeyId')[0]
            .textContent?.toString() ?? '',
        secretKey:
          xmlDoc
            .getElementsByTagName('SecretAccessKey')[0]
            .textContent?.toString() ?? '',
        sessionToken:
          xmlDoc
            .getElementsByTagName('SessionToken')[0]
            .textContent?.toString() ?? '',
      });
    })
    .catch((response) => {
      alert(response);
    });
};

export const MinioStorageService = {
  initStorage,
  getClient,
};

export default MinioStorageService;
