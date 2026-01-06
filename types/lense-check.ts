export type LenseCheck = {
  check: boolean | (() => boolean);
  label?: string;
};

export const LenseTests: LenseCheck[] = [
  { check: () => 1 === 1, label: 'Index: 1 === 1' },
];
