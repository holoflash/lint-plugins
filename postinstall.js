#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const projectRoot = process.env.INIT_CWD || process.cwd();
const configPath = join(projectRoot, '.oxlintrc.json');

if (!existsSync(configPath)) {
    const defaultConfig = {
        "$schema": "./node_modules/oxlint/configuration_schema.json",
        "categories": {
            "correctness": "off",
            "nursery": "off",
            "pedantic": "off",
            "perf": "off",
            "restriction": "off",
            "style": "off",
            "suspicious": "off"
        },
        "jsPlugins": ["holoflash-lint"],
        "rules": {
            "holoflash-lint/prefer-function-declaration": "warn"
        }
    };

    try {
        writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2) + '\n');
        console.log('✅ Created .oxlintrc.json with holoflash-lint configured');
    } catch (error) {
        console.error('⚠️  Could not create .oxlintrc.json:', error.message);
    }
} else {
    try {
        const existingConfig = JSON.parse(readFileSync(configPath, 'utf8'));
        let updated = false;

        if (!existingConfig.jsPlugins) {
            existingConfig.jsPlugins = ["holoflash-lint"];
            updated = true;
        } else if (!existingConfig.jsPlugins.includes("holoflash-lint")) {
            existingConfig.jsPlugins.push("holoflash-lint");
            updated = true;
        }

        if (!existingConfig.rules) {
            existingConfig.rules = {
                "holoflash-lint/prefer-function-declaration": "warn"
            };
            updated = true;
        } else if (!existingConfig.rules["holoflash-lint/prefer-function-declaration"]) {
            existingConfig.rules["holoflash-lint/prefer-function-declaration"] = "warn";
            updated = true;
        }

        if (updated) {
            writeFileSync(configPath, JSON.stringify(existingConfig, null, 2) + '\n');
            console.log('✅ Updated .oxlintrc.json with holoflash-lint configuration');
        } else {
            console.log('ℹ️  holoflash-lint is already configured in .oxlintrc.json');
        }
    } catch (error) {
        console.error('⚠️  Could not update .oxlintrc.json:', error.message);
        console.log('   Please manually add "holoflash-lint" to your jsPlugins array');
    }
}
