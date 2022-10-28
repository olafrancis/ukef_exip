import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

/**
 * generateGroupsAndTasks
 * @returns {Array} Task list groups and tasks
 */
const generateGroupsAndTasks = (): TaskListData => {
  let groups = [
    {
      title: TASKS.LIST.INITIAL_CHECKS.TITLE,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: TASKS.LIST.PREPARE_APPLICATION.TITLE,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks(groups),
    },
  ] as TaskListData;

  return groups;
};

export default generateGroupsAndTasks;