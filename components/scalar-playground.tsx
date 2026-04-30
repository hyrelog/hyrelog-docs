'use client';

import { useApiClient } from '@scalar/api-client-react';
import type { RoutePayload } from '@scalar/api-client-react';
import { cn } from '@/lib/cn';

type Props = {
  path: string;
  method: RoutePayload['method'];
  spec: Record<string, unknown>;
};

const OPENAPI_DOC_ID = 'hyrelog-openapi';

export function ScalarPlayground({ path, method, spec }: Props) {
  const client = useApiClient({
    configuration: {
      theme: 'moon',
      url: OPENAPI_DOC_ID,
      content: spec,
      showSidebar: true,
    },
  });

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
          disabled={!client}
          className={cn(
            'inline-flex w-full items-center justify-center rounded-md bg-fd-primary px-3 py-1.5 text-sm font-medium leading-none text-fd-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto',
          )}
          onClick={() => client?.open({ path, method })}
        >
          {client ? 'Test' : 'Loading...'}
        </button>
      </div>
    </div>
  );
}
