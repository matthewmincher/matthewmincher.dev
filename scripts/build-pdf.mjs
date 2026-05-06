import puppeteer from "puppeteer";
import { createServer } from "http";
import { mkdirSync, readFileSync, existsSync } from "fs";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const exportsDir = resolve(distDir, "exports");

const pages = [
  { path: "/cv/", output: "matthewmincher-cv.pdf" },
  { path: "/cv/backend/", output: "matthewmincher-cv-backend.pdf" },
  { path: "/cv/frontend/", output: "matthewmincher-cv-frontend.pdf" },
];

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const printStyles = `
  html { font-size: 80%; }
  .afterPageBreak { padding-top: 40px; }
`;

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = req.url.split("?")[0];
      if (filePath.endsWith("/")) filePath += "index.html";

      const fullPath = `${distDir}${filePath}`;
      if (!existsSync(fullPath)) {
        res.writeHead(404);
        res.end();
        return;
      }

      const ext = extname(fullPath);
      const contentType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(readFileSync(fullPath));
    });

    server.listen(0, "127.0.0.1", () => {
      resolve(server);
    });
  });
}

async function launchBrowser() {
  const args = ["--no-sandbox", "--disable-setuid-sandbox"];
  try {
    return await puppeteer.launch({ headless: "shell", args });
  } catch {
    console.log("Bundled Chrome failed, falling back to system Chrome...");
    return await puppeteer.launch({ headless: true, channel: "chrome", args });
  }
}

async function buildPdfs() {
  mkdirSync(exportsDir, { recursive: true });

  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    console.warn(`Skipping PDF generation: ${err.message}`);
    return;
  }

  const server = await startServer();
  const port = server.address().port;

  for (const page of pages) {
    const url = `http://127.0.0.1:${port}${page.path}`;
    const outputPath = resolve(exportsDir, page.output);

    const tab = await browser.newPage();
    await tab.goto(url, { waitUntil: "networkidle0" });
    await tab.emulateMediaType("print");
    await tab.addStyleTag({ content: printStyles });
    await tab.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    await tab.close();

    console.log(`Generated ${page.output}`);
  }

  await browser.close();
  server.close();
}

buildPdfs();
