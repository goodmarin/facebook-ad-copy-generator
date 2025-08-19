import { useEffect, useState } from 'react';
import { AppleApp } from './components/AppleApp';
import CopyGeneratorPage from './pages/CopyGeneratorPage';

type RoutePath = '/' | '/generate';

const getHashRoute = (): RoutePath => {
  const hash = window.location.hash.replace('#', '') || '/';
  return (hash as RoutePath) === '/generate' ? '/generate' : '/';
};

function App() {
  const [route, setRoute] = useState<RoutePath>(getHashRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === '/generate') {
    return <CopyGeneratorPage />;
  }

  return <AppleApp />;
}

export default App;