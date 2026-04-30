import { APIPage } from '@/lib/openapi';
import type { HttpMethods } from 'fumadocs-openapi';

const OPENAPI_DOCUMENT = 'https://api.hyrelog.com/openapi.json';

export function FullAPIReference() {
  return <APIPage document={OPENAPI_DOCUMENT} />;
}

export function EndpointAPIReference({
  path,
  method,
}: {
  path: string;
  method: HttpMethods;
}) {
  return <APIPage document={OPENAPI_DOCUMENT} operations={[{ path, method }]} />;
}

export function EventsAPIReference() {
  return (
    <APIPage
      document={OPENAPI_DOCUMENT}
      operations={[
        { path: '/v1/events', method: 'post' },
        { path: '/v1/events', method: 'get' },
      ]}
    />
  );
}

export function WebhooksAPIReference() {
  return (
    <APIPage
      document={OPENAPI_DOCUMENT}
      operations={[
        { path: '/v1/workspaces/{workspaceId}/webhooks', method: 'post' },
        { path: '/v1/workspaces/{workspaceId}/webhooks', method: 'get' },
        { path: '/v1/webhooks/{webhookId}/disable', method: 'post' },
        { path: '/v1/webhooks/{webhookId}/enable', method: 'post' },
        { path: '/v1/webhooks/{webhookId}/deliveries', method: 'get' },
      ]}
    />
  );
}

export function ExportsAPIReference() {
  return (
    <APIPage
      document={OPENAPI_DOCUMENT}
      operations={[
        { path: '/v1/exports', method: 'post' },
        { path: '/v1/exports/{jobId}', method: 'get' },
        { path: '/v1/exports/{jobId}/download', method: 'get' },
      ]}
    />
  );
}

export function KeysAPIReference() {
  return (
    <APIPage
      document={OPENAPI_DOCUMENT}
      operations={[
        { path: '/v1/workspaces/{workspaceId}/keys', method: 'post' },
        { path: '/v1/keys/{keyId}/rotate', method: 'post' },
        { path: '/v1/keys/status', method: 'get' },
      ]}
    />
  );
}
