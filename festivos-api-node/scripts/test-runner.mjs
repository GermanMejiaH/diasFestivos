import "dotenv/config";

async function runTest(name, modPath) {
  try {
    const mod = await import(modPath);
    if (typeof mod.default === "function") {
      await mod.default();
    }
    console.log(`OK ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
    process.exitCode = 1;
  }
}

async function main() {
  await runTest("pascua", "./tests/pascua.test.mjs");
  await runTest("trasladables", "./tests/trasladables.test.mjs");
  await runTest("solapados", "./tests/solapados.test.mjs");
}

main();
