import {
  AI_RESPONSE_CONFIG,
  getRandomGenericResponse,
} from "../mock/aiResponses.js";

/**
 * Generate a random delay within the specified range
 * @param {Object} range - Object with min and max delay values
 * @returns {number} Random delay in milliseconds
 */
function getRandomDelay(range) {
  return Math.random() * (range.max - range.min) + range.min;
}

/**
 * Create an AI response message object
 * @param {string} content - The response content
 * @param {boolean} useTypewriter - Whether to use typewriter effect
 * @param {number} messageId - Unique message ID
 * @returns {Object} AI response message object
 */
function createAIResponse(content, useTypewriter = true, messageId) {
  return {
    id: messageId,
    sender: "ai",
    content,
    useTypewriter,
    typewriterSpeed: AI_RESPONSE_CONFIG.TYPEWRITER_SPEED,
    timestamp: new Date(),
  };
}

/**
 * Create a thinking message object
 * @param {number} messageId - Unique message ID
 * @returns {Object} Thinking message object
 */
function createThinkingMessage(messageId) {
  return {
    id: messageId,
    sender: "ai",
    content: "",
    isThinking: true,
    timestamp: new Date(),
  };
}

/**
 * Handle AI response with thinking animation and delay
 * @param {Object} params - Parameters for handling the response
 * @param {string} params.content - The AI response content
 * @param {Function} params.onComplete - Callback when response is ready
 * @param {number} params.messageIdCounter - Current message ID counter
 * @param {Array} params.messages - Messages array to update
 * @param {boolean} params.isMatch - Whether this is a matched response or generic
 * @returns {Object} Object containing the thinking message and delay
 */
export function handleAIResponse({
  content,
  onComplete,
  messageIdCounter,
  messages,
  isMatch = false,
}) {
  // Create thinking message
  const thinkingMessage = createThinkingMessage(messageIdCounter);
  messages.push(thinkingMessage);

  // Determine delay based on whether it's a match or generic response
  const delayRange = isMatch
    ? AI_RESPONSE_CONFIG.DELAYS.MATCH_FOUND
    : AI_RESPONSE_CONFIG.DELAYS.NO_MATCH;

  const delay = getRandomDelay(delayRange);

  // Set timeout to replace thinking with actual response
  setTimeout(() => {
    // Remove thinking message
    const thinkingIndex = messages.findIndex(
      (m) => m.id === thinkingMessage.id
    );
    if (thinkingIndex !== -1) {
      messages.splice(thinkingIndex, 1);
    }

    // Create and add AI response
    const aiResponse = createAIResponse(content, true, messageIdCounter + 1);
    messages.push(aiResponse);

    // Call completion callback if provided
    if (onComplete) {
      onComplete(aiResponse);
    }
  }, delay);

  return {
    thinkingMessage,
    delay,
  };
}

/**
 * Handle generic AI response (when no match found)
 * @param {Object} params - Parameters for handling the response
 * @param {Function} params.onComplete - Callback when response is ready
 * @param {number} params.messageIdCounter - Current message ID counter
 * @param {Array} params.messages - Messages array to update
 * @returns {Object} Object containing the thinking message and delay
 */
export function handleGenericAIResponse({
  onComplete,
  messageIdCounter,
  messages,
}) {
  const genericContent = getRandomGenericResponse();

  return handleAIResponse({
    content: genericContent,
    onComplete,
    messageIdCounter,
    messages,
    isMatch: false,
  });
}
