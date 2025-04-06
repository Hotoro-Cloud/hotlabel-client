class TaskManager {
    constructor() {
      this.config = null;
      this.tasksCompletedToday = 0;
      this.lastTaskTimestamp = null;
    }
  
    /**
     * Configure task management settings
     * @param {Object} config - Configuration object
     */
    configure(config) {
      this.config = {
        maxTasksPerDay: config.triggerOptions.maxTasksPerDay || 3,
        mode: config.triggerOptions.mode || 'adaptive',
        minInteractionTime: config.triggerOptions.minInteractionTime || 30
      };
  
      // Reset daily task counter at midnight
      this._setupDailyReset();
    }
  
    /**
     * Create a new task based on provided options
     * @param {Object} taskOptions - Task configuration
     * @returns {Object} Created task
     */
    createTask(taskOptions = {}) {
        // Check if we can create a new task
        if (!this._canCreateTask()) {
          console.warn('Maximum daily tasks reached or conditions not met');
          return null;
        }
    
        // Generate unique task ID
        const taskId = this._generateTaskId();
    
        // Default task structure
        const task = {
          id: taskId,
          type: taskOptions.taskType || this.config.defaultType || 'generic',
          category: taskOptions.category || 'default',
          metadata: taskOptions.metadata || {},
          timestamp: Date.now(),
          status: 'created'
        };
    
        // Enhance task based on specific type
        this._enhanceTask(task);
    
        // Increment tasks completed today
        this.tasksCompletedToday++;
        this.lastTaskTimestamp = Date.now();
    
        return task;
      }
    
      /**
       * Determine if a new task can be created
       * @returns {boolean} Whether a new task can be created
       * @private
       */
      _canCreateTask() {
        // Check maximum tasks per day
        if (this.tasksCompletedToday >= this.config.maxTasksPerDay) {
          return false;
        }
    
        // For adaptive mode, implement additional checks
        if (this.config.mode === 'adaptive') {
          // Check minimum interaction time
          const userInteractionTime = this._getUserInteractionTime();
          if (userInteractionTime < this.config.minInteractionTime) {
            return false;
          }
        }
    
        return true;
      }
    
      /**
       * Generate a unique task ID
       * @returns {string} Unique task identifier
       * @private
       */
      _generateTaskId() {
        return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
    
      /**
       * Enhance task with additional properties based on type
       * @param {Object} task - Task to enhance
       * @private
       */
      _enhanceTask(task) {
        switch (task.type) {
          case 'content-annotation':
            task.duration = 120; // 2 minutes
            task.complexity = 'medium';
            break;
          case 'feedback':
            task.duration = 60; // 1 minute
            task.complexity = 'low';
            break;
          case 'technical-labeling':
            task.duration = 180; // 3 minutes
            task.complexity = 'high';
            break;
          default:
            task.duration = 90; // Default 1.5 minutes
            task.complexity = 'low';
        }
      }
    
      /**
       * Get user interaction time
       * @returns {number} User interaction time in seconds
       * @private
       */
      _getUserInteractionTime() {
        // In a real implementation, this would track actual user interaction
        // For now, return a placeholder value
        return 45; // seconds
      }
    
      /**
       * Set up daily reset of task counter
       * @private
       */
      _setupDailyReset() {
        // Calculate time until midnight
        const now = new Date();
        const midnight = new Date(
          now.getFullYear(), 
          now.getMonth(), 
          now.getDate() + 1, 
          0, 0, 0
        );
        
        const timeUntilMidnight = midnight.getTime() - now.getTime();
    
        // Set timeout to reset tasks at midnight
        setTimeout(() => {
          this.tasksCompletedToday = 0;
          
          // Reschedule for next day
          this._setupDailyReset();
        }, timeUntilMidnight);
      }
    
      /**
       * Record task completion
       * @param {Object} task - Completed task
       */
      recordTaskCompletion(task) {
        if (!task) return;
    
        task.status = 'completed';
        task.completionTimestamp = Date.now();
    
        // Optional: Send completion data to backend
        this._sendTaskCompletionData(task);
      }
    
      /**
       * Send task completion data (stub method)
       * @param {Object} task - Completed task
       * @private
       */
      _sendTaskCompletionData(task) {
        // In a real implementation, this would send data to a backend service
        console.log('Task completed:', task);
      }
    }
    
    export default TaskManager;