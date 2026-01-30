import * as Calendar from 'expo-calendar';
import * as Location from 'expo-location';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CalendarEvent } from '../types';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export interface LocationInfo {
  latitude: number;
  longitude: number;
  timezone: string;
  city?: string;
  country?: string;
}

class CalendarService {
  private calendarId: string | null = null;

  /**
   * Initialize calendar permissions and get default calendar
   */
  async initializeCalendar(): Promise<boolean> {
    try {
      // Request calendar permissions
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Calendar permissions not granted');
        return false;
      }

      // Get default calendar
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];

      if (defaultCalendar) {
        this.calendarId = defaultCalendar.id;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error initializing calendar:', error);
      return false;
    }
  }

  /**
   * Get user's current location and timezone
   */
  async getCurrentLocation(): Promise<LocationInfo | null> {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permissions not granted');
        return null;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Get timezone from device
      const timezone = dayjs.tz.guess();

      // Reverse geocoding to get city/country (optional)
      const geocoded = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timezone,
        city: geocoded[0]?.city || undefined,
        country: geocoded[0]?.country || undefined,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  /**
   * Get current time in user's local timezone
   */
  getCurrentLocalTime(location?: LocationInfo): Date {
    const timezone = location?.timezone || dayjs.tz.guess();
    return dayjs().tz(timezone).toDate();
  }

  /**
   * Format date/time for display in user's local timezone
   */
  formatLocalDateTime(date: Date, location?: LocationInfo): string {
    const timezone = location?.timezone || dayjs.tz.guess();
    return dayjs(date).tz(timezone).format('MMM DD, YYYY h:mm A');
  }

  /**
   * Create event in device calendar
   */
  async createEvent(event: CalendarEvent): Promise<boolean> {
    try {
      if (!this.calendarId) {
        const initialized = await this.initializeCalendar();
        if (!initialized) return false;
      }

      const calendarEvent = {
        title: event.title,
        notes: event.description,
        startDate: event.startTime,
        endDate: event.endTime,
        location: event.location,
        allDay: event.isAllDay,
        timeZone: dayjs.tz.guess(),
      };

      await Calendar.createEventAsync(this.calendarId!, calendarEvent);
      return true;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return false;
    }
  }

  /**
   * Get events from device calendar for a specific date range
   */
  async getEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    try {
      if (!this.calendarId) {
        const initialized = await this.initializeCalendar();
        if (!initialized) return [];
      }

      const events = await Calendar.getEventsAsync(
        [this.calendarId!],
        startDate,
        endDate
      );

      return events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.notes || undefined,
        startTime: new Date(event.startDate),
        endTime: new Date(event.endDate),
        location: event.location || undefined,
        isAllDay: event.allDay,
        category: 'other', // Calendar events don't have categories by default
      }));
    } catch (error) {
      console.error('Error getting calendar events:', error);
      return [];
    }
  }

  /**
   * Suggest optimal meeting times based on user's location and working hours
   */
  async suggestMeetingTimes(
    duration: number, // in minutes
    location?: LocationInfo,
    preferredHours?: { start: number; end: number } // 24-hour format
  ): Promise<Date[]> {
    const timezone = location?.timezone || dayjs.tz.guess();
    const workStart = preferredHours?.start || 9; // 9 AM default
    const workEnd = preferredHours?.end || 17; // 5 PM default

    const suggestions: Date[] = [];
    const now = dayjs().tz(timezone);

    // Generate suggestions for the next 7 days
    for (let day = 0; day < 7; day++) {
      const currentDate = now.add(day, 'day').hour(workStart).minute(0);

      // Generate 3 time slots per day (morning, midday, afternoon)
      for (let slot = 0; slot < 3; slot++) {
        const slotTime = currentDate.add(slot * 2, 'hour');

        // Ensure it's within working hours
        if (slotTime.hour() + Math.ceil(duration / 60) <= workEnd) {
          suggestions.push(slotTime.toDate());
        }
      }
    }

    return suggestions;
  }

  /**
   * Check if a time conflicts with existing events
   */
  async checkTimeConflict(startTime: Date, endTime: Date): Promise<boolean> {
    try {
      const events = await this.getEvents(
        dayjs(startTime).startOf('day').toDate(),
        dayjs(endTime).endOf('day').toDate()
      );

      return events.some(event => {
        return (
          (startTime >= event.startTime && startTime < event.endTime) ||
          (endTime > event.startTime && endTime <= event.endTime) ||
          (startTime <= event.startTime && endTime >= event.endTime)
        );
      });
    } catch (error) {
      console.error('Error checking time conflict:', error);
      return false;
    }
  }
}

export default new CalendarService();
