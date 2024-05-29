/* AUTOGENERATED */

/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ErrorType } from "./base.ts";
import * as errors from "./index.ts";

export const errorMapping = new Map<number, ErrorType>();

errorMapping.set(0x01_00_00_00, errors.InternalServerError);
errorMapping.set(0x02_00_00_00, errors.UnsupportedFeatureError);
errorMapping.set(0x03_00_00_00, errors.ProtocolError);
errorMapping.set(0x03_01_00_00, errors.BinaryProtocolError);
errorMapping.set(0x03_01_00_01, errors.UnsupportedProtocolVersionError);
errorMapping.set(0x03_01_00_02, errors.TypeSpecNotFoundError);
errorMapping.set(0x03_01_00_03, errors.UnexpectedMessageError);
errorMapping.set(0x03_02_00_00, errors.InputDataError);
errorMapping.set(0x03_02_01_00, errors.ParameterTypeMismatchError);
errorMapping.set(0x03_02_02_00, errors.StateMismatchError);
errorMapping.set(0x03_03_00_00, errors.ResultCardinalityMismatchError);
errorMapping.set(0x03_04_00_00, errors.CapabilityError);
errorMapping.set(0x03_04_01_00, errors.UnsupportedCapabilityError);
errorMapping.set(0x03_04_02_00, errors.DisabledCapabilityError);
errorMapping.set(0x04_00_00_00, errors.QueryError);
errorMapping.set(0x04_01_00_00, errors.InvalidSyntaxError);
errorMapping.set(0x04_01_01_00, errors.EdgeQLSyntaxError);
errorMapping.set(0x04_01_02_00, errors.SchemaSyntaxError);
errorMapping.set(0x04_01_03_00, errors.GraphQLSyntaxError);
errorMapping.set(0x04_02_00_00, errors.InvalidTypeError);
errorMapping.set(0x04_02_01_00, errors.InvalidTargetError);
errorMapping.set(0x04_02_01_01, errors.InvalidLinkTargetError);
errorMapping.set(0x04_02_01_02, errors.InvalidPropertyTargetError);
errorMapping.set(0x04_03_00_00, errors.InvalidReferenceError);
errorMapping.set(0x04_03_00_01, errors.UnknownModuleError);
errorMapping.set(0x04_03_00_02, errors.UnknownLinkError);
errorMapping.set(0x04_03_00_03, errors.UnknownPropertyError);
errorMapping.set(0x04_03_00_04, errors.UnknownUserError);
errorMapping.set(0x04_03_00_05, errors.UnknownDatabaseError);
errorMapping.set(0x04_03_00_06, errors.UnknownParameterError);
errorMapping.set(0x04_04_00_00, errors.SchemaError);
errorMapping.set(0x04_05_00_00, errors.SchemaDefinitionError);
errorMapping.set(0x04_05_01_00, errors.InvalidDefinitionError);
errorMapping.set(0x04_05_01_01, errors.InvalidModuleDefinitionError);
errorMapping.set(0x04_05_01_02, errors.InvalidLinkDefinitionError);
errorMapping.set(0x04_05_01_03, errors.InvalidPropertyDefinitionError);
errorMapping.set(0x04_05_01_04, errors.InvalidUserDefinitionError);
errorMapping.set(0x04_05_01_05, errors.InvalidDatabaseDefinitionError);
errorMapping.set(0x04_05_01_06, errors.InvalidOperatorDefinitionError);
errorMapping.set(0x04_05_01_07, errors.InvalidAliasDefinitionError);
errorMapping.set(0x04_05_01_08, errors.InvalidFunctionDefinitionError);
errorMapping.set(0x04_05_01_09, errors.InvalidConstraintDefinitionError);
errorMapping.set(0x04_05_01_0a, errors.InvalidCastDefinitionError);
errorMapping.set(0x04_05_02_00, errors.DuplicateDefinitionError);
errorMapping.set(0x04_05_02_01, errors.DuplicateModuleDefinitionError);
errorMapping.set(0x04_05_02_02, errors.DuplicateLinkDefinitionError);
errorMapping.set(0x04_05_02_03, errors.DuplicatePropertyDefinitionError);
errorMapping.set(0x04_05_02_04, errors.DuplicateUserDefinitionError);
errorMapping.set(0x04_05_02_05, errors.DuplicateDatabaseDefinitionError);
errorMapping.set(0x04_05_02_06, errors.DuplicateOperatorDefinitionError);
errorMapping.set(0x04_05_02_07, errors.DuplicateViewDefinitionError);
errorMapping.set(0x04_05_02_08, errors.DuplicateFunctionDefinitionError);
errorMapping.set(0x04_05_02_09, errors.DuplicateConstraintDefinitionError);
errorMapping.set(0x04_05_02_0a, errors.DuplicateCastDefinitionError);
errorMapping.set(0x04_05_02_0b, errors.DuplicateMigrationError);
errorMapping.set(0x04_06_00_00, errors.SessionTimeoutError);
errorMapping.set(0x04_06_01_00, errors.IdleSessionTimeoutError);
errorMapping.set(0x04_06_02_00, errors.QueryTimeoutError);
errorMapping.set(0x04_06_0a_00, errors.TransactionTimeoutError);
errorMapping.set(0x04_06_0a_01, errors.IdleTransactionTimeoutError);
errorMapping.set(0x05_00_00_00, errors.ExecutionError);
errorMapping.set(0x05_01_00_00, errors.InvalidValueError);
errorMapping.set(0x05_01_00_01, errors.DivisionByZeroError);
errorMapping.set(0x05_01_00_02, errors.NumericOutOfRangeError);
errorMapping.set(0x05_01_00_03, errors.AccessPolicyError);
errorMapping.set(0x05_01_00_04, errors.QueryAssertionError);
errorMapping.set(0x05_02_00_00, errors.IntegrityError);
errorMapping.set(0x05_02_00_01, errors.ConstraintViolationError);
errorMapping.set(0x05_02_00_02, errors.CardinalityViolationError);
errorMapping.set(0x05_02_00_03, errors.MissingRequiredError);
errorMapping.set(0x05_03_00_00, errors.TransactionError);
errorMapping.set(0x05_03_01_00, errors.TransactionConflictError);
errorMapping.set(0x05_03_01_01, errors.TransactionSerializationError);
errorMapping.set(0x05_03_01_02, errors.TransactionDeadlockError);
errorMapping.set(0x05_04_00_00, errors.WatchError);
errorMapping.set(0x06_00_00_00, errors.ConfigurationError);
errorMapping.set(0x07_00_00_00, errors.AccessError);
errorMapping.set(0x07_01_00_00, errors.AuthenticationError);
errorMapping.set(0x08_00_00_00, errors.AvailabilityError);
errorMapping.set(0x08_00_00_01, errors.BackendUnavailableError);
errorMapping.set(0x08_00_00_02, errors.ServerOfflineError);
errorMapping.set(0x08_00_00_03, errors.UnknownTenantError);
errorMapping.set(0x08_00_00_04, errors.ServerBlockedError);
errorMapping.set(0x09_00_00_00, errors.BackendError);
errorMapping.set(0x09_00_01_00, errors.UnsupportedBackendFeatureError);
errorMapping.set(0xf0_00_00_00, errors.LogMessage);
errorMapping.set(0xf0_01_00_00, errors.WarningMessage);
errorMapping.set(0xff_00_00_00, errors.ClientError);
errorMapping.set(0xff_01_00_00, errors.ClientConnectionError);
errorMapping.set(0xff_01_01_00, errors.ClientConnectionFailedError);
errorMapping.set(0xff_01_01_01, errors.ClientConnectionFailedTemporarilyError);
errorMapping.set(0xff_01_02_00, errors.ClientConnectionTimeoutError);
errorMapping.set(0xff_01_03_00, errors.ClientConnectionClosedError);
errorMapping.set(0xff_02_00_00, errors.InterfaceError);
errorMapping.set(0xff_02_01_00, errors.QueryArgumentError);
errorMapping.set(0xff_02_01_01, errors.MissingArgumentError);
errorMapping.set(0xff_02_01_02, errors.UnknownArgumentError);
errorMapping.set(0xff_02_01_03, errors.InvalidArgumentError);
errorMapping.set(0xff_03_00_00, errors.NoDataError);
errorMapping.set(0xff_04_00_00, errors.InternalClientError);
