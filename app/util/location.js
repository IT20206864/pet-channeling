/**
 * The API key for accessing Google Maps services.
 * @type {string}
 */
const GOOGLE_API_KEY = 'AIzaSyD11-jGX5pQRjQ5UnDA5pg8tqkL28m4clE';

/**
 * Generates a URL for a static map image centered on the given latitude and longitude.
 * @param {number} lat - The latitude of the center of the map.
 * @param {number} lng - The longitude of the center of the map.
 * @returns {string} The URL of the static map image.
 */
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

/**
 * Retrieves the address associated with the given latitude and longitude.
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @returns {Promise<string>} The address associated with the location.
 * @throws {Error} When the address cannot be fetched.
 */
export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
