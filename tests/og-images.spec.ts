import { test, expect } from "@playwright/test";

test.describe("OG Images", () => {
	test("should generate homepage OG image", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/og-image/index.png");

		// Assert
		expect(response?.status()).toBe(200);
		expect(response?.headers()["content-type"]).toBe("image/png");
		expect(response?.headers()["cache-control"]).toContain("s-maxage=31536000");
	});

	test("should generate static page OG images", async ({ page }) => {
		// Arrange
		const staticPages = ["about", "blog", "tags", "now"];

		for (const pageSlug of staticPages) {
			// Act
			const response = await page.goto(`/og-image/${pageSlug}.png`);

			// Assert
			expect(response?.status()).toBe(200);
			expect(response?.headers()["content-type"]).toBe("image/png");
		}
	});

	test("should generate tag OG images", async ({ page }) => {
		// Arrange
		const testTags = ["tag-astro", "tag-data"];

		for (const tagSlug of testTags) {
			// Act
			const response = await page.goto(`/og-image/${tagSlug}.png`);

			// Assert
			expect(response?.status()).toBe(200);
			expect(response?.headers()["content-type"]).toBe("image/png");
		}
	});

	test("should handle invalid slug gracefully", async ({ page }) => {
		// Arrange & Act
		const response = await page.goto("/og-image/non-existent-slug.png");

		// Assert
		expect(response?.status()).toBe(404);
	});
});