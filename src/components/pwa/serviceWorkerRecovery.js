const STORAGE_KEY = 'devsolar-pwa-recovery-attempted';
const RECOVERY_TIMEOUT_MS = 5 * 60 * 1000;

function readStorage(storage) {
  if (!storage) {
    return { attemptedAt: 0 };
  }

  try {
    const rawValue = storage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return { attemptedAt: 0 };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      attemptedAt:
        typeof parsedValue?.attemptedAt === 'number'
          ? parsedValue.attemptedAt
          : 0,
    };
  } catch (error) {
    return { attemptedAt: 0 };
  }
}

function resolveStorage(storage) {
  if (storage) {
    return storage;
  }

  if (typeof window !== 'undefined' && window.sessionStorage) {
    return window.sessionStorage;
  }

  return null;
}

function shouldAttemptPwaRecovery(storage) {
  const resolvedStorage = resolveStorage(storage);
  const { attemptedAt } = readStorage(resolvedStorage);
  const now = Date.now();

  if (!attemptedAt) {
    return true;
  }

  return now - attemptedAt >= RECOVERY_TIMEOUT_MS;
}

function markPwaRecoveryAttempted(storage) {
  const resolvedStorage = resolveStorage(storage);
  if (!resolvedStorage) {
    return;
  }

  resolvedStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ attemptedAt: Date.now() }),
  );
}

function clearPwaRecoveryAttempted(storage) {
  const resolvedStorage = resolveStorage(storage);
  if (!resolvedStorage) {
    return;
  }

  resolvedStorage.removeItem(STORAGE_KEY);
}

module.exports = {
  STORAGE_KEY,
  RECOVERY_TIMEOUT_MS,
  shouldAttemptPwaRecovery,
  markPwaRecoveryAttempted,
  clearPwaRecoveryAttempted,
};
