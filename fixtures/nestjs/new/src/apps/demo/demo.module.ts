import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...services]
})
export class DemoModule {
  static forFeature(): DynamicModule {
    return {
      module: DemoModule,
      providers: [...services],
      exports: [...services]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: DemoModule,
      imports: [TypeOrmModule.forFeature(entities)],
      controllers: [...controllers],
      providers: [...configs, ...options.providers, ...services],
      exports: [...services]
    };
  }
}
