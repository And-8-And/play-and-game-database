import { env } from './config/env.js';
import { createContainer } from './container.js';
import { createApp } from './app.js';

const app = createApp(createContainer());

app.listen(env.port, () => {
  console.log(`Play and Game Database API running on http://localhost:${env.port}/api`);
});