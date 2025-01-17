"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config5 = require("dotenv/config");
var import_core3 = require("@keystone-6/core");
var import_overload_protection = __toESM(require("overload-protection"));

// middleware/headers/security/index.ts
var security = (req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains; preload");
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none';connect-src 'self';base-uri 'self';font-src 'self' data:;form-action 'self';frame-ancestors 'self';img-src 'self';object-src 'none';script-src 'self';script-src-attr 'self';style-src 'self';upgrade-insecure-requests"
  );
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=604800");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("X-Download-Options", "noopen");
  res.setHeader("X-DNS-Prefetch-Control", "on");
  res.setHeader("Expect-CT", "max-age=0,enforce");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader(
    "Permissions-Policy",
    "fullscreen=(self),microphone=(),camera=(),payment=(),geolocation=(),display-capture=(),battery=(),autoplay=(),gyroscope=(),accelerometer=(),web-share=(),usb=(),gamepad=(),magnetometer=(),midi=(),picture-in-picture=(),xr-spatial-tracking=()"
  );
  res.removeHeader("X-Powered-By");
  next();
};
var security_default = security;

// middleware/headers/check-api-key/index.ts
var import_config = require("dotenv/config");
var { API_KEY } = process.env;
var checkApiKey = (req, res, next) => {
  const { "x-api-key": xApiKey } = req.headers;
  if (!xApiKey || xApiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  next();
};
var check_api_key_default = checkApiKey;

// middleware/rate-limiter/index.js
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var rateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 1e3,
  // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false
});
var rate_limiter_default = rateLimiter;

// schema.ts
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_date_fns = require("date-fns");

// constants/index.ts
var import_dotenv = __toESM(require("dotenv"));

// constants/field-ids/shared/index.ts
var SHARED = {
  POLICY_TYPE: "policyType"
};
var shared_default = SHARED;

// constants/field-ids/shared-eligibility/index.ts
var SHARED_ELIGIBILITY = {
  BUYER_COUNTRY: "buyerCountry",
  BUYER_COUNTRY_ISO_CODE: "buyerCountryIsoCode",
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: "hasMinimumUkGoodsOrServices",
  VALID_EXPORTER_LOCATION: "validExporterLocation"
};
var shared_eligibility_default = SHARED_ELIGIBILITY;

// constants/field-ids/insurance/shared/index.ts
var SHARED_FIELD_IDS = {
  COMPANY: "company",
  COMPANIES_HOUSE: {
    COMPANY_NAME: "companyName",
    COMPANY_ADDRESS: "registeredOfficeAddress",
    COMPANY_NUMBER: "companyNumber",
    COMPANY_INCORPORATED: "dateOfCreation",
    SIC_CODE: "sicCode",
    COMPANY_SIC: "sicCodes",
    INDUSTRY_SECTOR_NAME: "industrySectorName",
    INDUSTRY_SECTOR_NAMES: "industrySectorNames",
    FINANCIAL_YEAR_END_DATE: "financialYearEndDate",
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: "addressLine1",
      ADDRESS_LINE_2: "addressLine2",
      CARE_OF: "careOf",
      LOCALITY: "locality",
      REGION: "region",
      POSTAL_CODE: "postalCode",
      COUNTRY: "country",
      PREMISES: "premises"
    }
  }
};
var shared_default2 = SHARED_FIELD_IDS;

// constants/field-ids/insurance/account/index.ts
var ACCOUNT = {
  ID: "id",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PASSWORD: "password",
  SALT: "salt",
  HASH: "hash",
  SECURITY_CODE: "securityCode",
  IS_VERIFIED: "isVerified",
  IS_BLOCKED: "isBlocked",
  PASSWORD_RESET_HASH: "passwordResetHash",
  PASSWORD_RESET_EXPIRY: "passwordResetExpiry",
  REACTIVATION_HASH: "reactivationHash",
  REACTIVATION_EXPIRY: "reactivationExpiry",
  VERIFICATION_HASH: "verificationHash",
  VERIFICATION_EXPIRY: "verificationExpiry"
};
var account_default = ACCOUNT;

// constants/field-ids/insurance/policy/index.ts
var SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: "requestedStartDate",
  CREDIT_PERIOD_WITH_BUYER: "creditPeriodWithBuyer",
  POLICY_CURRENCY_CODE: "policyCurrencyCode"
};
var POLICY = {
  ...shared_default,
  TYPE_OF_POLICY: {
    POLICY_TYPE: shared_default.POLICY_TYPE
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE: "contractCompletionDate",
      TOTAL_CONTRACT_VALUE: "totalValueOfContract"
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: "totalMonthsOfCover",
      TOTAL_SALES_TO_BUYER: "totalSalesToBuyer",
      MAXIMUM_BUYER_WILL_OWE: "maximumBuyerWillOwe"
    }
  },
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: "goodsOrServicesDescription",
    FINAL_DESTINATION: "finalDestinationCountryCode",
    FINAL_DESTINATION_COUNTRY: "finalDestinationCountry"
  }
};
var policy_default = POLICY;

// constants/field-ids/insurance/business/index.ts
var EXPORTER_BUSINESS = {
  COMPANIES_HOUSE: {
    INPUT: "companiesHouseNumber",
    COMPANY_NAME: "companyName",
    COMPANY_ADDRESS: "registeredOfficeAddress",
    COMPANY_NUMBER: "companyNumber",
    COMPANY_INCORPORATED: "dateOfCreation",
    COMPANY_SIC: "sicCodes",
    FINANCIAL_YEAR_END_DATE: "financialYearEndDate",
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: "addressLine1",
      ADDRESS_LINE_2: "addressLine2",
      CARE_OF: "careOf",
      LOCALITY: "locality",
      REGION: "region",
      POSTAL_CODE: "postalCode",
      COUNTRY: "country",
      PREMISES: "premises"
    }
  },
  YOUR_COMPANY: {
    YOUR_BUSINESS: "yourBusiness",
    TRADING_ADDRESS: "hasDifferentTradingAddress",
    HAS_DIFFERENT_TRADING_NAME: "hasDifferentTradingName",
    WEBSITE: "companyWebsite",
    PHONE_NUMBER: "phoneNumber"
  },
  ALTERNATIVE_TRADING_ADDRESS: "alternativeTradingAddress",
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: "goodsOrServicesSupplied",
    YEARS_EXPORTING: "totalYearsExporting",
    EMPLOYEES_UK: "totalEmployeesUK"
  },
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE: "financialYearEndDate",
    ESTIMATED_ANNUAL_TURNOVER: "estimatedAnnualTurnover",
    PERCENTAGE_TURNOVER: "exportsTurnoverPercentage"
  },
  BROKER: {
    HEADING: "broker",
    USING_BROKER: "isUsingBroker",
    NAME: "name",
    ADDRESS_LINE_1: "addressLine1",
    ADDRESS_LINE_2: "addressLine2",
    TOWN: "town",
    COUNTY: "county",
    POSTCODE: "postcode",
    EMAIL: "email",
    DETAILS: "whyAppointBroker"
  }
};
var business_default = EXPORTER_BUSINESS;

// constants/field-ids/insurance/your-buyer/index.ts
var YOUR_BUYER = {
  COMPANY_OR_ORGANISATION: {
    NAME: "companyOrOrganisationName",
    ADDRESS: "address",
    COUNTRY: "country",
    REGISTRATION_NUMBER: "registrationNumber",
    WEBSITE: "website",
    FIRST_NAME: "contactFirstName",
    LAST_NAME: "contactLastName",
    POSITION: "contactPosition",
    EMAIL: "contactEmail",
    CAN_CONTACT_BUYER: "canContactBuyer"
  },
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER: "exporterIsConnectedWithBuyer",
    TRADED_WITH_BUYER: "exporterHasTradedWithBuyer"
  }
};
var your_buyer_default = YOUR_BUYER;

// constants/field-ids/insurance/declarations/index.ts
var DECLARATIONS = {
  AGREE_CONFIDENTIALITY: "agreeToConfidentiality",
  AGREE_ANTI_BRIBERY: "agreeToAntiBribery",
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: "hasAntiBriberyCodeOfConduct",
  WILL_EXPORT_WITH_CODE_OF_CONDUCT: "willExportWithAntiBriberyCodeOfConduct",
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS: "agreeToConfirmationAndAcknowledgements",
  AGREE_HOW_YOUR_DATA_WILL_BE_USED: "agreeHowDataWillBeUsed"
};
var declarations_default = DECLARATIONS;

// constants/field-ids/insurance/check-your-answers/index.ts
var CHECK_YOUR_ANSWERS = {
  ELIGIBILITY: "eligibility",
  POLICY: "policy",
  EXPORTER_BUSINESS: "business",
  BUYER: "buyer"
};
var check_your_answers_default = CHECK_YOUR_ANSWERS;

// constants/field-ids/insurance/index.ts
var INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...shared_eligibility_default,
    ...shared_default2,
    HAS_COMPANIES_HOUSE_NUMBER: "hasCompaniesHouseNumber",
    COMPANIES_HOUSE_NUMBER: "companyNumber",
    TOTAL_CONTRACT_VALUE: "totalContractValue",
    TOTAL_CONTRACT_VALUE_ID: "totalContractValueId",
    COVER_PERIOD: "coverPeriod",
    COVER_PERIOD_ID: "coverPeriodId",
    HAS_END_BUYER: "hasEndBuyer",
    HAVE_AN_ACCOUNT: "haveAnAccount"
  },
  ...shared_default2,
  SUBMISSION_DEADLINE: "submissionDeadline",
  ACCOUNT: account_default,
  POLICY: policy_default,
  EXPORTER_BUSINESS: business_default,
  YOUR_BUYER: your_buyer_default,
  DECLARATIONS: declarations_default,
  CHECK_YOUR_ANSWERS: check_your_answers_default
};
var insurance_default = INSURANCE_FIELD_IDS;

// constants/field-ids/index.ts
var FIELD_IDS = {
  ...shared_default,
  ...shared_eligibility_default,
  INSURANCE: insurance_default
};

// constants/allowed-graphql-resolvers/index.ts
var import_config2 = require("dotenv/config");
var { NODE_ENV } = process.env;
var isDevEnvironment = NODE_ENV === "development";
var DEFAULT_RESOLVERS = [
  // application
  "updateBroker",
  "updateBusiness",
  "updateBuyer",
  "updateCompany",
  "updateDeclaration",
  "updatePolicy",
  "updatePolicyContact",
  "updateExportContract",
  "updateSectionReview",
  "updateEligibility",
  "referenceNumber",
  "applications",
  // account
  "account",
  "updateAccount",
  // misc
  "countries",
  "page"
];
var CUSTOM_RESOLVERS = [
  // account
  "accountPasswordReset",
  "accountSignIn",
  "accountSignInSendNewCode",
  "createAnAccount",
  "sendEmailConfirmEmailAddress",
  "sendEmailPasswordResetLink",
  "sendEmailReactivateAccountLink",
  "verifyAccountEmailAddress",
  "verifyAccountPasswordResetToken",
  "verifyAccountReactivationToken",
  "verifyAccountSignInCode",
  // application
  "createAnApplication",
  "declarationAntiBriberies",
  "declarationConfirmationAndAcknowledgements",
  "declarationHowDataWillBeUseds",
  "deleteApplicationByReferenceNumber",
  "getCompaniesHouseInformation",
  "submitApplication",
  // feedback
  "createFeedbackAndSendEmail",
  "getApimCisCountries"
];
if (isDevEnvironment) {
  CUSTOM_RESOLVERS.push(
    "accounts",
    "addAndGetOTP",
    "createApplications",
    "createBuyer",
    "deleteAnAccount",
    "deleteApplications",
    "getAccountPasswordResetToken"
  );
}
var ALLOWED_GRAPHQL_RESOLVERS = [...DEFAULT_RESOLVERS, ...CUSTOM_RESOLVERS];

// constants/application/versions/index.ts
var VERSIONS = [
  {
    VERSION_NUMBER: "1",
    OVER_500K_SUPPORT: false,
    MAXIMUM_BUYER_CAN_OWE: 5e5,
    TOTAL_VALUE_OF_CONTRACT: 5e5,
    DEFAULT_FINAL_DESTINATION_KNOWN: true,
    DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false
  }
];
var versions_default = VERSIONS;

// constants/application/get-application-definition/index.ts
var getApplicationDefinition = (versionNumber) => {
  const applicationDefinition = versions_default.find((VERSION) => VERSION.VERSION_NUMBER === versionNumber);
  if (applicationDefinition) {
    return applicationDefinition;
  }
  console.error("Unable to find latest application version");
  throw new Error("Unable to find latest application version");
};
var get_application_definition_default = getApplicationDefinition;

// constants/application/versions/latest.ts
var LATEST_VERSION_NUMBER = "1";
var latest_default = LATEST_VERSION_NUMBER;

// constants/application/index.ts
var LATEST_VERSION = get_application_definition_default(latest_default);
var APPLICATION = {
  LATEST_VERSION,
  DEAL_TYPE: "EXIP",
  SUBMISSION_COUNT_DEFAULT: 0,
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_TYPE: {
    MIA: "Manual Inclusion Application"
  },
  POLICY_TYPE: {
    SINGLE: "Single contract policy",
    MULTIPLE: "Multiple contract policy"
  },
  POLICY: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: LATEST_VERSION.TOTAL_VALUE_OF_CONTRACT
    },
    TOTAL_MONTHS_OF_COVER: 12,
    MAXIMUM_BUYER_CAN_OWE: LATEST_VERSION.MAXIMUM_BUYER_CAN_OWE
  },
  STATUS: {
    IN_PROGRESS: "In progress",
    SUBMITTED: "Submitted to UKEF"
  },
  DEFAULT_FINAL_DESTINATION_KNOWN: LATEST_VERSION.DEFAULT_FINAL_DESTINATION_KNOWN,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: LATEST_VERSION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER
};
var application_default = APPLICATION;

// constants/cover-period/index.ts
var COVER_PERIOD = {
  LESS_THAN_2_YEARS: {
    DB_ID: 1,
    VALUE: "1 to 24 months"
  },
  MORE_THAN_2_YEARS: {
    DB_ID: 2,
    VALUE: "More than 2 years"
  }
};

// constants/external-apis.ts
var EXTERNAL_API_DEFINITIONS = {
  CIS: {
    RISK: {
      VERY_HIGH: "Very High",
      HIGH: "High",
      STANDARD: "Standard Risk"
    },
    SHORT_TERM_COVER_AVAILABLE: {
      YES: "Yes",
      NO: "No",
      ILC: "ILC Only",
      CILC: "CILC Only",
      REFER: "Refer"
    },
    NBI_ISSUE_AVAILABLE: {
      YES: "Y",
      NO: "N"
    },
    INVALID_COUNTRIES: ["EC Market n/k", "Non EC Market n/k", "Non UK", "Third Country", "Eastern and Southern African Trade and Development Bank"]
  },
  COMPANIES_HOUSE: {
    COMPANY_STATUS: {
      ACTIVE: "active"
    }
  }
};
var EXTERNAL_API_MAPPINGS = {
  CIS: {
    RISK: {
      VERY_HIGH: "Very High",
      HIGH: "High",
      STANDARD: "Standard"
    }
  }
};
var EXTERNAL_API_ENDPOINTS = {
  APIM_MDM: {
    CURRENCY: "/currencies",
    INDUSTRY_SECTORS: "/sector-industries",
    MARKETS: "/markets"
  }
};

// constants/field-values/index.ts
var { POLICY_TYPE, POLICY: POLICY2 } = application_default;
var FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: "accept",
    REJECT: "reject"
  },
  POLICY_TYPE: {
    SINGLE: POLICY_TYPE.SINGLE,
    MULTIPLE: POLICY_TYPE.MULTIPLE
  },
  POLICY_LENGTH: {
    // default multiple policy length in months
    MULTIPLE: 12
  },
  TOTAL_MONTHS_OF_COVER: Array.from(Array(POLICY2.TOTAL_MONTHS_OF_COVER).keys()),
  YES: "Yes",
  NO: "No"
};

// constants/total-contract-value/index.ts
var TOTAL_CONTRACT_VALUE = {
  LESS_THAN_500K: {
    DB_ID: 1,
    VALUE: "Less than 500k"
  },
  MORE_THAN_500K: {
    DB_ID: 2,
    VALUE: "More than 500k"
  },
  LESS_THAN_250K: {
    DB_ID: 3,
    VALUE: "Less than 250k"
  },
  MORE_THAN_250K: {
    DB_ID: 4,
    VALUE: "More than 250k"
  },
  AMOUNT_250K: 25e4
};

// helpers/policy-type/index.ts
var isSinglePolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.SINGLE;
var isMultiplePolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE;

// constants/XLSX-CONFIG/index.ts
var {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE2 }
  },
  EXPORTER_BUSINESS: {
    BROKER: { USING_BROKER }
  }
} = insurance_default;
var XLSX_ROW_INDEXES = (application2) => {
  const { policy, broker } = application2;
  const TITLES = {
    HEADER: 1,
    EXPORTER_CONTACT_DETAILS: 9,
    KEY_INFORMATION: 14,
    POLICY: 20,
    EXPORTER_BUSINESS: 30,
    BUYER: 49,
    ELIGIBILITY: 59
  };
  const INDEXES = {
    TITLES,
    COMPANY_ADDRESS: 34,
    COMPANY_SIC_CODES: 37,
    BROKER_ADDRESS: 45,
    BUYER_ADDRESS: 50,
    BUYER_CONTACT_DETAILS: 53
  };
  const policyType = policy[POLICY_TYPE2];
  let isMultiplePolicy = false;
  let isUsingBroker = false;
  if (isMultiplePolicyType(policyType)) {
    isMultiplePolicy = true;
  }
  if (broker[USING_BROKER]) {
    isUsingBroker = true;
  }
  if (isMultiplePolicy) {
    TITLES.EXPORTER_BUSINESS += 1;
    TITLES.BUYER += 1;
    TITLES.ELIGIBILITY += 1;
    INDEXES.COMPANY_ADDRESS += 1;
    INDEXES.COMPANY_SIC_CODES += 1;
    INDEXES.BROKER_ADDRESS += 1;
    INDEXES.BUYER_ADDRESS += 1;
    INDEXES.BUYER_CONTACT_DETAILS += 1;
  }
  if (isUsingBroker) {
    TITLES.BUYER += 3;
    TITLES.ELIGIBILITY += 3;
  }
  return INDEXES;
};
var XLSX_CONFIG = {
  KEY: {
    ID: "field",
    COPY: "Field"
  },
  VALUE: {
    ID: "answer",
    COPY: "Answer"
  },
  COLUMN_WIDTH: 85,
  ADDITIONAL_TITLE_COLUMN_HEIGHT: 25,
  ADDITIONAL_COLUMN_HEIGHT: 50,
  LARGE_ADDITIONAL_COLUMN_HEIGHT: 50 * 2,
  FONT_SIZE: {
    DEFAULT: 11,
    TITLE: 14
  }
};

// constants/index.ts
import_dotenv.default.config();
var GBP_CURRENCY_CODE = "GBP";
var DATE_24_HOURS_FROM_NOW = () => {
  const now = /* @__PURE__ */ new Date();
  const day = now.getDate();
  const tomorrow = new Date(now.setDate(day + 1));
  return tomorrow;
};
var DATE_24_HOURS_IN_THE_PAST = () => {
  const now = /* @__PURE__ */ new Date();
  const day = now.getDate();
  const yesterday = new Date(now.setDate(day - 1));
  return yesterday;
};
var DATE_30_MINUTES_FROM_NOW = () => {
  const now = /* @__PURE__ */ new Date();
  const minutes = 30;
  const milliseconds = 6e4;
  const future = new Date(now.getTime() + minutes * milliseconds);
  return future;
};
var ACCOUNT2 = {
  EMAIL: {
    VERIFICATION_EXPIRY: DATE_24_HOURS_FROM_NOW
  },
  ENCRYPTION: {
    RANDOM_BYTES_SIZE: 32,
    STRING_TYPE: "hex",
    PBKDF2: {
      ITERATIONS: 1e4,
      DIGEST_ALGORITHM: "sha512"
    },
    PASSWORD: {
      PBKDF2: {
        KEY_LENGTH: 64
      }
    },
    OTP: {
      PBKDF2: {
        KEY_LENGTH: 128
      }
    }
  },
  PASSWORD_RESET_EXPIRY: DATE_30_MINUTES_FROM_NOW,
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: DATE_30_MINUTES_FROM_NOW
  },
  REACTIVATION_EXPIRY: DATE_24_HOURS_FROM_NOW,
  // JSON web token
  JWT: {
    KEY: {
      SIGNATURE: String(process.env.JWT_SIGNING_KEY),
      ENCODING: "base64",
      STRING_ENCODING: "ascii"
    },
    TOKEN: {
      EXPIRY: "12h",
      ALGORITHM: "RS256"
    },
    SESSION_EXPIRY: () => {
      const now = /* @__PURE__ */ new Date();
      const hours = 12;
      const seconds = 60 * 60 * 1e3;
      const future = new Date(now.getTime() + hours * seconds);
      return future;
    }
  },
  MAX_AUTH_RETRIES: 6,
  /**
   * MAX_AUTH_RETRIES_TIMEFRAME
   * Generate a date that is 24 hours ago from now
   * To be safe, we use time rather than subtracting a day.
   */
  MAX_AUTH_RETRIES_TIMEFRAME: DATE_24_HOURS_IN_THE_PAST()
};
var EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: "24022e94-171c-4044-b0ee-d22418116575",
    SECURITY_CODE: "b92650d1-9187-4510-ace2-5eec7ca7e626",
    PASSWORD_RESET: "86d5f582-e1d3-4b55-b103-50141401fd13",
    REACTIVATE_ACCOUNT_CONFIRM_EMAIL: "2abf173a-52fc-4ec8-b28c-d7a862b8cf37"
  },
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: {
        CONFIRMATION: "2e9084e2-d871-4be7-85d0-0ccc1961b148",
        SEND_DOCUMENTS: {
          TRADING_HISTORY: "1ae4d77e-58d6-460e-99c0-b62bf08d8c52",
          ANTI_BRIBERY: "002e43e3-ca78-4b9c-932f-6833014bb1e4",
          ANTI_BRIBERY_AND_TRADING_HISTORY: "49753c34-24b5-4cad-a7c5-1ab32d711dfe"
        }
      },
      UNDERWRITING_TEAM: {
        NOTIFICATION_TRADING_HISTORY: "34457439-bf9c-46e3-bd05-b8732ed682fb",
        NOTIFICATION_ANTI_BRIBERY: "8be12c98-b2c7-4992-8920-925aa37b6391",
        NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY: "7f0541dd-1dae-4d51-9ebc-87d2a624f8d2",
        NO_DOCUMENTS: "65b517c6-ae86-470b-9448-194ae5ac44bb"
      }
    }
  },
  FEEDBACK: {
    INSURANCE: "4d3d7944-e894-4527-aee6-692038c84107"
  }
};
var FEEDBACK = {
  VERY_SATISFIED: "verySatisfied",
  SATISFIED: "satisfied",
  NEITHER: "neither",
  DISSATISFIED: "dissatisfied",
  VERY_DISSATISIFED: "veryDissatisfied",
  EMAIL_TEXT: {
    verySatisfied: "Very satisfied",
    satisfied: "Satisfied",
    neither: "Neither satisfied or dissatisfied",
    dissatisfied: "Dissatisfied",
    veryDissatisfied: "Very dissatisfied"
  }
};
var ACCEPTED_FILE_TYPES = [".xlsx"];
var DATE_FORMAT = {
  DEFAULT: "d MMMM yyyy",
  HOURS_AND_MINUTES: "HH:mm"
};
var ORDNANCE_SURVEY_QUERY_URL = "/search/places/v1/postcode?postcode=";

// helpers/update-application/index.ts
var timestamp = async (context, applicationId) => {
  try {
    console.info("Updating application updatedAt timestamp");
    const now = /* @__PURE__ */ new Date();
    const application2 = await context.db.Application.updateOne({
      where: {
        id: applicationId
      },
      data: {
        updatedAt: now
      }
    });
    return application2;
  } catch (err) {
    console.error("Error updating application updatedAt timestamp %O", err);
    throw new Error(`Updating application updatedAt timestamp ${err}`);
  }
};
var updateApplication = {
  timestamp
};
var update_application_default = updateApplication;

// helpers/get-account-by-field/index.ts
var getAccountByField = async (context, field, value) => {
  try {
    console.info("Getting account by field/value $s", `${field}, ${value}`);
    const accountsArray = await context.db.Account.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!accountsArray?.length || !accountsArray[0]) {
      console.info("Getting account by field - no account exists with the provided field/value");
      return false;
    }
    const account2 = accountsArray[0];
    return account2;
  } catch (err) {
    console.error("Error getting account by field/value %O", err);
    throw new Error(`Getting account by field/value ${err}`);
  }
};
var get_account_by_field_default = getAccountByField;

// nullable-checkbox/index.ts
var import_types = require("@keystone-6/core/types");
var import_core = require("@keystone-6/core");
var nullableCheckboxConfig = (defaultValue) => (
  /**
   * Database/GraphQL config.
   * This defines the field as an optional boolean with a default value of null.
   */
  (0, import_types.fieldType)({
    kind: "scalar",
    mode: "optional",
    scalar: "Boolean"
  })({
    /**
     * Input/output config.
     * This determines what is set during a create, update and get operations.
     */
    input: {
      create: {
        arg: import_core.graphql.arg({ type: import_core.graphql.Boolean }),
        resolve() {
          if (defaultValue || defaultValue === false) {
            return defaultValue;
          }
          return null;
        }
      },
      update: {
        arg: import_core.graphql.arg({ type: import_core.graphql.Boolean }),
        resolve(value) {
          return value;
        }
      }
    },
    output: import_core.graphql.field({
      type: import_core.graphql.Boolean,
      resolve({ value }) {
        return value;
      }
    }),
    /**
     * Keystone admin UI/CMS config for this field.
     * Since we do not use the UI/CMS, this can be empty.
     */
    views: "./nullable-checkbox/views",
    getAdminMeta() {
      return {};
    }
  })
);
var nullableCheckbox = (defaultValue) => () => nullableCheckboxConfig(defaultValue);
var nullable_checkbox_default = nullableCheckbox;

// schema.ts
var lists = {
  ReferenceNumber: {
    db: {
      idField: { kind: "autoincrement" }
    },
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" })
    },
    access: import_access.allowAll
  },
  Application: {
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      eligibility: (0, import_fields.relationship)({ ref: "Eligibility" }),
      referenceNumber: (0, import_fields.integer)({
        isIndexed: true
      }),
      submissionCount: (0, import_fields.integer)({
        defaultValue: APPLICATION.SUBMISSION_COUNT_DEFAULT,
        validation: { isRequired: true }
      }),
      submissionDate: (0, import_fields.timestamp)(),
      submissionDeadline: (0, import_fields.timestamp)(),
      submissionType: (0, import_fields.select)({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA
      }),
      status: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      previousStatus: (0, import_fields.text)(),
      policy: (0, import_fields.relationship)({ ref: "Policy" }),
      exportContract: (0, import_fields.relationship)({ ref: "ExportContract" }),
      owner: (0, import_fields.relationship)({
        ref: "Account",
        many: false
      }),
      business: (0, import_fields.relationship)({ ref: "Business" }),
      company: (0, import_fields.relationship)({ ref: "Company" }),
      broker: (0, import_fields.relationship)({ ref: "Broker" }),
      buyer: (0, import_fields.relationship)({ ref: "Buyer" }),
      sectionReview: (0, import_fields.relationship)({ ref: "SectionReview" }),
      declaration: (0, import_fields.relationship)({ ref: "Declaration" }),
      policyContact: (0, import_fields.relationship)({ ref: "PolicyContact" }),
      version: (0, import_fields.text)({
        defaultValue: APPLICATION.LATEST_VERSION.VERSION_NUMBER,
        validation: { isRequired: true }
      }),
      dealType: (0, import_fields.text)({
        defaultValue: APPLICATION.DEAL_TYPE,
        validation: { isRequired: true },
        db: { nativeType: "VarChar(4)" }
      })
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData, context }) => {
        if (operation === "create") {
          try {
            console.info("Creating new application - adding default data to a new application");
            const modifiedData = resolvedData;
            const { id: newReferenceNumber } = await context.db.ReferenceNumber.createOne({
              data: {}
            });
            modifiedData.referenceNumber = newReferenceNumber;
            const { id: exportContractId } = await context.db.ExportContract.createOne({
              data: {}
            });
            modifiedData.exportContract = {
              connect: {
                id: exportContractId
              }
            };
            const { id: businessId } = await context.db.Business.createOne({
              data: {}
            });
            modifiedData.business = {
              connect: {
                id: businessId
              }
            };
            const { id: policyContactId } = await context.db.PolicyContact.createOne({
              data: {}
            });
            modifiedData.policyContact = {
              connect: {
                id: policyContactId
              }
            };
            const { id: brokerId } = await context.db.Broker.createOne({
              data: {}
            });
            modifiedData.broker = {
              connect: {
                id: brokerId
              }
            };
            const { id: sectionReviewId } = await context.db.SectionReview.createOne({
              data: {}
            });
            modifiedData.sectionReview = {
              connect: {
                id: sectionReviewId
              }
            };
            const { id: declarationId } = await context.db.Declaration.createOne({
              data: {}
            });
            modifiedData.declaration = {
              connect: {
                id: declarationId
              }
            };
            const now = /* @__PURE__ */ new Date();
            modifiedData.createdAt = now;
            modifiedData.updatedAt = now;
            modifiedData.submissionDeadline = (0, import_date_fns.addMonths)(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);
            modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;
            modifiedData.status = APPLICATION.STATUS.IN_PROGRESS;
            return modifiedData;
          } catch (err) {
            console.error("Error adding default data to a new application. %O", err);
            return false;
          }
        }
        return resolvedData;
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === "create") {
          try {
            console.info("Adding application ID to relationships");
            const applicationId = item.id;
            const { referenceNumber } = item;
            const { policyContactId, exportContractId, businessId, brokerId, sectionReviewId, declarationId } = item;
            await context.db.ReferenceNumber.updateOne({
              where: { id: String(referenceNumber) },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.PolicyContact.updateOne({
              where: { id: policyContactId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.ExportContract.updateOne({
              where: { id: exportContractId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                },
                finalDestinationKnown: APPLICATION.DEFAULT_FINAL_DESTINATION_KNOWN
              }
            });
            await context.db.Business.updateOne({
              where: { id: businessId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Broker.updateOne({
              where: { id: brokerId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.SectionReview.updateOne({
              where: { id: sectionReviewId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Declaration.updateOne({
              where: { id: declarationId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
          } catch (err) {
            console.error("Error adding an application ID to relationships %O", err);
            return false;
          }
        }
      }
    },
    access: import_access.allowAll
  },
  TotalContractValue: (0, import_core2.list)({
    fields: {
      valueId: (0, import_fields.integer)(),
      value: (0, import_fields.text)({
        db: { nativeType: "VarChar(70)" }
      })
    },
    access: import_access.allowAll
  }),
  CoverPeriod: (0, import_core2.list)({
    fields: {
      valueId: (0, import_fields.integer)(),
      value: (0, import_fields.text)({
        db: { nativeType: "VarChar(70)" }
      })
    },
    access: import_access.allowAll
  }),
  Policy: {
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      /**
       * NOTE:
       * - For MVP, needPreCreditPeriodCover is part of the eligibility UI flow.
       * - Post MVP/next phase needPreCreditPeriodCover is part of the application flow.
       * - To avoid data migration, we save the eligibility answer as part of the "policy", instead of eligibility.
       * - In the next phase, the defaultValue can be removed, to default null.
       */
      needPreCreditPeriodCover: nullable_checkbox_default(APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER),
      policyType: (0, import_fields.select)({
        options: [
          { label: APPLICATION.POLICY_TYPE.SINGLE, value: APPLICATION.POLICY_TYPE.SINGLE },
          { label: APPLICATION.POLICY_TYPE.MULTIPLE, value: APPLICATION.POLICY_TYPE.MULTIPLE }
        ]
      }),
      requestedStartDate: (0, import_fields.timestamp)(),
      contractCompletionDate: (0, import_fields.timestamp)(),
      totalValueOfContract: (0, import_fields.integer)({
        validation: {
          min: APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT.MINIMUM,
          max: APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT.MAXIMUM
        }
      }),
      creditPeriodWithBuyer: (0, import_fields.text)(),
      policyCurrencyCode: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      totalMonthsOfCover: (0, import_fields.integer)(),
      totalSalesToBuyer: (0, import_fields.integer)(),
      maximumBuyerWillOwe: (0, import_fields.integer)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  },
  PolicyContact: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      firstName: (0, import_fields.text)(),
      lastName: (0, import_fields.text)(),
      email: (0, import_fields.text)(),
      position: (0, import_fields.text)(),
      isSameAsOwner: nullable_checkbox_default()
    },
    access: import_access.allowAll
  }),
  ExportContract: {
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      goodsOrServicesDescription: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      finalDestinationKnown: nullable_checkbox_default(),
      finalDestinationCountryCode: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  },
  Account: (0, import_core2.list)({
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      firstName: (0, import_fields.text)({ validation: { isRequired: true } }),
      lastName: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true } }),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the account has verified their email address.
      isVerified: (0, import_fields.checkbox)({ defaultValue: false }),
      /**
       * isBlocked flag will only be true if the account has:
       * - repeatedly attempted sign in
       * - repeatedly attempted password reset request
       */
      isBlocked: (0, import_fields.checkbox)({ defaultValue: false }),
      verificationHash: (0, import_fields.text)(),
      verificationExpiry: (0, import_fields.timestamp)(),
      otpSalt: (0, import_fields.text)(),
      otpHash: (0, import_fields.text)({
        db: { nativeType: "VarChar(256)" }
      }),
      otpExpiry: (0, import_fields.timestamp)(),
      sessionExpiry: (0, import_fields.timestamp)(),
      sessionIdentifier: (0, import_fields.text)(),
      passwordResetHash: (0, import_fields.text)({ validation: { isRequired: false } }),
      passwordResetExpiry: (0, import_fields.timestamp)({ validation: { isRequired: false } }),
      authentication: (0, import_fields.relationship)({
        ref: "Authentication"
      }),
      authenticationRetry: (0, import_fields.relationship)({
        ref: "AuthenticationRetry"
      }),
      reactivationHash: (0, import_fields.text)({ validation: { isRequired: false } }),
      reactivationExpiry: (0, import_fields.timestamp)({ validation: { isRequired: false } }),
      applications: (0, import_fields.relationship)({
        ref: "Application",
        many: true
      })
    },
    hooks: {
      validateInput: async ({ context, operation, resolvedData }) => {
        if (operation === "create") {
          const { email } = resolvedData;
          const requestedEmail = String(email);
          const account2 = await get_account_by_field_default(context, account_default.EMAIL, requestedEmail);
          if (account2) {
            throw new Error(`Unable to create a new account for ${requestedEmail} - account already exists`);
          }
        }
      }
    },
    access: import_access.allowAll
  }),
  AuthenticationRetry: (0, import_core2.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: "Account",
        many: true
      }),
      createdAt: (0, import_fields.timestamp)({ validation: { isRequired: true } })
    },
    access: import_access.allowAll
  }),
  Authentication: (0, import_core2.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: "Account",
        many: true
      }),
      createdAt: (0, import_fields.timestamp)(),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } })
    },
    access: import_access.allowAll
  }),
  Business: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      goodsOrServicesSupplied: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      totalYearsExporting: (0, import_fields.integer)(),
      totalEmployeesUK: (0, import_fields.integer)(),
      estimatedAnnualTurnover: (0, import_fields.integer)(),
      exportsTurnoverPercentage: (0, import_fields.integer)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  Broker: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      isUsingBroker: nullable_checkbox_default(),
      name: (0, import_fields.text)(),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      town: (0, import_fields.text)(),
      county: (0, import_fields.text)(),
      postcode: (0, import_fields.text)(),
      email: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  CompanyAddress: (0, import_core2.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: "Company.registeredOfficeAddress" }),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      careOf: (0, import_fields.text)(),
      locality: (0, import_fields.text)(),
      region: (0, import_fields.text)(),
      postalCode: (0, import_fields.text)(),
      country: (0, import_fields.text)(),
      premises: (0, import_fields.text)()
    },
    access: import_access.allowAll
  }),
  Company: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      registeredOfficeAddress: (0, import_fields.relationship)({ ref: "CompanyAddress.company" }),
      sicCodes: (0, import_fields.relationship)({
        ref: "CompanySicCode.company",
        many: true
      }),
      companyName: (0, import_fields.text)(),
      companyNumber: (0, import_fields.text)(),
      dateOfCreation: (0, import_fields.timestamp)(),
      hasDifferentTradingAddress: nullable_checkbox_default(),
      differentTradingName: (0, import_fields.text)(),
      hasDifferentTradingName: nullable_checkbox_default(),
      companyWebsite: (0, import_fields.text)(),
      phoneNumber: (0, import_fields.text)(),
      financialYearEndDate: (0, import_fields.timestamp)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  CompanySicCode: (0, import_core2.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: "Company.sicCodes" }),
      sicCode: (0, import_fields.text)(),
      industrySectorName: (0, import_fields.text)()
    },
    access: import_access.allowAll
  }),
  Buyer: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      companyOrOrganisationName: (0, import_fields.text)(),
      address: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      country: (0, import_fields.relationship)({ ref: "Country" }),
      registrationNumber: (0, import_fields.text)(),
      website: (0, import_fields.text)(),
      contactFirstName: (0, import_fields.text)(),
      contactLastName: (0, import_fields.text)(),
      contactPosition: (0, import_fields.text)(),
      contactEmail: (0, import_fields.text)(),
      canContactBuyer: nullable_checkbox_default(),
      exporterIsConnectedWithBuyer: nullable_checkbox_default(),
      exporterHasTradedWithBuyer: nullable_checkbox_default()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  Country: (0, import_core2.list)({
    fields: {
      isoCode: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      name: (0, import_fields.text)({
        validation: { isRequired: true }
      })
    },
    access: import_access.allowAll
  }),
  Eligibility: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      buyerCountry: (0, import_fields.relationship)({ ref: "Country" }),
      coverPeriod: (0, import_fields.relationship)({ ref: "CoverPeriod" }),
      hasEndBuyer: (0, import_fields.checkbox)(),
      hasMinimumUkGoodsOrServices: (0, import_fields.checkbox)(),
      hasCompaniesHouseNumber: (0, import_fields.checkbox)(),
      otherPartiesInvolved: (0, import_fields.checkbox)(),
      paidByLetterOfCredit: (0, import_fields.checkbox)(),
      totalContractValue: (0, import_fields.relationship)({ ref: "TotalContractValue" }),
      validExporterLocation: (0, import_fields.checkbox)()
    },
    access: import_access.allowAll
  }),
  SectionReview: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      eligibility: nullable_checkbox_default(),
      policy: nullable_checkbox_default(),
      business: nullable_checkbox_default(),
      buyer: nullable_checkbox_default()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  Declaration: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      antiBribery: (0, import_fields.relationship)({ ref: "DeclarationAntiBribery" }),
      confirmationAndAcknowledgements: (0, import_fields.relationship)({ ref: "DeclarationConfirmationAndAcknowledgement" }),
      howDataWillBeUsed: (0, import_fields.relationship)({ ref: "DeclarationHowDataWillBeUsed" }),
      agreeToConfidentiality: nullable_checkbox_default(),
      agreeToAntiBribery: nullable_checkbox_default(),
      hasAntiBriberyCodeOfConduct: nullable_checkbox_default(),
      willExportWithAntiBriberyCodeOfConduct: nullable_checkbox_default(),
      agreeToConfirmationAndAcknowledgements: nullable_checkbox_default(),
      agreeHowDataWillBeUsed: nullable_checkbox_default()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  DeclarationAntiBribery: (0, import_core2.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true
      })
    },
    access: import_access.allowAll
  }),
  DeclarationConfirmationAndAcknowledgement: (0, import_core2.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true
      })
    },
    access: import_access.allowAll
  }),
  DeclarationHowDataWillBeUsed: (0, import_core2.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true
      })
    },
    access: import_access.allowAll
  }),
  Page: (0, import_core2.list)({
    fields: {
      heading: (0, import_fields.text)({
        label: "Page heading"
      }),
      metaTitle: (0, import_fields.text)({
        label: "Meta title"
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true
      })
    },
    ui: {
      listView: {
        initialColumns: ["heading", "id"]
      }
    },
    access: import_access.allowAll
  }),
  User: (0, import_core2.list)({
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } })
    },
    ui: {
      listView: {
        initialColumns: ["name", "email"]
      }
    },
    access: import_access.allowAll
  }),
  Feedback: (0, import_core2.list)({
    fields: {
      service: (0, import_fields.text)(),
      satisfaction: (0, import_fields.select)({
        options: [
          { label: FEEDBACK.VERY_SATISFIED, value: FEEDBACK.VERY_SATISFIED },
          { label: FEEDBACK.SATISFIED, value: FEEDBACK.SATISFIED },
          { label: FEEDBACK.NEITHER, value: FEEDBACK.NEITHER },
          { label: FEEDBACK.DISSATISFIED, value: FEEDBACK.DISSATISFIED },
          { label: FEEDBACK.VERY_DISSATISIFED, value: FEEDBACK.VERY_DISSATISIFED },
          { label: "", value: "" }
        ],
        db: { isNullable: true }
      }),
      improvement: (0, import_fields.text)({
        db: { nativeType: "VarChar(1200)" }
      }),
      otherComments: (0, import_fields.text)({
        db: { nativeType: "VarChar(1200)" }
      }),
      referralUrl: (0, import_fields.text)({
        db: { nativeType: "VarChar(500)" }
      }),
      product: (0, import_fields.text)(),
      createdAt: (0, import_fields.timestamp)()
    },
    access: import_access.allowAll
  })
};

// auth.ts
var import_config3 = require("dotenv/config");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = String(process.env.SESSION_SECRET);
if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET environment variable must be set in production");
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    /**
     * Ensure that if there are no items in the database,
     * keystone admin UI will ask you to create
     * a new user, with the following fields.
     */
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// apollo/plugins/index.ts
var requestDidStart = () => ({
  /**
   * The didResolveOperation event fires after the graphql library successfully determines the operation to execute.
   * At this stage, the operationName is available.
   * When this event fires, your resolvers have not yet executed.
   * https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference/#didresolveoperation
   *
   * KeystoneJS automatically generates many GraphQL resolvers that we do not use or need.
   * Therefore, We use this event to check that a requested operation is allowed to be executed,
   * via an explicit list of allowed resolvers.
   */
  didResolveOperation({ request }) {
    if (!request.operationName || request.operationName && !ALLOWED_GRAPHQL_RESOLVERS.includes(request.operationName)) {
      throw new Error("Operation not permitted");
    }
  }
});
var apolloPlugins = [{ requestDidStart }];
var plugins_default = apolloPlugins;

// apollo/format-graphql-error/index.ts
var import_config4 = require("dotenv/config");
var import_apollo_server_express = require("apollo-server-express");
var formatGraphQlError = (err) => {
  const isDevEnvironment3 = process.env.NODE_ENV === "development";
  if (!isDevEnvironment3) {
    return new import_apollo_server_express.ValidationError("Invalid request");
  }
  return err;
};
var format_graphql_error_default = formatGraphQlError;

// apollo/index.ts
var apolloPlugins2 = plugins_default;
var formatGraphQlError2 = format_graphql_error_default;

// custom-schema/index.ts
var import_schema = require("@graphql-tools/schema");

// custom-schema/type-defs.ts
var typeDefs = `
  type AccountResponse {
    id: String
    firstName: String
    lastName: String
    email: String
    isVerified: Boolean
  }

  input AccountInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type CreateAnAccountResponse {
    success: Boolean
    id: String
    firstName: String
    lastName: String
    email: String
    verificationHash: String
  }

  type CompaniesHouseResponse {
    companyName: String
    registeredOfficeAddress: CompanyAddress
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    success: Boolean
    apiError: Boolean
    isActive: Boolean
    notFound: Boolean
  }

  type CompanyAddress {
    addressLine1: String
    addressLine2: String
    postalCode: String
    country: String
    locality: String
    region: String
    postalCode: String
    careOf: String
    premises: String
  }

  type OrdnanceSurveyAddress {
    addressLine1: String
    addressLine2: String
    postalCode: String
    country: String
    county: String
    town: String
  }

  input OrdnanceAddressInput  {
    addressLine1: String
    addressLine2: String
    postalCode: String
    country: String
    county: String
    town: String
  }

  input OldSicCodes {
    id: String
  }

  input CompanyAddressInput {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  input CompanyInput {
    companyName: String
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    registeredOfficeAddress: CompanyAddressInput
    isActive: Boolean
  }

   type OrdnanceSurveyResponse {
    success: Boolean
    addresses: [OrdnanceSurveyAddress]
    apiError: Boolean
    noAddressesFound: Boolean
    invalidPostcode: Boolean
  }

  type EmailResponse {
    success: Boolean
    emailRecipient: String
  }

  type SuccessResponse {
    success: Boolean!
  }

  type AccountSignInResponse {
    accountId: String
    firstName: String
    lastName: String
    email: String
    token: String
    sessionIdentifier: String
    expires: DateTime
    success: Boolean!
    resentVerificationEmail: Boolean
    isBlocked: Boolean
  }

  type AddAndGetOtpResponse {
    success: Boolean!
    securityCode: String!
  }

  type AccountPasswordResetResponse {
    success: Boolean!
    hasBeenUsedBefore: Boolean
  }

  type AccountSendEmailPasswordResetLinkResponse {
    success: Boolean!
    isBlocked: Boolean
    accountId: String
  }

  type AccountPasswordResetTokenResponse {
    success: Boolean!
    token: String
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountEmailAddressResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountReactivationTokenResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type AccountSendEmailReactivateAccountLinkResponse {
    success: Boolean!
    accountId: String!
    email: String
  }

  input ApplicationEligibility {
    buyerCountryIsoCode: String!
    coverPeriodId: Int!
    hasCompaniesHouseNumber: Boolean!
    hasEndBuyer: Boolean!
    hasMinimumUkGoodsOrServices: Boolean!
    totalContractValueId: Int!
    validExporterLocation: Boolean!
  }

  type CreateAnApplicationResponse {
    success: Boolean!
    id: String
    referenceNumber: Int
  }

  type MappedCisCountry {
    isoCode: String!
    name: String
    shortTermCover: Boolean
    riskCategory: String
    nbiIssueAvailable: Boolean
    canGetAQuoteOnline: Boolean
    canGetAQuoteOffline: Boolean
    canGetAQuoteByEmail: Boolean
    cannotGetAQuote: Boolean
    cannotApply: Boolean
    canApplyForInsuranceOnline: Boolean
    canApplyForInsuranceOffline: Boolean
    noInsuranceSupport: Boolean
  }

  type Mutation {
    """ create an account """
    createAnAccount(
      urlOrigin: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): CreateAnAccountResponse

    """ create an application """
    createAnApplication(
      accountId: String!
      eligibilityAnswers: ApplicationEligibility!
      company: CompanyInput!
    ): CreateAnApplicationResponse

    """ delete an account """
    deleteAnAccount(
      email: String!
    ): SuccessResponse

    """ verify an account's email address """
    verifyAccountEmailAddress(
      token: String!
      id: String!
    ): VerifyAccountEmailAddressResponse

    """ verify an account's reactivation token """
    verifyAccountReactivationToken(
      token: String!
    ): VerifyAccountReactivationTokenResponse

    """ send confirm email address email """
    sendEmailConfirmEmailAddress(
      urlOrigin: String!
      accountId: String!
    ): EmailResponse

    """ validate credentials, generate and email a OTP security code """
    accountSignIn(
      urlOrigin: String!
      email: String!
      password: String!
    ): AccountSignInResponse

    """ generate and email a new OTP security code """
    accountSignInSendNewCode(
      accountId: String!
    ): AccountSignInResponse

    """ verify an account's OTP security code """
    verifyAccountSignInCode(
      accountId: String!
      securityCode: String!
    ): AccountSignInResponse

    """ add an OTP security code to an account and return"""
    addAndGetOTP(
      email: String!
    ): AddAndGetOtpResponse

    """ send email with password reset link """
    sendEmailPasswordResetLink(
      urlOrigin: String!
      email: String!
    ): AccountSendEmailPasswordResetLinkResponse

    """ send email with reactivate account link """
    sendEmailReactivateAccountLink(
      urlOrigin: String!
      accountId: String!
    ): AccountSendEmailReactivateAccountLinkResponse

    """ reset account password """
    accountPasswordReset(
      token: String!
      password: String!
      hasBeenUsedBefore: Boolean
    ): AccountPasswordResetResponse

    """ delete an application by reference number """
    deleteApplicationByReferenceNumber(
      referenceNumber: Int!
    ): SuccessResponse

    """ submit an application """
    submitApplication(
      applicationId: String!
    ): SuccessResponse

    """ create and send email for insurance feedback """
    createFeedbackAndSendEmail(
      satisfaction: String
      improvement: String
      otherComments: String
      referralUrl: String
      product: String
      service: String
    ): SuccessResponse
  }

  type Query {
    """ get an account by email """
    getAccountByEmail(
      email: String!
    ): AccountResponse

    """ get an account's password reset token """
    getAccountPasswordResetToken(
      email: String!
    ): AccountPasswordResetTokenResponse

    """ verify an account's password reset token """
    verifyAccountPasswordResetToken(
      token: String!
    ): AccountPasswordResetTokenResponse

    """ get CIS countries from APIM """
    getApimCisCountries: [MappedCisCountry]

    """ get companies house information """
    getCompaniesHouseInformation(
      companiesHouseNumber: String!
    ): CompaniesHouseResponse

    """ get Ordnance Survey address """
    getOrdnanceSurveyAddress(
      postcode: String!
      houseNameOrNumber: String!
    ): OrdnanceSurveyResponse
  }
`;
var type_defs_default = typeDefs;

// helpers/encrypt-password/index.ts
var import_crypto = __toESM(require("crypto"));
var { ENCRYPTION } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH }
  }
} = ENCRYPTION;
var encryptPassword = (password2) => {
  const salt = import_crypto.default.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);
  const hash = import_crypto.default.pbkdf2Sync(password2, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);
  return {
    salt,
    hash
  };
};
var encrypt_password_default = encryptPassword;

// helpers/get-account-verification-hash/index.ts
var import_crypto2 = __toESM(require("crypto"));
var { EMAIL, ENCRYPTION: ENCRYPTION2 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE2,
  PBKDF2: { ITERATIONS: ITERATIONS2, DIGEST_ALGORITHM: DIGEST_ALGORITHM2 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH2 }
  }
} = ENCRYPTION2;
var generateAccountVerificationHash = (email, salt) => {
  const verificationHash = import_crypto2.default.pbkdf2Sync(email, salt, ITERATIONS2, KEY_LENGTH2, DIGEST_ALGORITHM2).toString(STRING_TYPE2);
  const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();
  return {
    verificationHash,
    verificationExpiry
  };
};
var get_account_verification_hash_default = generateAccountVerificationHash;

// helpers/get-full-name-string/index.ts
var getFullNameString = (account2) => {
  const { firstName, lastName } = account2;
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};
var get_full_name_string_default = getFullNameString;

// emails/index.ts
var import_dotenv4 = __toESM(require("dotenv"));

// integrations/notify/index.ts
var import_dotenv2 = __toESM(require("dotenv"));
var import_notifications_node_client = require("notifications-node-client");
import_dotenv2.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var notify = {
  /**
   * sendEmail
   * Send an email via Notify API
   * @param {String} Template ID
   * @param {String} Email address
   * @param {Object} Custom variables for the email template
   * @param {Buffer} File buffer
   * @returns {Object} Success flag and email recipient
   */
  sendEmail: async (templateId, sendToEmailAddress, variables, file) => {
    try {
      console.info("Calling Notify API. templateId: %s", templateId);
      const personalisation = variables;
      if (file) {
        personalisation.linkToFile = await notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true });
      }
      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation,
        reference: null
      });
      return {
        success: true,
        emailRecipient: sendToEmailAddress
      };
    } catch (err) {
      console.error("Error calling Notify API. Unable to send email %O", err);
      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  }
};
var notify_default = notify;

// emails/call-notify/index.ts
var callNotify = async (templateId, emailAddress, variables, file) => {
  try {
    let emailResponse;
    if (file) {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables, file);
    } else {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables);
    }
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error("Error sending email %O", err);
    throw new Error(`Sending email ${err}`);
  }
};

// emails/confirm-email-address/index.ts
var confirmEmailAddress = async (emailAddress, urlOrigin, name, verificationHash, id) => {
  try {
    console.info("Sending confirm email address email");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;
    const variables = { urlOrigin, name, confirmToken: verificationHash, id };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error("Error sending confirm email address email %O", err);
    throw new Error(`Sending confirm email address email ${err}`);
  }
};

// emails/security-code-email/index.ts
var securityCodeEmail = async (emailAddress, name, securityCode) => {
  try {
    console.info("Sending security code email for account sign in");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const variables = { name, securityCode };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error("Error sending security code email for account sign in %O", err);
    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};

// emails/password-reset-link/index.ts
var passwordResetLink = async (urlOrigin, emailAddress, name, passwordResetHash) => {
  try {
    console.info("Sending email for account password reset");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;
    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error("Error sending email for account password reset %O", err);
    throw new Error(`Sending email for account password reset ${err}`);
  }
};

// emails/reactivate-account-link/index.ts
var reactivateAccountLink = async (urlOrigin, emailAddress, name, reactivationHash) => {
  try {
    console.info("Sending email for account reactivation");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;
    const variables = { urlOrigin, name, reactivationToken: reactivationHash };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error("Error sending email for account reactivation %O", err);
    throw new Error(`Sending email for account reactivation ${err}`);
  }
};

// file-system/index.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var fileExists = (filePath) => {
  const fileBuffer = Buffer.from(filePath);
  if (fileBuffer.length) {
    return true;
  }
  return false;
};
var isAcceptedFileType = (filePath) => {
  const fileType = import_path.default.extname(filePath);
  if (ACCEPTED_FILE_TYPES.includes(fileType)) {
    return true;
  }
  return false;
};
var readFile = async (filePath) => {
  try {
    console.info("Reading file %s", filePath);
    const file = await import_fs.promises.readFile(filePath);
    if (fileExists(file) && isAcceptedFileType(filePath)) {
      return file;
    }
    throw new Error("Reading file - does not exist or is unaccepted file type");
  } catch (err) {
    console.error("Error reading file %O", err);
    throw new Error(`Reading file ${err}`);
  }
};
var unlink = async (filePath) => {
  try {
    console.info("Deleting file %s", filePath);
    const file = await readFile(filePath);
    if (file) {
      await import_fs.promises.unlink(filePath);
    }
    return false;
  } catch (err) {
    console.error("Error deleting file %O", err);
    throw new Error(`Deleting file ${err}`);
  }
};
var fileSystem = {
  fileExists,
  isAcceptedFileType,
  readFile,
  unlink
};
var file_system_default = fileSystem;

// emails/application/index.ts
var application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {ApplicationSubmissionEmailVariables} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  submittedEmail: async (variables) => {
    try {
      console.info("Sending application submitted email to application owner or provided business contact");
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;
      const { emailAddress } = variables;
      const response = await callNotify(templateId, emailAddress, variables);
      return response;
    } catch (err) {
      console.error("Error sending application submitted email to to application owner or provided business contact %O", err);
      throw new Error(`Sending application submitted email to to application owner or provided business contact ${err}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read CSV file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to CSV
   * We send a file buffer to Notify and Notify generates a unique URL that is then rendered in the email.
   * @param {ApplicationSubmissionEmailVariables}
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables, filePath, templateId) => {
    try {
      console.info("Sending application submitted email to underwriting team");
      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);
      const file = await file_system_default.readFile(filePath);
      if (file) {
        const fileBuffer = Buffer.from(file);
        const response = await callNotify(templateId, emailAddress, variables, fileBuffer);
        await file_system_default.unlink(filePath);
        return response;
      }
      throw new Error("Sending application submitted email to underwriting team - invalid file / file not found");
    } catch (err) {
      console.error("Error sending application submitted email to underwriting team %O", err);
      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  }
};
var application_default2 = application;

// emails/documents/index.ts
var documentsEmail = async (variables, templateId) => {
  try {
    console.info("Sending documents email");
    const { emailAddress } = variables;
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error("Error sending documents email %O", err);
    throw new Error(`Sending documents email ${err}`);
  }
};

// emails/insurance-feedback-email/index.ts
var import_dotenv3 = __toESM(require("dotenv"));

// helpers/format-date/index.ts
var import_date_fns2 = require("date-fns");
var formatDate = (timestamp3, dateFormat = DATE_FORMAT.DEFAULT) => (0, import_date_fns2.format)(new Date(timestamp3), dateFormat);
var format_date_default = formatDate;

// helpers/map-feedback-satisfaction/index.ts
var mapFeedbackSatisfaction = (satisfaction) => FEEDBACK.EMAIL_TEXT[satisfaction];
var map_feedback_satisfaction_default = mapFeedbackSatisfaction;

// emails/insurance-feedback-email/index.ts
import_dotenv3.default.config();
var insuranceFeedbackEmail = async (variables) => {
  try {
    console.info("Sending insurance feedback email");
    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;
    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT;
    const emailVariables = variables;
    emailVariables.time = "";
    emailVariables.date = "";
    if (variables.createdAt) {
      emailVariables.date = format_date_default(variables.createdAt);
      emailVariables.time = format_date_default(variables.createdAt, "HH:mm:ss");
    }
    if (variables.satisfaction) {
      emailVariables.satisfaction = map_feedback_satisfaction_default(variables.satisfaction);
    }
    const response = await callNotify(templateId, emailAddress, emailVariables);
    return response;
  } catch (err) {
    console.error("Error sending insurance feedback email %O", err);
    throw new Error(`Sending insurance feedback email ${err}`);
  }
};

// emails/index.ts
import_dotenv4.default.config();
var sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  passwordResetLink,
  reactivateAccountLink,
  application: application_default2,
  documentsEmail,
  insuranceFeedbackEmail
};
var emails_default = sendEmail;

// custom-resolvers/mutations/create-an-account/index.ts
var createAnAccount = async (root, variables, context) => {
  console.info("Creating new account for %s", variables.email);
  try {
    const { urlOrigin, firstName, lastName, email, password: password2 } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (account2) {
      console.info("Unable to create a new account for %s - account already exists", variables.email);
      return { success: false };
    }
    const { salt, hash } = encrypt_password_default(password2);
    const now = /* @__PURE__ */ new Date();
    const { verificationHash, verificationExpiry } = get_account_verification_hash_default(email, salt);
    const accountData = {
      firstName,
      lastName,
      email,
      salt,
      hash,
      isVerified: false,
      verificationHash,
      verificationExpiry,
      createdAt: now,
      updatedAt: now
    };
    const creationResponse = await context.db.Account.createOne({
      data: accountData
    });
    const name = get_full_name_string_default(creationResponse);
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, verificationHash, creationResponse.id);
    if (emailResponse.success) {
      return {
        ...creationResponse,
        verificationHash,
        success: true
      };
    }
    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error("Error creating a new account %O", err);
    throw new Error(`Creating a new account ${err}`);
  }
};
var create_an_account_default = createAnAccount;

// helpers/get-authentication-retries-by-account-id/index.ts
var getAuthenticationRetriesByAccountId = async (context, accountId) => {
  console.info("Getting authentication retries by account ID");
  try {
    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId }
          }
        }
      }
    });
    return retries;
  } catch (err) {
    console.error("Error getting authentication retries by account ID %O", err);
    throw new Error(`Getting authentication retries by account ID ${err}`);
  }
};
var get_authentication_retries_by_account_id_default = getAuthenticationRetriesByAccountId;

// custom-resolvers/mutations/delete-an-account/index.ts
var deleteAnAccount = async (root, variables, context) => {
  console.info("Deleting account ", variables.email);
  try {
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, "email", email);
    if (!account2) {
      console.info(`Unable to delete account - account not found`);
      return { success: false };
    }
    const { id: accountId } = account2;
    console.info("Checking authentication retry entries");
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    if (retries.length) {
      console.info("Deleting authentication retry entries");
      const retriesArray = retries.map((retry) => ({
        id: retry.id
      }));
      await context.db.AuthenticationRetry.deleteMany({
        where: retriesArray
      });
    }
    console.info("Deleting account %s", accountId);
    await context.db.Account.deleteOne({
      where: {
        id: accountId
      }
    });
    return {
      success: true
    };
  } catch (err) {
    console.error("Error deleting account %O", err);
    throw new Error(`Deleting account ${err}`);
  }
};
var delete_an_account_default = deleteAnAccount;

// custom-resolvers/mutations/verify-account-email-address/index.ts
var import_date_fns3 = require("date-fns");

// helpers/update-account/index.ts
var account = async (context, accountId, updateData) => {
  try {
    console.info("Updating account");
    const updatedAccount = await context.db.Account.updateOne({
      where: {
        id: accountId
      },
      data: updateData
    });
    return updatedAccount;
  } catch (err) {
    console.error("Error updating account %O", err);
    throw new Error(`Updating account ${err}`);
  }
};
var update = {
  account
};
var update_account_default = update;

// custom-resolvers/mutations/verify-account-email-address/index.ts
var { ID, EMAIL: EMAIL2, VERIFICATION_EXPIRY } = account_default;
var verifyAccountEmailAddress = async (root, variables, context) => {
  try {
    console.info("Verifying account email address");
    const account2 = await get_account_by_field_default(context, ID, variables.id);
    if (!account2) {
      console.info("Unable to verify account email address - account does not exist");
      return {
        success: false,
        invalid: true
      };
    }
    if (account2.isVerified) {
      console.info("Account email address is already verified");
      return {
        success: true
      };
    }
    const { id } = account2;
    const now = /* @__PURE__ */ new Date();
    const canActivateAccount = (0, import_date_fns3.isBefore)(now, account2[VERIFICATION_EXPIRY]);
    if (!canActivateAccount) {
      console.info("Unable to verify account email address - verification period has expired");
      return {
        expired: true,
        success: false,
        accountId: id
      };
    }
    console.info("Verified account email address - updating account to be verified");
    const accountUpdate = {
      isVerified: true,
      verificationHash: "",
      verificationExpiry: null
    };
    await update_account_default.account(context, id, accountUpdate);
    return {
      success: true,
      accountId: id,
      emailRecipient: account2[EMAIL2]
    };
  } catch (err) {
    console.error("Error verifying account email address %O", err);
    throw new Error(`Verifying account email address ${err}`);
  }
};
var verify_account_email_address_default = verifyAccountEmailAddress;

// helpers/get-account-by-id/index.ts
var getAccountById = async (context, accountId) => {
  try {
    console.info("Getting account by ID");
    const account2 = await context.db.Account.findOne({
      where: {
        id: accountId
      }
    });
    return account2;
  } catch (err) {
    console.error("Error getting account by ID %O", err);
    throw new Error(`Getting account by ID ${err}`);
  }
};
var get_account_by_id_default = getAccountById;

// helpers/send-email-confirm-email-address/index.ts
var send = async (context, urlOrigin, accountId) => {
  try {
    console.info("Sending email verification");
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info("Sending email verification - no account exists with the provided account ID");
      return {
        success: false
      };
    }
    let latestVerificationHash = "";
    if (account2.verificationHash) {
      latestVerificationHash = account2.verificationHash;
    } else {
      const { email: email2, salt } = account2;
      const { verificationHash, verificationExpiry } = get_account_verification_hash_default(email2, salt);
      const accountUpdate = { verificationHash, verificationExpiry };
      latestVerificationHash = verificationHash;
      await update_account_default.account(context, accountId, accountUpdate);
    }
    const { email, id } = account2;
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, latestVerificationHash, id);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${emailResponse}`);
  } catch (err) {
    console.error("Error sending email verification (sendEmailConfirmEmailAddress helper) %O", err);
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${err}`);
  }
};
var confirmEmailAddressEmail = {
  send
};
var send_email_confirm_email_address_default = confirmEmailAddressEmail;

// custom-resolvers/mutations/send-email-confirm-email-address/index.ts
var sendEmailConfirmEmailAddressMutation = async (root, variables, context) => {
  try {
    console.info("Sending email verification for account creation");
    const emailResponse = await send_email_confirm_email_address_default.send(context, variables.urlOrigin, variables.accountId);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error("Error sending email verification for account creation (sendEmailConfirmEmailAddress mutation) %O", err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};
var send_email_confirm_email_address_default2 = sendEmailConfirmEmailAddressMutation;

// helpers/get-password-hash/index.ts
var import_crypto3 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION3 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE3,
  PBKDF2: { ITERATIONS: ITERATIONS3, DIGEST_ALGORITHM: DIGEST_ALGORITHM3 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH3 }
  }
} = ENCRYPTION3;
var getPasswordHash = (password2, salt) => {
  const hash = import_crypto3.default.pbkdf2Sync(password2, salt, ITERATIONS3, KEY_LENGTH3, DIGEST_ALGORITHM3).toString(STRING_TYPE3);
  return hash;
};
var get_password_hash_default = getPasswordHash;

// helpers/is-valid-account-password/index.ts
var isValidAccountPassword = (password2, salt, hash) => {
  console.info("Validating account password");
  const hashVerify = get_password_hash_default(password2, salt);
  if (hash === hashVerify) {
    console.info("Valid account password");
    return true;
  }
  console.info("Invalid account password");
  return false;
};
var is_valid_account_password_default = isValidAccountPassword;

// helpers/create-authentication-retry-entry/index.ts
var createAuthenticationRetryEntry = async (context, accountId) => {
  try {
    console.info("Creating account authentication retry entry");
    const now = /* @__PURE__ */ new Date();
    const response = await context.db.AuthenticationRetry.createOne({
      data: {
        account: {
          connect: {
            id: accountId
          }
        },
        createdAt: now
      }
    });
    if (response.id) {
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error("Error creating account authentication retry entry %O", err);
    throw new Error(`${err}`);
  }
};
var create_authentication_retry_entry_default = createAuthenticationRetryEntry;

// helpers/should-block-account/index.ts
var import_date_fns4 = require("date-fns");
var { MAX_AUTH_RETRIES, MAX_AUTH_RETRIES_TIMEFRAME } = ACCOUNT2;
var shouldBlockAccount = async (context, accountId) => {
  console.info("Checking account authentication retries %s", accountId);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const now = /* @__PURE__ */ new Date();
    const retriesInTimeframe = [];
    retries.forEach((retry) => {
      const retryDate = retry.createdAt;
      const isWithinLast24Hours = (0, import_date_fns4.isAfter)(retryDate, MAX_AUTH_RETRIES_TIMEFRAME) && (0, import_date_fns4.isBefore)(retryDate, now);
      if (isWithinLast24Hours) {
        retriesInTimeframe.push(retry.id);
      }
    });
    if (retriesInTimeframe.length >= MAX_AUTH_RETRIES) {
      console.info("Account authentication retries exceeds the threshold %s", accountId);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error checking account authentication retries %O", err);
    throw new Error(`Checking account authentication retries  ${err}`);
  }
};
var should_block_account_default = shouldBlockAccount;

// helpers/block-account/index.ts
var blockAccount = async (context, accountId) => {
  console.info("Blocking account %s", accountId);
  try {
    const accountUpdate = { isBlocked: true };
    const result = await update_account_default.account(context, accountId, accountUpdate);
    if (result.id) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error blocking account %O", err);
    throw new Error(`Blocking account ${err}`);
  }
};
var block_account_default = blockAccount;

// custom-resolvers/mutations/account-sign-in/account-checks/index.ts
var import_date_fns5 = require("date-fns");

// helpers/generate-otp/index.ts
var import_crypto4 = __toESM(require("crypto"));
var import_otplib = require("otplib");
var { ENCRYPTION: ENCRYPTION4, OTP } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE2,
  STRING_TYPE: STRING_TYPE4,
  PBKDF2: { ITERATIONS: ITERATIONS4, DIGEST_ALGORITHM: DIGEST_ALGORITHM4 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH4 }
  }
} = ENCRYPTION4;
var generateOtp = () => {
  try {
    console.info("Generating OTP");
    const salt = import_crypto4.default.randomBytes(RANDOM_BYTES_SIZE2).toString(STRING_TYPE4);
    import_otplib.authenticator.options = { digits: OTP.DIGITS };
    const securityCode = import_otplib.authenticator.generate(salt);
    const hash = import_crypto4.default.pbkdf2Sync(securityCode, salt, ITERATIONS4, KEY_LENGTH4, DIGEST_ALGORITHM4).toString(STRING_TYPE4);
    const expiry = OTP.VERIFICATION_EXPIRY();
    return {
      securityCode,
      salt,
      hash,
      expiry
    };
  } catch (err) {
    console.error("Error generating OTP %O", err);
    throw new Error(`Error generating OTP ${err}`);
  }
};
var generate = {
  otp: generateOtp
};
var generate_otp_default = generate;

// helpers/generate-otp-and-update-account/index.ts
var generateOTPAndUpdateAccount = async (context, accountId) => {
  try {
    console.info("Adding OTP to an account");
    const otp = generate_otp_default.otp();
    const { securityCode, salt, hash, expiry } = otp;
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry
    };
    await update_account_default.account(context, accountId, accountUpdate);
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error("Error adding OTP to an account %O", err);
    throw new Error(`Adding OTP to an account ${err}`);
  }
};
var generate_otp_and_update_account_default = generateOTPAndUpdateAccount;

// custom-resolvers/mutations/account-sign-in/account-checks/index.ts
var { EMAIL: EMAIL3 } = ACCOUNT2;
var accountChecks = async (context, account2, urlOrigin) => {
  try {
    console.info("Signing in account - checking account");
    const { id: accountId, email } = account2;
    if (!account2.isVerified) {
      console.info("Unable to sign in account - account has not been verified yet");
      const now = /* @__PURE__ */ new Date();
      const verificationHasExpired = (0, import_date_fns5.isAfter)(now, account2.verificationExpiry);
      if (account2.verificationHash && !verificationHasExpired) {
        console.info("Account has an unexpired verification token - resetting verification expiry");
        const accountUpdate = {
          verificationExpiry: EMAIL3.VERIFICATION_EXPIRY()
        };
        await update_account_default.account(context, accountId, accountUpdate);
        console.info("Account has an unexpired verification token - sending verification email");
        const emailResponse2 = await send_email_confirm_email_address_default.send(context, urlOrigin, accountId);
        if (emailResponse2?.success) {
          return {
            success: false,
            resentVerificationEmail: true,
            accountId
          };
        }
        return { success: false, accountId };
      }
      console.info("Unable to sign in account - account has not been verified");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, accountId);
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.securityCodeEmail(email, name, securityCode);
    if (emailResponse?.success) {
      return {
        ...emailResponse,
        accountId
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error("Error validating password or sending email for account sign in (accountSignIn mutation - account checks) %O", err);
    throw new Error(`Validating password or sending email for account sign in (accountSignIn mutation - account checks) ${err}`);
  }
};
var account_checks_default = accountChecks;

// custom-resolvers/mutations/account-sign-in/index.ts
var accountSignIn = async (root, variables, context) => {
  try {
    console.info("Signing in account");
    const { urlOrigin, email, password: password2 } = variables;
    const accountData = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!accountData) {
      console.info("Unable to validate account - no account found");
      return { success: false };
    }
    const account2 = accountData;
    const { id: accountId } = account2;
    const { isBlocked } = account2;
    if (isBlocked) {
      console.info("Unable to sign in account - account is already blocked");
      return { success: false, isBlocked: true, accountId };
    }
    if (is_valid_account_password_default(password2, account2.salt, account2.hash)) {
      console.info("Signing in account - valid credentials provided");
      return account_checks_default(context, account2, urlOrigin);
    }
    console.info("Signing in account - invalid credentials provided");
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      const blocked = await block_account_default(context, accountId);
      if (blocked) {
        return {
          success: false,
          isBlocked: true,
          accountId
        };
      }
      return { success: false };
    }
    return { success: false };
  } catch (err) {
    console.error("Error signing into account %O", err);
    throw new Error(`Signing in account (accountSignIn mutation) ${err}`);
  }
};
var account_sign_in_default = accountSignIn;

// custom-resolvers/mutations/account-sign-in-new-code/index.ts
var accountSignInSendNewCode = async (root, variables, context) => {
  try {
    console.info("Generating and sending new sign in code for account");
    const { accountId } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info("Unable to validate account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account2.id);
    const { email } = account2;
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.securityCodeEmail(email, name, securityCode);
    if (emailResponse.success) {
      return {
        ...emailResponse,
        accountId: account2.id
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error("Error generating and sending new sign in code for account (accountSignInSendNewCode mutation) %O", err);
    throw new Error(`Generating and sending new sign in code for account (accountSignInSendNewCode mutation) ${err}`);
  }
};
var account_sign_in_new_code_default = accountSignInSendNewCode;

// custom-resolvers/mutations/verify-account-sign-in-code/index.ts
var import_date_fns6 = require("date-fns");

// helpers/is-valid-otp/index.ts
var import_crypto5 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION5 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE5,
  PBKDF2: { ITERATIONS: ITERATIONS5, DIGEST_ALGORITHM: DIGEST_ALGORITHM5 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH5 }
  }
} = ENCRYPTION5;
var isValidOTP = (securityCode, otpSalt, otpHash) => {
  try {
    console.info("Validating OTP");
    const hashVerify = import_crypto5.default.pbkdf2Sync(securityCode, otpSalt, ITERATIONS5, KEY_LENGTH5, DIGEST_ALGORITHM5).toString(STRING_TYPE5);
    if (otpHash === hashVerify) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error validating OTP %O", err);
    throw new Error(`Error validating OTP ${err}`);
  }
};
var is_valid_otp_default = isValidOTP;

// helpers/delete-authentication-retries/index.ts
var deleteAuthenticationRetries = async (context, accountId) => {
  console.info("Deleting authentication retries for account %s", accountId);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const retryIds = retries.map((obj) => ({
      id: obj.id
    }));
    const result = await context.db.AuthenticationRetry.deleteMany({
      where: retryIds
    });
    return result;
  } catch (err) {
    console.error("Error deleting authentication retries %O", err);
    throw new Error(`Deleting authentication retries ${err}`);
  }
};
var delete_authentication_retries_default = deleteAuthenticationRetries;

// helpers/create-jwt/index.ts
var import_crypto6 = __toESM(require("crypto"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var {
  ENCRYPTION: { RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE3, STRING_TYPE: STRING_TYPE6 },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY, ALGORITHM }
  }
} = ACCOUNT2;
var PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);
var createJWT = (accountId) => {
  const sessionIdentifier = import_crypto6.default.randomBytes(RANDOM_BYTES_SIZE3).toString(STRING_TYPE6);
  const expiresIn = EXPIRY;
  const payload = {
    sub: accountId,
    sessionIdentifier
  };
  const signedToken = import_jsonwebtoken.default.sign(payload, PRIV_KEY, { expiresIn, algorithm: ALGORITHM });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
    sessionIdentifier
  };
};
var create = {
  JWT: createJWT
};
var create_jwt_default = create;

// custom-resolvers/mutations/verify-account-sign-in-code/index.ts
var {
  JWT: { SESSION_EXPIRY }
} = ACCOUNT2;
var verifyAccountSignInCode = async (root, variables, context) => {
  try {
    console.info("Verifying account sign in code");
    const { accountId, securityCode } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info("Unable to verify account sign in code - no account exists with the provided ID");
      return {
        success: false
      };
    }
    if (!account2.otpSalt || !account2.otpHash || !account2.otpExpiry) {
      console.info("Unable to verify account sign in code - no OTP available for this account");
      return {
        success: false
      };
    }
    const { otpSalt, otpHash, otpExpiry } = account2;
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns6.isAfter)(now, otpExpiry);
    if (hasExpired) {
      console.info("Unable to verify account sign in code - verification period has expired");
      return {
        success: false,
        expired: true
      };
    }
    const isValid = otpSalt && otpHash && is_valid_otp_default(securityCode, otpSalt, otpHash);
    if (isValid) {
      console.info("Verified account sign in code - creating JWT and updating account");
      await delete_authentication_retries_default(context, accountId);
      const jwt = create_jwt_default.JWT(accountId);
      const { sessionIdentifier } = jwt;
      const accountUpdate = {
        sessionIdentifier,
        sessionExpiry: SESSION_EXPIRY(),
        otpSalt: "",
        otpHash: "",
        otpExpiry: null
      };
      await update_account_default.account(context, accountId, accountUpdate);
      return {
        success: true,
        accountId: account2.id,
        lastName: account2.lastName,
        firstName: account2.firstName,
        email: account2.email,
        ...jwt,
        expires: accountUpdate.sessionExpiry
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error("Error verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) %O", err);
    throw new Error(`Verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};
var verify_account_sign_in_code_default = verifyAccountSignInCode;

// custom-resolvers/mutations/add-and-get-OTP/index.ts
var addAndGetOTP = async (root, variables, context) => {
  try {
    console.info("Adding OTP to an account");
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info("Unable to generate and add OTP to an account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account2.id);
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error("Error adding OTP to an account (addAndGetOTP mutation) %O", err);
    throw new Error(`Adding OTP to an account (addAndGetOTP mutation) ${err}`);
  }
};
var add_and_get_OTP_default = addAndGetOTP;

// custom-resolvers/mutations/send-email-password-reset-link/index.ts
var import_crypto7 = __toESM(require("crypto"));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE7,
    PBKDF2: { ITERATIONS: ITERATIONS6, DIGEST_ALGORITHM: DIGEST_ALGORITHM6 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH6 }
    }
  }
} = ACCOUNT2;
var sendEmailPasswordResetLink = async (root, variables, context) => {
  try {
    console.info("Received a password reset request - checking account");
    const { urlOrigin, email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info("Unable to check account and send password reset email - no account found");
      return { success: false };
    }
    const { id: accountId } = account2;
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      try {
        const blocked = await block_account_default(context, accountId);
        if (blocked) {
          return {
            success: false,
            isBlocked: true,
            accountId
          };
        }
      } catch (err) {
        console.error("Error blocking account $O", err);
        return { success: false };
      }
    }
    console.info("Generating password reset hash");
    const passwordResetHash = import_crypto7.default.pbkdf2Sync(email, account2.salt, ITERATIONS6, KEY_LENGTH6, DIGEST_ALGORITHM6).toString(STRING_TYPE7);
    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT2.PASSWORD_RESET_EXPIRY()
    };
    console.info("Updating account for password reset");
    await update_account_default.account(context, accountId, accountUpdate);
    console.info("Sending password reset email");
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.passwordResetLink(urlOrigin, email, name, passwordResetHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    return { success: false };
  } catch (err) {
    console.error("Error checking account and sending password reset email (sendEmailPasswordResetLink mutation) $O", err);
    throw new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};
var send_email_password_reset_link_default = sendEmailPasswordResetLink;

// custom-resolvers/mutations/account-password-reset/index.ts
var import_date_fns7 = require("date-fns");

// helpers/account-has-used-password-before/index.ts
var hasAccountUsedPasswordBefore = async (context, accountId, newPassword) => {
  console.info("Checking if an account has used a password before");
  try {
    let usedBefore = false;
    const previousHashes = await context.db.Authentication.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId }
          }
        }
      }
    });
    if (previousHashes.length) {
      previousHashes.forEach((previous) => {
        const newHashPreviousSalt = get_password_hash_default(newPassword, previous.salt);
        if (newHashPreviousSalt === previous.hash) {
          usedBefore = true;
        }
      });
    }
    return usedBefore;
  } catch (err) {
    console.error("Error checking if an account has used a password before %O", err);
    throw new Error(`Checking if an account has used a password before ${err}`);
  }
};
var account_has_used_password_before_default = hasAccountUsedPasswordBefore;

// helpers/create-authentication-entry/index.ts
var createAuthenticationEntry = async (context, entry) => {
  console.info("Creating authentication entry");
  try {
    const result = await context.db.Authentication.createOne({
      data: {
        ...entry,
        createdAt: /* @__PURE__ */ new Date()
      }
    });
    return result;
  } catch (err) {
    console.error("Error creating authentication entry %O", err);
    throw new Error(`Creating authentication entry ${err}`);
  }
};
var create_authentication_entry_default = createAuthenticationEntry;

// custom-resolvers/mutations/account-password-reset/index.ts
var accountPasswordReset = async (root, variables, context) => {
  console.info("Resetting account password");
  try {
    const { token, password: newPassword } = variables;
    const account2 = await get_account_by_field_default(context, account_default.PASSWORD_RESET_HASH, token);
    if (!account2) {
      console.info("Unable to reset account password - account does not exist");
      return { success: false };
    }
    const { isBlocked } = account2;
    if (isBlocked) {
      console.info("Unable to reset account password - account is blocked");
      return { success: false };
    }
    const { id: accountId, passwordResetHash, passwordResetExpiry, salt: currentSalt, hash: currentHash } = account2;
    if (!passwordResetHash || !passwordResetExpiry) {
      console.info("Unable to reset account password - reset hash or expiry does not exist");
      return { success: false };
    }
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns7.isAfter)(now, passwordResetExpiry);
    if (hasExpired) {
      console.info("Unable to reset account password - verification period has expired");
      return {
        success: false,
        expired: true
      };
    }
    const newHashCurrentSalt = get_password_hash_default(newPassword, currentSalt);
    const passwordIsTheSame = newHashCurrentSalt === currentHash;
    if (passwordIsTheSame) {
      console.info("Unable to reset account password - provided password is the same");
      return {
        success: false,
        hasBeenUsedBefore: true
      };
    }
    const usedPasswordBefore = await account_has_used_password_before_default(context, accountId, newPassword);
    if (usedPasswordBefore) {
      console.info("Unable to reset account password - provided password has been used before");
      return {
        success: false,
        hasBeenUsedBefore: true
      };
    }
    await delete_authentication_retries_default(context, accountId);
    const authEntry = {
      account: {
        connect: {
          id: accountId
        }
      },
      salt: currentSalt,
      hash: currentHash
    };
    await create_authentication_entry_default(context, authEntry);
    const { salt: newSalt, hash: newHash } = encrypt_password_default(newPassword);
    const accountUpdate = {
      salt: newSalt,
      hash: newHash,
      passwordResetHash: "",
      passwordResetExpiry: null
    };
    await update_account_default.account(context, accountId, accountUpdate);
    return {
      success: true
    };
  } catch (err) {
    console.error("Error resetting account password %O", err);
    throw new Error(`Resetting account password ${err}`);
  }
};
var account_password_reset_default = accountPasswordReset;

// custom-resolvers/mutations/send-email-reactivate-account-link/index.ts
var import_crypto8 = __toESM(require("crypto"));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE8,
    PBKDF2: { ITERATIONS: ITERATIONS7, DIGEST_ALGORITHM: DIGEST_ALGORITHM7 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH7 }
    }
  }
} = ACCOUNT2;
var sendEmailReactivateAccountLink = async (root, variables, context) => {
  try {
    console.info("Received a request to send reactivate account email/link - checking account");
    const { urlOrigin, accountId } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info("Unable to check account and send reactivate account email/link - no account found");
      return { success: false };
    }
    const { email } = account2;
    console.info("Generating hash for account reactivation");
    const reactivationHash = import_crypto8.default.pbkdf2Sync(email, account2.salt, ITERATIONS7, KEY_LENGTH7, DIGEST_ALGORITHM7).toString(STRING_TYPE8);
    const accountUpdate = {
      reactivationHash,
      reactivationExpiry: ACCOUNT2.REACTIVATION_EXPIRY()
    };
    console.info("Updating account for reactivation");
    await update_account_default.account(context, accountId, accountUpdate);
    console.info("Sending reactivate account email/link");
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.reactivateAccountLink(urlOrigin, email, name, reactivationHash);
    if (emailResponse.success) {
      return {
        ...emailResponse,
        email,
        accountId
      };
    }
    return { accountId, email, success: false };
  } catch (err) {
    console.error("Error checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) %O", err);
    throw new Error(`Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) ${err}`);
  }
};
var send_email_reactivate_account_link_default = sendEmailReactivateAccountLink;

// helpers/get-country-by-field/index.ts
var getCountryByField = async (context, field, value) => {
  try {
    console.info("Getting country by field/value");
    const countriesArray = await context.db.Country.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!countriesArray?.length || !countriesArray[0]) {
      console.info("Getting country by field - no country exists with the provided field/value");
      return false;
    }
    const country = countriesArray[0];
    return country;
  } catch (err) {
    console.error("Error getting country by field/value %O", err);
    throw new Error(`Getting country by field/value ${err}`);
  }
};
var get_country_by_field_default = getCountryByField;

// helpers/get-cover-period-value-by-field/index.ts
var getCoverPeriodValueByField = async (context, field, value) => {
  try {
    console.info("Getting coverPeriod by field/value $s", `${field}, ${value}`);
    const coverPeriodsArray = await context.db.CoverPeriod.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!coverPeriodsArray?.length || !coverPeriodsArray[0]) {
      console.info("Getting coverPeriod by field - no coverPeriod exists with the provided field/value");
      return false;
    }
    const [coverPeriod] = coverPeriodsArray;
    return coverPeriod;
  } catch (err) {
    console.error("Error getting coverPeriod by field/value %O", err);
    throw new Error(`Getting coverPeriod by field/value ${err}`);
  }
};
var get_cover_period_value_by_field_default = getCoverPeriodValueByField;

// helpers/get-total-contract-value-by-field/index.ts
var getTotalContractValueByField = async (context, field, value) => {
  try {
    console.info("Getting totalContractValue by field/value $s", `${field}, ${value}`);
    const totalContractValuesArray = await context.db.TotalContractValue.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!totalContractValuesArray?.length || !totalContractValuesArray[0]) {
      console.info("Getting totalContractValue by field - no totalContractValue exists with the provided field/value");
      return false;
    }
    const [totalContractValue] = totalContractValuesArray;
    return totalContractValue;
  } catch (err) {
    console.error("Error getting totalContractValue by field/value %O", err);
    throw new Error(`Getting totalContractValue by field/value ${err}`);
  }
};
var get_total_contract_value_by_field_default = getTotalContractValueByField;

// helpers/create-an-eligibility/index.ts
var createAnEligibility = async (context, countryId, applicationId, coverPeriodId, totalContractValueId, data) => {
  console.info("Creating an eligibility for ", applicationId);
  try {
    const eligibility = await context.db.Eligibility.createOne({
      data: {
        buyerCountry: {
          connect: { id: countryId }
        },
        application: {
          connect: { id: applicationId }
        },
        coverPeriod: {
          connect: { id: coverPeriodId }
        },
        totalContractValue: {
          connect: { id: totalContractValueId }
        },
        ...data
      }
    });
    return eligibility;
  } catch (err) {
    console.error("Error creating an eligibility %O", err);
    throw new Error(`Creating an eligibility ${err}`);
  }
};
var create_an_eligibility_default = createAnEligibility;

// helpers/create-a-buyer/index.ts
var createABuyer = async (context, countryId, applicationId) => {
  console.info("Creating a buyer for ", applicationId);
  try {
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: { id: countryId }
        },
        application: {
          connect: { id: applicationId }
        }
      }
    });
    return buyer;
  } catch (err) {
    console.error("Error creating a buyer %O", err);
    throw new Error(`Creating a buyer ${err}`);
  }
};
var create_a_buyer_default = createABuyer;

// helpers/create-a-policy/index.ts
var createAPolicy = async (context, applicationId) => {
  console.info("Creating a policy for ", applicationId);
  try {
    const policy = await context.db.Policy.createOne({
      data: {
        application: {
          connect: { id: applicationId }
        },
        needPreCreditPeriodCover: APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER
      }
    });
    return policy;
  } catch (err) {
    console.error("Error creating a policy %O", err);
    throw new Error(`Creating a policy ${err}`);
  }
};
var create_a_policy_default = createAPolicy;

// helpers/create-a-company-address/index.ts
var createACompanyAddress = async (context, addressData, companyId) => {
  console.info("Creating a company address for ", companyId);
  try {
    const companyAddress = await context.db.CompanyAddress.createOne({
      data: {
        company: {
          connect: {
            id: companyId
          }
        },
        ...addressData
      }
    });
    return companyAddress;
  } catch (err) {
    console.error("Error creating a company address %O", err);
    throw new Error(`Creating a company address ${err}`);
  }
};
var create_a_company_address_default = createACompanyAddress;

// helpers/map-sic-codes/index.ts
var mapSicCodes = (sicCodes, industrySectorNames2, companyId) => {
  const mapped = [];
  if (!sicCodes.length) {
    return mapped;
  }
  sicCodes.forEach((code, index) => {
    let industrySectorName = "";
    if (industrySectorNames2 && industrySectorNames2[index]) {
      industrySectorName = industrySectorNames2[index];
    }
    const mappedCode = {
      sicCode: code,
      industrySectorName,
      company: {
        connect: {
          id: companyId
        }
      }
    };
    mapped.push(mappedCode);
  });
  return mapped;
};
var map_sic_codes_default = mapSicCodes;

// helpers/create-company-sic-codes/index.ts
var createCompanySicCodes = async (context, sicCodes, industrySectorNames2, companyId) => {
  console.info("Creating company SIC codes for ", companyId);
  try {
    const mappedSicCodes = map_sic_codes_default(sicCodes, industrySectorNames2, companyId);
    let createdSicCodes = [];
    if (sicCodes.length) {
      createdSicCodes = await context.db.CompanySicCode.createMany({
        data: mappedSicCodes
      });
    }
    return createdSicCodes;
  } catch (err) {
    console.error("Error creating company SIC codes %O", err);
    throw new Error(`Creating company SIC codes ${err}`);
  }
};
var create_company_sic_codes_default = createCompanySicCodes;

// helpers/create-a-company/index.ts
var createACompany = async (context, applicationId, companyData) => {
  console.info("Creating a company, address and SIC codes for ", applicationId);
  try {
    const { registeredOfficeAddress, sicCodes, industrySectorNames: industrySectorNames2, ...companyFields } = companyData;
    const company = await context.db.Company.createOne({
      data: {
        application: {
          connect: { id: applicationId }
        },
        ...companyFields
      }
    });
    const companyAddress = await create_a_company_address_default(context, registeredOfficeAddress, company.id);
    const createdSicCodes = await create_company_sic_codes_default(context, sicCodes, industrySectorNames2, company.id);
    return {
      ...company,
      registeredOfficeAddress: companyAddress,
      sicCodes: createdSicCodes
    };
  } catch (err) {
    console.error("Error creating a company, address and SIC codes %O", err);
    throw new Error(`Creating a company, address and SIC codes ${err}`);
  }
};
var create_a_company_default = createACompany;

// custom-resolvers/mutations/create-an-application/index.ts
var createAnApplication = async (root, variables, context) => {
  console.info("Creating application for ", variables.accountId);
  try {
    const { accountId, eligibilityAnswers, company: companyData } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      return {
        success: false
      };
    }
    const { buyerCountryIsoCode, needPreCreditPeriodCover, totalContractValueId, coverPeriodId, ...otherEligibilityAnswers } = eligibilityAnswers;
    const country = await get_country_by_field_default(context, "isoCode", buyerCountryIsoCode);
    const application2 = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId }
        }
      }
    });
    const { id: applicationId } = application2;
    const buyer = await create_a_buyer_default(context, country.id, applicationId);
    const totalContractValue = await get_total_contract_value_by_field_default(context, "valueId", totalContractValueId);
    const coverPeriod = await get_cover_period_value_by_field_default(context, "valueId", coverPeriodId);
    const eligibility = await create_an_eligibility_default(context, country.id, applicationId, coverPeriod.id, totalContractValue.id, otherEligibilityAnswers);
    const policy = await create_a_policy_default(context, applicationId);
    const company = await create_a_company_default(context, applicationId, companyData);
    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId
      },
      data: {
        buyer: {
          connect: { id: buyer.id }
        },
        eligibility: {
          connect: { id: eligibility.id }
        },
        policy: {
          connect: { id: policy.id }
        },
        company: {
          connect: { id: company.id }
        }
      }
    });
    return {
      ...updatedApplication,
      success: true
    };
  } catch (err) {
    console.error("Error creating application %O", err);
    throw new Error(`Creating application ${err}`);
  }
};
var create_an_application_default = createAnApplication;

// custom-resolvers/mutations/delete-application-by-reference-number/index.ts
var deleteApplicationByReferenceNumber = async (root, variables, context) => {
  try {
    console.info("Deleting application by reference number");
    const { referenceNumber } = variables;
    const applications = await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber }
      }
    });
    if (applications.length) {
      const [{ id }] = applications;
      const deleteResponse = await context.db.Application.deleteOne({
        where: {
          id
        }
      });
      if (deleteResponse?.id) {
        return {
          success: true
        };
      }
    }
    return {
      success: false
    };
  } catch (err) {
    console.error("Error deleting application by reference number (DeleteApplicationByReferenceNumber mutation) %O", err);
    throw new Error(`Deleting application by reference number (DeleteApplicationByReferenceNumber mutation) ${err}`);
  }
};
var delete_application_by_reference_number_default = deleteApplicationByReferenceNumber;

// custom-resolvers/mutations/submit-application/index.ts
var import_date_fns8 = require("date-fns");

// helpers/get-populated-application/index.ts
var generateErrorMessage = (section, applicationId) => `Getting populated application - no ${section} found for application ${applicationId}`;
var getPopulatedApplication = async (context, application2) => {
  console.info("Getting populated application");
  const { eligibilityId, ownerId, policyId, policyContactId, exportContractId, companyId, businessId, brokerId, buyerId, declarationId } = application2;
  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId }
  });
  if (!eligibility) {
    throw new Error(generateErrorMessage("eligibility", application2.id));
  }
  const coverPeriod = await context.db.CoverPeriod.findOne({
    where: { id: eligibility.coverPeriodId }
  });
  if (!coverPeriod) {
    throw new Error(generateErrorMessage("coverPeriod", application2.id));
  }
  const totalContractValue = await context.db.TotalContractValue.findOne({
    where: { id: eligibility.totalContractValueId }
  });
  if (!totalContractValue) {
    throw new Error(generateErrorMessage("totalContractValue", application2.id));
  }
  const account2 = await get_account_by_id_default(context, ownerId);
  if (!account2) {
    throw new Error(generateErrorMessage("account", application2.id));
  }
  const policy = await context.db.Policy.findOne({
    where: { id: policyId }
  });
  if (!policy) {
    throw new Error(generateErrorMessage("policy", application2.id));
  }
  const policyContact = await context.db.PolicyContact.findOne({
    where: { id: policyContactId }
  });
  if (!policyContact) {
    throw new Error(generateErrorMessage("policyContact", application2.id));
  }
  const exportContract = await context.db.ExportContract.findOne({
    where: { id: exportContractId }
  });
  if (!exportContract) {
    throw new Error(generateErrorMessage("exportContract", application2.id));
  }
  const finalDestinationCountry = await get_country_by_field_default(context, "isoCode", exportContract.finalDestinationCountryCode);
  const populatedExportContract = {
    ...exportContract,
    finalDestinationCountry
  };
  const company = await context.db.Company.findOne({
    where: { id: companyId }
  });
  if (!company) {
    throw new Error(generateErrorMessage("company", application2.id));
  }
  const companySicCodes = await context.db.CompanySicCode.findMany({
    where: {
      company: {
        id: { equals: company.id }
      }
    }
  });
  if (!company) {
    throw new Error(generateErrorMessage("companySicCode", application2.id));
  }
  const companyAddress = await context.db.CompanyAddress.findOne({
    where: { id: company.registeredOfficeAddressId }
  });
  const populatedCompany = {
    ...company,
    registeredOfficeAddress: companyAddress
  };
  const business = await context.db.Business.findOne({
    where: { id: businessId }
  });
  if (!business) {
    throw new Error(generateErrorMessage("business", application2.id));
  }
  const broker = await context.db.Broker.findOne({
    where: { id: brokerId }
  });
  if (!broker) {
    throw new Error(generateErrorMessage("broker", application2.id));
  }
  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId }
  });
  if (!buyer) {
    throw new Error(generateErrorMessage("buyer", application2.id));
  }
  const buyerCountry = await context.db.Country.findOne({
    where: { id: buyer.countryId }
  });
  if (!buyerCountry) {
    throw new Error(generateErrorMessage("populated buyer", application2.id));
  }
  const populatedEligibility = {
    ...eligibility,
    buyerCountry,
    coverPeriod,
    totalContractValue
  };
  const populatedBuyer = {
    ...buyer,
    country: buyerCountry
  };
  const declaration = await context.db.Declaration.findOne({
    where: { id: declarationId }
  });
  if (!declaration) {
    throw new Error(generateErrorMessage("declaration", application2.id));
  }
  const populatedApplication = {
    ...application2,
    eligibility: populatedEligibility,
    broker,
    business,
    buyer: populatedBuyer,
    company: populatedCompany,
    companySicCodes,
    declaration,
    exportContract: populatedExportContract,
    owner: account2,
    policy,
    policyContact
  };
  return populatedApplication;
};
var get_populated_application_default = getPopulatedApplication;

// helpers/get-application-submitted-email-template-ids/index.ts
var {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM }
  }
} = EMAIL_TEMPLATE_IDS;
var getApplicationSubmittedEmailTemplateIds = (application2) => {
  const { buyer, declaration } = application2;
  const templateIds = {
    underwritingTeam: "",
    account: ""
  };
  const { hasAntiBriberyCodeOfConduct } = declaration;
  const { exporterHasTradedWithBuyer } = buyer;
  if (!hasAntiBriberyCodeOfConduct && !exporterHasTradedWithBuyer) {
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NO_DOCUMENTS;
    return templateIds;
  }
  if (hasAntiBriberyCodeOfConduct) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }
  if (exporterHasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }
  if (hasAntiBriberyCodeOfConduct && exporterHasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }
  return templateIds;
};
var get_application_submitted_email_template_ids_default = getApplicationSubmittedEmailTemplateIds;

// emails/send-application-submitted-emails/index.ts
var send2 = async (application2, xlsxPath) => {
  try {
    const { referenceNumber, owner, company, buyer, policy, policyContact } = application2;
    const { email } = owner;
    const sharedEmailVars = {
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      companyName: company.companyName,
      requestedStartDate: format_date_default(policy.requestedStartDate)
    };
    const sendOwnerEmailVars = {
      ...sharedEmailVars,
      name: get_full_name_string_default(owner),
      emailAddress: email
    };
    const sendContactEmailVars = {
      ...sharedEmailVars,
      name: get_full_name_string_default(policyContact),
      emailAddress: policyContact.email
    };
    console.info("Sending application submitted email to application account owner: %s", sendOwnerEmailVars.emailAddress);
    const accountSubmittedResponse = await emails_default.application.submittedEmail(sendOwnerEmailVars);
    if (!accountSubmittedResponse.success) {
      throw new Error("Sending application submitted email to owner/account");
    }
    if (!policyContact.isSameAsOwner) {
      console.info("Sending application submitted email to policy contact email: %s", sendContactEmailVars.emailAddress);
      const contactSubmittedResponse = await emails_default.application.submittedEmail(sendContactEmailVars);
      if (!contactSubmittedResponse.success) {
        throw new Error("Sending application submitted email to contact");
      }
    }
    const templateIds = get_application_submitted_email_template_ids_default(application2);
    const underwritingTeamSubmittedResponse = await emails_default.application.underwritingTeam(sendOwnerEmailVars, xlsxPath, templateIds.underwritingTeam);
    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error("Sending application submitted email to underwriting team");
    }
    if (templateIds.account) {
      console.info("Sending documents email to application owner: %s", sendOwnerEmailVars.emailAddress);
      const documentsResponse = await emails_default.documentsEmail(sendOwnerEmailVars, templateIds.account);
      if (!documentsResponse.success) {
        throw new Error(`Sending application documents emails ${documentsResponse}`);
      }
      if (!policyContact.isSameAsOwner) {
        console.info("Sending documents email to policy contact: %s", sendContactEmailVars.emailAddress);
        const contactDocumentsResponse = await emails_default.documentsEmail(sendContactEmailVars, templateIds.account);
        if (!contactDocumentsResponse.success) {
          throw new Error(`Sending application documents emails to contact ${documentsResponse}`);
        }
      }
    }
    return {
      success: true
    };
  } catch (err) {
    console.error("Error sending application submitted emails %O", err);
    throw new Error(`Sending application submitted emails ${err}`);
  }
};
var applicationSubmittedEmails = {
  send: send2
};
var send_application_submitted_emails_default = applicationSubmittedEmails;

// generate-xlsx/index.ts
var import_exceljs = __toESM(require("exceljs"));

// helpers/replace-character-codes-with-characters/index.ts
var replaceCharacterCodesWithCharacters = (str) => str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#42;/g, "*").replace(/&amp;/g, "&");
var replace_character_codes_with_characters_default = replaceCharacterCodesWithCharacters;

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-row/index.ts
var { KEY, VALUE } = XLSX_CONFIG;
var xlsxRow = (fieldName, answer) => {
  const value = answer || answer === 0 ? answer : "";
  const cleanValue = replace_character_codes_with_characters_default(String(value));
  const row = {
    [KEY.ID]: fieldName,
    [VALUE.ID]: cleanValue
  };
  return row;
};
var xlsx_row_default = xlsxRow;

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-row-seperator/index.ts
var ROW_SEPERATOR = xlsx_row_default("", "");
var xlsx_row_seperator_default = ROW_SEPERATOR;

// helpers/format-currency/index.ts
var formatCurrency = (number, currencyCode, decimalPoints) => number.toLocaleString("en", {
  style: "currency",
  currency: currencyCode,
  minimumFractionDigits: decimalPoints ?? 0,
  maximumFractionDigits: decimalPoints ?? 0
});
var format_currency_default = formatCurrency;

// content-strings/fields/insurance/eligibility/index.ts
var {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  COVER_PERIOD: COVER_PERIOD_FIELD_ID,
  COMPANIES_HOUSE_NUMBER,
  TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID,
  HAS_END_BUYER
} = insurance_default.ELIGIBILITY;
var THRESHOLD = format_currency_default(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);
var FIELDS_ELIGIBILITY = {
  [BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: "Buyer location"
    }
  },
  [VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: "In UK, Channel Islands or Isle of Man"
    }
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    SUMMARY: {
      TITLE: "UK goods or services"
    },
    ANSWER: "At least 20%"
  },
  [HAS_END_BUYER]: {
    HINT: "Sometimes, exporters supply goods to a client in an overseas market who will then sell them on. The exporter will not get paid by the buyer until they have been paid by this third party. We call this third party an 'end buyer'.",
    SUMMARY: {
      TITLE: "Mock title"
    }
  },
  [COVER_PERIOD_FIELD_ID]: {
    OPTIONS: {
      BELOW: {
        ID: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.LESS_THAN_2_YEARS.VALUE
      },
      ABOVE: {
        ID: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.MORE_THAN_2_YEARS.VALUE
      }
    },
    SUMMARY: {
      TITLE: "Length of policy"
    }
  },
  [COMPANIES_HOUSE_NUMBER]: {
    SUMMARY: {
      TITLE: "UK Companies House registration number and actively trading"
    }
  },
  [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
    OPTIONS: {
      ABOVE: {
        ID: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        TEXT: `${THRESHOLD} and above`
      },
      BELOW: {
        ID: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        TEXT: `Less than ${THRESHOLD}`
      }
    },
    SUMMARY: {
      TITLE: "Total value to insure",
      ABOVE: `Above ${THRESHOLD}`,
      BELOW: `Below ${THRESHOLD}`
    }
  },
  [HAS_END_BUYER]: {
    HINT: "Sometimes, exporters supply goods to a client in an overseas market who will then sell them on. The exporter will not get paid by the buyer until they have been paid by this third party. We call this third party an 'end buyer'."
  }
};

// content-strings/fields/insurance/policy/index.ts
var { POLICY: POLICY3 } = FIELD_IDS.INSURANCE;
var { CONTRACT_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY3;
var POLICY_FIELDS = {
  [POLICY3.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
    SUMMARY: {
      TITLE: "Policy type"
    }
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      SUMMARY: {
        TITLE: "Policy start date"
      }
    },
    [CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Credit period"
      }
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      SUMMARY: {
        TITLE: "Policy currency"
      }
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        SUMMARY: {
          TITLE: "Date you expect contract to complete"
        }
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        SUMMARY: {
          TITLE: "Contract value"
        }
      }
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        SUMMARY: {
          TITLE: "How many months you want to be insured for"
        }
      },
      [CONTRACT_POLICY.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        SUMMARY: {
          TITLE: "Estimated sales during policy"
        }
      },
      [CONTRACT_POLICY.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        SUMMARY: {
          TITLE: "Maximum owed at any single point during policy"
        }
      }
    }
  },
  ABOUT_GOODS_OR_SERVICES: {
    [ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
      SUMMARY: {
        TITLE: "Goods or services you're exporting"
      }
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
      SUMMARY: {
        TITLE: "Final destination of export"
      }
    }
  }
};

// content-strings/fields/insurance/your-business/index.ts
var {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS, FINANCIAL_YEAR_END_DATE },
  EXPORTER_BUSINESS: EXPORTER_BUSINESS2
} = insurance_default;
var {
  YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, WEBSITE },
  ALTERNATIVE_TRADING_ADDRESS,
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER: USING_BROKER2, NAME, ADDRESS_LINE_1, EMAIL: EMAIL4 }
} = EXPORTER_BUSINESS2;
var FIELDS = {
  COMPANY_DETAILS: {
    [COMPANY_NUMBER]: {
      SUMMARY: {
        TITLE: "Companies House registration number"
      }
    },
    [COMPANY_NAME]: {
      SUMMARY: {
        TITLE: "Company name"
      }
    },
    [COMPANY_ADDRESS]: {
      SUMMARY: {
        TITLE: "Registered office address"
      }
    },
    [COMPANY_INCORPORATED]: {
      SUMMARY: {
        TITLE: "Date incorporated"
      }
    },
    [COMPANY_SIC]: {
      SUMMARY: {
        TITLE: "Standard industry classification (SIC) codes and nature of business"
      }
    },
    [FINANCIAL_YEAR_END_DATE]: {
      SUMMARY: {
        TITLE: "Financial year end date"
      }
    },
    [HAS_DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        TITLE: "Different trading name?"
      }
    },
    [TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: "Different trading address?"
      }
    },
    [WEBSITE]: {
      SUMMARY: {
        TITLE: "Company website (optional)"
      }
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: "UK telephone number (optional)"
      }
    }
  },
  [ALTERNATIVE_TRADING_ADDRESS]: {
    LABEL: "What's your alternative trading address?"
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      SUMMARY: {
        TITLE: "Goods or services your business supplies"
      }
    },
    [YEARS_EXPORTING]: {
      SUMMARY: {
        TITLE: "Years exporting"
      }
    },
    [EMPLOYEES_UK]: {
      SUMMARY: {
        TITLE: "UK employees"
      }
    }
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER]: {
      SUMMARY: {
        TITLE: "Estimated turnover this current financial year"
      }
    },
    [PERCENTAGE_TURNOVER]: {
      SUMMARY: {
        TITLE: "Percentage of turnover from exports"
      }
    }
  },
  BROKER: {
    [USING_BROKER2]: {
      SUMMARY: {
        TITLE: "Using a broker for this insurance?"
      }
    },
    [NAME]: {
      SUMMARY: {
        TITLE: "Broker's name or company"
      }
    },
    [ADDRESS_LINE_1]: {
      SUMMARY: {
        TITLE: "Broker's address"
      }
    },
    [EMAIL4]: {
      SUMMARY: {
        TITLE: "Broker's email"
      }
    }
  }
};

// content-strings/fields/insurance/your-buyer/index.ts
var {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER }
} = insurance_default;
var YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      SUMMARY: {
        TITLE: "Company or organisation name"
      }
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      SUMMARY: {
        TITLE: "Buyer address"
      }
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: "Country"
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      SUMMARY: {
        TITLE: "Registration number (optional)"
      }
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      SUMMARY: {
        TITLE: "Buyer website (optional)"
      }
    },
    [COMPANY_OR_ORGANISATION.FIRST_NAME]: {
      SUMMARY: {
        TITLE: "Contact details"
      }
    },
    [COMPANY_OR_ORGANISATION.LAST_NAME]: {
      LABEL: "Last name"
    },
    [COMPANY_OR_ORGANISATION.POSITION]: {
      LABEL: "Position"
    },
    [COMPANY_OR_ORGANISATION.EMAIL]: {
      LABEL: "Email address"
    },
    [COMPANY_OR_ORGANISATION.CAN_CONTACT_BUYER]: {
      SUMMARY: {
        TITLE: "Can we contact the buyer?"
      }
    }
  },
  WORKING_WITH_BUYER: {
    [WORKING_WITH_BUYER.CONNECTED_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Connected with the buyer in any way?"
      }
    },
    [WORKING_WITH_BUYER.TRADED_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Have you traded with this buyer before?"
      }
    }
  }
};

// content-strings/fields/insurance/index.ts
var REFERENCE_NUMBER = {
  SUMMARY: {
    TITLE: "Application reference number"
  }
};
var DATE_SUBMITTED = {
  SUMMARY: {
    TITLE: "Date submitted"
  }
};
var TIME_SUBMITTED = {
  SUMMARY: {
    TITLE: "Time submitted"
  }
};

// content-strings/default.ts
var DEFAULT = {
  EMPTY: "-"
};

// content-strings/XLSX.ts
var { FIRST_NAME, LAST_NAME } = account_default;
var {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE }
  }
} = policy_default;
var {
  COMPANIES_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_SIC: EXPORTER_COMPANY_SIC },
  YOUR_COMPANY: { WEBSITE: WEBSITE2, PHONE_NUMBER: PHONE_NUMBER2 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES2, YEARS_EXPORTING: YEARS_EXPORTING2, EMPLOYEES_UK: EMPLOYEES_UK2 },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER2 },
  BROKER: { USING_BROKER: USING_BROKER3, NAME: BROKER_NAME, ADDRESS_LINE_1: BROKER_ADDRESS, EMAIL: BROKER_EMAIL }
} = business_default;
var {
  COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS }
} = your_buyer_default;
var XLSX = {
  SECTION_TITLES: {
    KEY_INFORMATION: "Key information",
    EXPORTER_CONTACT_DETAILS: "Exporter contact details",
    POLICY: "Type of policy and exports",
    EXPORTER_BUSINESS: "About your business",
    BUYER: "Your buyer",
    ELIGIBILITY: "Eligibility"
  },
  FIELDS: {
    [FIRST_NAME]: "Applicant first name",
    [LAST_NAME]: "Applicant last name",
    APPLICANT_EMAIL_ADDRESS: "Applicant email address",
    EXPORTER_CONTACT: {
      [FIRST_NAME]: "Exporter first name",
      [LAST_NAME]: "Exporter last name",
      EXPORTER_CONTACT_EMAIL: "Exporter email address"
    },
    [CONTRACT_COMPLETION_DATE]: "Date expected for contract to complete",
    [EXPORTER_COMPANY_NAME]: "Exporter company name",
    [EXPORTER_COMPANY_ADDRESS]: "Exporter registered office address",
    [EXPORTER_COMPANY_SIC]: "Exporter standard industry classification (SIC) codes and nature of business",
    [WEBSITE2]: "Exporter Company website (optional)",
    [PHONE_NUMBER2]: "Exporter telephone number (optional)",
    [GOODS_OR_SERVICES2]: "Goods or services the business supplies",
    [YEARS_EXPORTING2]: "Exporter years exporting",
    [EMPLOYEES_UK2]: "Exporter UK Employees",
    [ESTIMATED_ANNUAL_TURNOVER2]: "Exporter estimated turnover this current financial year",
    [USING_BROKER3]: "Using a broker for this insurance",
    [BROKER_NAME]: "Name of broker or company",
    [BROKER_ADDRESS]: "Broker address",
    [BROKER_EMAIL]: "Broker email address",
    [COUNTRY]: "Buyer location",
    [BUYER_COMPANY_NAME]: "Buyer company name",
    [BUYER_REGISTRATION_NUMBER]: "Buyer registration number (optional)",
    [BUYER_CONTACT_DETAILS]: "Buyer contact details"
  }
};

// generate-xlsx/map-application-to-XLSX/helpers/format-time-of-day/index.ts
var formatTimeOfDay = (date) => format_date_default(date, DATE_FORMAT.HOURS_AND_MINUTES);
var format_time_of_day_default = formatTimeOfDay;

// generate-xlsx/map-application-to-XLSX/map-key-information/index.ts
var { FIELDS: FIELDS2 } = XLSX;
var { FIRST_NAME: FIRST_NAME2, LAST_NAME: LAST_NAME2, EMAIL: EMAIL5 } = account_default;
var mapKeyInformation = (application2) => {
  const mapped = [
    xlsx_row_default(REFERENCE_NUMBER.SUMMARY.TITLE, application2.referenceNumber),
    xlsx_row_default(DATE_SUBMITTED.SUMMARY.TITLE, format_date_default(application2.submissionDate, "dd-MM-yyyy")),
    xlsx_row_default(TIME_SUBMITTED.SUMMARY.TITLE, format_time_of_day_default(application2.submissionDate)),
    xlsx_row_default(FIELDS2[FIRST_NAME2], application2.owner[FIRST_NAME2]),
    xlsx_row_default(FIELDS2[LAST_NAME2], application2.owner[LAST_NAME2]),
    xlsx_row_default(FIELDS2.APPLICANT_EMAIL_ADDRESS, application2.owner[EMAIL5])
  ];
  return mapped;
};
var map_key_information_default = mapKeyInformation;

// generate-xlsx/map-application-to-XLSX/map-exporter-contact-details/index.ts
var { FIRST_NAME: FIRST_NAME3, LAST_NAME: LAST_NAME3, EMAIL: EMAIL6 } = account_default;
var {
  SECTION_TITLES: { EXPORTER_CONTACT_DETAILS },
  FIELDS: FIELDS3
} = XLSX;
var mapExporterContactDetails = (application2) => {
  const { policyContact } = application2;
  const mapped = [
    xlsx_row_default(EXPORTER_CONTACT_DETAILS),
    xlsx_row_default(FIELDS3.EXPORTER_CONTACT[FIRST_NAME3], policyContact[FIRST_NAME3]),
    xlsx_row_default(FIELDS3.EXPORTER_CONTACT[LAST_NAME3], policyContact[LAST_NAME3]),
    xlsx_row_default(FIELDS3.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL6])
  ];
  return mapped;
};
var map_exporter_contact_details_default = mapExporterContactDetails;

// generate-xlsx/map-application-to-XLSX/map-secondary-key-information/index.ts
var {
  SECTION_TITLES: { KEY_INFORMATION },
  FIELDS: FIELDS4
} = XLSX;
var CONTENT_STRINGS = {
  ...POLICY_FIELDS
};
var {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME2 }
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY: COUNTRY2, NAME: BUYER_COMPANY_NAME2 }
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE3 }
  }
} = insurance_default;
var mapSecondaryKeyInformation = (application2) => {
  const { policy } = application2;
  const mapped = [
    xlsx_row_default(KEY_INFORMATION),
    xlsx_row_default(FIELDS4[EXPORTER_COMPANY_NAME2], application2.company[EXPORTER_COMPANY_NAME2]),
    xlsx_row_default(FIELDS4[COUNTRY2], application2.buyer[COUNTRY2].name),
    xlsx_row_default(FIELDS4[BUYER_COMPANY_NAME2], application2.buyer[BUYER_COMPANY_NAME2]),
    xlsx_row_default(String(CONTENT_STRINGS[POLICY_TYPE3].SUMMARY?.TITLE), policy[POLICY_TYPE3])
  ];
  return mapped;
};
var map_secondary_key_information_default = mapSecondaryKeyInformation;

// generate-xlsx/map-application-to-XLSX/helpers/format-currency/index.ts
var formatCurrency2 = (number, currencyCode, decimalPoints) => number.toLocaleString("en", {
  style: "currency",
  currency: currencyCode,
  minimumFractionDigits: decimalPoints ?? 0,
  maximumFractionDigits: decimalPoints ?? 0
});
var format_currency_default2 = formatCurrency2;

// generate-xlsx/map-application-to-XLSX/helpers/map-month-string/index.ts
var mapMonthString = (answer) => answer === 1 ? `${answer} month` : `${answer} months`;
var map_month_string_default = mapMonthString;

// generate-xlsx/map-application-to-XLSX/map-policy/index.ts
var CONTENT_STRINGS2 = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.ABOUT_GOODS_OR_SERVICES,
  SINGLE: POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
  MULTIPLE: POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE
};
var {
  TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE4 },
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE: CONTRACT_COMPLETION_DATE2, TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE2 },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    CREDIT_PERIOD_WITH_BUYER,
    POLICY_CURRENCY_CODE
  },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION, FINAL_DESTINATION_COUNTRY }
} = insurance_default.POLICY;
var mapPolicyIntro = (application2) => {
  const { policy } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.POLICY, ""),
    xlsx_row_default(String(CONTENT_STRINGS2[POLICY_TYPE4].SUMMARY?.TITLE), policy[POLICY_TYPE4]),
    xlsx_row_default(String(CONTENT_STRINGS2[REQUESTED_START_DATE].SUMMARY?.TITLE), format_date_default(policy[REQUESTED_START_DATE], "dd-MMM-yy"))
  ];
  return mapped;
};
var mapSinglePolicyFields = (application2) => {
  const { policy } = application2;
  return [
    xlsx_row_default(String(CONTENT_STRINGS2.SINGLE[CONTRACT_COMPLETION_DATE2].SUMMARY?.TITLE), format_date_default(policy[CONTRACT_COMPLETION_DATE2], "dd-MMM-yy")),
    xlsx_row_default(String(CONTENT_STRINGS2.SINGLE[TOTAL_CONTRACT_VALUE2].SUMMARY?.TITLE), format_currency_default2(policy[TOTAL_CONTRACT_VALUE2], GBP_CURRENCY_CODE))
  ];
};
var mapMultiplePolicyFields = (application2) => {
  const { policy } = application2;
  return [
    xlsx_row_default(String(CONTENT_STRINGS2.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), map_month_string_default(policy[TOTAL_MONTHS_OF_COVER])),
    xlsx_row_default(String(CONTENT_STRINGS2.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), format_currency_default2(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
    xlsx_row_default(String(CONTENT_STRINGS2.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), format_currency_default2(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE))
  ];
};
var mapPolicyOutro = (application2) => {
  const { exportContract, policy } = application2;
  const mapped = [
    xlsx_row_default(String(CONTENT_STRINGS2[CREDIT_PERIOD_WITH_BUYER].SUMMARY?.TITLE), policy[CREDIT_PERIOD_WITH_BUYER]),
    xlsx_row_default(String(CONTENT_STRINGS2[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
    xlsx_row_default(String(CONTENT_STRINGS2[DESCRIPTION].SUMMARY?.TITLE), exportContract[DESCRIPTION]),
    xlsx_row_default(String(CONTENT_STRINGS2[FINAL_DESTINATION].SUMMARY?.TITLE), exportContract[FINAL_DESTINATION_COUNTRY].name)
  ];
  return mapped;
};
var mapPolicy = (application2) => {
  let mapped = mapPolicyIntro(application2);
  const policyType = application2.policy[POLICY_TYPE4];
  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSinglePolicyFields(application2)];
  }
  if (isMultiplePolicyType(policyType)) {
    mapped = [...mapped, ...mapMultiplePolicyFields(application2)];
  }
  mapped = [...mapped, ...mapPolicyOutro(application2)];
  return mapped;
};
var map_policy_default = mapPolicy;

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-new-line/index.ts
var NEW_LINE = "\r\n";
var xlsx_new_line_default = NEW_LINE;

// generate-xlsx/map-application-to-XLSX/map-exporter/map-address/index.ts
var mapExporterAddress = (address) => {
  let addressString = "";
  Object.keys(address).forEach((field) => {
    if (address[field] && field !== "id" && field !== "__typename") {
      addressString += `${address[field]}${xlsx_new_line_default}`;
    }
  });
  return addressString;
};
var map_address_default = mapExporterAddress;

// generate-xlsx/map-application-to-XLSX/helpers/map-yes-no-field/index.ts
var mapYesNoField = (answer) => {
  if (answer === false) {
    return "No";
  }
  if (answer === true) {
    return "Yes";
  }
  return DEFAULT.EMPTY;
};
var map_yes_no_field_default = mapYesNoField;

// generate-xlsx/map-application-to-XLSX/map-exporter/index.ts
var CONTENT_STRINGS3 = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER
};
var {
  COMPANIES_HOUSE: { COMPANY_NUMBER: COMPANY_NUMBER2, COMPANY_NAME: COMPANY_NAME2, COMPANY_ADDRESS: COMPANY_ADDRESS2, COMPANY_INCORPORATED: COMPANY_INCORPORATED2, COMPANY_SIC: COMPANY_SIC2, FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE2 },
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME: HAS_DIFFERENT_TRADING_NAME2, TRADING_ADDRESS: TRADING_ADDRESS2, WEBSITE: WEBSITE3, PHONE_NUMBER: PHONE_NUMBER3 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES3, YEARS_EXPORTING: YEARS_EXPORTING3, EMPLOYEES_UK: EMPLOYEES_UK3 },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER3, PERCENTAGE_TURNOVER: PERCENTAGE_TURNOVER2 },
  BROKER: { USING_BROKER: USING_BROKER4, NAME: BROKER_NAME2, ADDRESS_LINE_1: ADDRESS_LINE_12, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL: EMAIL7 }
} = business_default;
var mapSicCodes2 = (sicCodes) => {
  let mapped = "";
  sicCodes.forEach((sicCodeObj) => {
    const { sicCode, industrySectorName } = sicCodeObj;
    mapped += `${sicCode} - ${industrySectorName}${xlsx_new_line_default}`;
  });
  return mapped;
};
var mapBroker = (application2) => {
  const { broker } = application2;
  let mapped = [xlsx_row_default(XLSX.FIELDS[USING_BROKER4], map_yes_no_field_default(broker[USING_BROKER4]))];
  if (broker[USING_BROKER4]) {
    const addressAnswer = {
      lineOneAndTwo: `${broker[ADDRESS_LINE_12]} ${xlsx_new_line_default}${broker[ADDRESS_LINE_2]}`,
      other: `${xlsx_new_line_default}${broker[TOWN]} ${xlsx_new_line_default}${broker[COUNTY]} ${xlsx_new_line_default}${broker[POSTCODE]}`
    };
    mapped = [
      ...mapped,
      xlsx_row_default(XLSX.FIELDS[BROKER_NAME2], broker[BROKER_NAME2]),
      xlsx_row_default(XLSX.FIELDS[ADDRESS_LINE_12], `${addressAnswer.lineOneAndTwo}${addressAnswer.other}`),
      xlsx_row_default(XLSX.FIELDS[EMAIL7], broker[EMAIL7])
    ];
  }
  return mapped;
};
var mapExporter = (application2) => {
  const { company, companySicCodes, business } = application2;
  let financialYearEndDate = "No data from Companies House";
  if (company[FINANCIAL_YEAR_END_DATE2]) {
    financialYearEndDate = format_date_default(company[FINANCIAL_YEAR_END_DATE2], "d MMMM");
  }
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.EXPORTER_BUSINESS, ""),
    // company fields
    xlsx_row_default(CONTENT_STRINGS3[COMPANY_NUMBER2].SUMMARY?.TITLE, company[COMPANY_NUMBER2]),
    xlsx_row_default(XLSX.FIELDS[COMPANY_NAME2], company[COMPANY_NAME2]),
    xlsx_row_default(CONTENT_STRINGS3[COMPANY_INCORPORATED2].SUMMARY?.TITLE, format_date_default(company[COMPANY_INCORPORATED2], "dd-MMM-yy")),
    xlsx_row_default(XLSX.FIELDS[COMPANY_ADDRESS2], map_address_default(company[COMPANY_ADDRESS2])),
    xlsx_row_default(CONTENT_STRINGS3[HAS_DIFFERENT_TRADING_NAME2].SUMMARY?.TITLE, map_yes_no_field_default(company[HAS_DIFFERENT_TRADING_NAME2])),
    xlsx_row_default(CONTENT_STRINGS3[TRADING_ADDRESS2].SUMMARY?.TITLE, map_yes_no_field_default(company[TRADING_ADDRESS2])),
    xlsx_row_default(XLSX.FIELDS[COMPANY_SIC2], mapSicCodes2(companySicCodes)),
    xlsx_row_default(CONTENT_STRINGS3[FINANCIAL_YEAR_END_DATE2].SUMMARY?.TITLE, financialYearEndDate),
    xlsx_row_default(XLSX.FIELDS[WEBSITE3], company[WEBSITE3]),
    xlsx_row_default(XLSX.FIELDS[PHONE_NUMBER3], company[PHONE_NUMBER3]),
    // business fields
    xlsx_row_default(XLSX.FIELDS[GOODS_OR_SERVICES3], business[GOODS_OR_SERVICES3]),
    xlsx_row_default(XLSX.FIELDS[YEARS_EXPORTING3], business[YEARS_EXPORTING3]),
    xlsx_row_default(XLSX.FIELDS[EMPLOYEES_UK3], business[EMPLOYEES_UK3]),
    xlsx_row_default(XLSX.FIELDS[ESTIMATED_ANNUAL_TURNOVER3], format_currency_default2(business[ESTIMATED_ANNUAL_TURNOVER3], GBP_CURRENCY_CODE)),
    xlsx_row_default(CONTENT_STRINGS3[PERCENTAGE_TURNOVER2].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER2]}%`),
    // broker fields
    ...mapBroker(application2)
  ];
  return mapped;
};
var map_exporter_default = mapExporter;

// generate-xlsx/map-application-to-XLSX/map-buyer/index.ts
var CONTENT_STRINGS4 = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS.WORKING_WITH_BUYER
};
var {
  COMPANY_OR_ORGANISATION: { NAME: NAME2, ADDRESS, COUNTRY: COUNTRY3, REGISTRATION_NUMBER, WEBSITE: WEBSITE4, FIRST_NAME: FIRST_NAME4, LAST_NAME: LAST_NAME4, POSITION, EMAIL: EMAIL8, CAN_CONTACT_BUYER },
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER }
} = your_buyer_default;
var mapBuyer = (application2) => {
  const { buyer } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.BUYER, ""),
    xlsx_row_default(XLSX.FIELDS[NAME2], buyer[NAME2]),
    xlsx_row_default(String(CONTENT_STRINGS4[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${xlsx_new_line_default}${buyer[COUNTRY3].name}`),
    xlsx_row_default(XLSX.FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
    xlsx_row_default(String(CONTENT_STRINGS4[WEBSITE4].SUMMARY?.TITLE), buyer[WEBSITE4]),
    xlsx_row_default(XLSX.FIELDS[FIRST_NAME4], `${buyer[FIRST_NAME4]} ${buyer[LAST_NAME4]} ${xlsx_new_line_default}${buyer[POSITION]} ${xlsx_new_line_default}${buyer[EMAIL8]}`),
    xlsx_row_default(String(CONTENT_STRINGS4[CAN_CONTACT_BUYER].SUMMARY?.TITLE), map_yes_no_field_default(buyer[CAN_CONTACT_BUYER])),
    xlsx_row_default(String(CONTENT_STRINGS4[CONNECTED_WITH_BUYER].SUMMARY?.TITLE), map_yes_no_field_default(buyer[CONNECTED_WITH_BUYER])),
    xlsx_row_default(String(CONTENT_STRINGS4[TRADED_WITH_BUYER].SUMMARY?.TITLE), map_yes_no_field_default(buyer[TRADED_WITH_BUYER]))
  ];
  return mapped;
};
var map_buyer_default = mapBuyer;

// generate-xlsx/map-application-to-XLSX/helpers/map-total-contract-field/index.ts
var FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;
var { LESS_THAN_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;
var { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].SUMMARY;
var mapTotalContractField = (answer) => {
  if (answer === MORE_THAN_250K.DB_ID) {
    return ABOVE;
  }
  if (answer === LESS_THAN_250K.DB_ID) {
    return BELOW;
  }
  return DEFAULT.EMPTY;
};
var map_total_contract_field_default = mapTotalContractField;

// generate-xlsx/map-application-to-XLSX/helpers/map-cover-period-field/index.ts
var FIELD_ID2 = FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD;
var { LESS_THAN_2_YEARS, MORE_THAN_2_YEARS } = COVER_PERIOD;
var { ABOVE: ABOVE2, BELOW: BELOW2 } = FIELDS_ELIGIBILITY[FIELD_ID2].OPTIONS;
var mapCoverPeriodField = (answer) => {
  if (answer === MORE_THAN_2_YEARS.DB_ID) {
    return ABOVE2.TEXT;
  }
  if (answer === LESS_THAN_2_YEARS.DB_ID) {
    return BELOW2.TEXT;
  }
  return DEFAULT.EMPTY;
};
var map_cover_period_field_default = mapCoverPeriodField;

// generate-xlsx/map-application-to-XLSX/map-eligibility/index.ts
var {
  ELIGIBILITY: {
    BUYER_COUNTRY: BUYER_COUNTRY2,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES: HAS_MINIMUM_UK_GOODS_OR_SERVICES2,
    VALID_EXPORTER_LOCATION: VALID_EXPORTER_LOCATION2,
    COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE3,
    COVER_PERIOD: COVER_PERIOD2,
    COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER2
  }
} = FIELD_IDS.INSURANCE;
var mapEligibility = (application2) => {
  const { eligibility } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.ELIGIBILITY, ""),
    xlsx_row_default(FIELDS_ELIGIBILITY[BUYER_COUNTRY2].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY2].name),
    xlsx_row_default(FIELDS_ELIGIBILITY[VALID_EXPORTER_LOCATION2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[VALID_EXPORTER_LOCATION2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[TOTAL_CONTRACT_VALUE3].SUMMARY?.TITLE, map_total_contract_field_default(eligibility[TOTAL_CONTRACT_VALUE3].valueId)),
    xlsx_row_default(FIELDS_ELIGIBILITY[COVER_PERIOD2].SUMMARY?.TITLE, map_cover_period_field_default(eligibility[COVER_PERIOD_ELIGIBILITY].valueId)),
    xlsx_row_default(FIELDS_ELIGIBILITY[COMPANIES_HOUSE_NUMBER2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[COMPANIES_HOUSE_NUMBER2]))
  ];
  return mapped;
};
var map_eligibility_default = mapEligibility;

// generate-xlsx/map-application-to-XLSX/index.ts
var mapApplicationToXLSX = (application2) => {
  try {
    const mapped = [
      ...map_key_information_default(application2),
      xlsx_row_seperator_default,
      ...map_exporter_contact_details_default(application2),
      xlsx_row_seperator_default,
      ...map_secondary_key_information_default(application2),
      xlsx_row_seperator_default,
      ...map_policy_default(application2),
      xlsx_row_seperator_default,
      ...map_exporter_default(application2),
      xlsx_row_seperator_default,
      ...map_buyer_default(application2),
      xlsx_row_seperator_default,
      ...map_eligibility_default(application2)
    ];
    return mapped;
  } catch (err) {
    console.error("Error mapping application to XLSX %O", err);
    throw new Error(`Mapping application to XLSX ${err}`);
  }
};
var map_application_to_XLSX_default = mapApplicationToXLSX;

// generate-xlsx/header-columns/index.ts
var { KEY: KEY2, VALUE: VALUE2, COLUMN_WIDTH } = XLSX_CONFIG;
var XLSX_HEADER_COLUMNS = [
  { key: KEY2.ID, header: KEY2.COPY, width: COLUMN_WIDTH },
  { key: VALUE2.ID, header: VALUE2.COPY, width: COLUMN_WIDTH }
];
var header_columns_default = XLSX_HEADER_COLUMNS;

// generate-xlsx/styled-columns/index.ts
var { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;
var worksheetRowHeights = (titleRowIndexes, rowIndexes, worksheet) => {
  const modifiedWorksheet = worksheet;
  titleRowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  });
  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });
  return modifiedWorksheet;
};
var styledColumns = (application2, worksheet) => {
  let modifiedWorksheet = worksheet;
  const INDEXES = XLSX_ROW_INDEXES(application2);
  const { TITLES, ...ROWS } = INDEXES;
  const TITLE_INDEXES = Object.values(TITLES);
  const ROW_INDEXES = Object.values(ROWS);
  modifiedWorksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;
      modifiedRow.getCell(colNumber).alignment = {
        vertical: "top",
        wrapText: true
      };
      const isTitleRow = TITLE_INDEXES.includes(rowNumber);
      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isTitleRow),
        size: isTitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT
      };
    });
  });
  modifiedWorksheet = worksheetRowHeights(TITLE_INDEXES, ROW_INDEXES, modifiedWorksheet);
  return modifiedWorksheet;
};
var styled_columns_default = styledColumns;

// generate-xlsx/index.ts
var XLSX2 = (application2) => {
  try {
    console.info("Generating XLSX file for application %s", application2.id);
    const { referenceNumber } = application2;
    const refNumber = String(referenceNumber);
    return new Promise((resolve) => {
      const filePath = `XLSX/${refNumber}.xlsx`;
      const xlsxData = map_application_to_XLSX_default(application2);
      console.info("Generating XLSX file - creating a new workbook");
      const workbook = new import_exceljs.default.Workbook();
      console.info("Generating XLSX file - adding worksheet to workbook");
      let worksheet = workbook.addWorksheet(refNumber);
      worksheet.columns = header_columns_default;
      console.info("Generating XLSX file - adding rows to worksheet");
      xlsxData.forEach((row) => {
        worksheet.addRow(row);
      });
      console.info("Generating XLSX file - adding custom styles to worksheet");
      worksheet = styled_columns_default(application2, worksheet);
      console.info("Generating XLSX file - writing file");
      workbook.xlsx.writeFile(filePath).then(() => resolve(filePath));
    });
  } catch (err) {
    console.error("Error generating XLSX file %O", err);
    throw new Error(`Generating XLSX file ${err}`);
  }
};
var generate2 = {
  XLSX: XLSX2
};
var generate_xlsx_default = generate2;

// custom-resolvers/mutations/submit-application/index.ts
var submitApplication = async (root, variables, context) => {
  try {
    console.info("Submitting application %s", variables.applicationId);
    const application2 = await context.db.Application.findOne({
      where: { id: variables.applicationId }
    });
    if (application2) {
      const { status, submissionDeadline, submissionCount } = application2;
      const isInProgress = status === APPLICATION.STATUS.IN_PROGRESS;
      const now = /* @__PURE__ */ new Date();
      const validSubmissionDate = (0, import_date_fns8.isAfter)(new Date(submissionDeadline), now);
      const isFirstSubmission = submissionCount === 0;
      const canSubmit = isInProgress && validSubmissionDate && isFirstSubmission;
      if (canSubmit) {
        const update2 = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.IN_PROGRESS,
          submissionDate: now,
          submissionCount: submissionCount + 1
        };
        const updatedApplication = await context.db.Application.updateOne({
          where: { id: application2.id },
          data: update2
        });
        const populatedApplication = await get_populated_application_default(context, updatedApplication);
        const xlsxPath = await generate_xlsx_default.XLSX(populatedApplication);
        await send_application_submitted_emails_default.send(populatedApplication, xlsxPath);
        return {
          success: true
        };
      }
      console.error("Unable to submit application - application already submitted");
    }
    console.error("Unable to submit application - no application found");
    return {
      success: false
    };
  } catch (err) {
    console.error("Error submitting application %O", err);
    throw new Error(`Submitting application ${err}`);
  }
};
var submit_application_default = submitApplication;

// custom-resolvers/mutations/create-feedback/index.ts
var createFeedback = async (root, variables, context) => {
  console.info("Creating feedback");
  try {
    const feedback = {
      ...variables,
      createdAt: /* @__PURE__ */ new Date()
    };
    const response = await context.db.Feedback.createOne({
      data: feedback
    });
    const emailResponse = await emails_default.insuranceFeedbackEmail(feedback);
    if (response && emailResponse?.success) {
      return {
        ...response,
        success: true
      };
    }
    return { success: false };
  } catch (err) {
    console.error("Error creating feedback %O", err);
    throw new Error(`Creating feedback: ${err}`);
  }
};
var create_feedback_default = createFeedback;

// custom-resolvers/mutations/verify-account-reactivation-token/index.ts
var import_date_fns9 = require("date-fns");
var {
  INSURANCE: {
    ACCOUNT: { REACTIVATION_HASH, REACTIVATION_EXPIRY }
  }
} = FIELD_IDS;
var verifyAccountReactivationToken = async (root, variables, context) => {
  try {
    console.info("Received a request to reactivate account - checking account");
    const account2 = await get_account_by_field_default(context, REACTIVATION_HASH, variables.token);
    if (account2) {
      console.info("Received a request to reactivate account - found account %s", account2.id);
      const now = /* @__PURE__ */ new Date();
      const canReactivateAccount = (0, import_date_fns9.isBefore)(now, account2[REACTIVATION_EXPIRY]);
      if (!canReactivateAccount) {
        console.info("Unable to reactivate account - reactivation period has expired");
        return {
          expired: true,
          success: false,
          accountId: account2.id
        };
      }
      console.info("Reactivating account %s", account2.id);
      const accountUpdate = {
        isBlocked: false,
        isVerified: true,
        reactivationHash: "",
        reactivationExpiry: null
      };
      await update_account_default.account(context, account2.id, accountUpdate);
      await delete_authentication_retries_default(context, account2.id);
      return {
        success: true
      };
    }
    console.info("Unable to reactivate account - no account found from the provided %s", REACTIVATION_HASH);
    return {
      success: false,
      invalid: true
    };
  } catch (err) {
    console.error("Error checking account and reactivating account(verifyAccountReactivationToken mutation) %O", err);
    throw new Error(`Checking account and reactivating account(verifyAccountReactivationToken mutation) ${err}`);
  }
};
var verify_account_reactivation_token_default = verifyAccountReactivationToken;

// custom-resolvers/queries/get-account-password-reset-token/index.ts
var getAccountPasswordResetToken = async (root, variables, context) => {
  console.info("Getting account password reset token");
  try {
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info("Unable to get account password reset token - account does not exist");
      return { success: false };
    }
    if (account2.passwordResetHash) {
      return {
        success: true,
        token: account2.passwordResetHash
      };
    }
    console.info("Unable to get account password reset token - reset hash does not exist");
    return { success: false };
  } catch (err) {
    console.error("Error getting account password reset token %O", err);
    throw new Error(`Getting account password reset token ${err}`);
  }
};
var get_account_password_reset_token_default = getAccountPasswordResetToken;

// integrations/APIM/index.ts
var import_axios = __toESM(require("axios"));
var import_dotenv5 = __toESM(require("dotenv"));
import_dotenv5.default.config();
var { APIM_MDM_URL, APIM_MDM_KEY, APIM_MDM_VALUE } = process.env;
var { APIM_MDM } = EXTERNAL_API_ENDPOINTS;
var url = `${APIM_MDM_URL}${APIM_MDM.MARKETS}`;
var APIM = {
  getCisCountries: async () => {
    try {
      console.info("Calling APIM - CIS countries");
      const response = await (0, import_axios.default)({
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE
        },
        validateStatus(status) {
          const acceptableStatus = [200];
          return acceptableStatus.includes(status);
        }
      });
      if (response.data && response.status === 200) {
        return {
          success: true,
          data: response.data
        };
      }
      return {
        success: false
      };
    } catch (err) {
      console.error("Error calling APIM - CIS countries %O", err);
      throw new Error(`Calling APIM - CIS countries ${err}`);
    }
  }
};
var APIM_default = APIM;

// helpers/map-CIS-countries/map-CIS-country/map-risk-category/index.ts
var { CIS } = EXTERNAL_API_DEFINITIONS;
var mapRiskCategory = (str) => {
  if (str === CIS.RISK.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;
  }
  if (str === CIS.RISK.HIGH) {
    return str;
  }
  if (str === CIS.RISK.VERY_HIGH) {
    return str;
  }
  return null;
};
var map_risk_category_default = mapRiskCategory;

// helpers/map-CIS-countries/map-CIS-country/map-short-term-cover-available/index.ts
var {
  CIS: { SHORT_TERM_COVER_AVAILABLE }
} = EXTERNAL_API_DEFINITIONS;
var mapShortTermCoverAvailable = (str) => {
  switch (str) {
    case SHORT_TERM_COVER_AVAILABLE.YES:
      return true;
    case SHORT_TERM_COVER_AVAILABLE.ILC:
      return true;
    case SHORT_TERM_COVER_AVAILABLE.CILC:
      return true;
    case SHORT_TERM_COVER_AVAILABLE.REFER:
      return true;
    default:
      return false;
  }
};
var map_short_term_cover_available_default = mapShortTermCoverAvailable;

// helpers/map-CIS-countries/map-CIS-country/map-NBI-issue-available/index.ts
var { CIS: CIS2 } = EXTERNAL_API_DEFINITIONS;
var mapNbiIssueAvailable = (str) => {
  if (str === CIS2.NBI_ISSUE_AVAILABLE.YES) {
    return true;
  }
  return false;
};
var map_NBI_issue_available_default = mapNbiIssueAvailable;

// helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online/index.ts
var canGetAQuoteOnline = (country) => {
  if (country.riskCategory && country.shortTermCover && country.nbiIssueAvailable) {
    return true;
  }
  return false;
};
var can_get_a_quote_online_default = canGetAQuoteOnline;

// helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-by-email/index.ts
var canGetAQuoteByEmail = (country) => {
  if (country.riskCategory && country.shortTermCover && !country.nbiIssueAvailable) {
    return true;
  }
  return false;
};
var can_get_a_quote_by_email_default = canGetAQuoteByEmail;

// helpers/map-CIS-countries/map-CIS-country/cannot-get-a-quote/index.ts
var cannotGetAQuote = (country) => {
  if (!country.riskCategory || !country.shortTermCover && !country.nbiIssueAvailable) {
    return true;
  }
  return false;
};
var cannot_get_a_quote_default = cannotGetAQuote;

// helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online/index.ts
var { CIS: CIS3 } = EXTERNAL_API_DEFINITIONS;
var canApplyForInsuranceOnline = (originalShortTermCover) => {
  if (originalShortTermCover === CIS3.SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }
  return false;
};
var can_apply_for_insurance_online_default = canApplyForInsuranceOnline;

// helpers/map-CIS-countries/map-CIS-country/can-apply-offline/index.ts
var { CIS: CIS4 } = EXTERNAL_API_DEFINITIONS;
var canApplyOffline = (originalShortTermCover) => {
  if (originalShortTermCover === CIS4.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }
  if (originalShortTermCover === CIS4.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }
  if (originalShortTermCover === CIS4.SHORT_TERM_COVER_AVAILABLE.REFER) {
    return true;
  }
  return false;
};
var can_apply_offline_default = canApplyOffline;

// helpers/map-CIS-countries/map-CIS-country/index.ts
var mapCisCountry = (country) => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    riskCategory: map_risk_category_default(country.ESRAClassificationDesc),
    shortTermCover: map_short_term_cover_available_default(country.shortTermCoverAvailabilityDesc),
    nbiIssueAvailable: map_NBI_issue_available_default(country.NBIIssue)
  };
  mapped.canGetAQuoteOnline = can_get_a_quote_online_default(mapped);
  mapped.canGetAQuoteOffline = can_apply_offline_default(country.shortTermCoverAvailabilityDesc);
  mapped.canGetAQuoteByEmail = can_get_a_quote_by_email_default(mapped);
  mapped.cannotGetAQuote = cannot_get_a_quote_default(mapped);
  mapped.canApplyForInsuranceOnline = can_apply_for_insurance_online_default(country.shortTermCoverAvailabilityDesc);
  mapped.canApplyForInsuranceOffline = can_apply_offline_default(country.shortTermCoverAvailabilityDesc);
  mapped.noInsuranceSupport = !mapped.canApplyForInsuranceOnline && !mapped.canApplyForInsuranceOffline;
  return mapped;
};
var map_CIS_country_default = mapCisCountry;

// helpers/sort-array-alphabetically/index.ts
var sortArrayAlphabetically = (arr, field) => arr.sort((a, b) => a[field].localeCompare(b[field]));
var sort_array_alphabetically_default = sortArrayAlphabetically;

// helpers/map-CIS-countries/index.ts
var { CIS: CIS5 } = EXTERNAL_API_DEFINITIONS;
var filterCisCountries = (countries) => countries.filter((country) => !CIS5.INVALID_COUNTRIES.includes(country.marketName));
var mapCisCountries = (countries) => {
  const filteredCountries = filterCisCountries(countries);
  const mapped = filteredCountries.map((country) => map_CIS_country_default(country));
  const sorted = sort_array_alphabetically_default(mapped, "name");
  return sorted;
};
var map_CIS_countries_default = mapCisCountries;

// custom-resolvers/queries/get-APIM-CIS-countries/index.ts
var getApimCisCountries = async () => {
  try {
    console.info("Getting and mapping CIS countries from APIM");
    const response = await APIM_default.getCisCountries();
    if (response.data) {
      const mapped = map_CIS_countries_default(response.data);
      return mapped;
    }
    return { success: false };
  } catch (err) {
    console.error("Error Getting and mapping CIS countries from APIM %O", err);
    throw new Error(`Getting and mapping CIS countries from APIM ${err}`);
  }
};
var get_APIM_CIS_countries_default = getApimCisCountries;

// helpers/create-full-timestamp-from-day-month/index.ts
var createFullTimestampFromDayAndMonth = (day, month) => {
  if (day && month) {
    return /* @__PURE__ */ new Date(`${(/* @__PURE__ */ new Date()).getFullYear()}-${month}-${day}`);
  }
  return null;
};
var create_full_timestamp_from_day_month_default = createFullTimestampFromDayAndMonth;

// helpers/map-sic-code-descriptions/index.ts
var mapSicCodeDescriptions = (sicCodes, sectors) => {
  const industrySectorNames2 = [];
  if (!sicCodes?.length || !sectors?.length) {
    return industrySectorNames2;
  }
  sicCodes.forEach((sicCode) => {
    const sicCodeSector = sectors.find((sector) => sector.ukefIndustryId === sicCode);
    industrySectorNames2.push(sicCodeSector?.ukefIndustryName);
  });
  return industrySectorNames2;
};
var map_sic_code_descriptions_default = mapSicCodeDescriptions;

// helpers/map-companies-house-fields/index.ts
var {
  COMPANIES_HOUSE: { COMPANY_STATUS }
} = EXTERNAL_API_DEFINITIONS;
var mapCompaniesHouseFields = (companiesHouseResponse, sectors) => ({
  companyName: companiesHouseResponse.company_name,
  registeredOfficeAddress: {
    careOf: companiesHouseResponse.registered_office_address.care_of,
    premises: companiesHouseResponse.registered_office_address.premises,
    addressLine1: companiesHouseResponse.registered_office_address.address_line_1,
    addressLine2: companiesHouseResponse.registered_office_address.address_line_2,
    locality: companiesHouseResponse.registered_office_address.locality,
    region: companiesHouseResponse.registered_office_address.region,
    postalCode: companiesHouseResponse.registered_office_address.postal_code,
    country: companiesHouseResponse.registered_office_address.country
  },
  companyNumber: companiesHouseResponse.company_number,
  dateOfCreation: companiesHouseResponse.date_of_creation,
  sicCodes: companiesHouseResponse.sic_codes,
  industrySectorNames: map_sic_code_descriptions_default(companiesHouseResponse.sic_codes, sectors),
  /**
   * Create a timestamp for financialYearEndDate
   * If day and month exist
   */
  financialYearEndDate: create_full_timestamp_from_day_month_default(
    companiesHouseResponse.accounts?.accounting_reference_date?.day,
    companiesHouseResponse.accounts?.accounting_reference_date?.month
  ),
  isActive: companiesHouseResponse.company_status === COMPANY_STATUS.ACTIVE
});

// integrations/industry-sector/index.ts
var import_axios2 = __toESM(require("axios"));
var import_dotenv6 = __toESM(require("dotenv"));
import_dotenv6.default.config();
var { APIM_MDM_URL: APIM_MDM_URL2, APIM_MDM_KEY: APIM_MDM_KEY2, APIM_MDM_VALUE: APIM_MDM_VALUE2 } = process.env;
var { APIM_MDM: APIM_MDM2 } = EXTERNAL_API_ENDPOINTS;
var headers = {
  "Content-Type": "application/json",
  [String(APIM_MDM_KEY2)]: APIM_MDM_VALUE2
};
var industrySectorNames = {
  get: async () => {
    try {
      console.info("Calling industry sector API");
      const response = await (0, import_axios2.default)({
        method: "get",
        url: `${APIM_MDM_URL2}${APIM_MDM2.INDUSTRY_SECTORS}`,
        headers,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        }
      });
      if (!response.data || response.status !== 200) {
        return {
          success: false
        };
      }
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      console.error("Error calling industry sector API %O", err);
      return {
        success: false,
        apiError: true
      };
    }
  }
};
var industry_sector_default = industrySectorNames;

// integrations/companies-house/index.ts
var import_axios3 = __toESM(require("axios"));
var import_dotenv7 = __toESM(require("dotenv"));
import_dotenv7.default.config();
var username = String(process.env.COMPANIES_HOUSE_API_KEY);
var companiesHouseURL = String(process.env.COMPANIES_HOUSE_API_URL);
var companiesHouse = {
  get: async (companyNumber) => {
    try {
      const response = await (0, import_axios3.default)({
        method: "get",
        url: `${companiesHouseURL}/company/${companyNumber}`,
        auth: { username, password: "" },
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        }
      });
      if (response.status === 404) {
        return {
          success: false,
          notFound: true
        };
      }
      if (!response.data || response.status !== 200) {
        return {
          success: false
        };
      }
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      console.error("Error calling Companies House API %O", err);
      throw new Error(`Calling Companies House API. Unable to search for company ${err}`);
    }
  }
};
var companies_house_default = companiesHouse;

// custom-resolvers/queries/get-companies-house-information/index.ts
var getCompaniesHouseInformation = async (root, variables) => {
  try {
    const { companiesHouseNumber } = variables;
    console.info("Getting Companies House information for %s", companiesHouseNumber);
    const sanitisedRegNo = companiesHouseNumber.toString().padStart(8, "0");
    const response = await companies_house_default.get(sanitisedRegNo);
    if (!response.success || !response.data) {
      return {
        success: false,
        notFound: response.notFound
      };
    }
    const industrySectors = await industry_sector_default.get();
    if (!industrySectors.success || industrySectors.apiError) {
      return {
        apiError: true,
        success: false
      };
    }
    const mappedResponse = mapCompaniesHouseFields(response.data, industrySectors.data);
    return {
      ...mappedResponse,
      success: true
    };
  } catch (err) {
    console.error("Error getting companies house information %O", err);
    return {
      apiError: true,
      success: false
    };
  }
};
var get_companies_house_information_default = getCompaniesHouseInformation;

// integrations/ordnance-survey/index.ts
var import_axios4 = __toESM(require("axios"));
var import_dotenv8 = __toESM(require("dotenv"));
import_dotenv8.default.config();
var { ORDNANCE_SURVEY_API_KEY, ORDNANCE_SURVEY_API_URL } = process.env;
var ordnanceSurvey = {
  get: async (postcode) => {
    try {
      const response = await (0, import_axios4.default)({
        method: "get",
        url: `${ORDNANCE_SURVEY_API_URL}${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ORDNANCE_SURVEY_API_KEY}`,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        }
      });
      if (!response?.data?.results || response.status !== 200) {
        return {
          success: false
        };
      }
      return {
        success: true,
        data: response.data.results
      };
    } catch (err) {
      console.error("Error calling Ordnance Survey API %O", err);
      throw new Error(`Calling Ordnance Survey API. Unable to search for address ${err}`);
    }
  }
};
var ordnance_survey_default = ordnanceSurvey;

// helpers/is-valid-postcode/index.ts
var import_postcode_validator = require("postcode-validator");
var isValidPostcode = (postcode) => (0, import_postcode_validator.postcodeValidator)(postcode, "GB");

// helpers/map-address/index.ts
var mapAddress = (address) => ({
  addressLine1: `${address.DPA.ORGANISATION_NAME ?? ""} ${address.DPA.BUILDING_NAME ?? ""} ${address.DPA.BUILDING_NUMBER ?? ""} ${address.DPA.THOROUGHFARE_NAME ?? ""}`.trim(),
  addressLine2: address.DPA.DEPENDENT_LOCALITY,
  town: address.DPA.POST_TOWN,
  postalCode: address.DPA.POSTCODE
});
var map_address_default2 = mapAddress;

// helpers/map-and-filter-address/index.ts
var mapAndFilterAddress = (houseNameOrNumber, ordnanceSurveyResponse) => {
  const filtered = ordnanceSurveyResponse.filter(
    (eachAddress) => eachAddress.DPA.BUILDING_NUMBER === houseNameOrNumber || eachAddress.DPA.BUILDING_NAME === houseNameOrNumber
  );
  if (!filtered.length) {
    return [];
  }
  const mappedFilteredAddresses = [];
  filtered.forEach((address) => {
    mappedFilteredAddresses.push(map_address_default2(address));
  });
  return mappedFilteredAddresses;
};
var map_and_filter_address_default = mapAndFilterAddress;

// helpers/remove-white-space/index.ts
var removeWhiteSpace = (string) => string.replace(" ", "");
var remove_white_space_default = removeWhiteSpace;

// custom-resolvers/queries/get-ordnance-survey-address/index.ts
var getOrdnanceSurveyAddress = async (root, variables) => {
  try {
    const { postcode, houseNameOrNumber } = variables;
    console.info("Getting Ordnance Survey address for postcode: %s, houseNameOrNumber: %s", postcode, houseNameOrNumber);
    const noWhitespacePostcode = remove_white_space_default(postcode);
    if (!isValidPostcode(noWhitespacePostcode)) {
      console.error("Invalid postcode: %s", postcode);
      return {
        success: false,
        invalidPostcode: true
      };
    }
    const response = await ordnance_survey_default.get(postcode);
    if (!response.success || !response.data) {
      return {
        success: false
      };
    }
    const mappedAddresses = map_and_filter_address_default(houseNameOrNumber, response.data);
    if (!mappedAddresses.length) {
      return {
        success: false,
        noAddressesFound: true
      };
    }
    return {
      addresses: mappedAddresses,
      success: true
    };
  } catch (err) {
    console.error("Error getting Ordnance Survey address results %O", err);
    return {
      apiError: true,
      success: false
    };
  }
};
var get_ordnance_survey_address_default = getOrdnanceSurveyAddress;

// custom-resolvers/queries/verify-account-password-reset-token/index.ts
var import_date_fns10 = require("date-fns");
var { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY } = account_default;
var verifyAccountPasswordResetToken = async (root, variables, context) => {
  console.info("Verifying account password reset token");
  try {
    const { token } = variables;
    const account2 = await get_account_by_field_default(context, PASSWORD_RESET_HASH, token);
    if (account2) {
      const now = /* @__PURE__ */ new Date();
      const hasExpired = (0, import_date_fns10.isAfter)(now, account2[PASSWORD_RESET_EXPIRY]);
      if (hasExpired) {
        console.info("Unable to verify account password reset token - token has expired");
        return {
          success: false,
          expired: true,
          accountId: account2.id
        };
      }
      console.info("Successfully verified account password reset token");
      return {
        success: true
      };
    }
    console.info("Unable to verify account password reset token - no account found from the provided %s", PASSWORD_RESET_HASH);
    return {
      success: false,
      invalid: true
    };
  } catch (err) {
    console.error("Error verifying account password reset token %O", err);
    throw new Error(`Verifying account password reset token ${err}`);
  }
};
var verify_account_password_reset_token_default = verifyAccountPasswordResetToken;

// custom-resolvers/index.ts
var customResolvers = {
  Mutation: {
    createAnAccount: create_an_account_default,
    deleteAnAccount: delete_an_account_default,
    accountSignIn: account_sign_in_default,
    accountSignInSendNewCode: account_sign_in_new_code_default,
    verifyAccountEmailAddress: verify_account_email_address_default,
    sendEmailConfirmEmailAddress: send_email_confirm_email_address_default2,
    verifyAccountSignInCode: verify_account_sign_in_code_default,
    addAndGetOTP: add_and_get_OTP_default,
    accountPasswordReset: account_password_reset_default,
    sendEmailPasswordResetLink: send_email_password_reset_link_default,
    sendEmailReactivateAccountLink: send_email_reactivate_account_link_default,
    createAnApplication: create_an_application_default,
    deleteApplicationByReferenceNumber: delete_application_by_reference_number_default,
    submitApplication: submit_application_default,
    createFeedbackAndSendEmail: create_feedback_default,
    verifyAccountReactivationToken: verify_account_reactivation_token_default
  },
  Query: {
    getAccountPasswordResetToken: get_account_password_reset_token_default,
    getApimCisCountries: get_APIM_CIS_countries_default,
    getCompaniesHouseInformation: get_companies_house_information_default,
    getOrdnanceSurveyAddress: get_ordnance_survey_address_default,
    verifyAccountPasswordResetToken: verify_account_password_reset_token_default
  }
};
var custom_resolvers_default = customResolvers;

// custom-schema/index.ts
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
  schemas: [schema],
  typeDefs: type_defs_default,
  resolvers: custom_resolvers_default
});

// keystone.ts
var { NODE_ENV: NODE_ENV2, PORT, DATABASE_URL } = process.env;
var isDevEnvironment2 = NODE_ENV2 === "development";
var isProdEnvironment = NODE_ENV2 === "production";
var keystone_default = withAuth(
  (0, import_core3.config)({
    server: {
      port: Number(PORT),
      extendExpressApp: (app) => {
        app.use((0, import_overload_protection.default)("express"));
        app.use(security_default);
        app.use(check_api_key_default);
        if (isProdEnvironment) {
          app.use(rate_limiter_default);
        }
      }
    },
    db: {
      provider: "mysql",
      url: String(DATABASE_URL),
      enableLogging: isDevEnvironment2
    },
    graphql: {
      playground: isDevEnvironment2,
      apolloConfig: {
        introspection: isDevEnvironment2,
        plugins: apolloPlugins2,
        formatError: formatGraphQlError2
      }
    },
    lists,
    session,
    extendGraphqlSchema,
    telemetry: false
  })
);
//# sourceMappingURL=config.js.map
