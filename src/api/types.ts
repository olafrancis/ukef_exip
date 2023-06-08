import { AccountUpdateInput, CompanyUpdateInput } from '.keystone/types'; // eslint-disable-line

interface SuccessResponse {
  success: boolean;
}

interface ApplicationRelationship {
  id: string;
}

interface ApplicationBusinessContactDetail extends ApplicationRelationship {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ApplicationBusiness extends ApplicationRelationship {
  businessContactDetail: ApplicationBusinessContactDetail;
  goodsOrServicesSupplied: string;
  totalYearsExporting: string;
  totalEmployeesInternational: string;
  totalEmployeesUK: string;
  estimatedAnnualTurnover: string;
  exportsTurnoverPercentage: string;
  businessContactDetailId: string;
}

interface Country extends ApplicationRelationship {
  name: string;
  isoCode: string;
}

interface ApplicationEligibility extends ApplicationRelationship {
  buyerCountry: Country;
  hasCompaniesHouseNumber: boolean;
  otherPartiesInvolved: boolean;
  paidByLetterOfCredit: boolean;
  needPreCreditPeriodCover: boolean;
  wantCoverOverMaxAmount: boolean;
  wantCoverOverMaxPeriod: boolean;
}

interface ApplicationOwner extends ApplicationRelationship {
  email: string;
  firstName: string;
  lastName: string;
}

interface ApplicationCompany {
  id: string;
  companyName?: string;
}

interface ApplicationCompanySicCode {
  id: string;
  companyId: string;
  sicCode: string;
  industrySectorName: string;
}

interface ApplicationBuyer extends ApplicationRelationship {
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
  exporterIsConnectedWithBuyer?: string;
  exporterHasTradedWithBuyer?: string;
}

interface ApplicationDeclaration extends ApplicationRelationship {
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: string;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

interface AccountInput {
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verificationHash: string;
  verificationExpiry: Date;
}

interface Account extends AccountUpdateInput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  hash: string;
  verificationHash: string;
  optSalt?: string;
  optHash?: string;
  otpExpiry?: Date;
  sessionIdentifier?: string;
  passwordResetHash?: string;
  passwordResetExpiry?: Date;
  isVerified: boolean;
  reactivationHash?: string;
  reactivationExpiry?: Date;
}

interface ApplicationCompanyAddress extends ApplicationRelationship {
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

interface ApplicationPolicyAndExport extends ApplicationRelationship {
  requestedStartDate: Date;
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: Date;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationEligibility;
  owner: ApplicationOwner;
  policyAndExport: ApplicationPolicyAndExport;
  company: ApplicationCompany;
  companySicCodes: Array<ApplicationCompanySicCode>;
  companyAddress: ApplicationCompanyAddress;
  business: ApplicationBusiness;
  broker: ApplicationRelationship;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationRelationship;
  declaration: ApplicationDeclaration;
}

interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  name: string;
  referenceNumber: number;
  buyerName: string;
  buyerLocation: string;
}

interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE: number;
  TOTAL_VALUE_OF_CONTRACT: number;
}

type BufferEncoding = 'hex' | 'base64' | 'ascii';

interface CompanyResponse {
  id: string;
  applicationId: string;
}

interface DeleteApplicationByReferenceNumberVariables {
  referenceNumber: number;
}

interface CompaniesHouseAddress {
  careOf: string | null;
  premises: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

interface CompanyHouseResponse extends SuccessResponse {
  companyName: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
  apiError: boolean;
}

interface EmailResponse extends SuccessResponse {
  emailRecipient: string;
}

interface GetCompaniesHouseInformationVariables {
  companiesHouseNumber: string;
}

interface ConnectId {
  id: string;
}

interface ConnectObj {
  connect: ConnectId;
}

interface Currency {
  name: string;
  isoCode: string;
}

interface NotifyPeronsalisation {
  linkToFile?: string;
}

interface SicCode {
  sicCode: string;
  industrySectorName: string;
  company: ConnectObj;
  application: ConnectObj;
}

interface VerifyEmailAddressVariables {
  token: string;
}

interface VerifyEmailAddressResponse extends SuccessResponse {
  accountId?: string;
  expired?: boolean;
  emailRecipient?: string;
}

interface AccountCreationVariables {
  urlOrigin: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AccountDeletionVariables {
  email: string;
}

interface AccountSendEmailPasswordResetLinkVariables {
  urlOrigin: string;
  email: string;
}

interface AccountSendEmailReactivateLinkVariables {
  urlOrigin: string;
  accountId: string;
}

interface AccountSignInVariables {
  urlOrigin: string;
  email: string;
  password: string;
}

interface AccountSignInSendNewCodeVariables {
  accountId: string;
}

interface AccountPasswordResetVariables {
  token: string;
  password: string;
}

interface GetAccountPasswordResetTokenVariables {
  email: string;
}

interface VerifyAccountPasswordResetTokenVariables {
  token: string;
}

interface AccountPasswordResetTokenResponse extends SuccessResponse {
  token?: string;
  expired?: boolean;
}

interface InsuranceFeedbackVariables {
  satisfaction?: string;
  improvement?: string;
  otherComments?: string;
  referralUrl?: string;
  createdAt?: Date;
  date?: string;
  time?: string;
}

interface AccountSignInResponse extends SuccessResponse {
  accountId?: string;
  resentVerificationEmail?: boolean;
  isBlocked?: boolean;
}

interface AccountPasswordResetResponse extends SuccessResponse {
  hasBeenUsedBefore?: boolean;
}

interface AccountSendEmailPasswordResetLinkResponse extends SuccessResponse {
  accountId?: string;
  isBlocked?: boolean;
}

interface AccountSendEmailReactivateLinkResponse extends SuccessResponse {
  accountId?: string;
  email?: string;
}

interface VerifyAccountSignInCodeVariables {
  accountId: string;
  securityCode: string;
}

interface VerifyAccountSignInCodeResponse extends SuccessResponse {
  expired?: boolean;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  expires?: string;
  sessionIdentifier?: string;
}

interface VerifyAccountSesssionVariables {
  token: string;
}

interface AddOtpToAccountVariables {
  email: string;
}

interface AddAndGetOtpResponse extends SuccessResponse {
  securityCode?: string;
}

interface VerifyAccountReactivationTokenVariables {
  token: string;
}

interface VerifyAccountReactivationTokenResponse extends SuccessResponse {
  expired?: boolean;
}

interface SendExporterEmailVariables {
  urlOrigin: string;
  accountId: string;
  referenceNumber?: string;
}

interface SubmitApplicationVariables {
  applicationId: string;
}

interface UpdateCompanyAndCompanyAddressVariablesData {
  address?: ApplicationCompanyAddress;
  sicCodes?: [string];
  oldSicCodes?: [string];
  industrySectorNames?: [string];
  company?: CompanyUpdateInput;
}

interface UpdateCompanyAndCompanyAddressVariables {
  companyId: string;
  companyAddressId: string;
  data: UpdateCompanyAndCompanyAddressVariablesData;
}

interface Feedback extends SuccessResponse {
  id: string;
  service: string;
  satisfaction: string;
  improvement: string;
  otherComments: string;
  referralUrl: string;
  product: string;
  createdAt: string;
}

interface IndustrySector {
  id?: number;
  ukefIndustryId?: string;
  ukefIndustryName: string;
}

export {
  Account,
  AccountCreationVariables,
  AccountDeletionVariables,
  ApplicationCompanyAddress,
  AccountInput,
  AccountPasswordResetResponse,
  AccountSendEmailPasswordResetLinkVariables,
  AccountSendEmailPasswordResetLinkResponse,
  AccountSendEmailReactivateLinkVariables,
  AccountSendEmailReactivateLinkResponse,
  AccountSignInVariables,
  AccountSignInSendNewCodeVariables,
  AccountSignInResponse,
  AccountPasswordResetVariables,
  AddOtpToAccountVariables,
  AddAndGetOtpResponse,
  Application,
  ApplicationBuyer,
  ApplicationBusiness,
  ApplicationBusinessContactDetail,
  ApplicationDeclaration,
  ApplicationEligibility,
  ApplicationCompany,
  ApplicationCompanySicCode,
  ApplicationOwner,
  ApplicationRelationship,
  ApplicationSubmissionEmailVariables,
  ApplicationVersion,
  BufferEncoding,
  CompanyHouseResponse,
  CompanyResponse,
  Country,
  Currency,
  DeleteApplicationByReferenceNumberVariables,
  EmailResponse,
  Feedback,
  GetCompaniesHouseInformationVariables,
  GetAccountPasswordResetTokenVariables,
  AccountPasswordResetTokenResponse,
  NotifyPeronsalisation,
  InsuranceFeedbackVariables,
  IndustrySector,
  SicCode,
  SendExporterEmailVariables,
  SubmitApplicationVariables,
  SuccessResponse,
  UpdateCompanyAndCompanyAddressVariables,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountPasswordResetTokenVariables,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
  VerifyAccountReactivationTokenVariables,
  VerifyAccountReactivationTokenResponse,
};
