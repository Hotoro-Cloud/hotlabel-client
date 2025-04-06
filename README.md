# HotLabel Client

## Overview

HotLabel is a privacy-first, crowdsourced data labeling solution designed to help AI companies efficiently collect high-quality labeled data while maintaining user privacy.

## Features

- 🔒 Privacy-conscious data collection
- 🚀 Adaptive task triggering
- 🌐 Easy web integration
- 📊 Anonymized user signal collection
- 🔧 Flexible configuration

## Installation

```bash
npm install hotlabel-client
```

## Basic Usage

### HTML Integration

```html
<script src="https://unpkg.com/hotlabel-client/dist/hotlabel.js"></script>
<script>
  HotLabel.init({
    publisherId: 'your-publisher-id',
    triggerOptions: {
      mode: 'adaptive',
      frequency: 'once-per-session'
    }
  });
</script>
```

### React Integration

```jsx
import HotLabel from 'hotlabel-client';

function App() {
  useEffect(() => {
    HotLabel.init({
      publisherId: 'your-publisher-id'
    });
  }, []);

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
```

## Configuration Options

- `publisherId`: Unique identifier for your publisher account
- `triggerOptions`:
  - `mode`: 'adaptive', 'manual', or 'scheduled'
  - `frequency`: Task frequency control
- `privacySettings`:
  - `anonymize`: Enable data anonymization
  - `consentRequired`: Require user consent

## Development

```bash
# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License

## Privacy Commitment

HotLabel is designed with privacy as a core principle. We collect minimal, anonymized data and provide users with full control over