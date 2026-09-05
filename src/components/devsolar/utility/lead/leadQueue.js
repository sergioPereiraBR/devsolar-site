const STORAGE_KEY = 'devsolar_lead_queue_v1';
const MAX_QUEUE_ITEMS = 50;

export function readLeadQueue() {
  if (typeof window === 'undefined') return [];

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Não foi possível ler a fila de leads local:', error);
    return [];
  }
}

export function saveLeadQueue(queue) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.warn('Não foi possível persistir a fila de leads local:', error);
  }
}

export function enqueueLead(leadData) {
  const queue = readLeadQueue();
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    payload: leadData,
  };

  const nextQueue = [...queue, item].slice(-MAX_QUEUE_ITEMS);
  saveLeadQueue(nextQueue);
  return item;
}

export function removeQueuedLead(id) {
  const queue = readLeadQueue();
  const nextQueue = queue.filter((item) => item.id !== id);
  saveLeadQueue(nextQueue);
  return nextQueue;
}

export async function flushPendingLeads({ sendFn }) {
  if (typeof window === 'undefined' || !navigator.onLine) {
    return { sent: 0, remaining: 0 };
  }

  if (typeof sendFn !== 'function') {
    return { sent: 0, remaining: 0 };
  }

  const queue = readLeadQueue();
  if (!queue.length) {
    return { sent: 0, remaining: 0 };
  }

  let sent = 0;
  const remaining = [];

  for (const item of queue) {
    try {
      const result = await sendFn(item.payload);
      if (result && result.success === true) {
        sent += 1;
      } else {
        remaining.push(item);
      }
    } catch (error) {
      console.warn('Falha ao reenviar lead em fila:', error);
      remaining.push(item);
    }
  }

  if (remaining.length !== queue.length) {
    saveLeadQueue(remaining);
  } else if (remaining.length > 0) {
    saveLeadQueue(remaining);
  } else {
    saveLeadQueue([]);
  }

  return { sent, remaining: remaining.length };
}

export function startLeadQueueSync({ sendFn }) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const flush = () => {
    if (navigator.onLine) {
      flushPendingLeads({ sendFn }).catch((error) => {
        console.warn('Erro ao sincronizar fila de leads:', error);
      });
    }
  };

  flush();
  window.addEventListener('online', flush);

  return () => {
    window.removeEventListener('online', flush);
  };
}
