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
import {
    ActionModeType,
    ActionsType,
    DataConditionsType,
    DefaultTransitionType,
    EndType,
    FunctionsType,
    StateDataFilterType,
    StatesType
} from "./types";

/**
 * Serverless Workflow specification - workflow schema
 */
export type Workflow = {
    /**
     * Workflow unique identifier
     */
    id?: string;
    /**
     * Domain-specific workflow identifier
     */
    key?: string;
    /**
     * Workflow name
     */
    name?: string;
    /**
     * Workflow description
     */
    description?: string;
    /**
     * Workflow version
     */
    version?: string;
    /**
     * List of helpful terms describing the workflows intended purpose, subject areas, or other important qualities
     */
    annotations?: [string, ...string[]];
    start?: Startdef;
    /**
     * Serverless Workflow schema version
     */
    schemaVersion?: string;
    /**
     * Identifies the expression language used for workflow expressions. Default is 'jq'
     */
    expressionLang?: string;
    execTimeout?: Exectimeout;
    /**
     * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'execTimeout'
     */
    keepActive?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
    events?:
        | string
        | [
        {
            /**
             * Unique event name
             */
            name?: string;
            /**
             * CloudEvent source
             */
            source?: string;
            /**
             * CloudEvent type
             */
            type?: string;
            /**
             * Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'
             */
            kind?: "consumed" | "produced";
            /**
             * CloudEvent correlation definitions
             */
            correlation?: [
                {
                    /**
                     * CloudEvent Extension Context Attribute name
                     */
                    contextAttributeName: string;
                    /**
                     * CloudEvent Extension Context Attribute value
                     */
                    contextAttributeValue?: string;
                },
                ...{
                    /**
                     * CloudEvent Extension Context Attribute name
                     */
                    contextAttributeName: string;
                    /**
                     * CloudEvent Extension Context Attribute value
                     */
                    contextAttributeValue?: string;
                }[]
            ];
            /**
             * Metadata information
             */
            metadata?: {
                [k: string]: string;
            };
        },
        ...{
            /**
             * Unique event name
             */
            name?: string;
            /**
             * CloudEvent source
             */
            source?: string;
            /**
             * CloudEvent type
             */
            type?: string;
            /**
             * Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'
             */
            kind?: "consumed" | "produced";
            /**
             * CloudEvent correlation definitions
             */
            correlation?: [
                {
                    /**
                     * CloudEvent Extension Context Attribute name
                     */
                    contextAttributeName: string;
                    /**
                     * CloudEvent Extension Context Attribute value
                     */
                    contextAttributeValue?: string;
                },
                ...{
                    /**
                     * CloudEvent Extension Context Attribute name
                     */
                    contextAttributeName: string;
                    /**
                     * CloudEvent Extension Context Attribute value
                     */
                    contextAttributeValue?: string;
                }[]
            ];
            /**
             * Metadata information
             */
            metadata?: {
                [k: string]: string;
            };
        }[]
    ];
    functions?:
        FunctionsType;
    retries?:
        | string
        | [
        {
            /**
             * Unique retry strategy name
             */
            name: string;
            /**
             * Time delay between retry attempts (ISO 8601 duration format)
             */
            delay?: string;
            /**
             * Maximum time delay between retry attempts (ISO 8601 duration format)
             */
            maxDelay?: string;
            /**
             * Static value by which the delay increases during each attempt (ISO 8601 time format)
             */
            increment?: string;
            /**
             * Numeric value, if specified the delay between retries is multiplied by this value.
             */
            multiplier?: number | string;
            /**
             * Maximum number of retry attempts.
             */
            maxAttempts: number | string;
            /**
             * If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0 and 1). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)
             */
            jitter?: number | string;
        },
        ...{
            /**
             * Unique retry strategy name
             */
            name: string;
            /**
             * Time delay between retry attempts (ISO 8601 duration format)
             */
            delay?: string;
            /**
             * Maximum time delay between retry attempts (ISO 8601 duration format)
             */
            maxDelay?: string;
            /**
             * Static value by which the delay increases during each attempt (ISO 8601 time format)
             */
            increment?: string;
            /**
             * Numeric value, if specified the delay between retries is multiplied by this value.
             */
            multiplier?: number | string;
            /**
             * Maximum number of retry attempts.
             */
            maxAttempts: number | string;
            /**
             * If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0 and 1). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)
             */
            jitter?: number | string;
        }[]
    ];
    /**
     * State definitions
     */
    states?: StatesType;
    [k: string]: unknown;
} & {
    [k: string]: unknown;
};
export type Startdef =
    | string
    | {
    /**
     * Name of the starting workflow state
     */
    stateName: string;
    /**
     * Define the time/repeating intervals or cron at which workflow instances should be automatically started.
     */
    schedule:
        | string
        | {
        [k: string]: unknown;
    };
};
/**
 * This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel
 */
export type EventState =
    | {
    [k: string]: unknown;
}
    | {
    [k: string]: unknown;
}
    | {
    [k: string]: unknown;
};
export type SwitchState = Databasedswitch | Eventbasedswitch;
export type Transition =
    | string
    | {
    /**
     * Name of state to transition to
     */
    nextState: string;
    /**
     * Array of events to be produced before the transition happens
     */
    produceEvents?: {
        /**
         * References a name of a defined event
         */
        eventRef: string;
        /**
         * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
         */
        data?:
            | string
            | {
            [k: string]: unknown;
        };
        /**
         * Add additional event extension context attributes
         */
        contextAttributes?: {
            [k: string]: string;
        };
    }[];
    /**
     * If set to true, triggers workflow compensation when before this transition is taken. Default is false
     */
    compensate?: boolean;
};
export type End =
    | boolean
    | {
    /**
     * If true, completes all execution flows in the given workflow instance
     */
    terminate?: boolean;
    /**
     * Defines events that should be produced
     */
    produceEvents?: {
        /**
         * References a name of a defined event
         */
        eventRef: string;
        /**
         * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
         */
        data?:
            | string
            | {
            [k: string]: unknown;
        };
        /**
         * Add additional event extension context attributes
         */
        contextAttributes?: {
            [k: string]: string;
        };
    }[];
    /**
     * If set to true, triggers workflow compensation. Default is false
     */
    compensate?: boolean;
};

export interface Exectimeout {
    /**
     * Timeout duration (ISO 8601 duration format)
     */
    duration: string;
    /**
     * If `false`, workflow instance is allowed to finish current execution. If `true`, current workflow execution is abrupted.
     */
    interrupt?: boolean;
    /**
     * Name of a workflow state to be executed before workflow instance is terminated
     */
    runBefore?: string;
}

/**
 * Causes the workflow execution to delay for a specified duration
 */
export interface DelayState {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "delay";
    /**
     * State end definition
     */
    end?: EndType;
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Amount of time (ISO 8601 format) to delay
     */
    timeDelay?: string;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after the time delay
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}


/**
 * Defines actions be performed. Does not wait for incoming events
 */
export interface OperationState {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "operation";
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Specifies whether actions are performed in sequence or in parallel
     */
    actionMode?: ActionModeType;
    /**
     * Actions to be performed
     */
    actions?: ActionsType;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after all the actions have been performed
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Consists of a number of states that are executed in parallel
 */
export interface ParallelState {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "parallel";
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Branch Definitions
     */
    branches?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Option model on how to complete branch execution.
     */
    completionType?: "and" | "xor" | "n_of_m";
    /**
     * Used when completionType is set to 'n_of_m' to specify the 'N' value
     */
    n?: number | string;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after all branches have completed execution
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}


/**
 * Permits transitions to other states based on data conditions
 */
export interface Databasedswitch {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name: string;
    /**
     * State type
     */
    type: "switch";
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Defines conditions evaluated against state data
     */
    dataConditions: DataConditionsType;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
     */
    default?: DefaultTransitionType;
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Switch state data based condition
 */
export interface Transitiondatacondition {
    /**
     * Data condition name
     */
    name?: string;
    /**
     * Workflow expression evaluated against state data. Must evaluate to true or false
     */
    condition: string;
    /**
     * Workflow transition if condition is evaluated to true
     */
    transition:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Switch state data based condition
 */
export interface Enddatacondition {
    /**
     * Data condition name
     */
    name?: string;
    /**
     * Workflow expression evaluated against state data. Must evaluate to true or false
     */
    condition: string;
    /**
     * Workflow end definition
     */
    end: EndType;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Permits transitions to other states based on events
 */
export interface Eventbasedswitch {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name: string;
    /**
     * State type
     */
    type: "switch";
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Defines conditions evaluated against events
     */
    eventConditions: (Transitioneventcondition | Enddeventcondition)[];
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * If eventConditions is used, defines the time period to wait for events (ISO 8601 format)
     */
    eventTimeout?: string;
    /**
     * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
     */
    default?: DefaultTransitionType;
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Switch state data event condition
 */
export interface Transitioneventcondition {
    /**
     * Event condition name
     */
    name?: string;
    /**
     * References an unique event name in the defined workflow events
     */
    eventRef: string;
    /**
     * Next transition of the workflow if there is valid matches
     */
    transition:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Event data filter definition
     */
    eventDataFilter?: {
        /**
         * Workflow expression that filters of the event data (payload)
         */
        data?: string;
        /**
         *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
         */
        toStateData?: string;
    };
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Switch state data event condition
 */
export interface Enddeventcondition {
    /**
     * Event condition name
     */
    name?: string;
    /**
     * References an unique event name in the defined workflow events
     */
    eventRef: string;
    /**
     * Explicit transition to end
     */
    end:
        EndType;
    /**
     * Event data filter definition
     */
    eventDataFilter?: {
        /**
         * Workflow expression that filters of the event data (payload)
         */
        data?: string;
        /**
         *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
         */
        toStateData?: string;
    };
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Defines a sub-workflow to be executed
 */
export interface SubFlowState {
    /**
     * Unique state id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "subflow";
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * Workflow execution must wait for sub-workflow to finish before continuing
     */
    waitForCompletion?: boolean;
    /**
     * Sub-workflow unique id
     */
    workflowId?: string;
    /**
     * SubFlow state repeat exec definition
     */
    repeat?: {
        /**
         * Expression evaluated against SubFlow state data. SubFlow will repeat execution as long as this expression is true or until the max property count is reached
         */
        expression?: string;
        /**
         * If true, the expression is evaluated before each repeat execution, if false the expression is evaluated after each repeat execution
         */
        checkBefore?: boolean;
        /**
         * Sets the maximum amount of repeat executions
         */
        max?: number;
        /**
         * If true, repeats executions in a case unhandled errors propagate from the sub-workflow to this state
         */
        continueOnError?: boolean;
        /**
         * List referencing defined consumed workflow events. SubFlow will repeat execution until one of the defined events is consumed, or until the max property count is reached
         */
        stopOnEvents?: [string, ...string[]];
    };
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after SubFlow has completed execution
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Inject static data into state data. Does not perform any actions
 */
export interface InjectState {
    /**
     * Unique state id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "inject";
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * JSON object which can be set as states data input and can be manipulated via filters
     */
    data?: {
        [k: string]: unknown;
    };
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * Next transition of the workflow after subflow has completed
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * Execute a set of defined actions or workflows for each element of a data array
 */
export interface ForEachState {
    /**
     * Unique State id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "foreach";
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * Workflow expression selecting an array element of the states data
     */
    inputCollection?: string;
    /**
     * Workflow expression specifying an array element of the states data to add the results of each iteration
     */
    outputCollection?: string;
    /**
     * Name of the iteration parameter that can be referenced in actions/workflow. For each parallel iteration, this param should contain an unique element of the inputCollection array
     */
    iterationParam?: string;
    /**
     * Specifies how upper bound on how many iterations may run in parallel
     */
    max?: number | string;
    /**
     * Actions to be executed for each of the elements of inputCollection
     */
    actions?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Unique Id of a workflow to be executed for each of the elements of inputCollection
     */
    workflowId?: string;
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after state has completed
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}

/**
 * This state performs an action, then waits for the callback event that denotes completion of the action
 */
export interface CallbackState {
    /**
     * Unique state id
     */
    id?: string;
    /**
     * State name
     */
    name?: string;
    /**
     * State type
     */
    type?: "callback";
    /**
     * Defines the action to be executed
     */
    action?:
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    };
    /**
     * References an unique callback event name in the defined workflow events
     */
    eventRef?: string;
    /**
     * Time period to wait for incoming events (ISO 8601 format)
     */
    timeout?: string;
    /**
     * Event data filter
     */
    eventDataFilter?: {
        /**
         * Workflow expression that filters of the event data (payload)
         */
        data?: string;
        /**
         *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
         */
        toStateData?: string;
    };
    /**
     * State data filter
     */
    stateDataFilter?: StateDataFilterType;
    /**
     * States error handling and retries definitions
     */
    onErrors?: (
        | {
        [k: string]: unknown;
    }
        | {
        [k: string]: unknown;
    }
        )[];
    /**
     * Next transition of the workflow after all the actions have been performed
     */
    transition?:
        | string
        | {
        /**
         * Name of state to transition to
         */
        nextState: string;
        /**
         * Array of events to be produced before the transition happens
         */
        produceEvents?: {
            /**
             * References a name of a defined event
             */
            eventRef: string;
            /**
             * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
             */
            data?:
                | string
                | {
                [k: string]: unknown;
            };
            /**
             * Add additional event extension context attributes
             */
            contextAttributes?: {
                [k: string]: string;
            };
        }[];
        /**
         * If set to true, triggers workflow compensation when before this transition is taken. Default is false
         */
        compensate?: boolean;
    };
    /**
     * State end definition
     */
    end?:
        EndType;
    /**
     * Unique Name of a workflow state which is responsible for compensation of this state
     */
    compensatedBy?: string;
    /**
     * If true, this state is used to compensate another state. Default is false
     */
    usedForCompensation?: boolean;
    /**
     * Metadata information
     */
    metadata?: {
        [k: string]: string;
    };
}
