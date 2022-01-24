import cors from 'cors';
import https from 'https';
import fs from 'fs';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors({
    origin: true
}));

app.get('/*', (req, res) => {
    res.send('Ah ah ah, you didn\'t say the magic word\n' + req.path);
});

https
  .createServer(
    {
      key: fs.readFileSync("../key.pem"),
      cert: fs.readFileSync("../cert.pem"),
    },
    app
  )
  .listen(32168, () => {
    console.log(
      "Listening on port 32168"
    );
  });
export default app;