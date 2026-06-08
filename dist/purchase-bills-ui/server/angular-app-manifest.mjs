
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/purchase-info"
  },
  {
    "renderMode": 0,
    "route": "/purchase-info/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5185, hash: 'c72499f1da14b20e365c0aec7b6d3e6e954864f5c7de4a78ba0bfa7253609eab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5419, hash: '975a78b18d1608c19e28c1c6f941daa887480bdbc5d18f3c8819a222ee234631', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'purchase-info/index.html': {size: 28411, hash: '7686e04a39c0b480432c802dd6544314b3e73a96ae994bd3efa4e74809505410', text: () => import('./assets-chunks/purchase-info_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 39010, hash: '4b6c0a3cfd0d6ebac615f4fa81ce148a926abd683c5f5c765d5a90e427bd9da2', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-KL5CKDZM.css': {size: 501, hash: 'll1HCpwvRDg', text: () => import('./assets-chunks/styles-KL5CKDZM_css.mjs').then(m => m.default)}
  },
};
