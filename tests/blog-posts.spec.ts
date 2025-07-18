import { test, expect } from "@playwright/test";

test.describe("Blog Posts", () => {
	test("should load recent blog posts", async ({ page }) => {
		// Arrange
		const recentPosts = [
			"/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024",
			"/blog/2023-12-10-svelte-unstyled-tags-input",
			"/blog/2024-07-19-launching-nearest-color",
		];

		for (const postUrl of recentPosts) {
			// Act
			await page.goto(postUrl);

			// Assert
			await expect(page.locator("article h2").first()).toBeVisible();
			await expect(page.locator("article")).toBeVisible();
			await expect(page.locator("article section time").first()).toBeVisible();
		}
	});

	test("should load older blog posts", async ({ page }) => {
		// Arrange
		const olderPosts = [
			"/blog/2018-01-02-how-often-is-1st-january-a-monday",
			"/blog/2020-03-24-development-production-favicons-eleventy",
			"/blog/2022-09-08-i-attended-a-funeral-on-youtube",
		];

		for (const postUrl of olderPosts) {
			// Act
			await page.goto(postUrl);

			// Assert
			await expect(page.locator("article h2").first()).toBeVisible();
			await expect(page.locator("article")).toBeVisible();
			await expect(page.locator("article section time").first()).toBeVisible();
		}
	});

	test("should display post metadata correctly", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024");

		// Assert
		await expect(page.locator("article h2").first()).toContainText("Deploy Laravel 11 for free on Vercel in 2024");
		await expect(page.locator("article section time").first()).toContainText("2024");
		await expect(page.locator("article")).toContainText("You can deploy Laravel on Vercel");
	});

	test("should display tags when present", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2023-12-10-svelte-unstyled-tags-input");

		// Assert
		await expect(page.locator("article h2").first()).toContainText("Svelte Unstyled Tags Input");
		// Look for tag-related elements
		const content = await page.content();
		expect(content).toContain("svelte");
	});

	test("should have no console errors on blog posts", async ({ page }) => {
		// Arrange
		const consoleErrors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				consoleErrors.push(msg.text());
			}
		});

		const testPosts = [
			"/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024",
			"/blog/2023-12-10-svelte-unstyled-tags-input",
		];

		for (const postUrl of testPosts) {
			// Act
			await page.goto(postUrl);
			await page.waitForLoadState("networkidle");

			// Assert
			expect(consoleErrors).toHaveLength(0);
		}
	});
});