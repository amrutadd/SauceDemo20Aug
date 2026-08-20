import{test, chromium}from '@playwright/test';

test("TC for SauceDemo Application", async()=>{

    const browser = await chromium.launch({headless : false});
    const page =await browser.newPage();
    await page.goto("https://www.saucedemo.com/")

    await page.locator("//input[@id='user-name']").fill("standard_user");
    await page.locator("//input[@id='password']").fill("secret_sauce");
    await page.locator("//input[@id='login-button']").click();

})