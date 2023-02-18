import type { InitialOptionsTsJest } from "ts-jest";
//import { jsWithBabelESM as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
    // [...]
    preset: "ts-jest",
    // extensionsToTreatAsEsm: [".ts"],
    // transform: {
    //   ...tsjPreset.transform,
    //   // [...]
    // },
};

export default config;
