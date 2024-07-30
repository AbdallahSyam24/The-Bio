import puppeteer, { Page } from "puppeteer";
import Engine from "./_Engine";
const roya = require("../../services/Roya/Roya.controller");
const { getDataURL } = require("../api.poster");

export default class Roya extends Engine {
  constructor(URL: string) {
    super(URL);
  }

  async insert(obj: any) {
    const dataURL = await getDataURL(obj.title);
    obj = { ...obj, dataURL };

    return roya
      .getLastTitle()
      .then((lastTitle: any) => {
        if (lastTitle) {
          if (lastTitle.title != obj.title) {
            roya.create(obj);
          }
        } else {
          roya.create(obj);
        }
      })
      .catch((e: any) => {
        throw e;
      });
  }

  async cssSelector(page: Page) {
    return await page.evaluate(() => {
      const containsHTMLTags = (str: string) => {
        const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
        return htmlTagPattern.test(str);
      };
      return {
        title: [...document.querySelectorAll(".inner_title")].map(
          (title) => title.innerHTML
        )[0],
        body: [...document.querySelectorAll("#readMore_text p")]
          .filter((p) => !containsHTMLTags(p.innerHTML))
          .map((body) => body.innerHTML)
          .join(" ")
          .toString(),
      };
    });
  }
}
