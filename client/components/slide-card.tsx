"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from '@/components/translations-context'
import { getSlides, Slide } from '@/lib/airine-data'

// Интерфейс Slide импортирован из /lib/airine-data

// Интерфейс для компонента SlideCard
interface SlideCardProps {
  slides?: Slide[]
  currentSlide?: number
  onSlideChange?: (index: number) => void
}

export function SlideCard({ slides: propSlides, currentSlide: propCurrentSlide, onSlideChange }: SlideCardProps) {
  const { t } = useTranslations()
  const [currentSlide, setCurrentSlide] = useState(propCurrentSlide || 0)
  const [direction, setDirection] = useState(0)
  
  // Получаем слайды из нашего центрального хранилища данных, если они не переданы через пропсы
  const { locale } = t
  const defaultSlides = getSlides(locale)
  const slides = propSlides || defaultSlides
  
  // Обновляем внутреннее состояние, когда меняются пропсы
  useEffect(() => {
    if (propCurrentSlide !== undefined) {
      setCurrentSlide(propCurrentSlide)
    }
  }, [propCurrentSlide])
  
  // Варианты анимации
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  }

  // Функция для перехода к следующему слайду
  const nextSlide = () => {
    setDirection(1)
    const newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
    if (onSlideChange) onSlideChange(newSlide)
  }

  // Функция для перехода к предыдущему слайду
  const prevSlide = () => {
    setDirection(-1)
    const newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
    if (onSlideChange) onSlideChange(newSlide)
  }

  // Функция для перехода к конкретному слайду
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    if (onSlideChange) onSlideChange(index)
  }

  return (
    <motion.div
      className="w-full bg-card border rounded-3xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 p-6 flex flex-col justify-between"
          >
            {slides[currentSlide].imageUrl && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={slides[currentSlide].imageUrl ?? ''}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover opacity-20"
                  fill
                  priority
                />
              </div>
            )}
            <div className="z-10 space-y-4">
              <motion.h2 
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-pt-sans-narrow)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                className="text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {slides[currentSlide].content}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Навигация слайдов */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-foreground hover:text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-foreground hover:text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="absolute bottom-6 left-6 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-foreground"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Создаем слайды на основе данных из airine-data
export const createDemoSlides = (t: { locale: string }): Slide[] => {
  const { locale } = t;
  return getSlides(locale);
}
