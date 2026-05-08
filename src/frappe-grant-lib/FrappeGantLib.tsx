import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import './frappe-gantt.css';

interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies?: string;
  custom_class?: string;
}

export const FrappeGanttChartExample: React.FC = () => {

  const ganttRef = useRef<HTMLDivElement>(null);
  const ganttInstance = useRef<any>(null);

  const tasks: Task[] = [
    {
      id: 'Task 1',
      name: 'Market Research',
      start: '2024-01-01',
      end: '2024-01-15',
      progress: 100,
      custom_class: 'bar-milestone'
    },
    {
      id: 'Task 2',
      name: 'Brand Strategy Development',
      start: '2024-01-10',
      end: '2024-02-05',
      progress: 80,
      dependencies: 'Task 1'
    },
    {
      id: 'Task 3',
      name: 'Creative Concept Design',
      start: '2024-01-20',
      end: '2024-02-20',
      progress: 60,
      dependencies: 'Task 2'
    },
    {
      id: 'Task 4',
      name: 'Campaign Planning',
      start: '2024-02-01',
      end: '2024-02-28',
      progress: 45,
      dependencies: 'Task 2'
    },
    {
      id: 'Task 5',
      name: 'Content Creation',
      start: '2024-02-15',
      end: '2024-03-15',
      progress: 30,
      dependencies: 'Task 3'
    },
    {
      id: 'Task 6',
      name: 'Media Buying',
      start: '2024-02-20',
      end: '2024-03-10',
      progress: 20,
      dependencies: 'Task 4'
    },
    {
      id: 'Task 7',
      name: 'Campaign Launch',
      start: '2024-03-10',
      end: '2024-03-20',
      progress: 0,
      dependencies: 'Task 5, Task 6',
      custom_class: 'bar-milestone'
    },
    {
      id: 'Task 8',
      name: 'Performance Monitoring',
      start: '2024-03-15',
      end: '2024-04-15',
      progress: 0,
      dependencies: 'Task 7'
    }
  ];

  useEffect(() => {
    if (ganttRef.current && !ganttInstance.current) {
      ganttInstance.current = new Gantt(ganttRef.current, tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Week',
        date_format: 'YYYY-MM-DD',
        language: 'en',
        custom_popup_html: function(task: any) {
          return `
            <div class="details-container">
              <h5>${task.name}</h5>
              <p>Expected to finish by ${task._end}</p>
              <p>${task.progress}% completed!</p>
            </div>
          `;
        },
        on_click: function (task: any) {
          console.log('Task clicked:', task);
        },
        on_date_change: function(task: any, start: Date, end: Date) {
          console.log('Date changed:', task, start, end);
        },
        on_progress_change: function(task: any, progress: number) {
          console.log('Progress changed:', task, progress);
        },
        on_view_change: function(mode: string) {
          console.log('View mode changed:', mode);
        }
      });
    }

    return () => {
      if (ganttInstance.current) {
        ganttInstance.current = null;
      }
    };
  }, []);

  const changeViewMode = (mode: string) => {
    if (ganttInstance.current) {
      ganttInstance.current.change_view_mode(mode);
    }
  };

  return (
    <div className="gantt-container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '10px' }}>Brand Campaign Gantt Chart</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => changeViewMode('Quarter Day')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Quarter Day
          </button>
          <button 
            onClick={() => changeViewMode('Half Day')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Half Day
          </button>
          <button 
            onClick={() => changeViewMode('Day')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Day
          </button>
          <button 
            onClick={() => changeViewMode('Week')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Week
          </button>
          <button 
            onClick={() => changeViewMode('Month')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Month
          </button>
        </div>
      </div>
      <div
        ref={ganttRef}
        style={{
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}
      ></div>
    </div>
  );
};

