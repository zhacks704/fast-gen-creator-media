/**
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
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload passed to process()");
  }

  try {
    // TODO: Replace this stub with a call to your authorized data
    // source / official API client. Example:
    //
    //   const result = await officialApiClient.fetchMediaInfo(payload);
    //   return mapToDisplayShape(result);

    const record = {
      id: Date.now().toString(36),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    store.set(record.id, record);

    return {
      title: payload.title ?? "Untitled",
      type: payload.type ?? "unknown",
      format: payload.format ?? "unknown",
      size: payload.size ?? null,
      badge: payload.badge ?? "Pending",
      qualities: Array.isArray(payload.qualities) ? payload.qualities : [],
    };
  } catch (err) {
    // Re-throw so the controller's catch/next(err) handles it.
    throw new Error(`process() failed: ${err.message}`);
  }
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
export async function download(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload passed to download()");
  }

  try {
    // TODO: Replace this stub with a call to your authorized data
    // source / official API client. Example:
    //
    //   const result = await officialApiClient.getDownloadLink(payload);
    //   return { status: "ready", url: result.url };

    return {
      status: "pending",
      message: "Download integration not yet implemented.",
      requestedAt: new Date().toISOString(),
      payload,
    };
  } catch (err) {
    throw new Error(`download() failed: ${err.message}`);
  }
}
