class Privacy {
    constructor() {
      this.settings = null;
      this.isOptedOut = false;
      this.consentGiven = false;
    }
  
    /**
     * Configure privacy settings
     * @param {Object} settings - Privacy configuration
     */
    configure(settings) {
      this.settings = {
        anonymize: settings.anonymize ?? true,
        consentRequired: settings.consentRequired ?? true,
        dataRetentionPeriod: settings.dataRetentionPeriod ?? 30
      };
    }
  
    /**
     * Check if user consent is required and obtained
     * @returns {boolean} Whether consent is valid
     */
    checkConsent() {
      // If opted out, always return false
      if (this.isOptedOut) {
        return false;
      }
  
      // If consent is not required, return true
      if (!this.settings.consentRequired) {
        return true;
      }
  
      // If consent is required but not given, attempt to get consent
      if (!this.consentGiven) {
        return this._promptConsent();
      }
  
      return this.consentGiven;
    }
  
    /**
     * Prompt user for consent
     * @returns {boolean} Whether consent was obtained
     * @private
     */
    _promptConsent() {
      // In a real-world scenario, this would be a more sophisticated consent mechanism
      // For now, we'll use a simple browser confirm dialog
      this.consentGiven = window.confirm(
        'Do you agree to participate in anonymous data labeling tasks? ' +
        'Your data will be anonymized and you can opt-out at any time.'
      );
  
      return this.consentGiven;
    }
  
    /**
     * Opt out of data collection and task participation
     */
    optOut() {
      this.isOptedOut = true;
      this.consentGiven = false;
      
      // Clear any stored data
      this._clearStoredData();
    }
  
    /**
     * Clear stored user data
     * @private
     */
    _clearStoredData() {
      // Remove any stored tokens or user-related data
      try {
        localStorage.removeItem('hotlabel_session');
        sessionStorage.removeItem('hotlabel_consent');
      } catch (error) {
        console.warn('Error clearing stored data:', error);
      }
    }
  
    /**
     * Anonymize collected data
     * @param {Object} data - Data to anonymize
     * @returns {Object} Anonymized data
     */
    anonymize(data) {
      if (!this.settings.anonymize) {
        return data;
      }
  
      const anonymizedData = { ...data };
  
      // Remove or hash potentially identifying information
      if (anonymizedData.userAgent) {
        anonymizedData.userAgent = this._hashString(anonymizedData.userAgent);
      }
  
      // Remove precise location data
      delete anonymizedData.exactLocation;
  
      // Hash or truncate email-like identifiers
      if (anonymizedData.email) {
        anonymizedData.email = this._hashString(anonymizedData.email);
      }
  
      return anonymizedData;
    }
  
    /**
     * Simple string hashing method
     * @param {string} str - String to hash
     * @returns {string} Hashed string
     * @private
     */
    _hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(16);
    }
  }
  
  export default Privacy;