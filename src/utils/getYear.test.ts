import { describe, it, expect } from "vitest";
import getYear from "./getYear";

describe("getYear", () => {
	it("should extract year from a valid Date object", () => {
		// Arrange
		const input = new Date("2024-01-15");
		const expectedOutput = "2024";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle dates from different years", () => {
		// Arrange
		const input = new Date("1999-12-31");
		const expectedOutput = "1999";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle future dates", () => {
		// Arrange
		const input = new Date("2030-06-15");
		const expectedOutput = "2030";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle dates created with timestamp", () => {
		// Arrange
		const input = new Date(1704067200000); // 1st January 2024
		const expectedOutput = "2024";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle dates with time components", () => {
		// Arrange
		const input = new Date("2024-07-15T14:30:00");
		const expectedOutput = "2024";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle leap year dates", () => {
		// Arrange
		const input = new Date("2020-02-29");
		const expectedOutput = "2020";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle century boundary dates", () => {
		// Arrange
		const input = new Date("2000-01-01");
		const expectedOutput = "2000";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should handle date string that gets converted", () => {
		// Arrange
		const dateString = "2024-03-15";
		const input = new Date(dateString);
		const expectedOutput = "2024";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});

	it("should return NaN as string for invalid dates", () => {
		// Arrange
		const input = new Date("invalid-date");
		const expectedOutput = "NaN";

		// Act
		const result = getYear(input);

		// Assert
		expect(result).toBe(expectedOutput);
	});
});