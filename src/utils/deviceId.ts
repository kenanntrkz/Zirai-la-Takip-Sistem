import { v4 as uuidv4 } from 'uuid';

export const generateDeviceId = async (): Promise<string> => {
  try {
    const nav = window.navigator;
    const screen = window.screen;
    
    // Removed deviceMemory from device info collection
    const deviceInfo = [
      nav.userAgent,
      screen.height,
      screen.width,
      nav.language,
      nav.platform,
      new Date().getTimezoneOffset(),
      nav.hardwareConcurrency,
      // Tarayıcı parmak izi
      await getCanvasFingerprint(),
      // Yerel depolama ID'si
      getLocalStorageId()
    ].join('|');

    // Rest of the implementation remains the same
}