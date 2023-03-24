import deleteAccount from './account/delete-account';
import deleteApplication from './delete-application';

/**
 * deleteAccountAndApplication
 * Delete an account and application so we have a clean state during tests
 */
const deleteAccountAndApplication = (referenceNumber) => {
  try {
    // delete the exporter.
    deleteAccount();

    // delete the application
    deleteApplication(referenceNumber);
  } catch (err) {
    console.error(err);

    throw new Error('Deleting exporter account and application');
  }
};

export default deleteAccountAndApplication;