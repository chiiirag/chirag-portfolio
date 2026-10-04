import "server-only";
import { revalidatePath } from "next/cache";

/** Regenerates every public page after content changes in the admin panel. */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}
