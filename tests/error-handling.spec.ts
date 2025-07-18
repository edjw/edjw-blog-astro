import { test, expect } from "@playwright/test";

test.describe("Error Handling", () => {
	test("should handle non-existent blog posts", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/blog/non-existent-post");

		// Assert
		expect(response?.status()).toBe(404);
		await expect(page.locator("main h2")).toContainText("404");
	});

	test("should handle non-existent tag pages", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/tags/non-existent-tag");

		// Assert
		expect(response?.status()).toBe(404);
		await expect(page.locator("main h2")).toContainText("404");
	});

	test("should handle malformed URLs gracefully", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/blog/");

		// Assert
		// Should either redirect to blog index or show 404
		expect([200, 404]).toContain(response?.status() || 0);
	});

	test("should handle deeply nested non-existent paths", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/blog/some/deeply/nested/path");

		// Assert
		expect(response?.status()).toBe(404);
	});

	test("should have proper 404 page structure", async ({ page }) => {
		// Arrange & Act
		await page.goto("/definitely-does-not-exist");

		// Assert
		await expect(page.locator("main h2")).toContainText("404");
		
		// Should have navigation back to main site
		await expect(page.locator("a[href='/']")).toBeVisible();
	});

	test("should handle invalid characters in URLs", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/blog/post%20with%20spaces");

		// Assert
		expect(response?.status()).toBe(404);
	});
});