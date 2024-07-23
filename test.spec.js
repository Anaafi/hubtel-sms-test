const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("chromedriver");

describe("Hubtel SMS Automation Tests", function () {
  this.timeout(35000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 3000 });
  });

  after(async function () {
    await driver.quit();
  });

  it("Verify Hero Page Elements", async function () {
    await driver.get("https://explore.hubtel.com/bulk-sms-ghana/");
    await driver.wait(until.elementLocated(By.css(".reach-customers")), 15000);

    let image = await driver.findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/main/section[1]/div/div/div[2]/div/img"
      )
    );
    let mainTextContainer = await driver.findElement(
      By.xpath("/html/body/div[3]/div[3]/div/main/section[1]/div/div/div[1]")
    );
    let title = await mainTextContainer.findElement(By.xpath("./h2"));
    let subTitle = await mainTextContainer.findElement(By.xpath("./p"));
    let button = await mainTextContainer.findElement(By.xpath("./div"));

    assert(image, "No image found");
    assert(title, "No main title found");
    assert(subTitle, "No main subtitle found");
    assert(button, "No button found");
  });

  it("Verify SMS and Money video link", async function () {
    await driver.get("https://explore.hubtel.com/bulk-sms-ghana/");
    await driver.wait(
      until.elementLocated(
        By.xpath('//*[@id="learn"]/div/div[2]/div[1]/div/div[2]')
      ),
      10000
    );

    let videoLink = await driver.findElement(
      By.xpath('//*[@id="learn"]/div/div[2]/div[1]/div/div[2]/a')
    );

    assert(videoLink, "No video link found");
  });

  it("Verify why you should choose hubtel cards", async function () {
    await driver.get("https://explore.hubtel.com/bulk-sms-ghana/");
    await driver.wait(until.elementLocated(By.css(".col-md-9")), 10000);

    let card = await driver.findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/main/section[4]/div/div/div/div[2]/div/div[2]/div"
      )
    );

    assert(card, "No card found");
  });

  it("verify SMS Pricing table", async function () {
    await driver.get("https://explore.hubtel.com/bulk-sms-ghana/");
    await driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div[3]/div[3]/div/main/section[5]")
      ),
      10000
    );

    let pricingTable = await driver.findElement(
      By.xpath('//*[@id="main-content"]')
    );
    let headers = await pricingTable.findElements(By.css("th"));

    assert(pricingTable, "No Pricing Table found");
    assert(headers.length > 0, "No headers found in the pricing table");
  });
});
