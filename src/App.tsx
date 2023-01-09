import JwtProvider from './components/Auth/JwtProvider';
import { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';

const history = createBrowserHistory();

function App() : ReactElement {
  return (
      <Router history={history}>
        <JwtProvider>
          {renderRoutes(routes)}
        </JwtProvider>
      </Router>
  );
}

export default App;
