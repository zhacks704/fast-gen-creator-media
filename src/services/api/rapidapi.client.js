import axios from "axios";
import { config } from "../../config/index.js";

export async function youtubeVideoDetails(videoId) {
  const response = await axios.get(
    `${config.apis.youtube.baseUrl}/v2/video/details`,
    {
      params: {
        videoId,
      },
      headers: {
        "x-rapidapi-host": config.apis.youtube.host,
        "x-rapidapi-key": config.apis.youtube.key,
      },
    }
  );

  return response.data;
}
