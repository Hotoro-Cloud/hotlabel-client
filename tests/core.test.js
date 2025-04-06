import HotLabel from '../src/core/hotlabel';
import Config from '../src/core/config';
import Privacy from '../src/core/privacy';

describe('HotLabel Core Functionality', () => {
  let hotLabelInstance;

  beforeEach(() => {
    hotLabelInstance = HotLabel;
  });

  test('should initialize with default configuration', () => {
    const initResult = hotLabelInstance.init({
      publisherId: 'test-publisher'
    });

    expect(initResult).toBe(hotLabelInstance);
  });

  test('should throw error without publisher ID', () => {
    expect(() => {
      hotLabelInstance.init({});
    }).toThrow('Publisher ID is required');
  });

  test('should have core methods', () => {
    expect(hotLabelInstance.init).toBeDefined();
    expect(hotLabelInstance.triggerTask).toBeDefined();
    expect(hotLabelInstance.optOut).toBeDefined();
  });
});

describe('Configuration Management', () => {
  test('should merge configurations', () => {
    const defaultConfig = Config.getDefaultConfig();
    const customConfig = {
      publisherId: 'test-123',
      triggerOptions: {
        maxTasksPerDay: 5
      }
    };

    const mergedConfig = Config.merge(customConfig);

    expect(mergedConfig.publisherId).toBe('test-123');
    expect(mergedConfig.triggerOptions.maxTasksPerDay).toBe(5);
    expect(mergedConfig.triggerOptions.mode).toBe(defaultConfig.triggerOptions.mode);
  });
});

describe('Privacy Management', () => {
  let privacyInstance;

  beforeEach(() => {
    privacyInstance = new Privacy();
  });

  test('should configure privacy settings', () => {
    privacyInstance.configure({
      anonymize: true,
      consentRequired: true
    });

    expect(privacyInstance.settings.anonymize).toBe(true);
    expect(privacyInstance.settings.consentRequired).toBe(true);
  });

  test('should anonymize data', () => {
    const testData = {
      userAgent: 'Mozilla/5.0',
      email: 'test@example.com'
    };

    const anonymizedData = privacyInstance.anonymize(testData);

    expect(anonymizedData.userAgent).not.toBe('Mozilla/5.0');
    expect(anonymizedData.email).not.toBe('test@example.com');
  });
});