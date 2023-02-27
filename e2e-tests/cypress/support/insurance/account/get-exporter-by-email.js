import api from '../../api';

/**
 * getExporterByEmail
 * @param {String} Exporter account email
 * Get an exporter directly from the API,
 * @returns {Object} Exporter account
 */
const getExporterByEmail = (email) => {
  try {
    api.getExporterByEmail(email).then((response) => {
      if (!response.body || !response.body.data) {
        throw new Error('Getting exporter by email', { response });
      }

      return response;
    });
  } catch (err) {
    console.error(err);

    throw new Error('Getting exporter by email');
  }
};

export default getExporterByEmail;