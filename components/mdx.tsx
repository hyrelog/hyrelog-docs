import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  EndpointAPIReference,
  EventsAPIReference,
  ExportsAPIReference,
  FullAPIReference,
  KeysAPIReference,
  WebhooksAPIReference,
} from './api-reference';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    FullAPIReference,
    EndpointAPIReference,
    EventsAPIReference,
    WebhooksAPIReference,
    ExportsAPIReference,
    KeysAPIReference,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
