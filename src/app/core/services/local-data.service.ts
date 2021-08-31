import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private ionStorage: Storage | null = null;
  constructor(private storage: Storage) {
    this.ionStorage = storage;
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.ionStorage = storage;
  }

  public async set(key: string, value: any) {
    await this.ionStorage?.set(key, value);
  }

  public get(key: string) {
    return this.ionStorage?.get(key);
  }

  public remove(key: string) {
    return this.ionStorage?.remove(key);
  }
}
