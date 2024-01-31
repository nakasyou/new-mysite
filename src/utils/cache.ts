import * as fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import * as path from 'node:path'

const tmpDir = tmpdir()

export class CacheSystem {
  #baseName: string
  constructor (name: string) {
    this.#baseName = name
  }
  async getCache (name: string, notFound: () => Promise<Uint8Array>): Promise<Uint8Array> {
    const cachePath = path.join(tmpDir, `astro-cache-${this.#baseName}-${name}`)

    const cacheFile = Bun.file(cachePath)
    if (await cacheFile.exists()) {
      return new Uint8Array(await cacheFile.arrayBuffer())
    }

    const result = await notFound()
    
    await Bun.write(cachePath, result)

    return result
  } 
}
