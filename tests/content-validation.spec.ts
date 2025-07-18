import { test, expect } from "@playwright/test";

test.describe("Content Validation", () => {
	test("should display proper meta tags for blog posts", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024");

		// Assert
		await expect(page).toHaveTitle("Deploy Laravel 11 for free on Vercel in 2024");
		
		// Check for meta description
		const metaDescription = page.locator("meta[name='description']");
		await expect(metaDescription).toHaveAttribute("content", /How to deploy Laravel on Vercel/);
		
		// Check for OpenGraph tags
		const ogTitle = page.locator("meta[property='og:title']");
		await expect(ogTitle).toHaveAttribute("content", /Deploy Laravel 11/);
	});

	test("should display proper meta tags for static pages", async ({ page }) => {
		// Arrange & Act
		await page.goto("/about");

		// Assert
		await expect(page).toHaveTitle("About me");
		
		// Check for basic meta structure
		const metaDescription = page.locator("meta[name='description']");
		await expect(metaDescription).toBeAttached();
	});

	test("should have proper heading structure", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024");

		// Assert
		const mainHeading = page.locator("article h2.p-name");
		await expect(mainHeading).toHaveCount(1);
		await expect(mainHeading.first()).toContainText("Deploy Laravel 11");
	});

	test("should display dates in readable format", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024");

		// Assert
		const timeElement = page.locator("article section time").first();
		await expect(timeElement).toBeVisible();
		
		// Check that date is formatted (not just ISO string)
		const dateText = await timeElement.textContent();
		expect(dateText).not.toMatch(/^\d{4}-\d{2}-\d{2}T/); // Not ISO format
		expect(dateText).toMatch(/\d{4}/); // Contains year
	});

	test("should have accessible navigation", async ({ page }) => {
		// Arrange & Act
		await page.goto("/");

		// Assert
		const navElement = page.locator("nav");
		await expect(navElement).toBeVisible();
		
		// Check for main navigation links
		await expect(page.locator("nav a[href='/blog']")).toBeVisible();
		await expect(page.locator("nav a[href='/about']")).toBeVisible();
	});

	test("should have proper anchor links for headings", async ({ page }) => {
		// Arrange & Act
		await page.goto("/blog/2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024");

		// Assert
		// Check if content headings have proper ids for deep linking
		const contentHeadings = page.locator("article .e-content h2, article .e-content h3, article .e-content h4, article .e-content h5, article .e-content h6");
		const count = await contentHeadings.count();
		
		if (count > 0) {
			const firstHeading = contentHeadings.first();
			await expect(firstHeading).toHaveAttribute("id");
		}
	});
});