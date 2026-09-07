const test = require('node:test');
const assert = require('node:assert/strict');

const {
  shouldAttemptPwaRecovery,
  markPwaRecoveryAttempted,
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
