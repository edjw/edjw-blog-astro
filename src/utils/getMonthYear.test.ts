import { describe, it, expect } from "vite-plus/test";
import getMonthYear from "./getMonthYear";

describe("getMonthYear", () => {
  it("should format a date as month and year", () => {
    const input = new Date(2024, 0, 15);

    const result = getMonthYear(input);

    expect(result).toBe("January 2024");
  });

  it("should handle dates from different months and years", () => {
    const input = new Date(1999, 11, 31);

    const result = getMonthYear(input);

    expect(result).toBe("December 1999");
  });

  it("should handle dates created from timestamps", () => {
    const input = new Date(1704067200000);

    const result = getMonthYear(input);

    expect(result).toBe("January 2024");
  });
});
