import { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import { createServer } from '@/server';
import { CONFIG, initConfig } from '@/utils/config';

initConfig();

mongoose
  .connect(CONFIG.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    createServer().then((app: Application) => {
      app.listen(CONFIG.PORT, () =>
        console.log(`Listening on port ${CONFIG.PORT}`)
      );
    });
  });
