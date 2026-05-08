import './App.css';
// import GanttChartLibrary from './gantt-task-react-lib/GanttChartLibrary'
import BrandPlanner from './kibo-ui-lib/KiboUILib';
import Demo from './shadcn-io-lib/ShadcnIOLib';
import { FrappeGanttChartExample } from './frappe-grant-lib/FrappeGantLib';

function App() {
  return (
    <>
      <div>
        <h1>React Gantt Chart using Frappe Gantt</h1>
      </div>
      <section id="center">
        {/* No Library*/}
        {/* <GanttChart /> */}

        {/* gantt-task-react library*/}
        {/* <GanttChartLibrary /> */}

        {/* <PortfolioGantt /> */}

        {/* Kibo UI library*/}
        {/* <BrandPlanner /> */}

        {/* Shadcn IO library*/}
        {/* <Demo /> */}

        {/* Frappe Gantt Chart library*/}
        <FrappeGanttChartExample />
      </section>
    </>
  );
}

export default App;
