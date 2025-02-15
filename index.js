import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank pag
  const browser = await puppeteer.launch({
      browserURL: 'http://localhost:9226', // Connects to the existing browser
      defaultViewport: null
  });

  const page = await browser.newPage();
  // const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  // const page = await browser.newPage();
  page.on('request', request => {
    try {
      if (request.resourceType() === 'fetch') {
        console.log(request.url());
      }
    } catch (error) {
      console.error('Error handling request:', error);
    }
  });

  page.on('response', async response => {
    try {
      if (response.request().resourceType() === 'fetch') {
        console.log(response.url());
        const responseBody = await response.text();
        console.log(responseBody);
      }
    } catch (error) {
      console.error('Error handling response:', error);
    }
  });

  // Wait for the user to manually fill in the URL and login
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
})();