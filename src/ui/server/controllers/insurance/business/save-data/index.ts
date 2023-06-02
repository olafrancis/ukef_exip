import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * gets fields to add to the database and sanitises them
 * saves to company tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const companyDetails = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const companyId = application.company?.id;
  const companyAddressId = application.company?.registeredOfficeAddress?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.company(companyId, companyAddressId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's companyDetails");
  }
};

/**
 * gets fields to add to the database and sanitises them
 * saves to business tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const business = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const businessId = application.business?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.business(businessId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's business");
  }
};

/**
 * gets fields to add to the database and sanitises them
 * saves to broker tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const broker = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const brokerId = application.broker?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.broker(brokerId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's broker");
  }
};

const contact = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const brokerId = application.business?.businessContactDetail?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.businessContact(brokerId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error('Updating business contact');
  }
};

export default {
  companyDetails,
  business,
  broker,
  contact,
};
