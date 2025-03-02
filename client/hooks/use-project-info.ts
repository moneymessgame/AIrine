"use client";

import { useTranslations } from "@/components/translations-context";
import { 
  getProjectInfo as getInfo, 
  getProjectFeatures as getFeatures, 
  getProjectTechnologies as getTechnologies, 
  getTeamInfo as getTeam, 
  getFAQ as getFAQs, 
  getVoiceCommands as getCommands,
  formatString
} from "@/lib/airine-data";

/**
 * Хук для получения информации о проекте
 * Возвращает функции, которые могут использоваться как инструменты OpenAI
 */
export function useProjectInfoFunctions() {
  const { t } = useTranslations();

  // Получение общей информации о проекте
  const getProjectInfo = () => {
    const { locale } = t;
    const projectInfo = getInfo(locale);
    
    const formattedMessage = formatString(t("projectInfo.general"), {
      name: projectInfo.name,
      version: projectInfo.version,
      description: projectInfo.description,
      releaseDate: projectInfo.releaseDate
    });
    
    return {
      success: true,
      message: formattedMessage
    };
  };

  // Получение списка функций проекта
  const getProjectFeatures = () => {
    const { locale } = t;
    const featuresList = getFeatures(locale)
      .map((feature, index) => `${index + 1}. ${feature}`)
      .join("\n");

    return {
      success: true,
      message: t("projectInfo.features") + "\n\n" + featuresList
    };
  };

  // Получение списка технологий проекта
  const getProjectTechnologies = () => {
    const { locale } = t;
    const techList = getTechnologies(locale)
      .map((tech, index) => `${index + 1}. ${tech}`)
      .join("\n");

    return {
      success: true,
      message: t("projectInfo.technologies") + "\n\n" + techList
    };
  };

  // Получение информации о команде проекта
  const getTeamInfo = () => {
    const { locale } = t;
    const teamList = getTeam(locale)
      .map((member, index) => `${index + 1}. ${member.name} - ${member.role}`)
      .join("\n");

    return {
      success: true,
      message: t("projectInfo.team") + "\n\n" + teamList
    };
  };

  // Получение часто задаваемых вопросов
  const getFAQ = (params?: { questionIndex?: number }) => {
    const { questionIndex } = params || {};
    const { locale } = t;
    const faqs = getFAQs(locale);

    // Если указан индекс вопроса, возвращаем только этот вопрос
    if (questionIndex !== undefined && questionIndex >= 0 && questionIndex < faqs.length) {
      const faq = faqs[questionIndex];
      return {
        success: true,
        message: `${faq.question}\n\n${faq.answer}`
      };
    }

    // Иначе возвращаем все вопросы
    const faqList = faqs
      .map((faq, index) => `${index + 1}. ${faq.question}`)
      .join("\n");

    return {
      success: true,
      message: t("projectInfo.faq") + "\n\n" + faqList
    };
  };

  // Получение информации о голосовых командах
  const getVoiceCommands = (params?: { categoryIndex?: number }) => {
    const { categoryIndex } = params || {};
    const { locale } = t;
    const voiceCommands = getCommands(locale);

    // Если указан индекс категории, возвращаем только эту категорию
    if (categoryIndex !== undefined && categoryIndex >= 0 && categoryIndex < voiceCommands.length) {
      const category = voiceCommands[categoryIndex];
      const examples = category.examples.map((ex, i) => `  ${i + 1}. "${ex}"`).join("\n");
      
      return {
        success: true,
        message: `${category.command}: ${category.description}\n\n${t("projectInfo.examples")}:\n${examples}`
      };
    }

    // Иначе возвращаем все категории команд
    const commandsList = voiceCommands
      .map((cmd, index) => `${index + 1}. ${cmd.command}: ${cmd.description}`)
      .join("\n");

    return {
      success: true,
      message: t("projectInfo.commands") + "\n\n" + commandsList
    };
  };

  return {
    getProjectInfo,
    getProjectFeatures,
    getProjectTechnologies,
    getTeamInfo,
    getFAQ,
    getVoiceCommands
  };
}

export type ProjectInfoFunctions = ReturnType<typeof useProjectInfoFunctions>;
