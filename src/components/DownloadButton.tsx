"use client";
import { Button } from "./ui/button";

const DownloadButton = ({ url }: { url: string }) => {
  const handleDownload = () => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <Button onClick={handleDownload}>view</Button>
    </div>
  );
};

export default DownloadButton;
