interface ValidationResult {
  isValid: boolean;
  error?: string;
  licenseInfo?: any;
}

export const validateLicense = async (licenseKey: string): Promise<ValidationResult> => {
  try {
    // Basic format validation
    const keyFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!keyFormat.test(licenseKey)) {
      return {
        isValid: false,
        error: 'Invalid license key format'
      };
    }

    // For demo purposes, accept any valid format
    return {
      isValid: true,
      licenseInfo: {
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        features: ['basic', 'advanced'],
        maxDevices: 1
      }
    };
  } catch (error) {
    console.error('License validation error:', error);
    return {
      isValid: false,
      error: 'An error occurred during license validation'
    };
  }
};