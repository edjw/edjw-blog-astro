import { test, expect } from "@playwright/test";

test.describe("Tag Pages", () => {
	test("should load tag pages for existing tags", async ({ page }) => {
		// Arrange
		const existingTags = ["astro", "data"];

		for (const tag of existingTags) {
			// Act
			await page.goto(`/tags/${tag}`);

			// Assert
			await expect(page.locator("main h2").first()).toBeVisible();
			await expect(page.locator("main h2").first()).toContainText(tag.charAt(0).toUpperCase() + tag.slice(1));
		}
	});

	test("should display posts for specific tags", async ({ page }) => {
		// Arrange & Act
		await page.goto("/tags/astro");

		// Assert
		await expect(page.locator("main h2").first()).toContainText("Astro");
		// Should contain some blog post content
		await expect(page.locator("main")).toBeVisible();
	});

	test("should handle tag page navigation from tags index", async ({ page }) => {
		// Arrange & Act
		await page.goto("/tags");

		// Assert
		await expect(page.locator("main h2").first()).toContainText("Tags");
		
		// Look for tag links (this depends on your actual implementation)
		const tagLinks = page.locator("a[href^='/tags/']");
		await expect(tagLinks.first()).toBeVisible();
	});

	test("should load svelte tag page", async ({ page }) => {
		// Arrange & Act
		await page.goto("/tags/data");

		// Assert
		await expect(page.locator("main h2").first()).toContainText("Data");
		// Should contain some blog post content
		await expect(page.locator("main")).toBeVisible();
	});

	test("should have no console errors on tag pages", async ({ page }) => {
		// Arrange
		const consoleErrors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				consoleErrors.push(msg.text());
			}
		});

		const testTags = ["astro", "data"];

		for (const tag of testTags) {
			// Act
			await page.goto(`/tags/${tag}`);
			await page.waitForLoadState("networkidle");

			// Assert
			expect(consoleErrors).toHaveLength(0);
		}
	});
});