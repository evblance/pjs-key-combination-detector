const VALID_KEY_COMBO_STRINGS = [
  'wswsadad',
  'wswsadd',
  'wswsaad'
];

/**
 * Triggers the user reward in the UI.
 */
function rewardUser() {
  const reward = document.getElementById('reward');
  reward.classList.add('wrapper--rewarded');
}
