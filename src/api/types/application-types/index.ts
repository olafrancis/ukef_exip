import { Country } from '../country';
import { Relationship } from '../relationship';

export interface ApplicationBusiness extends Relationship {
  goodsOrServicesSupplied: string;
  totalYearsExporting: string;
  totalEmployeesInternational: string;
  totalEmployeesUK: string;
  estimatedAnnualTurnover: string;
  exportsTurnoverPercentage: string;
}

export interface ApplicationBuyer extends Relationship {
  companyOrOrganisationName?: string;
  address?: string;
  country?: Country;
  registrationNumber?: string;
  website?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
  exporterIsConnectedWithBuyer?: boolean;
  exporterHasTradedWithBuyer?: boolean;
}

export interface ApplicationCompany {
  id: string;
  companyName?: string;
}

export interface ApplicationCompanyAddress extends Relationship {
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

export interface ApplicationCompanySicCode {
  id: string;
  companyId: string;
  sicCode: string;
  industrySectorName: string;
}

export interface ApplicationDeclaration extends Relationship {
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean | null;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

export interface ApplicationEligibility extends Relationship {
  buyerCountryIsoCode: string;
  hasCompaniesHouseNumber: boolean;
  otherPartiesInvolved: boolean;
  paidByLetterOfCredit: boolean;
  needPreCreditPeriodCover: boolean;
  wantCoverOverMaxAmount: boolean;
  wantCoverOverMaxPeriod: boolean;
}

export interface ApplicationExportContract extends Relationship {
  goodsOrServicesDescription?: string;
  finalDestinationCountryCode?: string;
  finalDestinationCountry?: Country;
}

export interface ApplicationOwner extends Relationship {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApplicationPolicy extends Relationship {
  requestedStartDate: Date;
}

export interface ApplicationPolicyContact extends Relationship {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  isSameAsOwner: boolean;
}

export interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  dealType: string;
  submissionCount: number;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: Date;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationEligibility;
  exportContract: ApplicationExportContract;
  owner: ApplicationOwner;
  policy: ApplicationPolicy;
  policyContact: ApplicationPolicyContact;
  company: ApplicationCompany;
  companySicCodes: Array<ApplicationCompanySicCode>;
  companyAddress: ApplicationCompanyAddress;
  business: ApplicationBusiness;
  broker: Relationship;
  buyer: ApplicationBuyer;
  sectionReview: Relationship;
  declaration: ApplicationDeclaration;
}

export interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  name: string;
  referenceNumber: number;
  buyerName: string;
  buyerLocation: string;
}

export interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE: number;
  TOTAL_VALUE_OF_CONTRACT: number;
  DEFAULT_FINAL_DESTINATION_KNOWN: boolean;
}

export interface CreateAnApplicationVariables {
  accountId: string;
  eligibilityAnswers: ApplicationEligibility;
}

export interface DeleteApplicationByReferenceNumberVariables {
  referenceNumber: number;
}

export interface SubmitApplicationVariables {
  applicationId: string;
}
