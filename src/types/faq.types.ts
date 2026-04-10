export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqPageFrontmatter = {
  title: string;
  description: string;
  intro: string;
  items: readonly FaqItem[];
};
