class Modal {
    constructor() {
      this.container = null;
      this.currentTask = null;
    }
  
    /**
     * Show the task modal
     * @param {Object} task - Task to display
     */
    show(task) {
      if (!task) {
        console.warn('No task provided to modal');
        return;
      }
  
      this.currentTask = task;
      this._createContainer();
      this._renderTaskContent();
      this._attachEventListeners();
    }
  
    /**
     * Create the modal container
     * @private
     */
    _createContainer() {
      // Remove any existing modal
      if (this.container) {
        this._removeModal();
      }
  
      // Create new modal container
      this.container = document.createElement('div');
      this.container.className = 'hotlabel-modal-overlay';
      this.container.innerHTML = `
        <div class="hotlabel-modal-content">
          <div class="hotlabel-modal-header">
            <h2>Labeling Task</h2>
            <button class="hotlabel-modal-close">&times;</button>
          </div>
          <div class="hotlabel-modal-body">
            <!-- Task content will be inserted here -->
          </div>
          <div class="hotlabel-modal-footer">
            <button class="hotlabel-modal-submit">Submit</button>
            <button class="hotlabel-modal-cancel">Cancel</button>
          </div>
        </div>
      `;
  
      // Append to body
      document.body.appendChild(this.container);
    }
  
    /**
     * Render task-specific content
     * @private
     */
    _renderTaskContent() {
      if (!this.currentTask) return;
  
      const bodyElement = this.container.querySelector('.hotlabel-modal-body');
      
      // Generate task-specific content based on task type
      switch (this.currentTask.type) {
        case 'content-annotation':
          this._renderContentAnnotationTask(bodyElement);
          break;
        case 'feedback':
          this._renderFeedbackTask(bodyElement);
          break;
        case 'technical-labeling':
          this._renderTechnicalLabelingTask(bodyElement);
          break;
        default:
          this._renderGenericTask(bodyElement);
      }
    }
  
    /**
     * Render content annotation task
     * @param {HTMLElement} bodyElement - Modal body element
     * @private
     */
    _renderContentAnnotationTask(bodyElement) {
      bodyElement.innerHTML = `
        <h3>Content Annotation</h3>
        <p>Please help improve our AI by annotating the content:</p>
        <textarea 
          class="hotlabel-task-input" 
          placeholder="Add your annotations here..."
          rows="4"
        ></textarea>
        <div class="hotlabel-task-metadata">
          <p>Estimated time: ${this.currentTask.duration} seconds</p>
          <p>Complexity: ${this.currentTask.complexity}</p>
        </div>
      `;
    }
  
    /**
     * Render feedback task
     * @param {HTMLElement} bodyElement - Modal body element
     * @private
     */
    _renderFeedbackTask(bodyElement) {
        bodyElement.innerHTML = `
          <h3>Quick Feedback</h3>
          <p>We value your input! Please share your thoughts:</p>
          <div class="hotlabel-feedback-options">
            <div class="hotlabel-rating">
              <label>How helpful was this content?</label>
              <div class="hotlabel-rating-stars">
                ${[1, 2, 3, 4, 5].map(star => `
                  <input 
                    type="radio" 
                    name="rating" 
                    value="${star}" 
                    id="star-${star}"
                    class="hotlabel-star-input"
                  >
                  <label for="star-${star}" class="hotlabel-star-label">★</label>
                `).join('')}
              </div>
            </div>
            <textarea 
              class="hotlabel-task-input" 
              placeholder="Additional comments (optional)"
              rows="3"
            ></textarea>
          </div>
          <div class="hotlabel-task-metadata">
            <p>Estimated time: ${this.currentTask.duration} seconds</p>
          </div>
        `;
      }
    
      /**
       * Render technical labeling task
       * @param {HTMLElement} bodyElement - Modal body element
       * @private
       */
      _renderTechnicalLabelingTask(bodyElement) {
        bodyElement.innerHTML = `
          <h3>Technical Labeling</h3>
          <p>Help improve AI understanding by labeling technical content:</p>
          <div class="hotlabel-technical-labels">
            <div class="hotlabel-label-group">
              <label>Select Content Type:</label>
              <select class="hotlabel-task-select">
                <option value="">Choose a type</option>
                <option value="code">Code Snippet</option>
                <option value="documentation">Documentation</option>
                <option value="tutorial">Tutorial</option>
                <option value="research">Research Paper</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="hotlabel-label-group">
              <label>Primary Technology/Language:</label>
              <input 
                type="text" 
                class="hotlabel-task-input" 
                placeholder="e.g., Python, React, Machine Learning"
              >
            </div>
            <div class="hotlabel-label-group">
              <label>Difficulty Level:</label>
              <div class="hotlabel-difficulty-options">
                <label>
                  <input type="radio" name="difficulty" value="beginner"> Beginner
                </label>
                <label>
                  <input type="radio" name="difficulty" value="intermediate"> Intermediate
                </label>
                <label>
                  <input type="radio" name="difficulty" value="advanced"> Advanced
                </label>
              </div>
            </div>
          </div>
          <div class="hotlabel-task-metadata">
            <p>Estimated time: ${this.currentTask.duration} seconds</p>
            <p>Complexity: ${this.currentTask.complexity}</p>
          </div>
        `;
      }
    
      /**
       * Render generic fallback task
       * @param {HTMLElement} bodyElement - Modal body element
       * @private
       */
      _renderGenericTask(bodyElement) {
        bodyElement.innerHTML = `
          <h3>Labeling Task</h3>
          <p>Help improve AI capabilities:</p>
          <textarea 
            class="hotlabel-task-input" 
            placeholder="Provide your input here..."
            rows="4"
          ></textarea>
          <div class="hotlabel-task-metadata">
            <p>Estimated time: ${this.currentTask.duration || 90} seconds</p>
          </div>
        `;
      }
    
      /**
       * Attach event listeners to modal
       * @private
       */
      _attachEventListeners() {
        if (!this.container) return;
    
        // Close button
        const closeButton = this.container.querySelector('.hotlabel-modal-close');
        closeButton?.addEventListener('click', () => this._removeModal());
    
        // Cancel button
        const cancelButton = this.container.querySelector('.hotlabel-modal-cancel');
        cancelButton?.addEventListener('click', () => this._removeModal());
    
        // Submit button
        const submitButton = this.container.querySelector('.hotlabel-modal-submit');
        submitButton?.addEventListener('click', () => this._submitTask());
    
        // Prevent modal from closing when clicking inside the content
        const modalContent = this.container.querySelector('.hotlabel-modal-content');
        modalContent?.addEventListener('click', (e) => e.stopPropagation());
    
        // Allow closing modal by clicking outside
        this.container.addEventListener('click', () => this._removeModal());
      }
    
      /**
       * Submit the current task
       * @private
       */
      _submitTask() {
        if (!this.currentTask) return;
    
        // Collect task response based on task type
        const response = this._collectTaskResponse();
    
        // Validate response
        if (!this._validateResponse(response)) {
          return;
        }
    
        // Mark task as completed
        this.currentTask.status = 'completed';
        this.currentTask.response = response;
    
        // Dispatch task completion event
        this._dispatchTaskCompletionEvent();
    
        // Remove modal
        this._removeModal();
      }
    
      /**
       * Collect task response based on task type
       * @returns {Object} Task response
       * @private
       */
      _collectTaskResponse() {
        const bodyElement = this.container.querySelector('.hotlabel-modal-body');
        
        switch (this.currentTask.type) {
          case 'content-annotation':
            return {
              annotation: bodyElement.querySelector('.hotlabel-task-input')?.value.trim()
            };
          
          case 'feedback':
            return {
              rating: bodyElement.querySelector('input[name="rating"]:checked')?.value,
              comments: bodyElement.querySelector('.hotlabel-task-input')?.value.trim()
            };
          
          case 'technical-labeling':
            return {
              contentType: bodyElement.querySelector('.hotlabel-task-select')?.value,
              technology: bodyElement.querySelector('.hotlabel-task-input')?.value.trim(),
              difficultyLevel: bodyElement.querySelector('input[name="difficulty"]:checked')?.value
            };
          
          default:
            return {
              input: bodyElement.querySelector('.hotlabel-task-input')?.value.trim()
            };
        }
      }
    
      /**
       * Validate task response
       * @param {Object} response - Task response to validate
       * @returns {boolean} Whether the response is valid
       * @private
       */
      _validateResponse(response) {
        switch (this.currentTask.type) {
          case 'content-annotation':
            return response.annotation && response.annotation.length > 0;
          
          case 'feedback':
            return response.rating || response.comments;
          
          case 'technical-labeling':
            return response.contentType && response.technology;
          
          default:
            return response.input && response.input.length > 0;
        }
      }
    
      /**
       * Dispatch task completion event
       * @private
       */
      _dispatchTaskCompletionEvent() {
        const event = new CustomEvent('hotlabel-task-completed', {
          detail: {
            task: this.currentTask
          }
        });
        window.dispatchEvent(event);
      }
    
      /**
       * Remove the modal from the document
       * @private
       */
      _removeModal() {
        if (!this.container) return;
    
        // Remove from DOM
        document.body.removeChild(this.container);
        
        // Reset container and current task
        this.container = null;
        this.currentTask = null;
      }
    }
    
    export default Modal;