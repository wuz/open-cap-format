import { readdir } from "fs/promises";
import { resolve } from "path";
import { StreamZipAsync } from "node-stream-zip";
import { OcfFiles, OcfFileData } from "./types";
import { SCHEMA_PATH } from "./consts";
import { EnumOCFFileType } from "./ocf";

async function* getFiles(dir: string): AsyncIterableIterator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

export async function getSchemaFilepaths(verbose = false) {
  const paths: string[] = [];
  for await (const f of getFiles(SCHEMA_PATH)) {
    paths.push(f);
    if (verbose) {
      console.log(`•\t${f}`);
    }
  }
  return paths;
}

export const parseOcfFile = async (zip: StreamZipAsync) => {
  const entries = await zip.entries();
  const dataTuples = await Promise.all(
    Object.values(entries).map(async (entry) => {
      const { name } = entry;
      const isValid = Object.values(OcfFiles).includes(name as OcfFiles);
      if (entry.isFile && isValid) {
        const data = await zip.entryData(entry);
        const parsedData = JSON.parse(data.toString("utf-8"));
        return [name, parsedData];
      }
      return null;
    })
  );

  const dataMap = dataTuples.filter(Boolean).reduce(
    (acc, [name, data]: [string, OcfFileData]) => ({
      ...acc,
      [name]: data,
    }),
    {} as Record<EnumOCFFileType, OcfFileData>
  );

  return dataMap;
};
