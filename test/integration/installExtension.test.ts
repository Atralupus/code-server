import { stat } from "fs/promises"
import { cwd } from "process"
import { clean, tmpdir } from "../utils/helpers"
import { runCodeServerCommand } from "../utils/runCodeServerCommand"

describe("--install-extension", () => {
  const testName = "installExtension"
  let tempDir: string
  let setupFlags: string[]

  beforeEach(async () => {
    await clean(testName)
    tempDir = await tmpdir(testName)
    setupFlags = ["--extensions-dir", tempDir]
  })
  it("should install an extension", async () => {
    const extName = `wesbos.theme-cobalt2-2.1.6`
    const vsixFileName = "wesbos.theme-cobalt2-2.1.6.vsix"
    const extensionFixture = `${cwd()}/test/integration/fixtures/${vsixFileName}`
    await runCodeServerCommand([...setupFlags, "--install-extension", extensionFixture], {})
    const pathToExtFolder = `${tempDir}/${extName}`
    const statInfo = await stat(pathToExtFolder)
    expect(statInfo.isDirectory()).toBe(true)
  }, 20000)
})
