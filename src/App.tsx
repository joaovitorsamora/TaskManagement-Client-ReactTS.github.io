import './App.css';
import { Header } from './components/Header/Header';
import { Filter } from './components/Filter/Filter';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';
import { Layout } from './components/Layout/Layout';
import { Aside } from './components/Aside/Aside';
import { FilterProvide } from './components/index';
import { Suspense, lazy } from 'react';
import { delayForDemo } from './delayForDemo';
import LoadingThreeDotsJumping from './components/LoadingThreeDotsJumping/LoadingThreeDotsJumping';

function App() {
  const Task = lazy(() => delayForDemo(import('./components/Task/Task')));
  const TaskList = lazy(() =>
    delayForDemo(import('./components/TaskList/TaskList'))
  );
  return (
    <FilterProvide>
      <div className="main__container">
        <Header />
        <Aside>
          <Filter />
          <List />
        </Aside>
        <Layout>
          <Suspense fallback={<LoadingThreeDotsJumping />}>
            <Task />
            <TaskList />
          </Suspense>
        </Layout>
        <Footer />
      </div>
    </FilterProvide>
  );
}

export default App;
