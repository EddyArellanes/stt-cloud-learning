import { Injectable } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';
@Injectable()
export class RecordsService {
  async convertSTTGoogle(file) {
    try {
      const client = new SpeechClient();
      const request = {
        audio: file,
      };
      const [response] = await client.recognize(request);
      const transcript = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');
      console.log('GCloud Client', transcript);
      return transcript;
    } catch (err) {
      console.error(err);
    }
  }
}
