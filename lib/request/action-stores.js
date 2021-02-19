import glob from 'glob';
import path from 'path';

const applicationActions = glob.sync('./actions/*.js');

const microActionsStore = {};

applicationActions.map(file => import(path.resolve(file)).then((imported) => {
  const actionsClass = imported.default;
  if (actionsClass.name === 'ApplicationActions') return; // ignore routes for ApplicationActions
  microActionsStore[actionsClass.routeName] = actionsClass;
}));

/**
 * @type {{}}
 */
export default microActionsStore;

