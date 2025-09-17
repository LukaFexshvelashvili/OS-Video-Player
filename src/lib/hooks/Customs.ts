export function movie_link_generate(nameEng: string) {
  return nameEng
    .replace(/ /g, "-")
    .replace(/[ \-.,?!#@/%^*=\[\]_\+<`>'"(){]:;&]/g, "-");
}
export function get_type_link(type: string | number) {
  switch (type) {
    case 0:
    case "0":
      return "movie";
    case 1:
    case "1":
      return "tv-show";
    case 2:
    case "2":
      return "animation";
    case 3:
    case "3":
      return "anime";
    default:
      return "movie";
  }
}
export function get_type_link_geo(type: string | number) {
  switch (type) {
    case 0:
    case "0":
      return "ფილმი";
    case 1:
    case "1":
      return "სერიალი";
    case 2:
    case "2":
      return "ანიმაცია";
    case 3:
    case "3":
      return "ანიმე";
    default:
      return "ფილმი";
  }
}

export function image_resize(url: string | undefined | null): {
  high: string;
  medium: string;
  small: string;
} {
  if (!url) {
    return { high: "undefined", medium: "undefined", small: "undefined" };
  }
  const posterMedium = url.replace(
    /\.(jpg|jpeg|png|gif|webp)$/i,
    (_, ext) => `_sm.${ext}`
  );
  const posterSmall = url.replace(
    /\.(jpg|jpeg|png|gif|webp)$/i,
    (_, ext) => `_sm2.${ext}`
  );

  return {
    high: "https://cdn.croconet.cam/" + url,
    medium: "https://cdn.croconet.cam/" + posterMedium,
    small: "https://cdn.croconet.cam/" + posterSmall,
  };
}
export function decodeHtmlEntities(str: string): string {
  const entities: { [key: string]: string } = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };

  return str.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      if (entity[1].toLowerCase() === "x") {
        return String.fromCharCode(parseInt(entity.slice(2), 16));
      } else {
        return String.fromCharCode(parseInt(entity.slice(1), 10));
      }
    } else if (entities[entity.toLowerCase()]) {
      return entities[entity.toLowerCase()];
    }
    return match;
  });
}
export function jsonDecodeSafely(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return [];
  }
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }
}

export function calculateMovieDuration(players: string | undefined): string {
  if (!players) return "-";

  try {
    const parsedPlayers = JSON.parse(players);
    if (!parsedPlayers[1]) return "-";

    // Check if duration is available in the players data
    // This is a simplified approach - in reality you might have duration
    // stored in your database or need to implement a different strategy

    // For now, we'll check if we have video URLs and return a generic duration
    // based on the type of content

    // For movies: players[1].GEO.HD or players[1].ENG.HD
    if (parsedPlayers[1].GEO?.HD || parsedPlayers[1].ENG?.HD) {
      // This is a movie - return estimated movie duration
      return "01:45:00"; // Default movie duration placeholder
    }

    // For TV shows: players[1][1].GEO.HD or players[1][1].ENG.HD
    if (parsedPlayers[1][1] && parsedPlayers[1][1][0]) {
      // This is a TV show episode - return estimated episode duration
      return "45:00"; // Default TV episode duration placeholder
    }

    return "-";
  } catch (error) {
    console.error("Error parsing players:", error);
    return "-";
  }
}

export function selectPrerollAd(
  prerollAds: {
    id: number;
    video_url: string;
    percentage: number;
    link: string;
  }[]
): { video_url: string; link: string } | null {
  if (!prerollAds || prerollAds.length === 0) {
    return null;
  }

  // Calculate total percentage
  const totalPercentage = prerollAds.reduce(
    (sum, ad) => sum + ad.percentage,
    0
  );

  // Generate random number between 0 and total percentage
  const randomNum = Math.random() * totalPercentage;

  // Select ad based on weighted random selection
  let currentSum = 0;
  for (const ad of prerollAds) {
    currentSum += ad.percentage;
    if (randomNum <= currentSum) {
      return {
        video_url: ad.video_url,
        link: ad.link,
      };
    }
  }

  // Fallback to first ad if something goes wrong
  return {
    video_url: prerollAds[0].video_url,
    link: prerollAds[0].link,
  };
}
