/**
 * Truncate text if it exceeds maxLength
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Truncated text with "..." if exceeded
 */
export const truncate = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};