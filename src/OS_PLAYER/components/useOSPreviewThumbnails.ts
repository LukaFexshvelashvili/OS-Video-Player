import { useEffect, useState } from "react";

interface PreviewSheet {
  sheet: string;
  frames: number;
  columns: number;
  rows: number;
  frame_width: number;
  frame_height: number;
  start_frame_index: number;
}

interface PreviewData {
  sheets: PreviewSheet[];
}

export function useOSPreviewThumbnails(videoUrl: string | undefined) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [basePath, setBasePath] = useState<string>("");
  const [totalFrames, setTotalFrames] = useState<number>(0);
  const [hasPreview, setHasPreview] = useState<boolean>(true);

  // Helper function to normalize paths
  const normalizePath = (path: string) => {
    return path.replace(/\\/g, "/");
  };

  useEffect(() => {
    // Reset states immediately when video source changes
    setPreviewData(null);
    setTotalFrames(0);
    setHasPreview(false);
    setBasePath("");

    if (!videoUrl) return;

    let isMounted = true;

    // Get the directory path from the video URL
    const urlParts = videoUrl.split("/");
    urlParts.pop(); // Remove the video filename
    const baseDir = urlParts.join("/");

    if (isMounted) {
      setBasePath(baseDir);
    }

    // Load preview.json from the same directory as the video
    fetch(`${baseDir}/preview.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Preview not found");
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        // Normalize all sheet paths in the data
        const normalizedData = {
          ...data,
          sheets: data.sheets.map((sheet: PreviewSheet) => ({
            ...sheet,
            sheet: normalizePath(sheet.sheet),
          })),
        };
        // Calculate total number of frames across all sheets
        const total = normalizedData.sheets.reduce(
          (sum: number, sheet: PreviewSheet) => sum + sheet.frames,
          0
        );
        setTotalFrames(total);
        setPreviewData(normalizedData);
        setHasPreview(true);
      })
      .catch(() => {
        if (isMounted) {
          setHasPreview(false);
          setPreviewData(null);
          setTotalFrames(0);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [videoUrl]);

  const getPreviewForTime = (time: number, duration: number) => {
    if (!hasPreview || !previewData || !totalFrames || duration <= 0)
      return null;

    // Calculate which preview frame we need based on the current time's position in the video
    // This distributes all preview frames evenly across the video duration
    const frameNumber = Math.floor((time / duration) * totalFrames);

    // Find the correct sheet that contains this frame
    const sheet = previewData.sheets.find(
      (s) =>
        frameNumber >= s.start_frame_index &&
        frameNumber < s.start_frame_index + s.frames
    );

    if (!sheet) return null;

    // Calculate the frame's position within its sheet
    const frameInSheet = frameNumber - sheet.start_frame_index;

    // Calculate row and column in the grid
    const row = Math.floor(frameInSheet / sheet.columns);
    const col = frameInSheet % sheet.columns;

    // Calculate the exact pixel position in the sprite sheet
    const x = col * sheet.frame_width;
    const y = row * sheet.frame_height;

    // Prepend the base path to the normalized sheet URL
    const fullSheetUrl = `${basePath}/${sheet.sheet}`;

    const result = {
      sheetUrl: fullSheetUrl,
      x,
      y,
      width: sheet.frame_width,
      height: sheet.frame_height,
    };

    return result;
  };

  return { getPreviewForTime };
}
