const test = require('node:test');
const assert = require('node:assert/strict');

const {
  shouldAttemptPwaRecovery,
  markPwaRecoveryAttempted,
  clearPwaRecoveryAttempted,
  shouldShowPwaRecoveryNotice,
} = require('../../src/components/pwa/serviceWorkerRecovery.js');

function createStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

test('shouldAttemptPwaRecovery allows a single recovery pass per session', () => {
  const storage = createStorage();

  assert.equal(shouldAttemptPwaRecovery(storage), true);
  markPwaRecoveryAttempted(storage);
  assert.equal(shouldAttemptPwaRecovery(storage), false);
});

test('markPwaRecoveryAttempted stores the guard flag', () => {
  const storage = createStorage();

  markPwaRecoveryAttempted(storage);

  const guardValue = storage.getItem('devsolar-pwa-recovery-attempted');
  const parsed = JSON.parse(guardValue);

  assert.equal(typeof parsed.attemptedAt, 'number');
  assert.ok(parsed.attemptedAt > 0);
});

test('shouldShowPwaRecoveryNotice only triggers in standalone PWA mode', () => {
  const standaloneWindow = {
    matchMedia: () => ({ matches: true }),
    navigator: { standalone: true },
  };

  const browserWindow = {
    matchMedia: () => ({ matches: false }),
    navigator: { standalone: false },
  };

  assert.equal(shouldShowPwaRecoveryNotice(standaloneWindow), true);
  assert.equal(shouldShowPwaRecoveryNotice(browserWindow), false);

  clearPwaRecoveryAttempted();
});
