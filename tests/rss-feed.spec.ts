import { test, expect } from "@playwright/test";

test.describe("RSS Feed", () => {
	test("should generate valid RSS feed", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/rss.xml");

		// Assert
		expect(response?.status()).toBe(200);
		expect(response?.headers()["content-type"]).toContain("application/xml");
	});

	test("should contain expected RSS structure", async ({ page }) => {
		// Arrange & Act
		await page.goto("/rss.xml");
		const content = await page.content();

		// Assert
		expect(content).toContain("<rss");
		expect(content).toContain("<channel>");
		expect(content).toContain("<title>Ed Johnson-Williams</title>");
		expect(content).toContain("<description>");
		expect(content).toContain("<language>en-gb</language>");
	});

	test("should contain blog post items", async ({ page }) => {
		// Arrange & Act
		await page.goto("/rss.xml");
		const content = await page.content();

		// Assert
		expect(content).toContain("<item>");
		expect(content).toContain("<link>");
		expect(content).toContain("<pubDate>");
		expect(content).toContain("/blog/");
	});
});