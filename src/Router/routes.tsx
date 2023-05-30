import { routerType } from '../@type/router.types';

import { Home } from '../pages';

const routes: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'home',
  },
];

export default routes;
