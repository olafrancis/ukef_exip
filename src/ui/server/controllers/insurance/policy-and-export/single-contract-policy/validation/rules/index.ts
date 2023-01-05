import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import creditPeriodWithBuyerRules from '../../../../../../shared-validation/credit-period-with-buyer';
import contractCompletionDateRules from './contract-completion-date';
import totalContractValueRules from './total-contract-value';
import policyCurrencyCodeRules from './policy-currency-code';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, contractCompletionDateRules, totalContractValueRules, creditPeriodWithBuyerRules, policyCurrencyCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
