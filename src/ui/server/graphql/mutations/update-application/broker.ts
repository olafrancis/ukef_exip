import gql from 'graphql-tag';

const updateBrokerMutation = gql`
  mutation ($where: BrokerWhereUniqueInput!, $data: BrokerUpdateInput!) {
    updateBroker(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBrokerMutation;
