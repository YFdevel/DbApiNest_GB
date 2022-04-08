import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';
import {join} from 'path';
import * as hbs from 'hbs';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useStaticAssets(join(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.engine(
        'hbs', expressHbs.engine({
            layoutsDir: join(__dirname, '..', 'views/layouts'), defaultLayout: 'layout',
            extname: 'hbs',
        }),
    );
    hbs.registerPartials(__dirname + '/views/partials');
    app.setViewEngine('hbs');
    await app.listen(3000);
}

bootstrap();
