import fs from 'fs'
import Zip from 'adm-zip'
import { RANDOMIZER_BASE_PATH } from '~/electron/src/lib/Constants'
import path from 'path'
import { LauncherService } from '~/electron/src/lib/LauncherService'

const CRASH_DUMPS_PATH = `${process.env.LOCALAPPDATA || '.'}/Temp/Moon Studios/OriAndTheWilloftheWisps/Crashes`
const CRASH_ZIP_PATH = `${RANDOMIZER_BASE_PATH}/game-crashes`

export class CrashDetectService {
  constructor() {
    this.onCrashCallback = null
    this.availableCrashDumpDirectories = []
  }

  static async start() {
    if (!fs.existsSync(CRASH_ZIP_PATH)) {
      await fs.promises.mkdir(CRASH_ZIP_PATH, { recursive: true })
    }

    this.availableCrashDumpDirectories = await this.getAvailableCrashDumpDirectories()

    console.log(`CrashDetectService: Found ${this.availableCrashDumpDirectories.length} existing crash dumps`)

    setInterval(async () => {
      const foundCrashDumpDirectories = await this.getAvailableCrashDumpDirectories()
      console.log(foundCrashDumpDirectories)

      try {
        for (const crashDirectory of foundCrashDumpDirectories) {
          if (!this.availableCrashDumpDirectories.includes(crashDirectory)) {
            console.log(`CrashDetectService: New crash dump detected: ${crashDirectory}`)
            const crashZip = await this.collectCrashInfo(crashDirectory)
            this.onCrashCallback && this.onCrashCallback(crashZip)
            break
          }
        }
      } catch (e) {
        console.error(e)
      }

      this.availableCrashDumpDirectories = foundCrashDumpDirectories
    }, 2000)
  }

  static setOnCrashCallback(callback) {
    this.onCrashCallback = callback
  }

  static async getAvailableCrashDumpDirectories() {
    if (fs.existsSync(CRASH_DUMPS_PATH)) {
      return (await fs.promises.readdir(CRASH_DUMPS_PATH, { withFileTypes: true })).filter(
        item => item.isDirectory(),
      ).map(
        item => item.name,
      )
    } else {
      return []
    }
  }

  static async collectCrashInfo(crashDumpDirectory) {
    console.log('CrashDetectService: Collecting crash dumps and logs...')

    const zip = new Zip()
    await zip.addLocalFolderPromise(`${CRASH_DUMPS_PATH}/${crashDumpDirectory}`, {
      zipPath: 'dump',
    })

    // Collect logs and Git revisions
    const logFiles = ['cs_log.txt', 'injector.csv', 'VERSION', 'settings.ini']
    for (const file of await fs.promises.readdir(RANDOMIZER_BASE_PATH)) {
      if (logFiles.includes(file) || file.endsWith('.revision')) {
        const fullPath = path.join(RANDOMIZER_BASE_PATH, file)

        if (fs.existsSync(fullPath)) {
          zip.addLocalFile(fullPath)
        }
      }
    }

    // Collect current seed
    const currentSeedPath = LauncherService.getCurrentSeedPath()
    if (currentSeedPath && fs.existsSync(currentSeedPath)) {
      await zip.addFile('seed.wotwr', await fs.promises.readFile(currentSeedPath))
    }

    const crashZipName = `${Date.now()}.zip`
    const targetZipPath = this.getFullPathToCrashZip(crashZipName)
    await zip.writeZipPromise(targetZipPath)
    console.log(`CrashDetectService: Wrote crash dump to ${targetZipPath}`)

    return crashZipName
  }

  static getFullPathToCrashZip(crashZipName) {
    return path.resolve(process.cwd(), `${CRASH_ZIP_PATH}/${crashZipName}`)
  }
}