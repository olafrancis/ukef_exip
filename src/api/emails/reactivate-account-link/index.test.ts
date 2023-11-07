import { reactivateAccountLink } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../test-mocks';

describe('emails/reactivate-account-link', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;

  const mockReactivationHash = '123456';

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    urlOrigin: mockUrlOrigin,
    name: fullName,
    reactivationToken: mockReactivationHash,
  };

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    notify.sendEmail = sendEmailSpy;

    const result = await reactivateAccountLink(mockUrlOrigin, email, fullName, mockReactivationHash);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, expectedVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      try {
        await reactivateAccountLink(mockUrlOrigin, email, fullName, mockReactivationHash);
      } catch (err) {
        const expected = new Error(`Sending email for account reactivation Error: Sending email ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
