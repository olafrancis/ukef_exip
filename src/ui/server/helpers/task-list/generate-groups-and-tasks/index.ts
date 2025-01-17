import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

/**
 * generateGroupsAndTasks
 * @param {Number} Application reference number
 * @param {String} Application "Policy type"
 * @param {Boolean} Application "Is using broker" flag
 * @param {String} Application "Has anti-bribery code of conduct" flag
 * @returns {Array} Task list groups and tasks
 */
const generateGroupsAndTasks = (
  referenceNumber: number,
  policyType?: string,
  isUsingBroker?: boolean,
  hasDifferentTradingName?: boolean,
  hasAntiBriberyCodeOfConduct?: boolean | null,
): TaskListData => {
  let groups = [
    {
      title: INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: PREPARE_APPLICATION.HEADING,
      hint: PREPARE_APPLICATION.HINT,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks(referenceNumber, groups, policyType, isUsingBroker, hasDifferentTradingName),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(referenceNumber, groups, hasAntiBriberyCodeOfConduct),
    },
  ] as TaskListData;

  return groups;
};

export default generateGroupsAndTasks;
