export const parseScopes = (scopesString: string | undefined): string[] => {
  if (!scopesString) return [];

  let cleanString = scopesString.trim();
  if (
    (cleanString.startsWith("'") && cleanString.endsWith("'")) ||
    (cleanString.startsWith('"') && cleanString.endsWith('"'))
  ) {
    cleanString = cleanString.slice(1, -1);
  }

  try {
    return JSON.parse(cleanString) as string[];
  } catch {
    // Split by space or comma, filtering out empty strings and stripping internal quotes
    return cleanString
      .split(/[\s,]+/)
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
};
