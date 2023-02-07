import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import companiesHouseQuery from '../../../graphql/queries/companies-house';

const getCompaniesHouseInformation = async (companiesHouseNumber: string) => {
  try {
    const queryParams = {
      companiesHouseNumber,
    };

    const query = companiesHouseQuery;
    const response = (await apollo('GET', query, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL network error querying companies house information ', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying companies house information ', response.networkError.result.errors);
    }

    // response.data.getCompaniesHouseInformation should exist if successful
    if (response?.data?.getCompaniesHouseInformation) {
      return response.data?.getCompaniesHouseInformation;
    }

    console.error(response);
    throw new Error('Getting Companies house information');
  } catch (err) {
    console.error(err);
    throw new Error('Getting Companies house information');
  }
};

export default getCompaniesHouseInformation;
