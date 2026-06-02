"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NZ_REGIONS } from "@/lib/constants/nz-regions";
import { mapAddyRegionToFormRegion } from "@/lib/addy/map-region";
import type { AddyAddressDetail, AddySearchAddress } from "@/lib/addy/types";

const inputClassName =
"mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-violet focus:outline-none focus:ring-0";

type AddressAutocompleteProps = {
  address: string;
  region: string;
  onAddressChange: (address: string) => void;
  onRegionChange: (region: string) => void;
  regionAutoSet: boolean;
  onRegionAutoSet: (auto: boolean) => void;
};

export function AddressAutocomplete({
  address,
  region,
  onAddressChange,
  onRegionChange,
  regionAutoSet,
  onRegionAutoSet,
}: AddressAutocompleteProps) {
  const listboxId = useId();
  const [suggestions, setSuggestions] = useState<AddySearchAddress[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightIndex(-1);
  }, []);

  const searchAddresses = useCallback(async (query: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/addy/search?s=${encodeURIComponent(query)}`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        setSuggestions([]);
        setError("Unable to search addresses right now.");
        return;
      }

      const data = await res.json();
      setSuggestions(data.addresses ?? []);
      setIsOpen((data.addresses?.length ?? 0) > 0);
      setHighlightIndex(-1);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setSuggestions([]);
        setError("Unable to search addresses right now.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    onAddressChange(value);
    onRegionAutoSet(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      abortRef.current?.abort();
      setSuggestions([]);
      closeDropdown();
      setIsLoading(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      searchAddresses(value.trim());
    }, 300);
  };

  const selectAddress = async (item: AddySearchAddress) => {
    setIsSelecting(true);
    closeDropdown();
    onAddressChange(item.a);

    try {
      const res = await fetch(`/api/addy/address/${item.id}`);
      if (!res.ok) throw new Error("lookup failed");

      const detail: AddyAddressDetail = await res.json();
      const fullAddress = detail.full || item.a;
      const mappedRegion = mapAddyRegionToFormRegion(detail.region);

      onAddressChange(fullAddress);
      if (mappedRegion) {
        onRegionChange(mappedRegion);
        onRegionAutoSet(true);
      }
    } catch {
      onAddressChange(item.a);
      setError("Address selected, but region could not be detected automatically.");
    } finally {
      setIsSelecting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Escape") closeDropdown();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectAddress(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="address" className="block text-sm font-medium text-foreground">
        Property address
      </label>
      <input
        id="address"
        type="text"
        required
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          highlightIndex >= 0 ? `${listboxId}-option-${highlightIndex}` : undefined
        }
        placeholder="Start typing your address…"
        className={inputClassName}
        value={address}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        disabled={isSelecting}
      />

      {(isLoading || isSelecting) && (
        <p className="mt-1.5 text-xs text-muted">
          {isSelecting ? "Loading address details…" : "Searching addresses…"}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-violet" role="alert">
          {error}
        </p>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-60 w-full overflow-y-auto card py-1 shadow-lg"
        >
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={highlightIndex === index}
            >
              <button
                type="button"
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  highlightIndex === index
                    ? "bg-violet-light text-violet"
                    : "text-foreground hover:bg-background"
                }`}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectAddress(item)}
              >
                {item.a}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <label htmlFor="region" className="block text-sm font-medium text-foreground">
          NZ region
        </label>
        {regionAutoSet && region && (
          <p className="mt-1 text-xs text-violet">
            Detected automatically from your address
          </p>
        )}
        <select
          id="region"
          required
          className={`${inputClassName} ${regionAutoSet ? "border-violet/40 bg-violet-light" : ""}`}
          value={region}
          onChange={(e) => {
            onRegionChange(e.target.value);
            onRegionAutoSet(false);
          }}
        >
          <option value="" disabled>
            Select your region
          </option>
          {NZ_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
