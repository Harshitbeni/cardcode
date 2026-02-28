// Character to Card Mapping (with rank values for encryption)
const charToCard = {
  // Uppercase A-M -> Spades 1-13
  'A': { suit: 'spades', rankValue: 1, rank: 'A', symbol: '♠' },
  'B': { suit: 'spades', rankValue: 2, rank: '2', symbol: '♠' },
  'C': { suit: 'spades', rankValue: 3, rank: '3', symbol: '♠' },
  'D': { suit: 'spades', rankValue: 4, rank: '4', symbol: '♠' },
  'E': { suit: 'spades', rankValue: 5, rank: '5', symbol: '♠' },
  'F': { suit: 'spades', rankValue: 6, rank: '6', symbol: '♠' },
  'G': { suit: 'spades', rankValue: 7, rank: '7', symbol: '♠' },
  'H': { suit: 'spades', rankValue: 8, rank: '8', symbol: '♠' },
  'I': { suit: 'spades', rankValue: 9, rank: '9', symbol: '♠' },
  'J': { suit: 'spades', rankValue: 10, rank: '10', symbol: '♠' },
  'K': { suit: 'spades', rankValue: 11, rank: 'J', symbol: '♠' },
  'L': { suit: 'spades', rankValue: 12, rank: 'Q', symbol: '♠' },
  'M': { suit: 'spades', rankValue: 13, rank: 'K', symbol: '♠' },

  // Uppercase N-Z -> Clubs 1-13
  'N': { suit: 'clubs', rankValue: 1, rank: 'A', symbol: '♣' },
  'O': { suit: 'clubs', rankValue: 2, rank: '2', symbol: '♣' },
  'P': { suit: 'clubs', rankValue: 3, rank: '3', symbol: '♣' },
  'Q': { suit: 'clubs', rankValue: 4, rank: '4', symbol: '♣' },
  'R': { suit: 'clubs', rankValue: 5, rank: '5', symbol: '♣' },
  'S': { suit: 'clubs', rankValue: 6, rank: '6', symbol: '♣' },
  'T': { suit: 'clubs', rankValue: 7, rank: '7', symbol: '♣' },
  'U': { suit: 'clubs', rankValue: 8, rank: '8', symbol: '♣' },
  'V': { suit: 'clubs', rankValue: 9, rank: '9', symbol: '♣' },
  'W': { suit: 'clubs', rankValue: 10, rank: '10', symbol: '♣' },
  'X': { suit: 'clubs', rankValue: 11, rank: 'J', symbol: '♣' },
  'Y': { suit: 'clubs', rankValue: 12, rank: 'Q', symbol: '♣' },
  'Z': { suit: 'clubs', rankValue: 13, rank: 'K', symbol: '♣' },

  // Lowercase a-m -> Hearts 1-13
  'a': { suit: 'hearts', rankValue: 1, rank: 'A', symbol: '♥' },
  'b': { suit: 'hearts', rankValue: 2, rank: '2', symbol: '♥' },
  'c': { suit: 'hearts', rankValue: 3, rank: '3', symbol: '♥' },
  'd': { suit: 'hearts', rankValue: 4, rank: '4', symbol: '♥' },
  'e': { suit: 'hearts', rankValue: 5, rank: '5', symbol: '♥' },
  'f': { suit: 'hearts', rankValue: 6, rank: '6', symbol: '♥' },
  'g': { suit: 'hearts', rankValue: 7, rank: '7', symbol: '♥' },
  'h': { suit: 'hearts', rankValue: 8, rank: '8', symbol: '♥' },
  'i': { suit: 'hearts', rankValue: 9, rank: '9', symbol: '♥' },
  'j': { suit: 'hearts', rankValue: 10, rank: '10', symbol: '♥' },
  'k': { suit: 'hearts', rankValue: 11, rank: 'J', symbol: '♥' },
  'l': { suit: 'hearts', rankValue: 12, rank: 'Q', symbol: '♥' },
  'm': { suit: 'hearts', rankValue: 13, rank: 'K', symbol: '♥' },

  // Lowercase n-z -> Diamonds 1-13
  'n': { suit: 'diamonds', rankValue: 1, rank: 'A', symbol: '♦' },
  'o': { suit: 'diamonds', rankValue: 2, rank: '2', symbol: '♦' },
  'p': { suit: 'diamonds', rankValue: 3, rank: '3', symbol: '♦' },
  'q': { suit: 'diamonds', rankValue: 4, rank: '4', symbol: '♦' },
  'r': { suit: 'diamonds', rankValue: 5, rank: '5', symbol: '♦' },
  's': { suit: 'diamonds', rankValue: 6, rank: '6', symbol: '♦' },
  't': { suit: 'diamonds', rankValue: 7, rank: '7', symbol: '♦' },
  'u': { suit: 'diamonds', rankValue: 8, rank: '8', symbol: '♦' },
  'v': { suit: 'diamonds', rankValue: 9, rank: '9', symbol: '♦' },
  'w': { suit: 'diamonds', rankValue: 10, rank: '10', symbol: '♦' },
  'x': { suit: 'diamonds', rankValue: 11, rank: 'J', symbol: '♦' },
  'y': { suit: 'diamonds', rankValue: 12, rank: 'Q', symbol: '♦' },
  'z': { suit: 'diamonds', rankValue: 13, rank: 'K', symbol: '♦' },

  // Special characters
  ' ': { type: 'facedown-sideways' },  // Space -> Card back sideways
  '.': { type: 'facedown' }            // Period -> Card back
};

// Helper: Convert rank number (1-13) to display string
function convertRankNumberToDisplay(num) {
  if (num === 1) return 'A';
  if (num >= 2 && num <= 10) return String(num);
  if (num === 11) return 'J';
  if (num === 12) return 'Q';
  if (num === 13) return 'K';
  return 'A'; // Fallback
}

// Apply encryption to a card
function applyEncryption(cardData, key, level) {
  // Special cards (space, period) are never encrypted
  if (cardData.type) {
    return cardData;
  }

  // No encryption if level 0 or key is 0
  if (level === 0 || key === 0) {
    return cardData;
  }

  let newRankValue = cardData.rankValue;
  const isOddRank = cardData.rankValue % 2 === 1;

  if (level === 1) {
    // Level 1: All shift forward
    newRankValue = ((newRankValue - 1 + key) % 13) + 1;
  } else if (level === 2) {
    // Level 2: Odd ranks forward, Even ranks backward
    if (isOddRank) {
      // Odd ranks (A=1, 3, 5, 7, 9, J=11, K=13) shift forward
      newRankValue = ((newRankValue - 1 + key) % 13) + 1;
    } else {
      // Even ranks (2, 4, 6, 8, 10, Q=12) shift backward
      newRankValue = ((newRankValue - 1 - key + 13) % 13) + 1;
    }
  }

  // Create new card with shifted rank
  return {
    suit: cardData.suit,
    rankValue: newRankValue,
    rank: convertRankNumberToDisplay(newRankValue),
    symbol: cardData.symbol
  };
}

// Encode text into card array with encryption
function encodeText(text, key, level) {
  const cards = [];

  for (let char of text) {
    if (charToCard[char]) {
      const baseCard = charToCard[char];
      const encryptedCard = applyEncryption(baseCard, key, level);
      cards.push(encryptedCard);
    }
    // Silently ignore unmapped characters
  }

  return cards;
}

// Create a card DOM element
function createCardElement(cardData) {
  const card = document.createElement('div');
  card.className = 'card';

  if (cardData.type) {
    // Special card (face down or face down sideways)
    card.classList.add(cardData.type);
  } else {
    // Regular playing card
    card.classList.add(cardData.suit);

    // Add rank
    const rankElement = document.createElement('div');
    rankElement.className = 'card-rank';
    rankElement.textContent = cardData.rank;
    card.appendChild(rankElement);

    // Add suit symbol
    const suitElement = document.createElement('div');
    suitElement.className = 'card-suit';
    suitElement.textContent = cardData.symbol;
    card.appendChild(suitElement);
  }

  return card;
}

// Render cards to the output container
function renderCards(cards) {
  const output = document.getElementById('output');
  output.innerHTML = ''; // Clear previous output

  cards.forEach(cardData => {
    const cardElement = createCardElement(cardData);
    output.appendChild(cardElement);
  });
}

// Get encryption settings from UI
function getEncryptionSettings() {
  const keyInput = document.getElementById('encryption-key');
  const levelRadios = document.getElementsByName('level');

  const key = parseInt(keyInput.value) || 0;
  let level = 0;

  for (const radio of levelRadios) {
    if (radio.checked) {
      level = parseInt(radio.value);
      break;
    }
  }

  return { key, level };
}

// Handle encode button click
function handleEncode() {
  const input = document.getElementById('input');
  const text = input.value;

  if (!text.trim()) {
    return; // Don't encode empty input
  }

  const { key, level } = getEncryptionSettings();
  const cards = encodeText(text, key, level);
  renderCards(cards);
}

// Handle input changes
function handleInputChange() {
  const input = document.getElementById('input');
  const encodeBtn = document.getElementById('encode-btn');

  // Enable/disable encode button based on input
  encodeBtn.disabled = !input.value.trim();

  // Clear output when user starts typing again
  const output = document.getElementById('output');
  if (output.children.length > 0) {
    output.innerHTML = '';
  }
}

// ===== DECODER FUNCTIONS =====

// Build reverse card-to-character mapping
function buildCardToCharMap() {
  const cardToChar = {};

  for (const [char, cardData] of Object.entries(charToCard)) {
    // Skip special characters (space, period)
    if (cardData.type) continue;

    // Build code: rank + first letter of suit (uppercase)
    const code = cardData.rank + cardData.suit[0].toUpperCase();
    cardToChar[code] = char;
  }

  return cardToChar;
}

// Create the reverse mapping
const cardToChar = buildCardToCharMap();

// Parse card codes from a string
function parseCardCodes(text) {
  // Regex to match: rank (A, 2-10, J, Q, K) + suit (H, D, S, C)
  const regex = /(A|[2-9]|10|J|Q|K)([HDSC])/gi;
  const matches = text.matchAll(regex);
  return Array.from(matches, m => m[0].toUpperCase());
}

// Convert rank display string to number (1-13)
function rankToNumber(rank) {
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank);
}

// Get suit name from abbreviation
function getSuitName(suitAbbr) {
  const suits = { 'H': 'hearts', 'D': 'diamonds', 'S': 'spades', 'C': 'clubs' };
  return suits[suitAbbr.toUpperCase()];
}

// Apply decryption to reverse encryption
function applyDecryption(code, key, level) {
  if (level === 0 || key === 0) {
    return code; // No decryption needed
  }

  // Parse the card code (e.g., "8H" -> rank: 8, suit: H)
  const match = code.match(/(A|[2-9]|10|J|Q|K)([HDSC])/i);
  if (!match) return code;

  const [, rankStr, suitAbbr] = match;
  let rankValue = rankToNumber(rankStr);

  // Reverse the encryption
  if (level === 1) {
    // Level 1 encrypted by shifting forward, so decrypt by shifting backward
    rankValue = ((rankValue - 1 - key + 13) % 13) + 1;
  } else if (level === 2) {
    // Level 2: Odd ranks shifted forward, even ranks shifted backward
    // To decrypt, try both directions and verify which one re-encrypts correctly

    // Try shifting backward (reverses forward shift from odd original)
    const shiftedBackward = ((rankValue - 1 - key + 13) % 13) + 1;

    // Try shifting forward (reverses backward shift from even original)
    const shiftedForward = ((rankValue - 1 + key) % 13) + 1;

    // Verify which one re-encrypts back to the current encrypted rank
    // If shiftedBackward is odd, it would encrypt forward
    if (shiftedBackward % 2 === 1) {
      const reEncrypted = ((shiftedBackward - 1 + key) % 13) + 1;
      if (reEncrypted === rankValue) {
        rankValue = shiftedBackward;
      }
    }

    // If shiftedForward is even, it would encrypt backward
    if (shiftedForward % 2 === 0) {
      const reEncrypted = ((shiftedForward - 1 - key + 13) % 13) + 1;
      if (reEncrypted === rankValue) {
        rankValue = shiftedForward;
      }
    }
  }

  // Convert back to card code
  const newRank = convertRankNumberToDisplay(rankValue);
  return newRank + suitAbbr.toUpperCase();
}

// Decode text from card codes
function decodeText(input, key, level) {
  // Split by spaces to get segments
  const segments = input.split(' ');

  return segments.map((segment, index) => {
    // Check if segment is just punctuation
    if (segment === '.' || segment === ',') {
      return segment;
    }

    // Check if segment ends with punctuation
    let trailingPunctuation = '';
    let codeSegment = segment;

    if (segment.endsWith('.') || segment.endsWith(',')) {
      trailingPunctuation = segment.slice(-1);
      codeSegment = segment.slice(0, -1);
    }

    // Parse card codes from the segment (without trailing punctuation)
    const codes = parseCardCodes(codeSegment);

    // Apply decryption if needed, then convert to characters
    const decoded = codes.map(code => {
      const decryptedCode = applyDecryption(code, key, level);
      return cardToChar[decryptedCode] || '';
    }).join('');

    // Append trailing punctuation directly (no space)
    return decoded + trailingPunctuation;
  }).join(' ');
}

// Handle tab switching
function handleTabSwitch(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  // Update content visibility
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-content`);
  });
}

// Get decryption settings from UI
function getDecryptionSettings() {
  const keyInput = document.getElementById('decrypt-key');
  const levelRadios = document.getElementsByName('decrypt-level');

  const key = parseInt(keyInput.value) || 0;
  let level = 0;

  for (const radio of levelRadios) {
    if (radio.checked) {
      level = parseInt(radio.value);
      break;
    }
  }

  return { key, level };
}

// Handle decode button click
function handleDecode() {
  const input = document.getElementById('decode-input');
  const output = document.getElementById('decode-output');

  if (!input.value.trim()) {
    return;
  }

  const { key, level } = getDecryptionSettings();
  const decoded = decodeText(input.value, key, level);
  output.textContent = decoded;
}

// Handle decode input changes
function handleDecodeInputChange() {
  const input = document.getElementById('decode-input');
  const decodeBtn = document.getElementById('decode-btn');

  // Enable/disable button
  decodeBtn.disabled = !input.value.trim();

  // Clear output when typing
  const output = document.getElementById('decode-output');
  if (output.textContent) {
    output.textContent = '';
  }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Encode tab elements
  const input = document.getElementById('input');
  const encodeBtn = document.getElementById('encode-btn');

  // Decode tab elements
  const decodeInput = document.getElementById('decode-input');
  const decodeBtn = document.getElementById('decode-btn');

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      handleTabSwitch(e.target.dataset.tab);
    });
  });

  // Encode button click
  encodeBtn.addEventListener('click', handleEncode);

  // Input changes
  input.addEventListener('input', handleInputChange);

  // Allow Enter key to encode (Ctrl/Cmd + Enter)
  input.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleEncode();
    }
  });

  // Decode button click
  decodeBtn.addEventListener('click', handleDecode);

  // Decode input changes
  decodeInput.addEventListener('input', handleDecodeInputChange);

  // Allow Enter key to decode (Ctrl/Cmd + Enter)
  decodeInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleDecode();
    }
  });
});
