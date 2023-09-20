import validation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/policy-and-export/name-on-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
