'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);
  const router = useRouter();

  // Fetch suggestions with 200ms debounce
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
        setHighlighted(-1);
      } catch {
        // silently fail
      }
    }, 200);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && suggestions[highlighted]) {
        e.preventDefault();
        selectSuggestion(suggestions[highlighted]);
      }
      // else let the form submit normally
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function selectSuggestion(item) {
    setQuery(item.name);
    setOpen(false);
    router.push(`/ProductPaga/${item.id}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={wrapperRef} className="relative order-3 w-full flex-1 basis-full px-2 lg:order-none lg:basis-auto lg:px-0">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[6px] m-1 flex items-center h-10 border border-transparent focus-within:ring-3 focus-within:ring-[#f08804]">
          <select
            name="category"
            className="bg-[#dadada] text-black text-[0.9rem] p-2 rounded-l-[6px] h-10 border-0 outline-none cursor-pointer hidden sm:block"
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="skincare">Skin Care</option>
            <option value="grocery">Grocery</option>
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            className="text-base flex-1 px-3 h-full text-black border-0 outline-none bg-white rounded-[6px] sm:rounded-none"
            type="text"
            placeholder="Search Amazon.in"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#f3a847] text-[#131921] px-3 rounded-r-[6px] h-10 border-0 outline-none cursor-pointer hover:bg-[#f0a030] flex items-center"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && (
        <ul className="absolute left-1 right-1 top-[calc(100%-4px)] bg-white border border-gray-200 shadow-lg z-[9999] rounded-b-md overflow-hidden">
          {suggestions.map((item, i) => (
            <li
              key={item.id}
              onMouseDown={() => selectSuggestion(item)}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm text-[#0f1111] ${
                highlighted === i ? "bg-[#eaf4fb]" : "hover:bg-[#f3f3f3]"
              }`}
            >
              <SearchIcon fontSize="small" className="text-[#999] shrink-0" />
              <span className="flex-1 truncate">{item.name}</span>
              {item.category && (
                <span className="text-xs text-[#565959] shrink-0">in {item.category}</span>
              )}
            </li>
          ))}
          <li
            onMouseDown={handleSubmit}
            className="px-4 py-2 text-sm text-[#007185] cursor-pointer hover:bg-[#f3f3f3] border-t border-gray-100"
          >
            See all results for <strong>"{query}"</strong>
          </li>
        </ul>
      )}
    </div>
  );
}
