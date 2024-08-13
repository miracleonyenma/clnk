export const useClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");

      return text;
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
      throw new Error(`Failed to copy to clipboard: ${err}`);
    }
  };

  const readFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      console.log("Read from clipboard");

      return text;
    } catch (err) {
      console.error("Failed to read from clipboard", err);
      throw new Error(`Failed to read from clipboard: ${err}`);
    }
  };

  return { copyToClipboard, readFromClipboard };
};
