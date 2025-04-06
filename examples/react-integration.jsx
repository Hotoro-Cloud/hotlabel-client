import React, { useEffect } from 'react';
import HotLabel from 'hotlabel-client';

function App() {
  useEffect(() => {
    // Initialize HotLabel when component mounts
    HotLabel.init({
      publisherId: 'react-demo-001',
      triggerOptions: {
        mode: 'adaptive',
        frequency: 'once-per-session'
      }
    });

    // Optional: Add event listener for task completion
    const handleTaskCompletion = (event) => {
      const { task } = event.detail;
      console.log('Task completed:', task);
      
      // You can send task data to your backend or perform other actions
    };

    window.addEventListener('hotlabel-task-completed', handleTaskCompletion);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('hotlabel-task-completed', handleTaskCompletion);
    };
  }, []);

  const triggerManualTask = () => {
    HotLabel.triggerTask({
      taskType: 'technical-labeling',
      category: 'react-component'
    });
  };

  return (
    <div>
      <h1>HotLabel React Integration</h1>
      <button onClick={triggerManualTask}>
        Trigger Labeling Task
      </button>
    </div>
  );
}

export default App;