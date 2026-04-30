'use client';

import { useState } from 'react';
import type { RoutePayload } from '@scalar/api-client-react';
import { cn } from '@/lib/cn';

type Props = {
  path: string;
  method: RoutePayload['method'];
};

const API_BASE_URL = 'https://api.hyrelog.com';

export function ScalarPlayground({ path, method }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function runTest() {
    setRunning(true);
    setError('');
    setStatus(null);
    setResponseBody('');

    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
      };

      if (apiKey.trim()) {
        headers.Authorization = `Bearer ${apiKey.trim()}`;
      }

      const res = await fetch(`${API_BASE_URL}${path}`, {
        method: method.toUpperCase(),
        headers,
      });

      setStatus(res.status);

      const text = await res.text();
      setResponseBody(text || '(empty response body)');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown request error';
      setError(message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="not-prose my-4 rounded-xl border bg-fd-card p-3 text-fd-card-foreground">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="inline-flex w-fit rounded bg-fd-primary px-2 py-1 text-xs font-semibold leading-none text-fd-primary-foreground">
        {method.toUpperCase()}
        </span>
        <code className="min-w-0 flex-1 break-all text-[0.8125rem] leading-5 text-fd-muted-foreground sm:break-normal sm:truncate">
          {path}
        </code>
        <button
          type="button"
          disabled={running}
          className={cn(
            'inline-flex w-full items-center justify-center rounded-md bg-fd-primary px-3 py-1.5 text-sm font-medium leading-none text-fd-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto',
          )}
          onClick={runTest}
        >
          {running ? 'Running...' : 'Run Test'}
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        {path !== '/health' ? (
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Optional Bearer API key (required for most /v1 endpoints)"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-primary"
          />
        ) : null}

        {status !== null ? (
          <p className="text-sm">
            <span className="font-medium">Status:</span> {status}
          </p>
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        {responseBody ? (
          <pre className="max-h-72 overflow-auto rounded-md border p-3 text-xs leading-5">
            {responseBody}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
