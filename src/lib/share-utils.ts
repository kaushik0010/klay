export function encodeData(data: any): string {
  try {
    // 1. Convert JSON to string
    const jsonString = JSON.stringify(data);
    // 2. Encode to Base64 (browser native)
    return btoa(jsonString);
  } catch (e) {
    console.error("Failed to encode data", e);
    return "";
  }
}

export function decodeData(encoded: string): any {
  try {
    // 1. Decode Base64 to string
    const jsonString = atob(encoded);
    // 2. Parse JSON
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to decode data", e);
    return null;
  }
}