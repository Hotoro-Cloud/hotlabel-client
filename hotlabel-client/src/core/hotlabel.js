import Config from './config.js';
import Privacy from './privacy.js';
import TaskManager from '../modules/task-manager.js';
import SignalCollector from '../modules/signal-collector.js';
import Modal from '../ui/modal.js';

class HotLabel {
  constructor() {
    this.config = null;
    this.privacy = new Privacy();
    this.taskManager = new TaskManager();
    this.signalCollector = new SignalCollector();
    this.modal = new Modal();
  }

  /**
   * Initialize HotLabel with custom configuration
   * @param {Object} customConfig - Custom configuration options
   * @returns {HotLabel} - Current HotLabel instance
   */
  init(customConfig = {}) {
    // Merge default and custom configurations
    this.config = Config.merge(customConfig);

    // Validate configuration
    Config.validate(this.config);

    // Set up privacy settings
    this.privacy.configure(this.config.privacySettings);

    // Initialize signal collection
    this.signalCollector.start(this.config);

    // Set up task management
    this.taskManager.configure(this.config);

    return this;
  }

  /**
   * Manually trigger a labeling task
   * @param {Object} taskOptions - Options for the specific task
   * @returns {HotLabel} - Current HotLabel instance
   */
  triggerTask(taskOptions = {}) {
    // Ensure we have a valid configuration
    if (!this.config) {
      throw new Error('HotLabel must be initialized before triggering tasks');
    }

    // Check privacy consent
    if (!this.privacy.checkConsent()) {
      console.warn('Task not triggered: User consent not obtained');
      return this;
    }

    // Validate and process task
    const task = this.taskManager.createTask(taskOptions);

    // Display task modal
    this.modal.show(task);

    return this;
  }

  /**
   * Opt out of data collection and task participation
   * @returns {HotLabel} - Current HotLabel instance
   */
  optOut() {
    this.privacy.optOut();
    this.signalCollector.stop();
    return this;
  }
}

// Singleton instance
const hotLabelInstance = new HotLabel();

// Expose to global scope
if (typeof window !== 'undefined') {
  window.HotLabel = hotLabelInstance;
}

export default hotLabelInstance;