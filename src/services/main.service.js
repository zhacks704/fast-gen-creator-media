import { youtubeVideoDetails } from "./api/rapidapi.client.js";/**
 * main.service.js
 *
 * Business-logic layer. Implement these against whatever data source
 * or officially-sanctioned / authorized third-party API your product
 * actually uses.
 *
 * IMPORTANT: This file intentionally contains no implementation for
 * fetching or extracting content from third-party platforms. Any such
 * integration must go through that platform's official API and comply
 * with its terms of service — do not add scraping, credential capture,
 * or security-bypass logic here.
 */

const store = new Map(); // Placeholder in-memory store — replace with a real DB.

export async function listItems() {
  return Array.from(store.values());
}

export async function getItem(id) {
  return store.get(id) || null;
}

export async function createItem(payload) {
  const id = Date.now().toString(36);
  const item = { id, ...payload, createdAt: new Date().toISOString() };
  store.set(id, item);
  return item;
}

/**
 * process(payload)
 *
 * Placeholder business logic for turning an incoming request into
 * media metadata the frontend can render. Wire this up to an
 * authorized/official API client once you have one — this function
 * should stay the single seam where that integration is plugged in.
 *
 * Expected payload shape: up to you / your frontend contract.
 * Expected return shape (matches frontend display component):
 * { title, type, format, size, badge, qualities }
 */
export async function process(payload) {

  if (!payload?.url) {
    throw new Error("URL required");
  }

  const url = payload.url;


  let videoId = null;


  if (url.includes("youtube.com")) {
    const parsed = new URL(url);
    videoId = parsed.searchParams.get("v");
  }


  if (url.includes("youtu.be")) {
    videoId = url.split("/").pop();
  }


  if (!videoId) {
    throw new Error("Only YouTube supported currently");
  }


  const data = await youtubeVideoDetails(videoId);


  return {
    title: data.title,
    type: "Video",
    format: "MP4",
    size: data.videos?.items?.[0]?.sizeText || "Unknown",
    badge: "YouTube",
    qualities:
      data.videos?.items?.map(video => [
        video.quality,
        video.sizeText
      ]) || []
  };
}
/**
 * download(payload)
 *
 * Placeholder business logic for a "download" action. Wire this up
 * to an authorized/official API client the same way as process().
 *
 * Expected return shape: whatever the controller needs to send back.
 * Kept generic here since download responses vary by integration
 * (e.g. a URL, a stream reference, a job id to poll, etc.).
 */
export async function download(payload){

 if(!payload?.url){
   throw new Error("URL required");
 }


 return {
   status:"ready",
   message:"Download link generated",
   url:payload.url,
   requestedAt:new Date().toISOString()
 };

}
