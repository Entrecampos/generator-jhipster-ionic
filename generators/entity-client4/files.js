/**
 * Copyright 2019-Present the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const constants = require('generator-jhipster/generators/generator-constants');

/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const IONIC_DIR = 'src/app/pages/';
const MODELS_DIR = 'src/models/';

const CLIENT_IONIC_TEMPLATES_DIR = 'ionic';

const E2E_TEST_DIR = 'e2e/';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

const ionicFiles = {
  client: [
    {
      path: IONIC_DIR,
      templates: [
        {
          file: 'entities/_entity.html',
          method: 'processHtml',
          template: true,
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.html`
        },
        {
          file: 'entities/_entity.model.ts',
          method: 'processHtml',
          template: true,
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.model.ts`
        },
        {
          file: 'entities/_entity.module.ts',
          method: 'processHtml',
          template: true,
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.module.ts`
        },
        {
          file: 'entities/_entity.service.ts',
          method: 'processHtml',
          template: true,
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.service.ts`
        },
        {
          file: 'entities/_entity.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.ts`
        },
        {
          file: 'entities/_entity-detail.html',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-detail.html`
        },
        {
          file: 'entities/_entity-detail.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-detail.ts`
        },
        {
          file: 'entities/_entity-update.html',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-update.html`
        },
        {
          file: 'entities/_entity-update.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-update.ts`
        },
        {
          file: 'entities/_index.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/index.ts`
        },
        {
          file: 'entities/_entity.spec.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.spec.ts`
        },
        {
          file: 'entities/_entity-detail.spec.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-detail.spec.ts`
        },
        {
          file: 'entities/_entity-update.spec.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}-update.spec.ts`
        }
      ]
    }
  ],
  e2e: [
    {
      path: E2E_TEST_DIR,
      templates: [
        {
          file: 'entities/_entity.po.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.po.ts`
        },
        {
          file: 'entities/_entity.e2e-spec.ts',
          renameTo: (generator) => `entities/${generator.entityFolderName}/${generator.entityFileName}.e2e-spec.ts`
        }
      ]
    }
  ]
};

module.exports = {
  writeFiles,
  ionicFiles
};

function writeFiles() {
  return {
    saveRemoteEntityPath() {
      if (_.isUndefined(this.microservicePath)) {
        return;
      }
      this.copy(
        `${this.microservicePath}/${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`,
        this.destinationPath(`${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`)
      );
    },

    writeClientFiles() {
      // write client side files for angular
      this.writeFilesToDisk(ionicFiles, this, false, CLIENT_IONIC_TEMPLATES_DIR);
      this.addEntityToModule(
        this.entityInstance,
        this.entityClass,
        this.entityAngularName,
        this.entityFolderName,
        this.entityFileName,
        this.enableTranslation
      );
      this.addEntityRouteToModule(
        this.entityInstance,
        this.entityClass,
        this.entityAngularName,
        this.entityFolderName,
        this.entityFileName,
        this.enableTranslation
      );

      // Copy for each
      if (this.enableTranslation) {
        const languages = this.languages || this.getAllInstalledLanguages();
        languages.forEach((language) => {
          // this.copyI18n(language, CLIENT_I18N_TEMPLATES_DIR);
        });
      }
    }
  };
}
