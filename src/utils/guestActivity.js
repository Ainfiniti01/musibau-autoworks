// frontend/src/utils/guestActivity.js

const GUEST_ACTIVITY_KEY = 'guestActivity';

/**
 * Retrieves all guest activities from local storage.
 * @returns {Array} An array of guest activity objects.
 */
export const getGuestActivities = () => {
  try {
    const activities = localStorage.getItem(GUEST_ACTIVITY_KEY);
    return activities ? JSON.parse(activities) : [];
  } catch (error) {
    console.error("Error retrieving guest activities from local storage:", error);
    return [];
  }
};

/**
 * Adds a new guest activity to local storage.
 * @param {object} activity - The guest activity object to add.
 */
export const addGuestActivity = (activity) => {
  try {
    const activities = getGuestActivities();
    activities.push({ ...activity, timestamp: new Date().toISOString() });
    localStorage.setItem(GUEST_ACTIVITY_KEY, JSON.stringify(activities));
  } catch (error) {
    console.error("Error adding guest activity to local storage:", error);
  }
};

/**
 * Clears all guest activities from local storage.
 */
export const clearGuestActivities = () => {
  try {
    localStorage.removeItem(GUEST_ACTIVITY_KEY);
  } catch (error) {
    console.error("Error clearing guest activities from local storage:", error);
  }
};

/**
 * Example guest data structure:
 * {
 *   type: 'booking', // or 'product_view', 'inquiry', etc.
 *   details: {
 *     service: 'Tire Repair',
 *     date: '2025-08-10',
 *     // other relevant details
 *   },
 *   timestamp: '2025-08-08T12:00:00.000Z'
 * }
 */

/**
 * Generates initials from a given name.
 * @param {string} name - The full name of the person.
 * @returns {string} The initials of the name.
 */
export const getInitials = (name) => {
  if (!name) return '';
  const nameParts = name.split(' ').filter(part => part.length > 0);
  if (nameParts.length === 0) return '';
  
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};
