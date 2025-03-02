import express from 'express';
import cors from 'cors';
import config, { validateConfig } from './config';
import llamaController from './controllers/llamaController';
import intl from './i18n';

// Configuration validation
if (!validateConfig()) {
  console.error('Configuration validation error. Server will not start.');
  process.exit(1);
}

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// Define routes

// Define routes with proper typing

// Root route
app.get('/', (req, res) => {
  const locale = req.query.locale as 'ru' | 'en' || 'ru';
  
  res.json({
    message: locale === 'ru' ? 
      intl.formatMessage({ id: 'common.welcome' }) : 
      intl.formatMessage({ id: 'common.welcome', locale: 'en' }),
    docs: '/api-docs',
    version: '1.0.0'
  });
});

// API routes
app.get('/api/status', function(req, res) {
  llamaController.getModelStatus(req, res);
});

app.post('/api/generate', function(req, res) {
  llamaController.generateText(req, res);
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'server_error',
    message: intl.formatMessage({ id: 'api.errors.serverError' })
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  console.log(`Loading model from: ${config.modelPath}`);
  console.log('API available at: http://localhost:' + config.port);
});

export default app;
