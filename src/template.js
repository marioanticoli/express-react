const template = ({ body, title }) => (
  `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>

    <body>
      <div id="root">${body}</div>
    </body>

    <script src="/assets/bundle.js"></script>
  </html>`
);

export default template;
