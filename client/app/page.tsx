"use client"

import React, { useEffect, useState } from "react"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { tools } from "@/lib/tools"
import { Welcome } from "@/components/welcome"
import { VoiceSelector } from "@/components/voice-select"
import { BroadcastButton } from "@/components/broadcast-button"
import { StatusDisplay } from "@/components/status"
import { TokenUsageDisplay } from "@/components/token-usage"
import { MessageControls } from "@/components/message-controls"
import { TextInput } from "@/components/text-input"
import { motion } from "framer-motion"
import { useToolsFunctions } from "@/hooks/use-tools"
import { SlideCard, createDemoSlides } from "@/components/slide-card"
import { CardCommands } from "@/components/card-commands"
import { useTranslations } from "@/components/translations-context"
import { useProjectInfoFunctions } from "@/hooks/use-project-info"

const App: React.FC = () => {
  // Получаем функцию перевода
  const { t } = useTranslations()
  
  // State for voice selection
  const [voice, setVoice] = useState("ash")

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage
  } = useWebRTCAudioSession(voice, tools)

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();
  
  // Get project info functions
  const projectInfoFunctions = useProjectInfoFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: 'getCurrentTime',
        backgroundFunction: 'changeBackgroundColor',
        partyFunction: 'partyMode',
        launchWebsite: 'launchWebsite', 
        copyToClipboard: 'copyToClipboard',
        scrapeWebsite: 'scrapeWebsite'
      };
      
      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions])

  // Состояние для управления слайдами
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState(() => createDemoSlides(t))

  // Функции для управления слайдами
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    return { success: true, message: t('slides.responses.nextSlide') }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    return { success: true, message: t('slides.responses.prevSlide') }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    return { success: true, message: t('slides.responses.goToSlide', { number: index + 1 }) }
  }

  // Обновляем слайды при изменении языка
  useEffect(() => {
    try {
      const demoSlides = createDemoSlides(t);
      setSlides(demoSlides);
      console.log('Demo slides initialized:', demoSlides);
    } catch (error) {
      console.error('Error setting slides:', error);
    }
  }, [t])
  
  // Регистрируем инструменты для управления слайдами
  useEffect(() => {
    // Регистрируем функции для управления слайдами
    registerFunction('nextSlide', () => {
      const result = nextSlide();
      return result;
    });
    
    registerFunction('previousSlide', () => {
      const result = prevSlide();
      return result;
    });
    
    registerFunction('goToSlide', (params: any) => {
      console.log('goToSlide called with params:', params);
      
      // Проверяем тип переданного параметра
      let slideNumber;
      
      if (params && typeof params === 'object' && 'slideNumber' in params) {
        // Если передан объект с полем slideNumber
        slideNumber = Number(params.slideNumber);
      } else if (typeof params === 'number') {
        // Если передано просто число
        slideNumber = params;
      } else if (typeof params === 'string') {
        // Если передана строка, пробуем преобразовать в число
        slideNumber = parseInt(params, 10);
      } else {
        console.error('Неверный формат параметра:', params);
        return { success: false, message: t('slides.responses.invalidSlide') };
      }
      
      if (isNaN(slideNumber)) {
        console.error('Значение не является числом:', slideNumber);
        return { success: false, message: t('slides.responses.invalidSlide') };
      }
      
      // Приводим к 0-based индексу
      const slideIndex = slideNumber - 1;
      console.log('Calculated slideIndex:', slideIndex, 'Slides length:', slides.length);
      
      if (slideIndex >= 0 && slideIndex < slides.length) {
        return goToSlide(slideIndex);
      }
      
      return { success: false, message: t('slides.responses.invalidSlide') };
    });
    
    registerFunction('addNewSlide', () => {
      const result = addNewSlide();
      return result;
    });
    
    registerFunction('deleteSlide', () => {
      const result = deleteSlide();
      return result;
    });
    
    // Регистрируем функции для получения информации о проекте
    registerFunction('getProjectInfo', projectInfoFunctions.getProjectInfo);
    registerFunction('getProjectFeatures', projectInfoFunctions.getProjectFeatures);
    registerFunction('getProjectTechnologies', projectInfoFunctions.getProjectTechnologies);
    registerFunction('getTeamInfo', projectInfoFunctions.getTeamInfo);
    registerFunction('getFAQ', (params?: { questionIndex?: number }) => {
      return projectInfoFunctions.getFAQ(params);
    });
    registerFunction('getVoiceCommands', (params?: { categoryIndex?: number }) => {
      return projectInfoFunctions.getVoiceCommands(params);
    });
  }, [registerFunction, slides.length, t, projectInfoFunctions])

  const addNewSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: `${t('slides.commands.new')} ${slides.length + 1}`,
      content: t('slides.demo')?.[0]?.content || 'Описание нового слайда'
    }
    setSlides([...slides, newSlide])
    setCurrentSlide(slides.length)
    return { success: true, message: t('slides.responses.newSlide') }
  }

  const deleteSlide = () => {
    if (slides.length <= 1) {
      return { success: false, message: t('slides.responses.cannotDelete') }
    }
    
    const newSlides = slides.filter((_, index) => index !== currentSlide)
    setSlides(newSlides)
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1)
    return { success: true, message: t('slides.responses.deleted') }
  }

  return (
    <main className="w-screen h-full">
      <motion.div 
        className="container mx-auto my-10 px-4 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Welcome /> */}
        
        {/* Грид-лейаут на две колонки */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {/* Первая колонка с управлением голосовым ассистентом */}
          <motion.div 
            className="bg-card max-w-[400px] text-card-foreground rounded-3xl border shadow-sm p-6 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <VoiceSelector value={voice} onValueChange={setVoice} />
            
            <div className="flex flex-col items-center gap-4">
              <BroadcastButton 
                isSessionActive={isSessionActive} 
                onClick={handleStartStopClick}
              />
            </div>
            
            {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
            
            {status && (
              <motion.div 
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageControls conversation={conversation} msgs={msgs} />
                {/* Закомментированный текстовый ввод 
                <TextInput 
                  onSubmit={sendTextMessage}
                  disabled={!isSessionActive}
                />
                */}
              </motion.div>
            )}
            
            {status && <StatusDisplay status={status} />}
          </motion.div>
          
          {/* Вторая колонка с карточкой и слайдами */}
          <motion.div 
            className="space-y-6 w-full col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {/* Карточка со слайдами */}
            <SlideCard 
              slides={slides} 
              currentSlide={currentSlide} 
              onSlideChange={setCurrentSlide} 
            />
            
            {/* Компонент с командами для управления карточкой */}
            <motion.div
              className="bg-card text-card-foreground rounded-3xl border shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <CardCommands 
                onNext={nextSlide}
                onPrev={prevSlide}
                onNew={addNewSlide}
                onDelete={deleteSlide}
                onGoToSlide={goToSlide}
                currentSlide={currentSlide}
                totalSlides={slides.length}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

export default App;