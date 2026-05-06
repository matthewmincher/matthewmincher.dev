import puppeteer from "puppeteer";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const exportsDir = resolve(distDir, "exports");

const pages = [
  { path: "/cv/index.html", output: "matthewmincher-cv.pdf" },
  { path: "/cv/backend/index.html", output: "matthewmincher-cv-backend.pdf" },
  {
    path: "/cv/frontend/index.html",
    output: "matthewmincher-cv-frontend.pdf",
  },
];

const printStyles = `
  .constrainedContent { padding: 0 40px; }
  .afterPageBreak { padding-top: 40px; }
  .telephone { display: block; }
  .download { display: none; }
`;

async function buildPdfs() {
  mkdirSync(exportsDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const page of pages) {
    const filePath = resolve(distDir, page.path.replace(/^\//, ""));
    const fileUrl = `file://${filePath}`;
    const outputPath = resolve(exportsDir, page.output);

    const tab = await browser.newPage();
    await tab.goto(fileUrl, { waitUntil: "networkidle0" });
    await tab.addStyleTag({ content: printStyles });
    await tab.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });
    await tab.close();

    console.log(`Generated ${page.output}`);
  }

  await browser.close();
}

buildPdfs();
