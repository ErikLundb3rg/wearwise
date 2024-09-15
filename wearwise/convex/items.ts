import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const uploadItem = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    color: v.string(),
    fabric: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("items", {
      ...args,
      format: "image",
    });
  },
});

export const getItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("items").collect();
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        // If the item is an "image" its `body` is an `Id<"_storage">`
        ...(item.format === "image"
          ? { url: await ctx.storage.getUrl(item.storageId) }
          : {}),
      }))
    );
  },
});
