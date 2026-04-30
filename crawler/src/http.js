import axios from 'axios';
import pLimit from 'p-limit';
import {
  BASE_URL,
  USER_AGENT,
  REQUEST_TIMEOUT_MS,
  MIN_REQUEST_DELAY_MS,
  REQUEST_CONCURRENCY,
  MAX_RETRIES,
} from './config.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const limit = pLimit(REQUEST_CONCURRENCY);
let lastRequestAt = 0;

async function pacedRequest(fn) {
  return limit(async () => {
    const now = Date.now();
    const wait = Math.max(0, lastRequestAt + MIN_REQUEST_DELAY_MS - now);
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();
    return fn();
  });
}

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'User-Agent': USER_AGENT,
    Accept: 'application/json, */*',
  },
  validateStatus: (s) => s >= 200 && s < 400,
});

function shouldRetry(error) {
  if (!error.response) return true;
  const status = error.response.status;
  return status >= 500 || status === 429;
}

async function withRetry(fn, label) {
  let attempt = 0;
  let lastErr;
  while (attempt <= MAX_RETRIES) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === MAX_RETRIES || !shouldRetry(err)) break;
      const backoff = 1000 * Math.pow(2, attempt);
      console.warn(
        `  ! ${label} failed (${err.response?.status ?? err.code ?? err.message}), retry in ${backoff}ms`,
      );
      await sleep(backoff);
      attempt += 1;
    }
  }
  throw lastErr;
}

export async function getJson(url, params) {
  return pacedRequest(() =>
    withRetry(async () => {
      const res = await http.get(url, { params });
      return res.data;
    }, `GET ${url}`),
  );
}

export async function getStream(url) {
  return pacedRequest(() =>
    withRetry(async () => {
      const res = await http.get(url, { responseType: 'stream' });
      return res;
    }, `GET ${url}`),
  );
}
