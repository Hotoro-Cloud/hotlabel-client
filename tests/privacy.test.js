import Privacy from '../src/core/privacy';

describe('Privacy Management', () => {
  let privacyInstance;

  beforeEach(() => {
    privacyInstance = new Privacy();
    
    // Mock window.confirm for testing
    global.confirm = jest.fn(() => true);
  });

  test('should configure privacy settings', () => {
    privacyInstance.configure({
      anonymize: true,
      consentRequired: true,
      dataRetentionPeriod: 30
    });

    expect(privacyInstance.settings).toEqual({
      anonymize: true,
      consentRequired: true,
      dataRetentionPeriod: 30
    });
  });

  test('should handle consent when not required', () => {
    privacyInstance.configure({
      consentRequired: false
    });

    const consentResult = privacyInstance.checkConsent();
    expect(consentResult).toBe(true);
  });

  test('should request consent when required', () => {
    privacyInstance.configure({
      consentRequired: true
    });

    const consentResult = privacyInstance.checkConsent();
    expect(global.confirm).toHaveBeenCalled();
    expect(consentResult).toBe(true);
  });

  test('should opt out and disable further consent', () => {
    privacyInstance.configure({
      consentRequired: true
    });

    privacyInstance.optOut();

    const consentResult = privacyInstance.checkConsent();
    expect(consentResult).toBe(false);
  });

  test('should anonymize data', () => {
    const testData = {
      userAgent: 'Mozilla/5.0',
      email: 'test@example.com',
      exactLocation: '40.7128° N, 74.0060° W'
    };

    privacyInstance.configure({
      anonymize: true
    });

    const anonymizedData = privacyInstance.anonymize(testData);

    expect(anonymizedData.userAgent).not.toBe('Mozilla/5.0');
    expect(anonymizedData.email).not.toBe('test@example.com');
    expect(anonymizedData.exactLocation).toBeUndefined();
  });
});