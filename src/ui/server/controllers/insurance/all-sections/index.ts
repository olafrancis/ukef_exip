import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';

export const TEMPLATE = TEMPLATES.INSURANCE.ALL_SECTIONS;

export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const flatApplicationData = flattenApplicationData(application);

  const taskListStructure = generateGroupsAndTasks(
    application.referenceNumber,
    application.policyAndExport.policyType,
    application.exporterBroker.isUsingBroker,
  );

  const taskListData = generateTaskList(taskListStructure, flatApplicationData);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
      BACK_LINK: req.headers.referer,
    }),
    application: mapApplicationToFormFields(application),
    taskListData,
  });
};
