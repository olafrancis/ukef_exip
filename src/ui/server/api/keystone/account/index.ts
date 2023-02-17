import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';
import getExporterQuery from '../../../graphql/queries/account/get';
import verifyExporterEmailAddressMutation from '../../../graphql/mutations/account/verify-email-address';
import sendEmailConfirmEmailAddressMutation from '../../../graphql/mutations/account/send-email-confirm-email-address';
import accountSignInMutation from '../../../graphql/mutations/account/sign-in';

const account = {
  create: async (variables: Account) => {
    try {
      console.info('Creating exporter account');

      const response = (await apollo('POST', createExporterMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.createAccount) {
        return response.data.createAccount;
      }

      console.error(response);
      throw new Error('Creating exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Creating exporter account');
    }
  },
  get: async (id: string) => {
    try {
      console.info('Getting exporter account');

      const variables = { id };

      const response = (await apollo('POST', getExporterQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.exporter) {
        return response.data.exporter;
      }

      console.error(response);
      throw new Error('Getting exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Getting exporter account');
    }
  },
  verifyEmailAddress: async (token: string) => {
    try {
      console.info('Verifying exporter email address');

      const variables = { token };

      const response = (await apollo('POST', verifyExporterEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying exporter email address ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying exporter email address ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountEmailAddress) {
        return response.data.verifyAccountEmailAddress;
      }

      console.error(response);
      throw new Error('Verifying exporter email address');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying exporter email address');
    }
  },
  sendEmailConfirmEmailAddress: async (exporterId: string) => {
    try {
      console.info('Sending email verification for account creation');

      const variables = { exporterId };

      const response = (await apollo('POST', sendEmailConfirmEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email verification for account creation ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email verification for account creation ', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailConfirmEmailAddress) {
        return response.data.sendEmailConfirmEmailAddress;
      }

      console.error(response);
      throw new Error('Sending email verification for account creation');
    } catch (err) {
      console.error(err);
      throw new Error('Sending email verification for account creation');
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      console.info('Signing in exporter account');

      const variables = { email, password };

      const response = (await apollo('POST', accountSignInMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error signing in exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error signing in exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.accountSignIn) {
        return response.data.accountSignIn;
      }

      console.error(response);
      throw new Error('Signing in exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Signing in exporter account');
    }
  },
};

export default account;
