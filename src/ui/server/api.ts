import { ApolloError } from 'apollo-client';
import axios, { AxiosBasicCredentials, AxiosResponse, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { ApolloResponse } from '../types';
import apollo from './graphql/apollo';
import createApplicationMutation from './graphql/mutations/create-application';
import getApplicationQuery from './graphql/queries/application';
import pageQuery from './graphql/queries/page';

dotenv.config();

const getCountries = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: process.env.MULESOFT_API_CIS_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MULESOFT_API_CIS_KEY,
        password: process.env.MULESOFT_API_CIS_SECRET,
      } as AxiosBasicCredentials,
    };

    const response: AxiosResponse = await axios(config);

    return response.data;
  } catch (err) {
    console.error('Unable to fetch CIS countries', err);
    return err;
  }
};

const getCurrencies = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: process.env.MULESOFT_API_MDM_EA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MULESOFT_API_MDM_EA_KEY,
        password: process.env.MULESOFT_API_MDM_EA_SECRET,
      } as AxiosBasicCredentials,
    };

    const response: AxiosResponse = await axios(config);

    return response.data;
  } catch (err) {
    console.error('Unable to fetch MDM-EA currencies', err);
    return err;
  }
};

const keystone = {
  createApplication: async () => {
    try {
      console.info('Creating application');

      const response = (await apollo('POST', createApplicationMutation, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating application ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating application ', response.networkError.result.errors);
      }

      if (response?.data?.createApplication) {
        return response.data.createApplication;
      }

      if (response instanceof ApolloError) {
        throw new Error('Creating application');
      }
    } catch {
      throw new Error('Creating application');
    }
  },
  getApplication: async (referenceNumber: number) => {
    try {
      console.info('Getting application');

      const response = (await apollo('GET', getApplicationQuery, { referenceNumber })) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting application ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting application ', response.networkError.result.errors);
      }

      if (response?.data?.referenceNumber && response?.data?.referenceNumber?.application) {
        const { data } = response;

        return {
          ...data.referenceNumber.application,
          referenceNumber: data.referenceNumber.id,
        };
      }

      throw new Error('Getting application');
    } catch {
      throw new Error('Getting application');
    }
  },
  getPage: async (pageId: string) => {
    try {
      console.info('Getting page data');

      const queryParams = {
        id: pageId,
      };

      const response = (await apollo('GET', pageQuery, queryParams)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error querying keystone page ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying keystone page ', response.networkError.result.errors);
      }

      if (response?.data?.page) {
        return response.data.page;
      }

      throw new Error('Getting page data');
    } catch {
      throw new Error('Getting page data');
    }
  },
};

const api = {
  getCountries,
  getCurrencies,
  keystone,
};

export default api;
