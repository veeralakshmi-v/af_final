/**
 * Course Page Service
 * Communicates with backend endpoints to fetch and manage
 * course lesson pages stored directly in MongoDB Atlas.
 */

export async function fetchCoursePagesList(params = {}) {
  try {
    const query = new URLSearchParams({ summary: 'true', ...params }).toString();
    const res = await fetch(`/api/course-pages?${query}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to fetch course pages list from MongoDB:', err);
  }
  return [];
}

export async function fetchCoursePage(id) {
  try {
    const res = await fetch(`/api/course-pages/${encodeURIComponent(id)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Failed to fetch course page "${id}" from MongoDB:`, err);
  }
  return null;
}

export async function seedCoursePagesToDb() {
  try {
    const res = await fetch('/api/course-pages/seed', { method: 'POST' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to trigger course page database sync:', err);
  }
  return { success: false };
}
