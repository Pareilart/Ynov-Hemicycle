/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Application } from 'express';
import { createServiceLogger } from './logger';

// Types
interface RouteInfo {
  method: string;
  path: string;
}

interface Layer {
  route?: {
    path: string;
    methods: Record<string, boolean>;
  };
  handle?: {
    stack?: Layer[];
  };
  name?: string;
  regexp?: RegExp;
}

// Constants
const HTTP_COLORS = {
  GET: '32', // Green
  POST: '33', // Yellow
  PUT: '34', // Blue
  PATCH: '35', // Magenta
  DELETE: '31', // Red
  DEFAULT: '37', // White
} as const;

const REGEX_PATTERNS = [
  /^\/\^\\\?(.*?)\\\?\$\//, // Pattern 1: /^\?(path)?\$/
  /^\/\^(.*?)\$\//, // Pattern 2: /^(path)$/
  /^\/\^(.*?)\?\(\?=/, // Pattern 3: /^(path)?(?= (fixed escape)
];

const SEPARATORS = {
  top: { left: '┌', right: '┐', middle: '┬' },
  middle: { left: '├', right: '┤', middle: '┼' },
  bottom: { left: '└', right: '┘', middle: '┴' },
} as const;

const routeLogger = createServiceLogger('routes');

// Utility functions
function extractPathFromRegex(regexStr: string): string {
  for (const pattern of REGEX_PATTERNS) {
    const match = regexStr.match(pattern);
    if (match) {
      let path = match[1].replace(/\\\//g, '/'); // Convert \/ to /

      // Ensure path starts with / if not empty
      if (path && !path.startsWith('/')) {
        path = `/${path}`;
      }

      return path;
    }
  }
  return '';
}

function isValidRouter(layer: Layer): boolean {
  return layer.name === 'router'
         && layer.handle?.stack !== undefined
         && layer.regexp !== undefined;
}

function getMethodColor(method: string): string {
  const upperMethod = method.toUpperCase() as keyof typeof HTTP_COLORS;
  return HTTP_COLORS[upperMethod] || HTTP_COLORS.DEFAULT;
}

function createSeparator(
  methodLength: number,
  pathLength: number,
  type: keyof typeof SEPARATORS,
): string {
  const chars = SEPARATORS[type];
  return chars.left
         + '─'.repeat(methodLength + 2)
         + chars.middle
         + '─'.repeat(pathLength + 2)
         + chars.right;
}

// Main extraction logic
function extractRoutesFromRouter(
  router: { stack?: Layer[] },
  basePath = '',
): RouteInfo[] {
  const routes: RouteInfo[] = [];

  if (!router?.stack) return routes;

  for (const layer of router.stack) {
    if (layer.route) {
      // Direct route
      const methods = Object.keys(layer.route.methods);
      for (const method of methods) {
        const fullPath = basePath + layer.route.path;
        const cleanedPath = fullPath.replace(/\/+/g, '/');

        routes.push({
          method: method.toUpperCase(),
          path: cleanedPath,
        });
      }
    } else if (isValidRouter(layer)) {
      // Sub-router
      const subPath = layer.regexp ? extractPathFromRegex(layer.regexp.toString()) : '';
      const nestedRoutes = extractRoutesFromRouter(layer.handle!, basePath + subPath);
      routes.push(...nestedRoutes);
    }
  }

  return routes;
}

function formatRoutes(routes: RouteInfo[]): void {
  if (routes.length === 0) {
    routeLogger.info('No routes found');
    return;
  }

  // Sort routes by path, then by method
  const sortedRoutes = routes.sort((a, b) => (
    a.path === b.path ? a.method.localeCompare(b.method) : a.path.localeCompare(b.path)
  ));

  // Calculate column widths
  const maxMethodLength = Math.max(
    ...sortedRoutes.map((r) => r.method.length),
    'Method'.length,
  );
  const maxPathLength = Math.max(
    ...sortedRoutes.map((r) => r.path.length),
    'Endpoint'.length,
  );

  console.log('\n📍 Available routes:');
  console.log(createSeparator(maxMethodLength, maxPathLength, 'top'));
  console.log(`│ ${'Method'.padEnd(maxMethodLength)} │ ${'Endpoint'.padEnd(maxPathLength)} │`);
  console.log(createSeparator(maxMethodLength, maxPathLength, 'middle'));

  sortedRoutes.forEach((route) => {
    const methodColor = getMethodColor(route.method);
    const formattedMethod = `\x1b[${methodColor}m${route.method.padEnd(maxMethodLength)}\x1b[0m`;
    const formattedPath = route.path.padEnd(maxPathLength);
    console.log(`│ ${formattedMethod} │ ${formattedPath} │`);
  });

  console.log(createSeparator(maxMethodLength, maxPathLength, 'bottom'));
  console.log(`\n✨ Total: ${routes.length} route(s) available\n`);
}

// Public API
export function logRoutes(app: Application): void {
  try {
    const routes = extractRoutesFromRouter((app as any)._router);
    formatRoutes(routes);

    routeLogger.info(`Routes extraction completed - ${routes.length} routes found`);
  } catch (error) {
    routeLogger.error('Error extracting routes', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default { logRoutes };
