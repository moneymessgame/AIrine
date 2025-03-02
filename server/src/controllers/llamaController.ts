import { Request, Response } from 'express';
import llamaService from '../services/llamaService';
import { GenerateRequestParams, GenerateResponse, ErrorResponse } from '../types';
import { getIntl } from '../i18n';

/**
 * Controller for handling requests to Llama API
 */
class LlamaController {
  /**
   * Get model status
   */
  getModelStatus(req: Request, res: Response) {
    const locale = req.query.locale as 'ru' | 'en' || 'ru';
    const intl = getIntl(locale);
    
    try {
      const status = llamaService.getModelStatus();
      res.json({
        status: status.loaded ? 
          intl.formatMessage({ id: 'common.success' }) : 
          intl.formatMessage({ id: 'common.error' }),
        model_status: status
      });
    } catch (error) {
      console.error('Error getting model status:', error);
      const errorResponse: ErrorResponse = {
        error: 'status_error',
        message: intl.formatMessage({ id: 'api.errors.serverError' })
      };
      res.status(500).json(errorResponse);
    }
  }

  /**
   * Generate text based on prompt
   */
  async generateText(req: Request, res: Response) {
    const { prompt, maxTokens, temperature, locale = 'ru' } = req.body as GenerateRequestParams;
    const intl = getIntl(locale);
    
    // Check if prompt exists
    if (!prompt) {
      const errorResponse: ErrorResponse = {
        error: 'missing_prompt',
        message: intl.formatMessage({ id: 'api.validation.missingPrompt' })
      };
      return res.status(400).json(errorResponse);
    }

    try {
      // Get model status
      const status = llamaService.getModelStatus();
      if (!status.loaded) {
        const errorResponse: ErrorResponse = {
          error: 'model_not_loaded',
          message: intl.formatMessage({ id: 'api.errors.modelNotInitialized' })
        };
        return res.status(500).json(errorResponse);
      }

      // Generate text
      const { text, inferenceTimes } = await llamaService.generateText(
        prompt,
        maxTokens,
        temperature
      );

      // Format response
      const response: GenerateResponse = {
        generated_text: text,
        stats: {
          inference_time_ms: inferenceTimes,
          tokens_generated: text.split(/\s+/).length // Примерная оценка количества токенов
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error generating text:', error);
      const errorResponse: ErrorResponse = {
        error: 'generation_error',
        message: error instanceof Error ? error.message : intl.formatMessage({ id: 'api.errors.serverError' })
      };
      res.status(500).json(errorResponse);
    }
  }
}

export default new LlamaController();
