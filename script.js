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

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const encodeBtn = document.getElementById('encode-btn');

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
});
