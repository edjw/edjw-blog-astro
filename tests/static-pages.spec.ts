import { test, expect } from "@playwright/test";

test.describe("Static Pages", () => {
	test("should load homepage", async ({ page }) => {
		// Arrange & Act
		await page.goto("/");

		// Assert
		await expect(page).toHaveTitle(/Ed Johnson Williams' website/);
		await expect(page.locator("header h1").first()).toContainText("Ed Johnson-Williams");
	});

	test("should load about page", async ({ page }) => {
		// Arrange & Act
		await page.goto("/about");

		// Assert
		await expect(page).toHaveTitle(/About me/);
		await expect(page.locator("main h2").first()).toContainText("About me");
	});

	test("should load now page", async ({ page }) => {
		// Arrange & Act
		await page.goto("/now");

		// Assert
		await expect(page).toHaveTitle(/Now/);
		await expect(page.locator("main h2").first()).toContainText("Now");
	});

	test("should load blog index page", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog");

		// Assert
		await expect(page).toHaveTitle(/All posts/);
		await expect(page.locator("main h2").first()).toContainText("All blogposts");
	});

	test("should load tags index page", async ({ page }) => {
		// Arrange & Act
		await page.goto("/tags");

		// Assert
		await expect(page).toHaveTitle(/Tags/);
		await expect(page.locator("main h2").first()).toContainText("Tags");
	});

	test("should have no console errors on static pages", async ({ page }) => {
		// Arrange
		const consoleErrors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				consoleErrors.push(msg.text());
			}
		});

		const pages = ["/", "/about", "/now", "/blog", "/tags"];

		for (const pagePath of pages) {
			// Act
			await page.goto(pagePath);
			await page.waitForLoadState("networkidle");

			// Assert
			expect(consoleErrors).toHaveLength(0);
		}
	});
});