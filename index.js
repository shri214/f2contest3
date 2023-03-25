var fs = require("fs");
var puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.github.com/trending");
  await page.waitForSelector(".Box-row");
  let repo = await page.evaluate(() => {
    let repositories = {};
    let ans = [];
    let a = Array.from(document.querySelectorAll(".Box-row"));
    a.forEach((ele, i) => {
      let tit = ele.querySelectorAll("h1")[0].textContent.trim();
      let dis = ele.querySelectorAll("p")[0].textContent.trim();
      let url = ele.querySelectorAll(".h3 a")[0].getAttribute("href");
      let stars = ele
        .querySelectorAll(".color-fg-muted ")[2]
        .querySelectorAll("a")[0]
        .textContent.trim();
      let forks = ele
        .querySelectorAll(".color-fg-muted ")[2]
        .querySelectorAll("a")[1]
        .textContent.trim();
      let languages = ele
        .querySelectorAll(".color-fg-muted ")[2]
        .querySelectorAll("span")[0]
        .textContent.trim();
      let obj = {
        title: tit,
        description: dis,
        url: url,
        star: stars,
        fork: forks,
        language: languages,
      };
      ans.push(obj);
    });
    repositories["repositories"] = ans;
    return repositories;
  });
  const json_data = JSON.stringify(repo);
  //   fs.writeFile("json1.json", json_data, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("done");
  //     }
  //   });
  fs.readFile("json1.json", "utf-8", (err, data) => {
    const org_data = JSON.parse(data);
    console.log(org_data);
  });
})();
