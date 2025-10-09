/**
 * Generic AI responses for when user input doesn't match predefined queries
 * These responses help guide users toward topics the AI can actually help with
 */
export const GENERIC_AI_RESPONSES = [
  "I'm sorry, I don't have specific information about that topic. Could you try asking about medical supplies, gloves, ultrasound gel, antibiotic ointments, or surgical scissors?",
  "Hmm, I'm not sure about that one. I'm specialized in helping with medical supplies and equipment. Try asking me about gloves, ultrasound gel, antibiotic ointments, or surgical instruments!",
  "That's outside my area of expertise. I'm here to help you find the best medical supplies and equipment. What can I help you find today?",
  "I don't have information on that topic, but I'd be happy to help you with medical supplies! Ask me about gloves, ultrasound products, antibiotics, or surgical tools.",
  "Sorry, I can't help with that particular question. I'm designed to assist with medical supply inquiries. Try asking about gloves, ultrasound gel, ointments, or surgical equipment!",
  "I'm not familiar with that topic, but I'm great at finding medical supplies and equipment. What medical products are you looking for?",
  "That's not something I can help with, but I'm here to assist with your medical supply needs. Ask me about gloves, ultrasound gel, antibiotic ointments, or surgical scissors!",
];

/**
 * Get a random generic response
 * @returns {string} A randomly selected generic AI response
 */
export function getRandomGenericResponse() {
  return GENERIC_AI_RESPONSES[
    Math.floor(Math.random() * GENERIC_AI_RESPONSES.length)
  ];
}

/**
 * Configuration for AI response behavior
 */
export const AI_RESPONSE_CONFIG = {
  // Delay ranges in milliseconds
  DELAYS: {
    MATCH_FOUND: { min: 2000, max: 5000 }, // 2-5 seconds for matched responses
    NO_MATCH: { min: 2000, max: 5000 }, // 2-5 seconds for generic responses
  },
  // Typewriter effect speed
  TYPEWRITER_SPEED: 15, // milliseconds per character
};
