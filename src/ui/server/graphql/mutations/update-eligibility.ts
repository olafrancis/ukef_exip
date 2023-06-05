import gql from 'graphql-tag';

const updateEligibilityMutation = gql`
  mutation ($where: EligibilityWhereUniqueInput!, $data: EligibilityUpdateInput!) {
    updateEligibility(where: $where, data: $data) {
      id
    }
  }
`;

export default updateEligibilityMutation;
