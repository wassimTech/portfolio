import React from "react";
import { Locale } from "@/types/cv";

export type FlagCountry = Locale | "fr" | "en" | "ar" | "tn" | "gb";

export interface FlagProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export interface FlagIconProps extends FlagProps {
  country: FlagCountry;
}

/**
 * Flag of France (FR)
 */
export function FranceFlag({ className = "w-4 h-3", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#002654" d="M0 0h213.3v480H0z" />
        <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z" />
        <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
      </g>
    </svg>
  );
}

/**
 * Flag of the United Kingdom (EN / GB)
 */
export function UkFlag({ className = "w-4 h-3", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#ffffff"
        d="m75 0 245 180L565 0h75v60L435 240l205 180v60h-75L320 300 75 480H0v-60l205-180L0 60V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 156v36h-48L376 324l48-36zM640 0v12L460 144l48 36L640 48V0zm-216 192L640 36v12L472 174l-48 18zM0 480v-12l180-132-48-36L0 432v48zm216-288L0 444v-12l168-126 48-18zM0 0v36l164 120 48-36L48 0H0z"
      />
      <path fill="#ffffff" d="M240 0h160v480H240zM0 160h640v160H0z" />
      <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z" />
    </svg>
  );
}

/**
 * Flag of Tunisia (AR / TN)
 */
export function TunisiaFlag({ className = "w-4 h-3", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path fill="#e70013" d="M0 0h640v480H0z" />
      <circle cx="320" cy="240" r="120" fill="#ffffff" />
      <circle cx="335" cy="240" r="90" fill="#e70013" />
      <circle cx="355" cy="240" r="72" fill="#ffffff" />
      <polygon
        fill="#e70013"
        points="320,185 330,218 365,218 337,238 348,270 320,250 292,270 303,238 275,218 310,218"
      />
    </svg>
  );
}

/**
 * Unified FlagIcon component that renders the appropriate crisp SVG flag
 * across all browsers, operating systems, and high-DPI displays.
 */
export function FlagIcon({
  country,
  className = "w-4 h-3",
  ...props
}: FlagIconProps) {
  switch (country) {
    case "fr":
      return <FranceFlag className={className} {...props} />;
    case "en":
    case "gb":
      return <UkFlag className={className} {...props} />;
    case "ar":
    case "tn":
      return <TunisiaFlag className={className} {...props} />;
    default:
      return <FranceFlag className={className} {...props} />;
  }
}
