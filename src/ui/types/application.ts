import { InsuranceEligibilityCore } from './submitted-data';
import { Country } from './country';

interface ApplicationOwner {
  id: string;
}

type ApplicationCore = {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate?: string;
  status: string;
};

interface ApplicationEligibility extends InsuranceEligibilityCore {
  id: string;
  buyerCountry: Country;
}

interface ApplicationPolicyAndExport {
  id: string;
  policyType?: string;
  requestedStartDate?: Date;
  contractCompletionDate?: Date;
  totalValueOfContract?: number;
  creditPeriodWithBuyer?: string;
  policyCurrencyCode?: string;
  totalMonthsOfCover?: number;
  totalSalesToBuyer?: number;
  maximumBuyerWillOwe?: number;
  goodsOrServicesDescription?: string;
  finalDestinationCountryCode?: string;
}

interface ApplicationExporterCompanyAddress {
  id: string;
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

interface ApplicationExporterSicCodes {
  id: string;
  sicCode?: string;
  industrySectorName?: string;
}

interface ApplicationExporterindustrySectorNames {
  id: string;
  industrySectorNames?: string;
}

interface ApplicationExporterCompany {
  id: string;
  companyName?: string;
  companyNumber?: string;
  companyWebsite?: string;
  hasTradingName?: boolean;
  hasTradingAddress?: boolean;
  registeredOfficeAddress: ApplicationExporterCompanyAddress;
  sicCodes: Array<ApplicationExporterSicCodes>;
}

interface ApplicationExporterBusiness {
  id: string;
  goodsOrServices?: string;
  totalYearsExporting?: string;
  totalEmployeesUK?: string;
  totalEmployeesInternational?: string;
}

interface ApplicationExporterBroker {
  id: string;
  isUsingBroker?: string;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
  email?: string;
}

interface ApplicationBuyerCountry {
  isoCode?: string;
  name?: string;
}

interface ApplicationBuyer {
  id: string;
  companyOrOrganisationName?: string;
  address?: string;
  country?: ApplicationBuyerCountry;
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

interface ApplicationSectionReview {
  id: string;
  eligibility?: boolean;
  policyAndExport?: boolean;
  exporterBusiness?: boolean;
  buyer?: boolean;
}

interface ApplicationDeclaration {
  id: string;
  agreeToConfidentiality?: string;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: string;
  willExportWithAntiBriberyCodeOfConduct?: string;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  owner: ApplicationOwner;
  policyAndExport: ApplicationPolicyAndExport;
  exporterCompany: ApplicationExporterCompany;
  exporterBusiness: ApplicationExporterBusiness;
  exporterBroker: ApplicationExporterBroker;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationSectionReview;
  declaration: ApplicationDeclaration;
}

interface ApplicationFlatCore extends ApplicationCore, InsuranceEligibilityCore, ApplicationOwner {
  buyerCountry: string;
}
type ApplicationFlat = ApplicationFlatCore & ApplicationPolicyAndExport & ApplicationExporterCompany & ApplicationDeclaration;

export {
  Application,
  ApplicationExporterCompany,
  ApplicationFlat,
  ApplicationPolicyAndExport,
  ApplicationExporterSicCodes,
  ApplicationExporterindustrySectorNames,
  ApplicationExporterBusiness,
  ApplicationExporterBroker,
  ApplicationBuyer,
  ApplicationSectionReview,
  ApplicationDeclaration,
};
