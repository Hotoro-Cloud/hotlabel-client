class SignalCollector {
    constructor() {
      this.config = null;
      this.signals = {};
      this.isTracking = false;
      this.eventListeners = {};
    }
  
    /**
     * Start signal collection
     * @param {Object} config - Configuration for signal collection
     */
    start(config) {
      this.config = config;
      this.isTracking = true;
  
      // Initialize signals
      this._initializeSignals();
  
      // Set up event listeners
      this._setupEventListeners();
    }
  
    /**
     * Stop signal collection
     */
    stop() {
      this.isTracking = false;
      this._removeEventListeners();
    }
  
    /**
     * Initialize base signals
     * @private
     */
    _initializeSignals() {
      this.signals = {
        browserInfo: this._collectBrowserInfo(),
        initialTimestamp: Date.now(),
        language: {
          browser: navigator.language,
          detected: this._detectLanguage()
        },
        deviceType: this._detectDeviceType()
      };
    }
  
    /**
     * Collect browser and device information
     * @returns {Object} Browser and device information
     * @private
     */
    _collectBrowserInfo() {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        languages: navigator.languages,
        cookiesEnabled: navigator.cookieEnabled,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth
      };
    }
  
    /**
     * Detect user's primary language
     * @returns {string} Detected language code
     * @private
     */
    _detectLanguage() {
      // More sophisticated language detection could be implemented
      return navigator.language || 
             navigator.userLanguage || 
             'en-US';
    }
  
    /**
     * Detect device type
     * @returns {string} Device type
     * @private
     */
    _detectDeviceType() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'mobile';
      }
      return 'desktop';
    }
  
    /**
     * Set up event listeners for tracking user interactions
     * @private
     */
    _setupEventListeners() {
      const events = {
        'mouseMove': this._trackMouseMovement.bind(this),
        'scroll': this._trackScrollBehavior.bind(this),
        'keyPress': this._trackKeyboardInteraction.bind(this),
        'pageVisibility': this._trackPageVisibility.bind(this)
      };
  
      Object.entries(events).forEach(([eventName, handler]) => {
        this._addEventListenerSafely(eventName, handler);
      });
    }
  
    /**
     * Add event listener with error handling
     * @param {string} eventName - Name of the event
     * @param {Function} handler - Event handler function
     * @private
     */
    _addEventListenerSafely(eventName, handler) {
      try {
        switch(eventName) {
          case 'mouseMove':
            window.addEventListener('mousemove', handler);
            break;
          case 'scroll':
            window.addEventListener('scroll', handler);
            break;
          case 'keyPress':
            window.addEventListener('keydown', handler);
            break;
          case 'pageVisibility':
            document.addEventListener('visibilitychange', handler);
            break;
        }
        this.eventListeners[eventName] = handler;
      } catch (error) {
        console.warn(`Error setting up ${eventName} listener:`, error);
      }
    }
  
    /**
     * Remove all event listeners
     * @private
     */
    _removeEventListeners() {
      Object.entries(this.eventListeners).forEach(([eventName, handler]) => {
        try {
          switch(eventName) {
            case 'mouseMove':
              window.removeEventListener('mousemove', handler);
              break;
            case 'scroll':
              window.removeEventListener('scroll', handler);
              break;
            case 'keyPress':
              window.removeEventListener('keydown', handler);
              break;
            case 'pageVisibility':
              document.removeEventListener('visibilitychange', handler);
              break;
          }
        } catch (error) {
          console.warn(`Error removing ${eventName} listener:`, error);
        }
      });
      this.eventListeners = {};
    }
  
    /**
     * Track mouse movement
     * @param {MouseEvent} event - Mouse movement event
     * @private
     */
    _trackMouseMovement(event) {
      if (!this.isTracking) return;
  
      this.signals.mouseMovement = {
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now()
      };
    }
  
    /**
     * Track scroll behavior
     * @param {Event} event - Scroll event
     * @private
     */
    _trackScrollBehavior(event) {
      if (!this.isTracking) return;
  
      this.signals.scrollBehavior = {
        scrollTop: window.pageYOffset,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        timestamp: Date.now()
      };
    }
  
    /**
     * Track keyboard interaction
     * @param {KeyboardEvent} event - Keyboard event
     * @private
     */
    _trackKeyboardInteraction(event) {
      if (!this.isTracking) return;
  
      // Track key press patterns without storing actual characters
      this.signals.keyboardInteraction = {
        keyCode: event.keyCode,
        type: event.type,
        timestamp: Date.now()
      };
    }
  
    /**
     * Track page visibility changes
     * @param {Event} event - Visibility change event
     * @private
     */
    _trackPageVisibility(event) {
      if (!this.isTracking) return;
  
      this.signals.pageVisibility = {
        hidden: document.hidden,
        state: document.visibilityState,
        timestamp: Date.now()
      };
    }
  
    /**
     * Get collected signals
     * @returns {Object} Collected signals
     */
    getSignals() {
      return this.signals;
    }
  
    /**
     * Clear collected signals
     */
    clearSignals() {
      this.signals = {};
    }
  }
  
  export default SignalCollector;