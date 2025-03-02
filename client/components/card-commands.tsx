"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, ChevronLeft, ChevronRight, X, Layers, Edit, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/components/translations-context'

interface CardCommandsProps {
  onNext: () => void
  onPrev: () => void
  onNew: () => void
  onDelete: () => void
  onGoToSlide: (index: number) => void
  currentSlide: number
  totalSlides: number
}

export function CardCommands({
  onNext,
  onPrev,
  onNew,
  onDelete,
  onGoToSlide,
  currentSlide,
  totalSlides,
}: CardCommandsProps) {
  const { t } = useTranslations()

  // Анимационные варианты для списка команд
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-pt-sans-narrow)' }}>
          {t('slides.commands.title')}
        </h3>
        <div className="text-sm text-muted-foreground">
          {t('slides.commands.slideCount', { current: currentSlide + 1, total: totalSlides })}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <motion.div variants={item}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 rounded-xl hover:bg-foreground hover:text-white"
            onClick={onPrev}
          >
            <ChevronLeft className="h-4 w-4" />
            {t('slides.commands.previous')}
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 rounded-xl hover:bg-foreground hover:text-white"
            onClick={onNext}
          >
            <ChevronRight className="h-4 w-4" />
            {t('slides.commands.next')}
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 rounded-xl hover:bg-foreground hover:text-white"
            onClick={onNew}
          >
            <Plus className="h-4 w-4" />
            {t('slides.commands.new')}
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 rounded-xl hover:bg-destructive hover:text-white"
            onClick={onDelete}
          >
            <X className="h-4 w-4" />
            {t('slides.commands.delete')}
          </Button>
        </motion.div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm font-medium">{t('slides.commands.goTo')}</div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              variants={item}
              onClick={() => onGoToSlide(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentSlide
                  ? "bg-foreground text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
