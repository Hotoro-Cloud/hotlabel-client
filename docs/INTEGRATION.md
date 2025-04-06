# HotLabel Integration Guide

## Table of Contents
1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Configuration](#configuration)
4. [Task Types](#task-types)
5. [Privacy Management](#privacy-management)
6. [Advanced Integration](#advanced-integration)

## Installation

### NPM
```bash
npm install hotlabel-client
```

### CDN
```html
<script src="https://unpkg.com/hotlabel-client/dist/hotlabel.js"></script>
```

## Basic Usage

### Vanilla JavaScript
```javascript
HotLabel.init({
  publisherId: 'your-publisher-id',
  triggerOptions: {
    mode: 'adaptive',
    frequency: 'once-per-session'
  }
});

// Manually trigger a task
HotLabel.triggerTask({
  taskType: 'content-annotation',
  category: 'website-feedback'
});
```

### React Integration
```jsx
import HotLabel from 'hotlabel-client';

function App() {
  useEffect(() => {
    HotLabel.init({
      publisherId: 'your-publisher-id'
    });

    // Listen for task completion
    const handleTaskCompletion = (event) => {
      const { task } = event.detail;
      // Handle completed task
    };

    window.addEventListener('hotlabel-task-completed', handleTaskCompletion);

    return () => {
      window.removeEventListener('hotlabel-task-completed', handleTaskCompletion);
    };
  }, []);
}
```

## Configuration

### Options
- `publisherId` (required): Unique identifier for your account
- `triggerOptions`:
  ```javascript
  {
    mode: 'adaptive', // 'adaptive', 'manual', 'scheduled'
    frequency: 'once-per-session', // Task trigger frequency
    minInteractionTime: 30, // Minimum user interaction time (seconds)
    maxTasksPerDay: 3 // Maximum tasks per user per day
  }
  ```
- `privacySettings`:
  ```javascript
  {
    anonymize: true, // Anonymize collected data
    consentRequired: true, // Require user consent
    dataRetentionPeriod: 30 // Days to retain data
  }
  ```

## Task Types

### Supported Task Types
1. **Content Annotation**
   - Collect user insights on content
   - Ideal for content quality assessment

2. **Feedback**
   - Gather user opinions
   - Collect ratings and comments

3. **Technical Labeling**
   - Label technical content
   - Categorize code snippets, documentation

4. **Generic Task**
   - Flexible task type
   - Custom data collection

## Privacy Management

### Consent and Opt-Out
```javascript
// Check current consent status
const hasConsent = HotLabel.privacy.checkConsent();

// Opt-out of data collection
HotLabel.optOut();
```

## Advanced Integration

### Event Listeners
```javascript
// Listen for task completion
window.addEventListener('hotlabel-task-completed', (event) => {
  const { task } = event.detail;
  // Custom handling of completed task
});
```

### Custom Task Triggering
```javascript
// Programmatically trigger tasks based on user interaction
function triggerTaskOnSpecificCondition() {
  HotLabel.triggerTask({
    taskType: 'technical-labeling',
    category: 'custom-category',
    metadata: {
      additionalContext: 'Optional additional information'
    }
  });
}
```

## Troubleshooting

- Ensure `publisherId` is correctly set
- Check browser console for any initialization errors
- Verify consent settings
- Ensure minimum interaction requirements are met

## Best Practices

1. Always provide clear information about data usage
2. Keep tasks short and relevant
3. Respect user privacy
4. Offer opt-out mechanisms
5. Anonymize collected data

## Support

For additional support, please contact:
- Email: support@hotlabel.ai
- Documentation: https://docs.hotlabel.ai