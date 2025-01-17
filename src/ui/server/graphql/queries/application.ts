import gql from 'graphql-tag';

const applicationQuery = gql`
  query referenceNumber($referenceNumber: ID!) {
    referenceNumber(where: { id: $referenceNumber }) {
      id
      application {
        id
        version
        createdAt
        updatedAt
        dealType
        submissionCount
        submissionDeadline
        submissionType
        submissionDate
        status
        eligibility {
          id
          buyerCountry {
            isoCode
            name
          }
          coverPeriod {
            id
            value
            valueId
          }
          hasMinimumUkGoodsOrServices
          hasEndBuyer
          hasCompaniesHouseNumber
          otherPartiesInvolved
          paidByLetterOfCredit
          totalContractValue {
            id
            value
            valueId
          }
          validExporterLocation
        }
        policy {
          id
          needPreCreditPeriodCover
          policyType
          requestedStartDate
          contractCompletionDate
          totalValueOfContract
          creditPeriodWithBuyer
          policyCurrencyCode
          totalMonthsOfCover
          totalSalesToBuyer
          maximumBuyerWillOwe
        }
        policyContact {
          id
          firstName
          lastName
          email
          position
          isSameAsOwner
        }
        exportContract {
          id
          goodsOrServicesDescription
          finalDestinationCountryCode
        }
        owner {
          id
          firstName
          lastName
          email
        }
        company {
          id
          companyName
          companyNumber
          companyWebsite
          hasDifferentTradingName
          differentTradingName
          hasDifferentTradingAddress
          dateOfCreation
          phoneNumber
          financialYearEndDate
          sicCodes {
            id
            sicCode
            industrySectorName
          }
          registeredOfficeAddress {
            id
            addressLine1
            addressLine2
            careOf
            locality
            region
            postalCode
            country
            premises
          }
        }
        business {
          id
          goodsOrServicesSupplied
          totalYearsExporting
          totalEmployeesUK
          estimatedAnnualTurnover
          exportsTurnoverPercentage
        }
        broker {
          id
          isUsingBroker
          name
          addressLine1
          addressLine2
          town
          county
          postcode
          email
        }
        buyer {
          id
          companyOrOrganisationName
          address
          country {
            isoCode
            name
          }
          registrationNumber
          website
          contactFirstName
          contactLastName
          contactPosition
          contactEmail
          canContactBuyer
          exporterIsConnectedWithBuyer
          exporterHasTradedWithBuyer
        }
        sectionReview {
          id
          eligibility
          policy
          business
          buyer
        }
        declaration {
          id
          agreeToConfidentiality
          agreeToAntiBribery
          hasAntiBriberyCodeOfConduct
          willExportWithAntiBriberyCodeOfConduct
          agreeToConfirmationAndAcknowledgements
          agreeHowDataWillBeUsed
        }
      }
    }
  }
`;

export default applicationQuery;
