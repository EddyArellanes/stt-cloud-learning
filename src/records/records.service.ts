import { Injectable } from '@nestjs/common';
import * as speech from '@google-cloud/speech';
@Injectable()
export class RecordsService {
  convertSTTGoogle() {
    try {
      const client = new speech.SpeechClient();
      console.log('GCloud Client', client);
    } catch (err) {}
  }
}
