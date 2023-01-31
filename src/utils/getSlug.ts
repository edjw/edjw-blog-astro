import slugify from "slugify";

export const getSlug = (str: string): string => {
  return slugify(str, { lower: true });
};
