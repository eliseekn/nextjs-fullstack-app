
//https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/index.tsx
export const fetcher = (url: string) => fetch(url).then((res) => res.json())