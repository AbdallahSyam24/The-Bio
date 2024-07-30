import puppeteer, { Page } from "puppeteer";

export default abstract class Engine {
  URL: string;
  constructor(URL: string) {
    this.URL = URL;
  }

  public async handle(): Promise<object> {
    console.log("\nFetching content...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.URL, { waitUntil: "networkidle2" });
    const data = await this.cssSelector(page);
    await browser.close();

    console.log("Done fetching content");
    return data;
  }

  public abstract insert(obj: object): object;
  public abstract cssSelector(page: Page): Promise<object>;
}
