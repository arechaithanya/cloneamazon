'use client';

import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import { assetsImg } from "../Data/data";

const NAV = ["Home", "Movies", "TV shows", "Live TV", "Subscriptions"];

const HERO_POSTERS = [
  assetsImg.BannerImg1,
  assetsImg.BannerImg2,
  assetsImg.BannerImg3,
  assetsImg.BannerImg4,
  assetsImg.BannerImg5,
  assetsImg.BannerImg6,
];

const RENTAL_POSTERS = [
  assetsImg.BannerImg4,
  assetsImg.BannerImg3,
  assetsImg.BannerImg2,
  assetsImg.BannerImg1,
];

const CHANNELS = [
  "Lionsgate Play",
  "discovery+",
  "BBC Player",
  "manoramaMAX",
  "hoichoi",
  "CHAUPAL",
  "Anime Times",
  "Sony Pictures Stream",
  "MGM+",
  "erosnow",
  "Stingray",
  "VB",
];

function PrimeCta({ children, href = "/login" }) {
  return (
    <Link
      href={href}
      className="inline-block rounded bg-[#00a8e1] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#48c4f0]"
    >
      {children}
    </Link>
  );
}

function PrimeVideoHeader() {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/prime-video" className="text-xl font-bold tracking-tight lowercase">
            prime video
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {NAV.map((label) => (
              <button
                key={label}
                type="button"
                className="text-white/90 hover:text-white hover:underline"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button type="button" className="p-1" aria-label="Search">
            <SearchIcon fontSize="small" />
          </button>
          <span className="hidden sm:inline">EN</span>
          <button type="button" className="hidden p-1 sm:inline" aria-label="Apps">
            <AppsIcon fontSize="small" />
          </button>
          <Link href="/login" className="p-1" aria-label="Account">
            <PersonIcon fontSize="small" />
          </Link>
          <Link
            href="/login"
            className="rounded bg-[#00a8e1] px-4 py-1.5 text-sm font-semibold text-black hover:bg-[#48c4f0]"
          >
            Join Prime
          </Link>
        </div>
      </div>
    </header>
  );
}

function PosterGrid({ posters, className = "" }) {
  return (
    <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${className}`}>
      {posters.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          className="aspect-[2/3] w-full rounded object-cover bg-zinc-800"
        />
      ))}
    </div>
  );
}

function PrimeVideoFooter() {
  return (
    <footer className="bg-black px-4 py-10 text-center text-sm text-white/80">
      <p className="mb-4 text-lg font-semibold lowercase text-white">prime video</p>
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <Link href="/" className="hover:underline">Back to Amazon</Link>
        <span className="text-white/40">|</span>
        <button type="button" className="hover:underline">Terms and Privacy Notice</button>
        <span className="text-white/40">|</span>
        <button type="button" className="hover:underline">Send us feedback</button>
        <span className="text-white/40">|</span>
        <button type="button" className="hover:underline">Help</button>
      </div>
      <p className="text-xs text-white/50">© 1996–2024, Amazon.com, Inc. or its affiliates</p>
    </footer>
  );
}

export default function PrimeVideoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <PrimeVideoHeader />

      <section className="mx-auto max-w-[1400px] px-4 py-12 md:py-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Welcome to Prime Video
            </h1>
            <p className="mt-4 text-base text-white/85 md:text-lg">
              Join Prime to watch the latest movies, TV shows and award-winning Amazon Originals
            </p>
            <div className="mt-8">
              <PrimeCta>Sign in to join Prime</PrimeCta>
            </div>
          </div>
          <div className="w-full max-w-md lg:max-w-lg">
            <PosterGrid posters={HERO_POSTERS} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-16">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl font-bold md:text-4xl">Movies rentals on Prime Video</h2>
              <p className="mt-4 text-white/85">
                Early Access to new movies, before digital subscription
              </p>
              <div className="mt-8">
                <PrimeCta>Rent now</PrimeCta>
              </div>
            </div>
            <div className="relative flex w-full max-w-lg justify-center gap-2 overflow-hidden py-4">
              {RENTAL_POSTERS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-44 w-28 shrink-0 rounded object-cover shadow-lg sm:h-52 sm:w-32"
                  style={{
                    transform: `rotate(${(i - 1.5) * 8}deg) translateY(${i % 2 === 0 ? 0 : 12}px)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-[#0f1111] md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold md:text-3xl">
              Your favorite channels all in one place
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#565959] md:text-base">
              With Prime Video Channels, find shows and movies from your favorite channels all in
              one place. Enjoy with an add-on subscription to Channels of your choice
            </p>
          </div>
          <div className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:grid-cols-4">
            {CHANNELS.map((name) => (
              <div
                key={name}
                className="flex aspect-square items-center justify-center rounded bg-[#146eb4] p-2 text-center text-xs font-semibold text-white sm:text-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrimeVideoFooter />
    </div>
  );
}
