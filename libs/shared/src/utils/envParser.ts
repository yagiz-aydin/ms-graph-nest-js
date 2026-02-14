export const parseScopes = (scopesString: string | undefined): string[] => {
  if (!scopesString) return [];
  try {
    return JSON.parse(scopesString) as string[];
  } catch {
    return [scopesString];
  }
};
