import { z } from 'zod'

export const ProductInput = z.object({
    name: z.string("Name must be a string").min(2, "Minimum name length is 2").max(50, "Maximum name length is 50"),
    description: z.string("Description must be a string").min(25, "Minimum description length is 25"),
    price: z.string("Price must be a string").min(1, "Minimum price length is 1"),
});


export type ProductInputType = z.infer<typeof ProductInput>

// Optional
export const productUpdate = ProductInput.partial()
export type productUpdateType= z.infer<typeof productUpdate>