import { PluginFunction } from 'vue'

export interface DripOptions {
  accountId: string
}

interface DripProperties {
  [key: string]: any;
}

interface DripInstance {
  identify(email: string, properties?: DripProperties): void;
  track(event: string, properties?: DripProperties): void;
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $drip: DripInstance
  }
  interface Context {
    $drip: DripInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $drip: DripInstance
  }
}

export declare const createDripPlugin: (options?: DripOptions) => {
  install: PluginFunction<DripOptions>
}

export default function initDrip(accountId: string): DripInstance;
