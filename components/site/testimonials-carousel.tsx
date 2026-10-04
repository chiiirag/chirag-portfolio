"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
};

export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const current = items[Math.min(index, count - 1)];
  if (!current) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Client testimonials">
      <figure className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card" aria-live="polite">
        <Quote className="size-8 text-slate-300" aria-hidden="true" />
        {current.rating > 0 && (
          <div className="mt-2 flex gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn("size-4", i < current.rating ? "fill-amber-400 text-amber-400" : "text-slate-200")}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
        <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">{current.content}</blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-full bg-brand-100">
            {current.avatarUrl ? (
              <SmartImage src={current.avatarUrl} alt="" fill sizes="44px" className="object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-sm font-bold text-brand-700">
                {current.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{current.name}</p>
            {current.role && <p className="text-xs text-slate-500">{current.role}</p>}
          </div>
        </figcaption>
      </figure>

      {count > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={() => go(-1)} className="btn-outline size-10 p-0" aria-label="Previous testimonial">
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-brand-600" : "w-1.5 bg-slate-300")}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} className="btn-outline size-10 p-0" aria-label="Next testimonial">
              <ChevronRight className="size-4" />
            </button>
          </div>
      )}
    </div>
  );
}
