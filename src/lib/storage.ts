import fs from "fs";
import path from "path";

/**
 * Robust Atomic Storage Engine (Phase 2)
 * Persists data across server restarts and serverless cold-starts.
 */

const STORAGE_DIR = path.join(process.cwd(), "data", "storage");

export function readStorageFile<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(STORAGE_DIR, filename);
    if (!fs.existsSync(filePath)) {
      writeStorageFile(filename, fallback);
      return fallback;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content || content.trim() === "") {
      return fallback;
    }
    return JSON.parse(content) as T;
  } catch (err) {
    console.warn(`[StorageEngine] Falling back to default for ${filename}:`, err instanceof Error ? err.message : err);
    return fallback;
  }
}

export function writeStorageFile<T>(filename: string, data: T): void {
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }
    const filePath = path.join(STORAGE_DIR, filename);
    const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(7)}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`[StorageEngine] Failed to write ${filename}:`, err);
  }
}
