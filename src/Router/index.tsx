import { Route, Routes } from 'react-router-dom';

import { routerType } from '../@type/router.types';

import routes from './routes';

import MainLayout from '../components/layouts/MainLayout';

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {pageRoutes}
      </Route>
    </Routes>
  );
};

export default Router;
