import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
  badgeDemo?: boolean;
  align?: 'left' | 'center' | 'between';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  linkTo,
  linkText,
  badgeDemo = false,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`mb-5 sm:mb-7 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="max-w-3xl">
          {kicker && (
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2.5 h-[2px] bg-[#00A4B4]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-[#00A4B4]">
                {kicker}
              </span>
              {badgeDemo && (
                <>
                  <span className="text-[#555555]" aria-hidden="true">·</span>
                  <span className="text-[11px] font-sans text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200">
                    Contoh Tampilan
                  </span>
                </>
              )}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#0A0A0A] tracking-tight leading-[1.15] text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-[#555555] leading-relaxed max-w-2xl font-sans">
              {description}
            </p>
          )}
        </div>

        {linkTo && linkText && (
          <div className="shrink-0 mt-1 md:mt-0">
            <Link
              to={linkTo}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-[#1A1A1A] hover:text-[#00A4B4] group border-b border-[#1A1A1A] hover:border-[#00A4B4] pb-0.5 transition-colors"
            >
              <span>{linkText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#00A4B4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
