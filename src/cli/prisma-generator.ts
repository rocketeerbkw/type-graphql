import { GeneratorOptions } from "@prisma/generator-helper";
import { DMMF } from "@prisma/photon/runtime";
import { promises as asyncFs } from "fs";
import path from "path";

import generateCode from "../generator/generate-code";
import removeDir from "../utils/removeDir";

export async function generate(options: GeneratorOptions) {
  const outputDir = options.generator.output!;
  await asyncFs.mkdir(outputDir, { recursive: true });
  await removeDir(outputDir, true);

  const photonDmmf = require(options.otherGenerators.find(
    it => it.provider === "photonjs",
  )!.output!).dmmf as DMMF.Document;

  if (options.generator.config.emitDMMF) {
    await Promise.all([
      asyncFs.writeFile(
        path.resolve(outputDir, "./dmmf.json"),
        JSON.stringify(options.dmmf, null, 2),
      ),
      asyncFs.writeFile(
        path.resolve(outputDir, "./photon-dmmf.json"),
        JSON.stringify(photonDmmf, null, 2),
      ),
    ]);
  }

  // TODO: replace with `options.dmmf` when the spec match photon output
  await generateCode(photonDmmf, outputDir);
  return "";
}
