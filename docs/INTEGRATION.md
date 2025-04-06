# HotLabel Integration Guide

## Scenario: Integrating HotLabel into a Tech Blog

### 1. Basic HTML Integration

A developer would add the HotLabel script to their website's HTML, typically in the `<head>` or at the end of the `<body>` tag:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Tech Blog</title>
    <!-- Other head elements -->
    
    <!-- HotLabel Integration Script -->
    <script src="https://cdn.hotlabel.ai/hotlabel.js"></script>
</head>
<body>
    <!-- Website content -->

    <script>
        // Initialize HotLabel with basic configuration
        HotLabel.init({
            publisherId: 'tech-blog-001', // Unique identifier provided by HotLabel
            triggerOptions: {
                mode: 'adaptive', // Automatically trigger tasks based on user engagement
                frequency: 'once-per-session' // Limit to one task per user session
            }
        });
    </script>
</body>
</html>
```

### 2. Advanced Integration with Custom Triggering

For more control, developers can manually trigger tasks:

```html
<script>
    // Initialize HotLabel
    HotLabel.init({
        publisherId: 'tech-blog-001',
        triggerOptions: {
            mode: 'manual' // Developer will control when tasks are shown
        }
    });

    // Example: Trigger a task after user reads an article
    function onArticleReadComplete() {
        HotLabel.triggerTask({
            taskType: 'content-annotation',
            category: 'technology',
            metadata: {
                articleId: '123456',
                articleTopic: 'AI Trends'
            }
        });
    }

    // Example: Trigger based on scroll depth
    window.addEventListener('scroll', function() {
        if (isArticleScrolledToBottom()) {
            HotLabel.triggerTask({
                taskType: 'feedback',
                category: 'article-completion'
            });
        }
    });
</script>
```

### 3. React Single Page Application (SPA) Integration

For modern web applications:

```jsx
import React, { useEffect } from 'react';

function App() {
    useEffect(() => {
        // Initialize HotLabel when component mounts
        window.HotLabel.init({
            publisherId: 'react-app-001',
            triggerOptions: {
                mode: 'adaptive'
            }
        });

        // Optional: Custom event tracking
        const handleRouteChange = () => {
            window.HotLabel.triggerTask({
                taskType: 'page-interaction',
                category: 'navigation'
            });
        };

        // Add route change listener
        // This would depend on your routing library (React Router, etc.)
    }, []);

    return (
        <div>
            {/* Your app content */}
        </div>
    );
}
```

### Key Integration Points

1. **Script Inclusion**: Always include the HotLabel script
2. **Initialization**: Call `HotLabel.init()` with your publisher ID
3. **Task Triggering**: 
   - Use `adaptive` mode for automatic tasks
   - Use `manual` mode for programmatic control
   - Use `HotLabel.triggerTask()` to show labeling tasks

### Customization Options

- **Consent Management**: Configure privacy settings
- **Task Frequency**: Control how often tasks appear
- **Task Types**: Specify different labeling task categories
- **Anonymization**: Ensure user privacy

### Best Practices

- Always provide clear information about data collection
- Allow users to opt-out
- Keep tasks short and relevant
- Compensate users for their time (optional)

## Getting Started Checklist

1. Sign up for a HotLabel publisher account
2. Receive your unique publisher ID
3. Include the HotLabel script
4. Initialize with your publisher ID
5. Configure task triggering mode
6. Test integration