class Config {
    /**
     * Default configuration for HotLabel
     * @returns {Object} Default configuration object
     */
    static getDefaultConfig() {
      return {
        publisherId: null,
        
        triggerOptions: {
          mode: 'adaptive', // 'adaptive', 'manual', 'scheduled'
          frequency: 'once-per-session',
          minInteractionTime: 30, // seconds
          maxTasksPerDay: 3
        },
        
        privacySettings: {
          anonymize: true,
          consentRequired: true,
          dataRetentionPeriod: 30, // days
          collectSignals: [
            'language',
            'browserType',
            'contentCategory',
            'interactionPatterns'
          ]
        },
        
        taskSettings: {
          defaultType: 'generic',
          timeout: 300, // seconds
          compensationMethod: null
        }
      };
    }
  
    /**
     * Merge default and custom configurations
     * @param {Object} customConfig - Custom configuration to merge
     * @returns {Object} Merged configuration
     */
    static merge(customConfig = {}) {
      const defaultConfig = this.getDefaultConfig();
      return this._deepMerge(defaultConfig, customConfig);
    }
  
    /**
     * Validate the configuration
     * @param {Object} config - Configuration to validate
     * @throws {Error} If configuration is invalid
     */
    static validate(config) {
      // Validate publisher ID
      if (!config.publisherId) {
        throw new Error('Publisher ID is required');
      }
  
      // Validate trigger mode
      const validModes = ['adaptive', 'manual', 'scheduled'];
      if (!validModes.includes(config.triggerOptions.mode)) {
        throw new Error(`Invalid trigger mode. Must be one of: ${validModes.join(', ')}`);
      }
  
      // Validate max tasks per day
      if (config.triggerOptions.maxTasksPerDay < 0) {
        throw new Error('Max tasks per day must be non-negative');
      }
    }
  
    /**
     * Deep merge utility function
     * @param {Object} target - Target object to merge into
     * @param {Object} source - Source object to merge from
     * @returns {Object} Merged object
     * @private
     */
    static _deepMerge(target, source) {
      const output = { ...target };
      
      if (this._isObject(target) && this._isObject(source)) {
        Object.keys(source).forEach(key => {
          if (this._isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, { [key]: source[key] });
            } else {
              output[key] = this._deepMerge(target[key], source[key]);
            }
          } else {
            Object.assign(output, { [key]: source[key] });
          }
        });
      }
      
      return output;
    }
  
    /**
     * Check if an item is an object
     * @param {*} item - Item to check
     * @returns {boolean} Whether the item is an object
     * @private
     */
    static _isObject(item) {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }
  }
  
  export default Config;