import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateDeviceId } from '../utils/deviceId';
import { encryptData, hashData } from '../utils/encryption';
import { validateLicense } from '../utils/licenseValidation';
import toast from 'react-hot-toast';

interface LicenseState {
  isActivated: boolean;
  deviceId: string | null;
  activationDate: string | null;
  lastCheckDate: string | null;
  offlineDays: number;
  activationHash: string | null;
  activationAttempts: number;
  lastAttemptTime: string | null;
  customerInfo: {
    name: string | null;
    email: string | null;
    company: string | null;
    expiryDate: string | null;
  };
  activateLicense: (key: string, customerInfo: any) => Promise<boolean>;
  deactivateLicense: () => void;
  validateLicense: () => Promise<boolean>;
  getRemainingDays: () => number;
}

// Rest of the implementation remains the same as in the original file