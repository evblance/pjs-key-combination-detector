const VALID_KEY_COMBO_STRINGS = [
  'wswsadad',
  'wswsadd',
  'wswsaad'
];

// The maximum millisecond time interval allowed between key combo keypresses
const MAX_KEY_COMBO_TIME_INTERVAL = 300;

// The millisecond duration for which to show the user's reward
const REWARD_SHOW_DURATION = 1000;

// We need to manage key combinations based on time between keypresses
let keyComboTimeoutId = undefined;

// We need to track the user's keypresses between 
const currentKeyCombo = [];

/**
 * Returns true if a valid key combination has been logged.
 */
function userKeyComboIsValid() {
  return VALID_KEY_COMBO_STRINGS.includes(currentKeyCombo.join(''));
}

/**
 * Triggers actions based on the key combination on key combo timeout
 * and resets the key combo array.
 */
function handleKeypressTimeout() {
  if (userKeyComboIsValid()) {
   rewardUser();
  }
  currentKeyCombo.splice(0, currentKeyCombo.length);
}

/**
 * Shows and hides the user reward in the UI.
 */
function peekUserReward() {
  const reward = document.getElementById('reward');
  reward.classList.add('wrapper--rewarded');
  setTimeout(() => {
    reward.classList.remove('wrapper--rewarded');
  }, 1000);
}

/**
 * Triggers the user reward in the UI.
 */
function rewardUser() {
  peekUserReward();
}

/**
 * Refreshes the key combination timeout.
 */
function refreshKeyComboTimeout() {
  if (keyComboTimeoutId) {
    clearTimeout(keyComboTimeoutId);
  }
  keyComboTimeoutId = setTimeout(handleKeypressTimeout, MAX_KEY_COMBO_TIME_INTERVAL);
}

/**
 * Handles user keypress app functionality.
 * @param {any} event The keypress event.
 */
function handleUserKeypress(event) {
  // We refresh the key combo timeout to prevent evaluation until a user has entered the desired sequence
  refreshKeyComboTimeout();
  // Log the keypress into the key combo array
  currentKeyCombo.push(event.key);
};

document.addEventListener('keypress', handleUserKeypress);
