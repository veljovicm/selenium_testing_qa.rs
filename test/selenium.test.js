"use strict"

require("chromedriver");
const webdriver = require("selenium-webdriver");
const{ By, Key, until } = require("selenium-webdriver");

const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

describe("Selenium test", function(){
    let driver;

    before(function() {
         driver = new webdriver.Builder().forBrowser("chrome").build();
    });

    after(async function(){
          await driver.quit();
    });

    it("Open qa.rs website", async function(){
            await driver.get("https://www.qa.rs");

            const pageTitle = await driver.getTitle();
            expect(pageTitle).to.contain("QA.rs"); // expect or assert.equal
            assert.equal(pageTitle,'Edukacija za QA testere - QA.rs'); 
    });

    it("Open google.com", async function(){
         await driver.get("https://google.com");
         const pageTitle = await driver.getTitle();
         expect(pageTitle).to.contain("Google");
    });

    it("Perform a search on Google", async function(){
        expect(await driver.getTitle()).to.contain("Google");

        const inputSearch = await driver.findElement(By.name("q")); 
        inputSearch.click();
        inputSearch.sendKeys("qa.rs", Key.ENTER);

        await driver.wait(until.elementLocated(By.id("search")));
        expect(await driver.getTitle()).to.contain("qa.rs");
        
    });

    it("Go to next page of search resluts", async function(){
        expect(await driver.getTitle()).to.contain("qa.rs");
        const navigation = await driver.findElement(By.xpath('(//div[@role="navigation"])[2]'));
        const nextPage = navigation.findElement(By.id("pnnext"));
        nextPage.click();
        await driver.wait(until.elementLocated(By.id("search")));
        expect(await driver.getTitle()).to.contain("qa.rs");

    });
});