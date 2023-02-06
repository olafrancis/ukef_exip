import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { FIELD_IDS, TASK_IDS } from '../../../constants';

const { INITIAL_CHECKS } = TASKS.LIST;

const { ACCOUNT_TO_APPLY_ONLINE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * createInitialChecksTasks
 * @returns {Array} Tasks
 */
const createInitialChecksTasks = (): Array<TaskListDataTask> => [
  {
    href: '#',
    title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,

    // strip out the ACCOUNT_TO_APPLY_ONLINE field. This field is part of eligibility,
    // but we don't save this field (useless). Therefore we do not want to include this
    // in the list of required eligibility fields.
    fields: Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
