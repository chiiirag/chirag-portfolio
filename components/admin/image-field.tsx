"use client";

import { FileText, LoaderCircle, Upload, X } from "lucide-react";
import { useId, useRef, useState, useTransition } from "react";
import { uploadFile } from "@/app/actions/admin/upload";
import { FieldError } from "@/components/ui/field-error";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  errors?: string[];
  hint?: string;
  uploadsEnabled: boolean;
  kind?: "image" | "document";
  className?: string;
};

/** URL input with optional upload to Vercel Blob. The URL is what gets submitted. */
export function ImageField({ name, label, defaultValue = "", errors, hint, uploadsEnabled, kind = "image", className }: Props) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onFile = (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    const data = new FormData();
    data.set("file", file);
    data.set("kind", kind);
    startTransition(async () => {
      const result = await uploadFile(data);
      if (result.url) setValue(result.url);
      else setUploadError(result.error ?? "Upload failed.");
      if (fileRef.current) fileRef.current.value = "";
    });
  };

  const isPreviewable = kind === "image" && /^(https:\/\/|\/(?!\/))/.test(value);

  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="flex gap-3">
        <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {isPreviewable ? (
            <SmartImage src={value} alt="" fill sizes="44px" className="object-cover" />
          ) : (
            <FileText className="size-5 text-slate-400" aria-hidden="true" />
          )}
        </div>
        <div className="relative flex-1">
          <input
            id={id}
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="https://…"
            className={cn("input pr-9", Boolean(errors?.length) && "border-red-400")}
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700"
              aria-label={`Clear ${label}`}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        {uploadsEnabled && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept={kind === "document" ? "application/pdf" : "image/png,image/jpeg,image/webp,image/gif,image/avif"}
              className="hidden"
              onChange={(event) => onFile(event.target.files?.[0])}
            />
            <button type="button" className="btn-outline shrink-0 px-3.5" disabled={pending} onClick={() => fileRef.current?.click()}>
              {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
              <span className="hidden sm:inline">{pending ? "Uploading" : "Upload"}</span>
            </button>
          </>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <FieldError errors={uploadError ? [uploadError] : errors} />
    </div>
  );
}
