import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "src/modules/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get('DB_TYPE') as any,
            host: this.configService.get('DB_HOST'),
            port: parseInt(this.configService.get('DB_PORT')) || 3306,
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME'),
            entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}