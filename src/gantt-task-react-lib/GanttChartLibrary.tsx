import React, { useMemo } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import type { Task } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import './GanttChartLibrary.css';

const GanttChartLibrary: React.FC = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Month);
  const [isChecked, setIsChecked] = React.useState(true);

  // Define tasks with proper typing
  const tasks: Task[] = useMemo(() => {
    const currentDate = new Date();
    
    return [
      {
        start: new Date(currentDate.getFullYear(), 0, 1),
        end: new Date(currentDate.getFullYear(), 2, 31),
        name: 'Sparkling Citrus Campaign',
        id: 'Task-1',
        type: 'task',
        progress: 45,
        isDisabled: false,
        styles: { 
          progressColor: '#10B981', 
          progressSelectedColor: '#059669',
          backgroundColor: '#D1FAE5',
          backgroundSelectedColor: '#A7F3D0'
        },
        project: 'Desperados'
      },
      {
        start: new Date(currentDate.getFullYear(), 1, 1),
        end: new Date(currentDate.getFullYear(), 3, 30),
        name: 'Desperados Spring Launch',
        id: 'Task-2',
        type: 'task',
        progress: 60,
        isDisabled: false,
        styles: { 
          progressColor: '#10B981', 
          progressSelectedColor: '#059669',
          backgroundColor: '#D1FAE5',
          backgroundSelectedColor: '#A7F3D0'
        },
        project: 'Desperados'
      },
      {
        start: new Date(currentDate.getFullYear(), 1, 15),
        end: new Date(currentDate.getFullYear(), 3, 15),
        name: 'Amstel Campaign Development',
        id: 'Task-3',
        type: 'task',
        progress: 25,
        isDisabled: false,
        styles: { 
          progressColor: '#EF4444', 
          progressSelectedColor: '#DC2626',
          backgroundColor: '#FEE2E2',
          backgroundSelectedColor: '#FECACA'
        },
        project: 'Amstel'
      },
      {
        start: new Date(currentDate.getFullYear(), 2, 1),
        end: new Date(currentDate.getFullYear(), 5, 30),
        name: 'Heineken Summer Campaign',
        id: 'Task-4',
        type: 'task',
        progress: 35,
        isDisabled: false,
        styles: { 
          progressColor: '#F59E0B', 
          progressSelectedColor: '#D97706',
          backgroundColor: '#FEF3C7',
          backgroundSelectedColor: '#FDE68A'
        },
        project: 'Heineken'
      },
      {
        start: new Date(currentDate.getFullYear(), 3, 1),
        end: new Date(currentDate.getFullYear(), 6, 31),
        name: 'Sol Beach Festival',
        id: 'Task-5',
        type: 'task',
        progress: 50,
        isDisabled: false,
        styles: { 
          progressColor: '#10B981', 
          progressSelectedColor: '#059669',
          backgroundColor: '#D1FAE5',
          backgroundSelectedColor: '#A7F3D0'
        },
        project: 'Sol'
      },
      {
        start: new Date(currentDate.getFullYear(), 4, 1),
        end: new Date(currentDate.getFullYear(), 7, 31),
        name: 'Tiger Crystal Launch',
        id: 'Task-6',
        type: 'task',
        progress: 15,
        isDisabled: false,
        styles: { 
          progressColor: '#F59E0B', 
          progressSelectedColor: '#D97706',
          backgroundColor: '#FEF3C7',
          backgroundSelectedColor: '#FDE68A'
        },
        project: 'Tiger'
      }
    ];
  }, []);

  const handleViewChange = (mode: ViewMode) => {
    setView(mode);
  };

  const handleExpanderClick = (task: Task) => {
    console.log('Expander clicked for task:', task.name);
  };

  return (
    <div className="gantt-library-container">
      <div className="gantt-library-header">
        <div className="header-content">
          <h2>Brand Campaign Timeline</h2>
          <p className="subtitle">Powered by gantt-task-react library</p>
        </div>
        
        <div className="controls">
          <div className="view-mode-buttons">
            <button
              className={`view-btn ${view === ViewMode.Day ? 'active' : ''}`}
              onClick={() => handleViewChange(ViewMode.Day)}
            >
              Day
            </button>
            <button
              className={`view-btn ${view === ViewMode.Week ? 'active' : ''}`}
              onClick={() => handleViewChange(ViewMode.Week)}
            >
              Week
            </button>
            <button
              className={`view-btn ${view === ViewMode.Month ? 'active' : ''}`}
              onClick={() => handleViewChange(ViewMode.Month)}
            >
              Month
            </button>
          </div>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>Show Task List</span>
          </label>
        </div>
      </div>

      <div className="gantt-wrapper">
        <Gantt
          tasks={tasks}
          viewMode={view}
          listCellWidth={isChecked ? '155px' : ''}
          columnWidth={view === ViewMode.Month ? 65 : view === ViewMode.Week ? 250 : 60}
          ganttHeight={450}
          barBackgroundColor="#E5E7EB"
          barBackgroundSelectedColor="#D1D5DB"
          barProgressColor="#3B82F6"
          barProgressSelectedColor="#2563EB"
          projectBackgroundColor="#DBEAFE"
          projectProgressColor="#3B82F6"
          projectProgressSelectedColor="#2563EB"
          todayColor="rgba(239, 68, 68, 0.2)"
          TooltipContent={({ task }) => (
            <div className="custom-tooltip">
              <div className="tooltip-header">
                <strong>{task.name}</strong>
              </div>
              <div className="tooltip-body">
                <p><strong>Project:</strong> {task.project}</p>
                <p><strong>Progress:</strong> {task.progress}%</p>
                <p><strong>Start:</strong> {task.start.toLocaleDateString()}</p>
                <p><strong>End:</strong> {task.end.toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24))} days</p>
              </div>
            </div>
          )}
          onExpanderClick={handleExpanderClick}
        />
      </div>

      <div className="legend">
        <h3>Status Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color on-track"></span>
            <span>On Track (Green)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color at-risk"></span>
            <span>At Risk (Yellow)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color delayed"></span>
            <span>Delayed (Red)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChartLibrary;

// Made with Bob

