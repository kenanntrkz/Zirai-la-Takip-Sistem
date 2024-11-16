interface SystemInfo {
  cpuModel: string;
  totalMemory: string;
  osInfo: string;
  hostname: string;
}

export const getSystemInfo = async (): Promise<SystemInfo> => {
  try {
    const info: SystemInfo = {
      cpuModel: navigator.hardwareConcurrency?.toString() || 'unknown',
      totalMemory: 'unknown', // Removed deviceMemory usage
      osInfo: navigator.platform || 'unknown',
      hostname: window.location.hostname
    };

    // Rest of the implementation remains the same
    return info;
  } catch (error) {
    console.error('Error getting system info:', error);
    throw new Error('Failed to get system info');
  }
};