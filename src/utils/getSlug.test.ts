import { describe, it, expect } from "vitest";
import { getSlug } from "./getSlug";

describe("getSlug", () => {
	it("should convert simple string to lowercase slug", () => {
		// Arrange
		const input = "Hello World";
		const expectedOutput = "hello-world";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with multiple spaces", () => {
		// Arrange
		const input = "This   Has    Multiple     Spaces";
		const expectedOutput = "this-has-multiple-spaces";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should remove special characters", () => {
		// Arrange
		const input = "Hello! World? & More#";
		const expectedOutput = "hello-world-and-more";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with numbers", () => {
		// Arrange
		const input = "Blog Post 123";
		const expectedOutput = "blog-post-123";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with leading and trailing spaces", () => {
		// Arrange
		const input = "  Trimmed Content  ";
		const expectedOutput = "trimmed-content";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle empty string", () => {
		// Arrange
		const input = "";
		const expectedOutput = "";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with accented characters", () => {
		// Arrange
		const input = "Café Résumé";
		const expectedOutput = "cafe-resume";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with apostrophes", () => {
		// Arrange
		const input = "It's a Blog Post";
		const expectedOutput = "its-a-blog-post";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with only special characters", () => {
		// Arrange
		const input = "!@#$%^&*()";
		const expectedOutput = "";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle mixed case strings", () => {
		// Arrange
		const input = "CamelCaseString";
		const expectedOutput = "camelcasestring";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle strings with hyphens already", () => {
		// Arrange
		const input = "already-hyphenated-string";
		const expectedOutput = "already-hyphenated-string";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle unicode characters", () => {
		// Arrange
		const input = "Hello 世界";
		const expectedOutput = "hello-shi-jie";

		// Act
		const result = getSlug(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});
});