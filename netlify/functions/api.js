import serverless from 'serverless-http';
import app from '../../server/server.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  // Normalize Netlify function path so Express routes match correctly
  if (event.path && event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api');
    if (!event.path.startsWith('/api')) {
      event.path = '/api' + event.path;
    }
  }
  return await serverlessHandler(event, context);
};
