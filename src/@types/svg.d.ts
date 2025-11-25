/// <reference types="vite/client" />

// This tells TypeScript what to do with SVGs imported with ?react
declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

// (Optional) This is for importing SVGs as URLs
declare module '*.svg' {
  const src: string;
  export default src;
}
