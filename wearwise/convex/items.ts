import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
