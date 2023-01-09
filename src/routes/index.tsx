import NProgress from 'nprogress';
import {
  lazy, useEffect, Suspense, Fragment
} from 'react';

interface IRoute {
    exact?: boolean;
    path?: string;
    guard?: React.FC;
    layout?: React.FC;
    component: any;
}

interface IRouteProps {
    exact: boolean;
    path: string;
    render: (...args: any[]) => any;
}

function RouteProgress(props: IRouteProps) {
  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(routes: IRoute[] = []) {
  return (
    <BrowserRouter>
      <Switch>
        {
          routes.map((route: IRoute, i: number) => {
            const Component = route.component;
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;

            return (
              <RouteProgress
                key={i}
                path={route.path!}
                exact={route.exact!}
                render={(props) => (
                  <Guard>
                    <Layout>
                    {
                      route.path !== '/' ? (
                        <Component {...props} />) : (route.component)
                    }
                    </Layout>
                  </Guard>
                )}
              />
            );
          })
        }
      </Switch>
    </BrowserRouter>
  );
}

const routes: IRoute[] = [];

export default routes;