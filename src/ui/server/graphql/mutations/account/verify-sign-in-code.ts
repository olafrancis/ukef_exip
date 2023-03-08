import gql from 'graphql-tag';

const verifyAccountSignInCodeMutation = gql`
  mutation VerifyAccountSignInCode($accountId: String!, $securityCode: String!) {
    verifyAccountSignInCode(accountId: $accountId, securityCode: $securityCode) {
      success
      firstName
      lastName
      token
      expires
      accountId
    }
  }
`;

export default verifyAccountSignInCodeMutation;
