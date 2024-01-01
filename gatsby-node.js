const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const path = require('path')

const DEV_PAGE = '/dev-404-page/';
const fileRegexp = RegExp('.*.(html|htm)');
const pdfPaths = ['/cv/', '/cv/frontend/', '/cv/backend/']

process.setMaxListeners(0);

const normalizePageName = (pagePath = '') => {
    const normalizedFront = pagePath.startsWith('/') ? pagePath.slice(1) : pagePath;
    const normalizedEnd = normalizedFront.endsWith('/')
        ? normalizedFront.slice(0, -1)
        : normalizedFront;

    const pageName = normalizedEnd == '' ? 'index' : normalizedEnd.replace(/\//g, '-');

    return pageName;
};

const generatePdf = async ({
                               pagePath,
                               outputPath = 'public/exports',
                               filePrefix,
                               pdfOptions = {},
                               styleTagOptions,
                           }) => {
    const currentDir = process.cwd();
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const htmlPath = path.join(currentDir, 'public', pagePath, 'index.html');
    const downloadDir = path.join(currentDir, outputPath);

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
    }

    const contentHtml = fs.readFileSync(htmlPath, 'utf8');
    await page.setContent(contentHtml);

    if (styleTagOptions) {
        await page.addStyleTag({
            content: '.constrainedContent { padding: 0 40px; } .afterPageBreak { padding-top: 40px; } .telephone { display: block; } .download { display: none; }'
        });
    }

    await page.pdf({
        format: 'A4',
        path: path.join(
            downloadDir,
            `matthewmincher-${normalizePageName(pagePath)}.pdf`
        ),
        ...pdfOptions,
    });

    await page.close();
    await browser.close();
};

exports.onPostBuild = async (options, { }) => {
    const pageNodes = options
        .getNodes()
        .map(({ path }) => path)
        .filter((path) => path !== undefined && path !== DEV_PAGE && !fileRegexp.test(path));

    const promises = pdfPaths.map((pagePath) => {
        if (pageNodes.includes(pagePath)) {
            return generatePdf({ pagePath });
        } else {
            console.warn(
                `Page path ${pagePath} for which you want generate PDF does not exist. Check gatsby-plugin-pdf configuration in your gatsby-config.js.`
            );
        }
    });
    await Promise.all(promises);
};