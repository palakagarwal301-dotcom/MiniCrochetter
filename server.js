const express = require('express');
const path = require('path');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const HOST = '0.0.0.0';
const ROOT = __dirname;

const rewrites = {
  '/shop': '/shop.html',
  '/order': '/order.html',
  '/workshops': '/workshops.html',
};

app.use((req, res, next) => {
  if (rewrites[req.path]) {
    req.url = rewrites[req.path] + (req._parsedUrl.search || '');
  }
  next();
});

app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    !path.extname(req.path) &&
    req.path !== '/' &&
    !req.path.endsWith('/')
  ) {
    const candidate = path.join(ROOT, req.path + '.html');
    res.sendFile(candidate, (err) => {
      if (err) next();
    });
    return;
  }
  next();
});

app.use(
  express.static(ROOT, {
    extensions: ['html'],
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  })
);

app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT, 'index.html'), (err) => {
    if (err) res.status(404).send('Not Found');
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
