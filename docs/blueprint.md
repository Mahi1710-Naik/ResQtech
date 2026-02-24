# **App Name**: Guardian Beacon Dashboard

## Core Features:

- User & Role-Based Authentication: Secure sign-in for various user types (watch owner, trusted contact, administrator, police responder) using Firebase Authentication. Manage user profiles and access permissions.
- Device Registration & Management: Allow watch owners to register their safety devices, view their status (e.g., last reported location, battery level, online/offline status), and assign devices to user accounts using Firestore.
- Real-time Live Tracking & History Map: Display the current location of registered smartwatches on an interactive map. Provide functionality to review historical location data and movement trails.
- Emergency Alert Feed & Details: A real-time dashboard showing incoming emergency alerts, including timestamp, location, device ID, and contextual data. Ability to mark alerts as resolved or in progress using Firestore.
- AI-Powered Alert Triage Tool: An AI-driven tool that analyzes incoming alert data (location history, time of day, proximity to safe zones/danger areas, audio cues if transmitted) to prioritize and provide recommended response actions or urgency levels to responders.
- Trusted Contacts & Alert Policy Configuration: Enable watch owners to add and manage trusted contacts who receive emergency notifications. Configure custom alert policies based on triggers and severity levels using Firestore.

## Style Guidelines:

- Primary color: A deep, confident blue (#2E66B8) symbolizing trust, reliability, and technological advancement, providing a strong professional foundation for interactive elements and key headings.
- Background color: A subtly cool off-white (#ECF1F7) derived from the primary hue, offering a clean, professional, and non-distracting canvas that ensures legibility and reduces eye strain.
- Accent color: A vibrant and modern cyan (#2CBBDB) that serves as a visually striking accent for calls to action, urgent notifications, and highlighting key interactive elements, while remaining analogous and professional.
- Body and headline font: 'Inter' (sans-serif), chosen for its objective, neutral, and highly legible characteristics, ensuring clarity and professionalism across all dashboard text, from data tables to headlines.
- Utilize modern, clean line-art icons that maintain a consistent visual weight. Employ clear, intuitive symbols for navigation and data representation, transitioning to solid-fill versions for critical alerts or active states to draw immediate attention.
- Implement a responsive dashboard layout optimized for data consumption and real-time monitoring. Emphasize a clear information hierarchy, using distinct card-based modules for alerts, map display, and status indicators. Prioritize direct access to critical functions through an intuitive, persistent side navigation.
- Incorporate subtle and purposeful animations for UI feedback, such as smooth transitions for data updates on maps and charts, and discreet pulsing or flashing effects for new, unread emergency alerts to provide clear visual cues without being disruptive.