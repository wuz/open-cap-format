import fs from "fs/promises";
import path from "path";
import { compile } from "json-schema-to-typescript";
import { FileInfo } from "@apidevtools/json-schema-ref-parser";
import { dedupe } from "ts-dedupe";

const SCHEMA_DIR = path.join(__dirname, "../src/schema");

const handleFile = async (file: string) => {
  const schemaText = await fs.readFile(file, "utf-8");
  const schema = JSON.parse(schemaText);
  const ts = await compile(schema, "OCFSchema", {
    cwd: SCHEMA_DIR,
    $refOptions: {
      resolve: {
        http: {
          order: 201,
          canRead: true,
          read: async (file: FileInfo) => {
            const localFile = file.url.replace(
              "https://opencaptablecoalition.com/schema",
              ""
            );
            const resolvedFile = path.join(SCHEMA_DIR, localFile);
            const fileData = await fs.readFile(resolvedFile, "utf-8");
            return fileData;
          },
        },
      },
    },
  });
  return ts;
};

const recurse = async (dir: string) => {
  const list = await fs.readdir(dir);
  const fileData = list
    .map(async (file) => {
      const resolvedFile = path.resolve(dir, file);
      const stat = await fs.stat(resolvedFile);
      if (stat?.isDirectory()) {
        const subFiles = await recurse(resolvedFile);
        return subFiles.flat();
      } else {
        return await handleFile(resolvedFile);
      }
    })
    .flat();
  return await Promise.all(fileData);
};

const main = async () => {
  const fileData = await recurse(SCHEMA_DIR);
  const writeData = fileData.flat().join("\n");
  const writePath = path.join(SCHEMA_DIR, "../ocf.d.ts");
  await fs.writeFile(writePath, writeData);
};

main();
