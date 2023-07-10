import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFile } from "fs/promises";
import { StreamZipAsync } from "node-stream-zip";

import { URI_LOOKUP_FOR_FILE_TYPE } from "../consts";
import { getSchemaFilepaths, parseOcfFile } from "../utils";

export async function validateOcfZip(zip: StreamZipAsync, verbose = false) {
  try {
    const ajv = await getOcfValidator(verbose, false, false);
    const ocf_files = await parseOcfFile(zip);
    if (!ajv || !ocf_files)
      throw new Error(`Couldn't load validator or ocf file`);

    if (verbose)
      console.log("\n--- Loading OCF File Buffers... ---------------");

    if (verbose) console.log("\n--- Validate OCF Files ---------------");
    Object.values(ocf_files).forEach((obj) => {
      const validator = ajv.getSchema(URI_LOOKUP_FOR_FILE_TYPE[obj.file_type]);
      if (!validator)
        throw new Error(`Couldn't load validator for ${obj.file_type}`);
      const valid = validator(obj);

      if (!valid) {
        if (verbose) {
          console.log(`\n\tXX INVALID DUE TO ERRORS:`);
          console.log(validator.errors);
        }
        return false;
      } else {
        if (verbose) console.log("\n\t** VALID OCF **");
      }
    });
    return true;
  } catch (e) {
    if (verbose) {
      console.log("\n\tXX\tFAILURE DUE TO ERRORS:");
      console.log(
        `\t\tOCF Schema Validations failed due to error: ${e.message}`
      );
    }
    return false;
  }
}

export async function getOcfValidator(
  verbose = false,
  check_schema_validity = true,
  show_all_errors = false
) {
  try {
    if (verbose) console.log("\n-->\tLoad Schema Files...\n");
    const schema_paths = await getSchemaFilepaths(verbose);

    if (verbose) console.log("\n-->\tParse Schema Objs...");
    const schema_buffers = await Promise.all(
      schema_paths.map((path) => readFile(path))
    );

    if (verbose) console.log("\n-->\tParsing Schema JSONs");
    const schemas = schema_buffers.map((schema_buffer) => {
      return JSON.parse(schema_buffer.toString());
    });

    if (verbose) console.log("\n-->\tCreate AJV Validator");
    const ajv = new Ajv({
      schemas,
      validateSchema: check_schema_validity ? true : "log",
      ...(show_all_errors ? { allErrors: true, verbose } : {}),
    });

    // If we don't do this, AJV can't handle certain *built-in* JSONSchema formats (like dates)
    addFormats(ajv);

    if (verbose) console.log("\n-->\tValidator Ready");

    return ajv;
  } catch (e) {
    if (verbose) console.log(`\tXX\tCould not load validator: ${e.message}`);
    return undefined;
  }
}

export default async (zip: StreamZipAsync, verbose = false) => {
  try {
    return await validateOcfZip(zip, verbose);
  } catch (e) {
    console.error("Something went wrong", e);
  }
};
