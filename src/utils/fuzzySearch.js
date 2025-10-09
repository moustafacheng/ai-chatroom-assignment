import Fuse from "fuse.js";

/**
 * Fuzzy search function to find the best matching key in MESSAGE_MOCK_MAP
 * @param {string} query - The user's input query
 * @param {Object} messageMap - The MESSAGE_MOCK_MAP object
 * @returns {Object|null} - The matching message object or null if no match found
 */
export function findBestMatch(query, messageMap) {
  const keys = Object.keys(messageMap);

  // Create a Fuse instance for fuzzy searching
  const fuse = new Fuse(keys, {
    threshold: 0.1, // Lower threshold means more strict matching
    distance: 100, // Maximum distance for a match
    keys: [""], // We're searching the keys directly
  });

  // Search for the best match
  const results = fuse.search(query);

  // If we found a match, return the corresponding message
  if (results.length > 0) {
    const matchedKey = results[0].item;
    return {
      key: matchedKey,
      message: messageMap[matchedKey].message,
      score: results[0].score,
    };
  }

  return null;
}
