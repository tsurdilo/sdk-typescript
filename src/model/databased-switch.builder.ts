/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Databasedswitch} from "./workflow";
import {DataConditionsType, DefaultTransitionType} from "./types";


export class DatabasedSwitchBuilder {


    // @ts-ignore
    private model: Databasedswitch = {
        type: "switch"
    }


    withName(value: string): DatabasedSwitchBuilder {
        this.model.name = value;
        return this;
    }

    withDataConditions(value: DataConditionsType): DatabasedSwitchBuilder {
        this.model.dataConditions = value;
        return this;
    }


    withDefault(value: DefaultTransitionType): DatabasedSwitchBuilder {
        this.model.default = value;
        return this;
    }

    build() {
        return this.model;
    }
}

