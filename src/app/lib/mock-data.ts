export interface WatchDevice {
  id: string;
  name: string;
  ownerName: string;
  status: 'Online' | 'Offline' | 'Emergency';
  batteryLevel: number;
  lastReported: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  healthData: {
    heartRate: number;
    spo2: number;
    stressLevel: 'Low' | 'Medium' | 'High';
  };
  accessibilityMode: 'Standard' | 'Deaf' | 'Blind' | 'LimitedMobility';
}

export interface EmergencyAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  userName: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'Active' | 'Resolved' | 'Dispatched';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical' | 'Pending';
  triggerType: 'Button' | 'Fall' | 'Voice' | 'HeartRate' | 'Gesture';
  sensorSnapshot: {
    heartRate: number;
    accelMagnitude: number;
  };
}

export const MOCK_DEVICES: WatchDevice[] = [
  {
    id: 'GB-9921',
    name: 'Ananya Watch',
    ownerName: 'Ananya Sharma',
    status: 'Online',
    batteryLevel: 85,
    lastReported: '2024-05-20T10:00:00Z',
    currentLocation: { lat: 19.0760, lng: 72.8777 },
    healthData: { heartRate: 72, spo2: 98, stressLevel: 'Low' },
    accessibilityMode: 'Standard'
  },
  {
    id: 'GB-1024',
    name: 'Priya Device',
    ownerName: 'Priya Singh',
    status: 'Emergency',
    batteryLevel: 42,
    lastReported: '2024-05-20T11:15:00Z',
    currentLocation: { lat: 28.6139, lng: 77.2090 },
    healthData: { heartRate: 115, spo2: 94, stressLevel: 'High' },
    accessibilityMode: 'Deaf'
  }
];

export const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: 'ALT-4512',
    deviceId: 'GB-1024',
    deviceName: 'Priya Device',
    userName: 'Priya Singh',
    timestamp: '2024-05-20T11:15:00Z',
    location: { lat: 28.6139, lng: 77.2090 },
    status: 'Active',
    urgency: 'Pending',
    triggerType: 'Fall',
    sensorSnapshot: { heartRate: 118, accelMagnitude: 4.5 }
  }
];

export const SAFE_ZONES = [
  { name: 'Home', latitude: 28.6200, longitude: 77.2100, radiusKm: 0.5 },
  { name: 'Office', latitude: 28.6100, longitude: 77.2000, radiusKm: 0.3 }
];

export const DANGER_AREAS = [
  { name: 'Isolated Park Area', latitude: 28.6150, longitude: 77.2050, radiusKm: 1.0 }
];

export const LOCATION_HISTORY = [
  { latitude: 28.6100, longitude: 77.2000, timestamp: '2024-05-20T11:00:00Z' },
  { latitude: 28.6110, longitude: 77.2020, timestamp: '2024-05-20T11:05:00Z' },
  { latitude: 28.6125, longitude: 77.2060, timestamp: '2024-05-20T11:10:00Z' },
  { latitude: 28.6139, longitude: 77.2090, timestamp: '2024-05-20T11:15:00Z' }
];