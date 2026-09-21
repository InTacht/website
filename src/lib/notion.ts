import "server-only";
import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

/** Public root page for intacht.notion.site */
export const LABS_NOTION_PAGE_ID = "23b0e993d0a84c9eb1f618d06977dbea";

const notion = new NotionAPI();

function slimRecordMap(recordMap: ExtendedRecordMap): ExtendedRecordMap {
  // Drop preview image blobs. They bloat the RSC payload and slow navigation.
  const { preview_images: _preview, ...rest } = recordMap as ExtendedRecordMap & {
    preview_images?: unknown;
  };
  return rest as ExtendedRecordMap;
}

async function fetchLabsNotebook() {
  const recordMap = await notion.getPage(LABS_NOTION_PAGE_ID);
  return slimRecordMap(recordMap);
}

export const getLabsNotebook = unstable_cache(fetchLabsNotebook, ["labs-notebook"], {
  revalidate: 3600,
  tags: ["labs-notebook"],
});
