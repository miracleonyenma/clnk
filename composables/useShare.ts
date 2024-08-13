export const useShare = () => {
  const share = ({
    title,
    text,
    url,
    files,
  }: {
    title: string;
    text: string;
    url: string;
    files?: File[];
  }) => {
    try {
      if (navigator.share) {
        navigator.share({
          title,
          text,
          url,
          files,
        });

        return true;
      }

      throw new Error("Web Share API not supported");
    } catch (error) {
      console.log("Failed to share", error);
      throw new Error(`Failed to share: ${error}`);
    }
  };

  return { share };
};
