import { Page } from "puppeteer";
import Engine from "./_Engine";
const aljazeera = require("../../services/AlJazeera/AlJazeera.controller");

export default class AlJazeera extends Engine {
  constructor(URL: string) {
    super(URL);
  }

  insert(obj: any) {
    return aljazeera
      .getLastTitle()
      .then((lastTitle: any) => {
        if (lastTitle) {
          if (lastTitle.title != obj.title) {
            aljazeera.create(obj);
          }
        } else {
          aljazeera.create(obj);
        }
      })
      .catch((e: any) => {
        throw e;
      });
  }

  async cssSelector(page: Page) {
    return await page.evaluate(() => {
      return {
        title: { ...document.querySelectorAll(".article-header h1") }.forEach(
          (title) => title.innerHTML
        ),

        body: { ...document.querySelectorAll(".wysiwyg  p") }.forEach(
          (body) => {
            body.innerHTML.replace(/<\/?[^>]+(>|$)/gi, "");
            body.innerHTML.replace("&nbsp;", " ");
          }
        ),
      };
    });
  }
}
