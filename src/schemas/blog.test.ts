import { describe, it, expect } from "vitest";
import { blogSchema, newmdBlogSchema } from "./blog";

describe("blogSchema", () => {
	describe("valid blog posts", () => {
		it("should validate a minimal blog post", () => {
			// Arrange
			const validPost = {
				title: "My First Blog Post",
				pubDate: new Date("2024-01-15"),
			};

			// Act
			const result = blogSchema.safeParse(validPost);

			// Assert
			expect(result.success).toBe(true);
		});

		it("should validate a complete blog post with all fields", () => {
			// Arrange
			const validPost = {
				title: "Complete Blog Post",
				pubDate: new Date("2024-01-15"),
				tags: ["web-development", "javascript", "astro"],
				socialDescription: "A comprehensive blog post about web development",
				image: "/images/blog-post.jpg",
				featured: true,
			};

			// Act
			const result = blogSchema.safeParse(validPost);

			// Assert
			expect(result.success).toBe(true);
		});

		it("should validate tags with numbers", () => {
			// Arrange
			const validPost = {
				title: "Web3 and ES6",
				pubDate: new Date("2024-01-15"),
				tags: ["web3", "es6-features", "react18"],
			};

			// Act
			const result = blogSchema.safeParse(validPost);

			// Assert
			expect(result.success).toBe(true);
		});
	});

	describe("invalid blog posts", () => {
		it("should reject empty title", () => {
			// Arrange
			const invalidPost = {
				title: "",
				pubDate: new Date("2024-01-15"),
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("title");
			}
		});

		it("should reject missing required fields", () => {
			// Arrange
			const invalidPost = {
				title: "Missing Date",
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
		});

		it("should reject camelCase tags", () => {
			// Arrange
			const invalidPost = {
				title: "Invalid Tags",
				pubDate: new Date("2024-01-15"),
				tags: ["webDevelopment", "javaScript"],
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Use lower case and kebab case");
			}
		});

		it("should reject tags with capital letters", () => {
			// Arrange
			const invalidPost = {
				title: "Invalid Tags",
				pubDate: new Date("2024-01-15"),
				tags: ["Web-Development", "JavaScript"],
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Use lower case and kebab case");
			}
		});

		it("should reject tags with spaces", () => {
			// Arrange
			const invalidPost = {
				title: "Invalid Tags",
				pubDate: new Date("2024-01-15"),
				tags: ["web development", "java script"],
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
		});

		it("should reject social description over 155 characters", () => {
			// Arrange
			const longDescription = "a".repeat(156);
			const invalidPost = {
				title: "Long Description",
				pubDate: new Date("2024-01-15"),
				socialDescription: longDescription,
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("socialDescription");
			}
		});

		it("should reject extra fields due to strict mode", () => {
			// Arrange
			const invalidPost = {
				title: "Extra Fields",
				pubDate: new Date("2024-01-15"),
				extraField: "not allowed",
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
		});

		it("should reject invalid date", () => {
			// Arrange
			const invalidPost = {
				title: "Invalid Date",
				pubDate: "not a date",
			};

			// Act
			const result = blogSchema.safeParse(invalidPost);

			// Assert
			expect(result.success).toBe(false);
		});
	});
});

describe("newmdBlogSchema", () => {
	it("should coerce string dates to Date objects", () => {
		// Arrange
		const postWithStringDate = {
			title: "Date Coercion Test",
			pubDate: "2024-01-15",
		};

		// Act
		const result = newmdBlogSchema.safeParse(postWithStringDate);

		// Assert
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.pubDate).toBeInstanceOf(Date);
		}
	});

	it("should coerce ISO string dates", () => {
		// Arrange
		const postWithISODate = {
			title: "ISO Date Test",
			pubDate: "2024-01-15T10:30:00Z",
		};

		// Act
		const result = newmdBlogSchema.safeParse(postWithISODate);

		// Assert
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.pubDate).toBeInstanceOf(Date);
		}
	});

	it("should allow extra fields (not strict)", () => {
		// Arrange
		const postWithExtraFields = {
			title: "Extra Fields Allowed",
			pubDate: new Date("2024-01-15"),
			extraField: "this is allowed",
			anotherExtra: 123,
		};

		// Act
		const result = newmdBlogSchema.safeParse(postWithExtraFields);

		// Assert
		expect(result.success).toBe(true);
	});

	it("should validate tags same as blogSchema", () => {
		// Arrange
		const invalidPost = {
			title: "Invalid Tags",
			pubDate: "2024-01-15",
			tags: ["InvalidTag", "another-Invalid"],
		};

		// Act
		const result = newmdBlogSchema.safeParse(invalidPost);

		// Assert
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toContain("Use lower case and kebab case");
		}
	});
});