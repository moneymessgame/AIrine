"use client"

import { useTranslations } from "@/components/translations-context"

export const Banner = () => {
  const { t } = useTranslations();

  return (
    <div className="w-full bg-[#3949EE] py-2">
      <div className="container mx-auto px-4 text-center text-white text-sm">
        {t('header.banner')}
        
      </div>
    </div>
  );
};

export default Banner;
