import { SettingsService } from '~/electron/src/lib/SettingsService'

export default {
  async readSettings() {
    return await SettingsService.readSettings()
  },
  setSettings(event, settings) {
    SettingsService.setSettings(settings)
  },
  async writeSettings() {
    await SettingsService.writeSettings()
  },
}
