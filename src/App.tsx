import JwtProvider from './components/Auth/JwtProvider';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './redux/store';
import routes, { renderRoutes } from './routes';

const history = createBrowserHistory();

function App() : ReactElement {
  return (
    <Provider store={store}>
      <Router history={history}>
        <JwtProvider>
          {renderRoutes(routes)}
        </JwtProvider>
      </Router>
    </Provider>
  );
}

export default App;
