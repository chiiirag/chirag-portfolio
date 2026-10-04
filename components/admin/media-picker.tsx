"use client";

import { Check, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { listMedia } from "@/app/actions/admin/media";
import { SmartImage } from "@/components/ui/smart-image";
import { uploadToLibrary } from "@/lib/client-upload";
import { DOCUMENT_ACCEPT, formatBytes, IMAGE_ACCEPT, isImageType, type MediaItem, type MediaKind } from "@/lib/media";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  kind: MediaKind;
  selectedUrl?: string;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
};

/** Modal listing the media library, with upload. */
export function MediaPicker({ open, kind, selectedUrl, onClose, onSelect }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, startLoading] = useTransition();
  const [uploading, startUploading] = useTransition();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setError(null);
      startLoading(async () => {
        try {
          setItems(await listMedia(kind));
        } catch {
          setError("Couldn't load the media library.");
        }
      });
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, kind]);

  const onFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    startUploading(async () => {
      const uploaded: MediaItem[] = [];
      for (const file of Array.from(files)) {
        const result = await uploadToLibrary(file, kind);
        if (result.item) uploaded.push(result.item);
        else setError(result.error);
      }
      setItems((prev) => [...uploaded.reverse(), ...(prev ?? [])]);
      if (fileRef.current) fileRef.current.value = "";
    });
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      className="m-auto w-[min(56rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-slate-900/50"
      aria-labelledby="media-picker-title"
    >
      <div className="flex max-h-[85vh] flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <h2 id="media-picker-title" className="text-base font-bold text-ink">
            {kind === "document" ? "Choose a PDF" : "Choose an image"}
          </h2>
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept={kind === "document" ? DOCUMENT_ACCEPT : IMAGE_ACCEPT}
              className="hidden"
              onChange={(event) => onFiles(event.target.files)}
            />
            <button type="button" className="btn-primary px-4 py-2" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? "Uploading…" : "Upload from PC"}
            </button>
            <button type="button" className="btn-ghost px-2" onClick={onClose} aria-label="Close">
              <X className="size-5" />
            </button>
          </div>
        </div>

        {error && <p className="mx-5 mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex-1 overflow-y-auto p-5">
          {loading || items === null ? (
            <div className="flex justify-center py-16 text-slate-400">
              <LoaderCircle className="size-6 animate-spin" aria-label="Loading" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              Nothing here yet. Click <strong>Upload from PC</strong> to add files.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => {
                const selected = item.url === selectedUrl;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      aria-pressed={selected}
                      className={cn(
                        "group relative block w-full overflow-hidden rounded-2xl border text-left transition",
                        selected ? "border-brand-500 ring-2 ring-brand-200" : "border-slate-200 hover:border-brand-300",
                      )}
                    >
                      <div className="relative aspect-square bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
                        {isImageType(item.contentType) ? (
                          <SmartImage src={item.url} alt={item.filename} fill sizes="200px" className="object-contain" />
                        ) : (
                          <FileText className="absolute inset-0 m-auto size-10 text-slate-400" aria-hidden="true" />
                        )}
                        {selected && (
                          <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-brand-600 text-white">
                            <Check className="size-4" />
                          </span>
                        )}
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="truncate text-xs font-medium text-ink">{item.filename}</p>
                        <p className="text-[11px] text-slate-500">
                          {formatBytes(item.size)}
                          {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
}
