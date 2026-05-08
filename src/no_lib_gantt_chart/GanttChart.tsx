import React from 'react';
import './GanttChart.css';

interface GanttTask {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  statusLabel: string;
  brand: string;
  timeline: {
    start: number;
    end: number;
    currentStage: string;
    stageColor: string;
  };
  team: string[];
}

const GanttChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const currentMonth = 2;

  const tasks: GanttTask[] = [
    {
      id: '1',
      name: 'Sparkling Citrus',
      status: 'on-track',
      statusLabel: 'On track',
      brand: 'Desperados',
      timeline: {
        start: 0,
        end: 3,
        currentStage: 'Production Briefing',
        stageColor: '#4A90E2'
      },
      team: ['Desperados', 'Media', 'Javier Rodrigues']
    },
    {
      id: '2',
      name: 'Desperados Spring',
      status: 'on-track',
      statusLabel: 'On track',
      brand: 'Desperados',
      timeline: {
        start: 1,
        end: 4,
        currentStage: 'Integrated Comms Plan',
        stageColor: '#4A90E2'
      },
      team: ['Desperados', 'Media', 'Javier Rodrigues']
    },
    {
      id: '3',
      name: 'Amstel Campaign',
      status: 'delayed',
      statusLabel: 'Delayed',
      brand: 'Amstel',
      timeline: {
        start: 1,
        end: 3,
        currentStage: 'Brief Creation',
        stageColor: '#E74C3C'
      },
      team: ['Amstel', 'Media', 'Jane Johnson']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return '#10B981';
      case 'at-risk':
        return '#F59E0B';
      case 'delayed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const calculateBarPosition = (start: number, end: number) => {
    const totalMonths = months.length;
    const startPercent = (start / totalMonths) * 100;
    const widthPercent = ((end - start) / totalMonths) * 100;
    return { left: `${startPercent}%`, width: `${widthPercent}%` };
  };

  return (
    <div className="gantt-container">
      <div className="gantt-header">
        <div className="header-left">
          <div className="header-info">
            <h2>In development</h2>
            <div className="year-nav">
              <button className="nav-btn">←</button>
              <span className="year">2026</span>
              <button className="nav-btn">→</button>
            </div>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total</span>
              <span className="stat-value">3</span>
            </div>
            <div className="stat-item at-risk">
              <span className="stat-icon">⚠</span>
              <span className="stat-label">At risk</span>
              <span className="stat-value">1</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Actions required</span>
              <span className="stat-value">1</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <button className="filter-btn">Filter ⚙</button>
        </div>
      </div>

      <div className="gantt-timeline">
        <div className="timeline-header">
          <div className="task-column-header"></div>
          <div className="months-header">
            {months.map((month) => (
              <div key={month} className="month-cell">
                {month}
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-marker" style={{ left: `${(currentMonth / months.length) * 100}%` }}></div>

        <div className="gantt-rows">
          {tasks.map((task) => (
            <div key={task.id} className="gantt-row">
              <div className="task-info">
                <div className="status-bar" style={{ backgroundColor: getStatusColor(task.status) }}>
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(task.status) }}>●</span>
                  <span className="status-text">{task.statusLabel}</span>
                </div>
                <div className="task-details">
                  <h3 className="task-name">{task.name}</h3>
                  <div className="task-meta">
                    <span className="brand-tag">{task.brand}</span>
                  </div>
                </div>
              </div>
              <div className="timeline-bars">
                <div className="months-grid">
                  {months.map((month) => (
                    <div key={month} className="month-grid-cell"></div>
                  ))}
                </div>
                <div
                  className="gantt-bar"
                  style={calculateBarPosition(task.timeline.start, task.timeline.end)}
                >
                  <div className="bar-content">
                    <div className="bar-header">
                      <span className="bar-brand">{task.brand}</span>
                      <span className="bar-separator">•</span>
                      <span className="bar-team">Media</span>
                      <span className="bar-separator">•</span>
                      <span className="bar-person">{task.team[2]}</span>
                    </div>
                    <div className="bar-stage">
                      <span className="stage-label">Current stage:</span>
                      <span className="stage-name">{task.timeline.currentStage}</span>
                    </div>
                    {/* <div className="stage-badge" style={{ backgroundColor: task.timeline.stageColor }}>
                      {task.timeline.currentStage === 'Brief Creation' ? 'New Brief Delivery' : 'Awaiting Agency Response'}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;

