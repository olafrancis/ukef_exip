import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getDeclarationConfidentialityQuery from '../../../graphql/queries/declarations/confidentiality';
import getDeclarationAntiBriberyQuery from '../../../graphql/queries/declarations/anti-bribery';
import updateApplicationDeclarationMutation from '../../../graphql/mutations/update-application/declaration';
import isPopulatedArray from '../../../helpers/is-populated-array';

const declarations = {
  getLatestConfidentiality: async () => {
    try {
      console.info('Getting latest declaration - confidentiality');

      const response = (await apollo('POST', getDeclarationConfidentialityQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - confidentiality ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - confidentiality ', response.networkError.result.errors);
      }

      if (response?.data?.declarationConfidentialities && isPopulatedArray(response.data.declarationConfidentialities)) {
        return response.data.declarationConfidentialities[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - confidentiality');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - confidentiality');
    }
  },
  getLatestAntiBribery: async () => {
    try {
      console.info('Getting latest declaration - anti-bribery');

      const response = (await apollo('POST', getDeclarationAntiBriberyQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - anti-bribery ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - anti-bribery ', response.networkError.result.errors);
      }

      if (response?.data?.declarationAntiBriberies && isPopulatedArray(response.data.declarationAntiBriberies)) {
        return response.data.declarationAntiBriberies[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - anti-bribery');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - anti-bribery');
    }
  },
  update: async (id: string, update: object) => {
    try {
      console.info('Updating application declaration');

      const variables = {
        where: { id },
        data: update,
      };

      const response = (await apollo('POST', updateApplicationDeclarationMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating application declaration ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating application declaration ', response.networkError.result.errors);
      }

      if (response?.data?.updateDeclaration) {
        return response.data.updateDeclaration;
      }

      console.error(response);
      throw new Error('Updating application declaration');
    } catch (err) {
      console.error(err);
      throw new Error('Updating application declaration');
    }
  },
};

export default declarations;
