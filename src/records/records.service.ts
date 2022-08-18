import { Injectable } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';
@Injectable()
export class RecordsService {
  async convertSTTGoogle(file) {
    try {
      console.log(`ENV: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
      const base64: string = file.buffer.toString('base64');
      const client = new SpeechClient();
      const request = {
        audio: {
          content: base64,
        },
        config: {
          encoding: Number('LINEAR16'),
          sampleRateHertz: 48000,
          languageCode: 'es-MX',
        },
      };
      const [response] = await client.recognize(request);
      const transcript = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');
      console.info('RESPONSE', JSON.stringify(response));
      console.log('GCloud Client', transcript);
      return transcript;
    } catch (err) {
      console.error(err);
    }
  }
}
