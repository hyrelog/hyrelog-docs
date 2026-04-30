import { createOpenAPI } from 'fumadocs-openapi/server';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { ScalarPlayground } from '@/components/scalar-playground';
import { createElement } from 'react';
import type { RoutePayload } from '@scalar/api-client-react';

export const openapi = createOpenAPI({
  input: ['https://api.hyrelog.com/openapi.json'],
});

export const APIPage = createAPIPage(openapi, {
  playground: {
    render(props) {
      const method =
        props.method.method === 'query'
          ? 'get'
          : (props.method.method as RoutePayload['method']);
      return createElement(ScalarPlayground, {
        path: props.path,
        method,
        spec: props.ctx.schema.bundled as Record<string, unknown>,
      });
    },
  },
});
