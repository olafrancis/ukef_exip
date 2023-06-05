import validationRules from './rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';
import { RequestBody, ValidationErrors } from '../../../../../types';

const validation = (formBody: RequestBody) => combineValidationRules(validationRules, formBody) as ValidationErrors;

export default validation;
