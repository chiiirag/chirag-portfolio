"use client";

import { Check, Copy, FileText, LoaderCircle, Trash2, Upload } from "lucide-react";
import { useState, useTransition, type DragEvent } from "react";
import { deleteMedia } from "@/app/actions/admin/media";
import { SmartImage } from "@/components/ui/smart-image";
import { uploadToLibrary } from "@/lib/client-upload";
import { formatBytes, isImageType, type MediaItem } from "@/lib/media";
import { cn } from "@/lib/utils";

export function MediaLibrary({ initialItems }: { initialItems: MediaItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();
  const [, startDelete] = useTransition();

  const upload = (files: FileList | File[] | null) => {
    const list = Array.from(files ?? []);
    if (!list.length) return;
    setErrors([]);
    startUpload(async () => {
      const problems: string[] = [];
      for (const file of list) {
        const kind = file.type === "application/pdf" ? "document" : "image";
        const result = await uploadToLibrary(file, kind);
        if (result.item) {
          const item = result.item;
          setItems((prev) => [item, ...prev]);
        } else {
          problems.push(`${file.name}: ${result.error}`);
        }
      }
      setErrors(problems);
    });
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    upload(event.dataTransfer.files);
  };

  const copy = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(new URL(item.url, window.location.origin).toString());
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((id) => (id === item.id ? null : id)), 1500);
    } catch {
      window.prompt("Copy this URL:", item.url);
    }
  };

  const remove = (item: MediaItem) => {
    if (!window.confirm(`Delete “${item.filename}”? This cannot be undone.`)) return;
    setDeletingId(item.id);
    startDelete(async () => {
      const result = await deleteMedia(item.id);
      if (result.ok) setItems((prev) => prev.filter((i) => i.id !== item.id));
      else window.alert(result.error);
      setDeletingId(null);
    });
  };

  return (
    <div className="space-y-6">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition",
          dragging ? "border-brand-500 bg-brand-50" : "border-slate-300 bg-white hover:border-brand-400",
        )}
      >
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif,application/pdf"
          className="sr-only"
          disabled={uploading}
          onChange={(event) => {
            upload(event.target.files);
            event.target.value = "";
          }}
        />
        {uploading ? (
          <LoaderCircle className="size-8 animate-spin text-brand-600" aria-hidden="true" />
        ) : (
          <Upload className="size-8 text-brand-600" aria-hidden="true" />
        )}
        <span className="text-sm font-semibold text-ink">{uploading ? "Uploading…" : "Click to upload or drag files here"}</span>
        <span className="text-xs text-slate-500">PNG, JPG, WebP, GIF, AVIF or PDF · large photos are resized automatically · max 4MB</span>
      </label>

      {errors.length > 0 && (
        <ul className="space-y-1 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {items.length === 0 ? (
        <p className="card p-10 text-center text-sm text-slate-500">No files yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id} className="card overflow-hidden">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]"
              >
                {isImageType(item.contentType) ? (
                  <SmartImage src={item.url} alt={item.filename} fill sizes="(min-width: 1024px) 220px, 45vw" className="object-contain" />
                ) : (
                  <FileText className="absolute inset-0 m-auto size-12 text-slate-400" aria-hidden="true" />
                )}
              </a>
              <div className="flex items-center gap-1 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-ink" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {formatBytes(item.size)}
                    {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
                  </p>
                </div>
                <button type="button" className="btn-ghost px-2" onClick={() => copy(item)} aria-label={`Copy URL of ${item.filename}`}>
                  {copiedId === item.id ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                </button>
                <button
                  type="button"
                  className="btn-ghost px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => remove(item)}
                  disabled={deletingId === item.id}
                  aria-label={`Delete ${item.filename}`}
                >
                  {deletingId === item.id ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
