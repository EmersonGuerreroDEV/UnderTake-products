import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { Variant } from './entities/variant.entity';
import { Size } from './entities/size.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3007 }, // Puerto del microservicio de subida de imágenes
      },
    ]),
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('host'),
        port: configService.get<number>('database.port') || 3306, // Asegúrate de usar el puerto correcto
        username: configService.get<string>('username'),
        password: configService.get<string>('password'),
        database: configService.get<string>('database'),
        // Si usas una URL en lugar de los campos separados:
        // url: configService.get<string>('database.url'),
        entities: [Product, Brand, Category, Variant, Size], // Define tus entidades aquí
        synchronize: true, // Solo para desarrollo, desactívalo en producción
      }),
    }),
    TypeOrmModule.forFeature([Product, Brand, Category, Variant, Size]),],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule { }
