"use client";

import { FileText, Images, LoaderCircle, Upload, X } from "lucide-react";
import { useId, useRef, useState, useTransition } from "react";
import { FieldError } from "@/components/ui/field-error";
import { SmartImage } from "@/components/ui/smart-image";
import { uploadToLibrary } from "@/lib/client-upload";
import { DOCUMENT_ACCEPT, IMAGE_ACCEPT, type MediaKind } from "@/lib/media";
import { cn } from "@/lib/utils";
import { MediaPicker } from "./media-picker";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  errors?: string[];
  hint?: string;
  kind?: MediaKind;
  className?: string;
};

/**
 * File field backed by the media library (stored in Neon). Upload from the PC, pick an
 * existing file, or paste any https URL. The URL is what gets submitted with the form.
 */
export function ImageField({ name, label, defaultValue = "", errors, hint, kind = "image", className }: Props) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onFile = (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    startTransition(async () => {
      const result = await uploadToLibrary(file, kind);
      if (result.item) setValue(result.item.url);
      else setUploadError(result.error);
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
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:border-brand-300"
          aria-label={`Choose ${label} from library`}
        >
          {isPreviewable ? (
            <SmartImage src={value} alt="" fill sizes="44px" className="object-cover" />
          ) : (
            <FileText className="size-5 text-slate-400" aria-hidden="true" />
          )}
        </button>
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Upload, choose from library, or paste a URL"
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
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={kind === "document" ? DOCUMENT_ACCEPT : IMAGE_ACCEPT}
          className="hidden"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
        <button type="button" className="btn-outline px-3.5 py-1.5 text-xs" disabled={pending} onClick={() => fileRef.current?.click()}>
          {pending ? <LoaderCircle className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          {pending ? "Uploading…" : "Upload from PC"}
        </button>
        <button type="button" className="btn-outline px-3.5 py-1.5 text-xs" onClick={() => setPickerOpen(true)}>
          <Images className="size-3.5" /> Choose from library
        </button>
      </div>

      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      <FieldError errors={uploadError ? [uploadError] : errors} />

      <MediaPicker
        open={pickerOpen}
        kind={kind}
        selectedUrl={value}
        onClose={() => setPickerOpen(false)}
        onSelect={(item) => {
          setValue(item.url);
          setUploadError(null);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}
