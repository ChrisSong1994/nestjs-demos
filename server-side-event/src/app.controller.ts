import {
  Controller,
  Get,
  Res,
  Sse,
  Inject,
  MessageEvent,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, Subject, map } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface MessageEventData {
  userId: number;
  message: Record<string, string>;
}

@Controller()
export class AppController {
  @Inject(EventEmitter2)
  private readonly eventEmitter: EventEmitter2;

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    const subject = new Subject();

    this.eventEmitter.on('CUSTOM_MESSAGE', (data) => {
      console.log('CUSTOM_MESSAGE.......', data);
      subject.next(data);
    });

    return subject.pipe(
      map((data: MessageEventData): MessageEvent => {
        // 返回值必须是 MessageEvent 类型
        console.log('subscribe....', data);
        return { data: data };
      }),
    );
  }

  @Get('send')
  stop(@Res() response: Response) {
    const messageEventData: MessageEventData = {
      userId: 123456,
      message: { hi: '你好......' },
    };
    this.eventEmitter.emit('CUSTOM_MESSAGE', messageEventData);
    response.type('application/json').send({ stop: true });
  }
}
