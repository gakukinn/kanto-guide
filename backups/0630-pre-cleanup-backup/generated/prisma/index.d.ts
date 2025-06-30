
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model HanabiEvent
 * 
 */
export type HanabiEvent = $Result.DefaultSelection<Prisma.$HanabiEventPayload>
/**
 * Model MatsuriEvent
 * 
 */
export type MatsuriEvent = $Result.DefaultSelection<Prisma.$MatsuriEventPayload>
/**
 * Model HanamiEvent
 * 
 */
export type HanamiEvent = $Result.DefaultSelection<Prisma.$HanamiEventPayload>
/**
 * Model MomijiEvent
 * 
 */
export type MomijiEvent = $Result.DefaultSelection<Prisma.$MomijiEventPayload>
/**
 * Model IlluminationEvent
 * 
 */
export type IlluminationEvent = $Result.DefaultSelection<Prisma.$IlluminationEventPayload>
/**
 * Model CultureEvent
 * 
 */
export type CultureEvent = $Result.DefaultSelection<Prisma.$CultureEventPayload>
/**
 * Model ValidationResult
 * 
 */
export type ValidationResult = $Result.DefaultSelection<Prisma.$ValidationResultPayload>
/**
 * Model ExternalRawData
 * 
 */
export type ExternalRawData = $Result.DefaultSelection<Prisma.$ExternalRawDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Regions
 * const regions = await prisma.region.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Regions
   * const regions = await prisma.region.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hanabiEvent`: Exposes CRUD operations for the **HanabiEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HanabiEvents
    * const hanabiEvents = await prisma.hanabiEvent.findMany()
    * ```
    */
  get hanabiEvent(): Prisma.HanabiEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matsuriEvent`: Exposes CRUD operations for the **MatsuriEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatsuriEvents
    * const matsuriEvents = await prisma.matsuriEvent.findMany()
    * ```
    */
  get matsuriEvent(): Prisma.MatsuriEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hanamiEvent`: Exposes CRUD operations for the **HanamiEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HanamiEvents
    * const hanamiEvents = await prisma.hanamiEvent.findMany()
    * ```
    */
  get hanamiEvent(): Prisma.HanamiEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.momijiEvent`: Exposes CRUD operations for the **MomijiEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MomijiEvents
    * const momijiEvents = await prisma.momijiEvent.findMany()
    * ```
    */
  get momijiEvent(): Prisma.MomijiEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.illuminationEvent`: Exposes CRUD operations for the **IlluminationEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IlluminationEvents
    * const illuminationEvents = await prisma.illuminationEvent.findMany()
    * ```
    */
  get illuminationEvent(): Prisma.IlluminationEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cultureEvent`: Exposes CRUD operations for the **CultureEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CultureEvents
    * const cultureEvents = await prisma.cultureEvent.findMany()
    * ```
    */
  get cultureEvent(): Prisma.CultureEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.validationResult`: Exposes CRUD operations for the **ValidationResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ValidationResults
    * const validationResults = await prisma.validationResult.findMany()
    * ```
    */
  get validationResult(): Prisma.ValidationResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.externalRawData`: Exposes CRUD operations for the **ExternalRawData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExternalRawData
    * const externalRawData = await prisma.externalRawData.findMany()
    * ```
    */
  get externalRawData(): Prisma.ExternalRawDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Region: 'Region',
    HanabiEvent: 'HanabiEvent',
    MatsuriEvent: 'MatsuriEvent',
    HanamiEvent: 'HanamiEvent',
    MomijiEvent: 'MomijiEvent',
    IlluminationEvent: 'IlluminationEvent',
    CultureEvent: 'CultureEvent',
    ValidationResult: 'ValidationResult',
    ExternalRawData: 'ExternalRawData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "region" | "hanabiEvent" | "matsuriEvent" | "hanamiEvent" | "momijiEvent" | "illuminationEvent" | "cultureEvent" | "validationResult" | "externalRawData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      HanabiEvent: {
        payload: Prisma.$HanabiEventPayload<ExtArgs>
        fields: Prisma.HanabiEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HanabiEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HanabiEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          findFirst: {
            args: Prisma.HanabiEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HanabiEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          findMany: {
            args: Prisma.HanabiEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>[]
          }
          create: {
            args: Prisma.HanabiEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          createMany: {
            args: Prisma.HanabiEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HanabiEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>[]
          }
          delete: {
            args: Prisma.HanabiEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          update: {
            args: Prisma.HanabiEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          deleteMany: {
            args: Prisma.HanabiEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HanabiEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HanabiEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>[]
          }
          upsert: {
            args: Prisma.HanabiEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanabiEventPayload>
          }
          aggregate: {
            args: Prisma.HanabiEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHanabiEvent>
          }
          groupBy: {
            args: Prisma.HanabiEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<HanabiEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.HanabiEventCountArgs<ExtArgs>
            result: $Utils.Optional<HanabiEventCountAggregateOutputType> | number
          }
        }
      }
      MatsuriEvent: {
        payload: Prisma.$MatsuriEventPayload<ExtArgs>
        fields: Prisma.MatsuriEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatsuriEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatsuriEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          findFirst: {
            args: Prisma.MatsuriEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatsuriEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          findMany: {
            args: Prisma.MatsuriEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>[]
          }
          create: {
            args: Prisma.MatsuriEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          createMany: {
            args: Prisma.MatsuriEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatsuriEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>[]
          }
          delete: {
            args: Prisma.MatsuriEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          update: {
            args: Prisma.MatsuriEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          deleteMany: {
            args: Prisma.MatsuriEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatsuriEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatsuriEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>[]
          }
          upsert: {
            args: Prisma.MatsuriEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatsuriEventPayload>
          }
          aggregate: {
            args: Prisma.MatsuriEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatsuriEvent>
          }
          groupBy: {
            args: Prisma.MatsuriEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatsuriEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatsuriEventCountArgs<ExtArgs>
            result: $Utils.Optional<MatsuriEventCountAggregateOutputType> | number
          }
        }
      }
      HanamiEvent: {
        payload: Prisma.$HanamiEventPayload<ExtArgs>
        fields: Prisma.HanamiEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HanamiEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HanamiEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          findFirst: {
            args: Prisma.HanamiEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HanamiEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          findMany: {
            args: Prisma.HanamiEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>[]
          }
          create: {
            args: Prisma.HanamiEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          createMany: {
            args: Prisma.HanamiEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HanamiEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>[]
          }
          delete: {
            args: Prisma.HanamiEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          update: {
            args: Prisma.HanamiEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          deleteMany: {
            args: Prisma.HanamiEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HanamiEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HanamiEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>[]
          }
          upsert: {
            args: Prisma.HanamiEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HanamiEventPayload>
          }
          aggregate: {
            args: Prisma.HanamiEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHanamiEvent>
          }
          groupBy: {
            args: Prisma.HanamiEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<HanamiEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.HanamiEventCountArgs<ExtArgs>
            result: $Utils.Optional<HanamiEventCountAggregateOutputType> | number
          }
        }
      }
      MomijiEvent: {
        payload: Prisma.$MomijiEventPayload<ExtArgs>
        fields: Prisma.MomijiEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MomijiEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MomijiEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          findFirst: {
            args: Prisma.MomijiEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MomijiEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          findMany: {
            args: Prisma.MomijiEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>[]
          }
          create: {
            args: Prisma.MomijiEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          createMany: {
            args: Prisma.MomijiEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MomijiEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>[]
          }
          delete: {
            args: Prisma.MomijiEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          update: {
            args: Prisma.MomijiEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          deleteMany: {
            args: Prisma.MomijiEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MomijiEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MomijiEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>[]
          }
          upsert: {
            args: Prisma.MomijiEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomijiEventPayload>
          }
          aggregate: {
            args: Prisma.MomijiEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMomijiEvent>
          }
          groupBy: {
            args: Prisma.MomijiEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<MomijiEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MomijiEventCountArgs<ExtArgs>
            result: $Utils.Optional<MomijiEventCountAggregateOutputType> | number
          }
        }
      }
      IlluminationEvent: {
        payload: Prisma.$IlluminationEventPayload<ExtArgs>
        fields: Prisma.IlluminationEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IlluminationEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IlluminationEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          findFirst: {
            args: Prisma.IlluminationEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IlluminationEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          findMany: {
            args: Prisma.IlluminationEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>[]
          }
          create: {
            args: Prisma.IlluminationEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          createMany: {
            args: Prisma.IlluminationEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IlluminationEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>[]
          }
          delete: {
            args: Prisma.IlluminationEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          update: {
            args: Prisma.IlluminationEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          deleteMany: {
            args: Prisma.IlluminationEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IlluminationEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IlluminationEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>[]
          }
          upsert: {
            args: Prisma.IlluminationEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IlluminationEventPayload>
          }
          aggregate: {
            args: Prisma.IlluminationEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIlluminationEvent>
          }
          groupBy: {
            args: Prisma.IlluminationEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<IlluminationEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.IlluminationEventCountArgs<ExtArgs>
            result: $Utils.Optional<IlluminationEventCountAggregateOutputType> | number
          }
        }
      }
      CultureEvent: {
        payload: Prisma.$CultureEventPayload<ExtArgs>
        fields: Prisma.CultureEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CultureEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CultureEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          findFirst: {
            args: Prisma.CultureEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CultureEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          findMany: {
            args: Prisma.CultureEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>[]
          }
          create: {
            args: Prisma.CultureEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          createMany: {
            args: Prisma.CultureEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CultureEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>[]
          }
          delete: {
            args: Prisma.CultureEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          update: {
            args: Prisma.CultureEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          deleteMany: {
            args: Prisma.CultureEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CultureEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CultureEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>[]
          }
          upsert: {
            args: Prisma.CultureEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CultureEventPayload>
          }
          aggregate: {
            args: Prisma.CultureEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCultureEvent>
          }
          groupBy: {
            args: Prisma.CultureEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CultureEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CultureEventCountArgs<ExtArgs>
            result: $Utils.Optional<CultureEventCountAggregateOutputType> | number
          }
        }
      }
      ValidationResult: {
        payload: Prisma.$ValidationResultPayload<ExtArgs>
        fields: Prisma.ValidationResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ValidationResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ValidationResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          findFirst: {
            args: Prisma.ValidationResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ValidationResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          findMany: {
            args: Prisma.ValidationResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>[]
          }
          create: {
            args: Prisma.ValidationResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          createMany: {
            args: Prisma.ValidationResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ValidationResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>[]
          }
          delete: {
            args: Prisma.ValidationResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          update: {
            args: Prisma.ValidationResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          deleteMany: {
            args: Prisma.ValidationResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ValidationResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ValidationResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>[]
          }
          upsert: {
            args: Prisma.ValidationResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValidationResultPayload>
          }
          aggregate: {
            args: Prisma.ValidationResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateValidationResult>
          }
          groupBy: {
            args: Prisma.ValidationResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ValidationResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ValidationResultCountArgs<ExtArgs>
            result: $Utils.Optional<ValidationResultCountAggregateOutputType> | number
          }
        }
      }
      ExternalRawData: {
        payload: Prisma.$ExternalRawDataPayload<ExtArgs>
        fields: Prisma.ExternalRawDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExternalRawDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExternalRawDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          findFirst: {
            args: Prisma.ExternalRawDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExternalRawDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          findMany: {
            args: Prisma.ExternalRawDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>[]
          }
          create: {
            args: Prisma.ExternalRawDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          createMany: {
            args: Prisma.ExternalRawDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExternalRawDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>[]
          }
          delete: {
            args: Prisma.ExternalRawDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          update: {
            args: Prisma.ExternalRawDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          deleteMany: {
            args: Prisma.ExternalRawDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExternalRawDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExternalRawDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>[]
          }
          upsert: {
            args: Prisma.ExternalRawDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalRawDataPayload>
          }
          aggregate: {
            args: Prisma.ExternalRawDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternalRawData>
          }
          groupBy: {
            args: Prisma.ExternalRawDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExternalRawDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExternalRawDataCountArgs<ExtArgs>
            result: $Utils.Optional<ExternalRawDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    region?: RegionOmit
    hanabiEvent?: HanabiEventOmit
    matsuriEvent?: MatsuriEventOmit
    hanamiEvent?: HanamiEventOmit
    momijiEvent?: MomijiEventOmit
    illuminationEvent?: IlluminationEventOmit
    cultureEvent?: CultureEventOmit
    validationResult?: ValidationResultOmit
    externalRawData?: ExternalRawDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    hanabiEvents: number
    matsuriEvents: number
    hanamiEvents: number
    momijiEvents: number
    illuminationEvents: number
    cultureEvents: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hanabiEvents?: boolean | RegionCountOutputTypeCountHanabiEventsArgs
    matsuriEvents?: boolean | RegionCountOutputTypeCountMatsuriEventsArgs
    hanamiEvents?: boolean | RegionCountOutputTypeCountHanamiEventsArgs
    momijiEvents?: boolean | RegionCountOutputTypeCountMomijiEventsArgs
    illuminationEvents?: boolean | RegionCountOutputTypeCountIlluminationEventsArgs
    cultureEvents?: boolean | RegionCountOutputTypeCountCultureEventsArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountHanabiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HanabiEventWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountMatsuriEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatsuriEventWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountHanamiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HanamiEventWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountMomijiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MomijiEventWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountIlluminationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IlluminationEventWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountCultureEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CultureEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionMinAggregateOutputType = {
    id: string | null
    code: string | null
    nameCn: string | null
    nameJp: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionMaxAggregateOutputType = {
    id: string | null
    code: string | null
    nameCn: string | null
    nameJp: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    code: number
    nameCn: number
    nameJp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegionMinAggregateInputType = {
    id?: true
    code?: true
    nameCn?: true
    nameJp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    code?: true
    nameCn?: true
    nameJp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    code?: true
    nameCn?: true
    nameJp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: string
    code: string
    nameCn: string
    nameJp: string
    createdAt: Date
    updatedAt: Date
    _count: RegionCountAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameCn?: boolean
    nameJp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hanabiEvents?: boolean | Region$hanabiEventsArgs<ExtArgs>
    matsuriEvents?: boolean | Region$matsuriEventsArgs<ExtArgs>
    hanamiEvents?: boolean | Region$hanamiEventsArgs<ExtArgs>
    momijiEvents?: boolean | Region$momijiEventsArgs<ExtArgs>
    illuminationEvents?: boolean | Region$illuminationEventsArgs<ExtArgs>
    cultureEvents?: boolean | Region$cultureEventsArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameCn?: boolean
    nameJp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameCn?: boolean
    nameJp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    code?: boolean
    nameCn?: boolean
    nameJp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "nameCn" | "nameJp" | "createdAt" | "updatedAt", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hanabiEvents?: boolean | Region$hanabiEventsArgs<ExtArgs>
    matsuriEvents?: boolean | Region$matsuriEventsArgs<ExtArgs>
    hanamiEvents?: boolean | Region$hanamiEventsArgs<ExtArgs>
    momijiEvents?: boolean | Region$momijiEventsArgs<ExtArgs>
    illuminationEvents?: boolean | Region$illuminationEventsArgs<ExtArgs>
    cultureEvents?: boolean | Region$cultureEventsArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      hanabiEvents: Prisma.$HanabiEventPayload<ExtArgs>[]
      matsuriEvents: Prisma.$MatsuriEventPayload<ExtArgs>[]
      hanamiEvents: Prisma.$HanamiEventPayload<ExtArgs>[]
      momijiEvents: Prisma.$MomijiEventPayload<ExtArgs>[]
      illuminationEvents: Prisma.$IlluminationEventPayload<ExtArgs>[]
      cultureEvents: Prisma.$CultureEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      nameCn: string
      nameJp: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hanabiEvents<T extends Region$hanabiEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$hanabiEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matsuriEvents<T extends Region$matsuriEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$matsuriEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hanamiEvents<T extends Region$hanamiEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$hanamiEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    momijiEvents<T extends Region$momijiEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$momijiEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    illuminationEvents<T extends Region$illuminationEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$illuminationEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cultureEvents<T extends Region$cultureEventsArgs<ExtArgs> = {}>(args?: Subset<T, Region$cultureEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'String'>
    readonly code: FieldRef<"Region", 'String'>
    readonly nameCn: FieldRef<"Region", 'String'>
    readonly nameJp: FieldRef<"Region", 'String'>
    readonly createdAt: FieldRef<"Region", 'DateTime'>
    readonly updatedAt: FieldRef<"Region", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region.hanabiEvents
   */
  export type Region$hanabiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    where?: HanabiEventWhereInput
    orderBy?: HanabiEventOrderByWithRelationInput | HanabiEventOrderByWithRelationInput[]
    cursor?: HanabiEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HanabiEventScalarFieldEnum | HanabiEventScalarFieldEnum[]
  }

  /**
   * Region.matsuriEvents
   */
  export type Region$matsuriEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    where?: MatsuriEventWhereInput
    orderBy?: MatsuriEventOrderByWithRelationInput | MatsuriEventOrderByWithRelationInput[]
    cursor?: MatsuriEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatsuriEventScalarFieldEnum | MatsuriEventScalarFieldEnum[]
  }

  /**
   * Region.hanamiEvents
   */
  export type Region$hanamiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    where?: HanamiEventWhereInput
    orderBy?: HanamiEventOrderByWithRelationInput | HanamiEventOrderByWithRelationInput[]
    cursor?: HanamiEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HanamiEventScalarFieldEnum | HanamiEventScalarFieldEnum[]
  }

  /**
   * Region.momijiEvents
   */
  export type Region$momijiEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    where?: MomijiEventWhereInput
    orderBy?: MomijiEventOrderByWithRelationInput | MomijiEventOrderByWithRelationInput[]
    cursor?: MomijiEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MomijiEventScalarFieldEnum | MomijiEventScalarFieldEnum[]
  }

  /**
   * Region.illuminationEvents
   */
  export type Region$illuminationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    where?: IlluminationEventWhereInput
    orderBy?: IlluminationEventOrderByWithRelationInput | IlluminationEventOrderByWithRelationInput[]
    cursor?: IlluminationEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IlluminationEventScalarFieldEnum | IlluminationEventScalarFieldEnum[]
  }

  /**
   * Region.cultureEvents
   */
  export type Region$cultureEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    where?: CultureEventWhereInput
    orderBy?: CultureEventOrderByWithRelationInput | CultureEventOrderByWithRelationInput[]
    cursor?: CultureEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CultureEventScalarFieldEnum | CultureEventScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model HanabiEvent
   */

  export type AggregateHanabiEvent = {
    _count: HanabiEventCountAggregateOutputType | null
    _min: HanabiEventMinAggregateOutputType | null
    _max: HanabiEventMaxAggregateOutputType | null
  }

  export type HanabiEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HanabiEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HanabiEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HanabiEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HanabiEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HanabiEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HanabiEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HanabiEvent to aggregate.
     */
    where?: HanabiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanabiEvents to fetch.
     */
    orderBy?: HanabiEventOrderByWithRelationInput | HanabiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HanabiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanabiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanabiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HanabiEvents
    **/
    _count?: true | HanabiEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HanabiEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HanabiEventMaxAggregateInputType
  }

  export type GetHanabiEventAggregateType<T extends HanabiEventAggregateArgs> = {
        [P in keyof T & keyof AggregateHanabiEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHanabiEvent[P]>
      : GetScalarType<T[P], AggregateHanabiEvent[P]>
  }




  export type HanabiEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HanabiEventWhereInput
    orderBy?: HanabiEventOrderByWithAggregationInput | HanabiEventOrderByWithAggregationInput[]
    by: HanabiEventScalarFieldEnum[] | HanabiEventScalarFieldEnum
    having?: HanabiEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HanabiEventCountAggregateInputType | true
    _min?: HanabiEventMinAggregateInputType
    _max?: HanabiEventMaxAggregateInputType
  }

  export type HanabiEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: HanabiEventCountAggregateOutputType | null
    _min: HanabiEventMinAggregateOutputType | null
    _max: HanabiEventMaxAggregateOutputType | null
  }

  type GetHanabiEventGroupByPayload<T extends HanabiEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HanabiEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HanabiEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HanabiEventGroupByOutputType[P]>
            : GetScalarType<T[P], HanabiEventGroupByOutputType[P]>
        }
      >
    >


  export type HanabiEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanabiEvent"]>

  export type HanabiEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanabiEvent"]>

  export type HanabiEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanabiEvent"]>

  export type HanabiEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HanabiEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["hanabiEvent"]>
  export type HanabiEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type HanabiEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type HanabiEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $HanabiEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HanabiEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hanabiEvent"]>
    composites: {}
  }

  type HanabiEventGetPayload<S extends boolean | null | undefined | HanabiEventDefaultArgs> = $Result.GetResult<Prisma.$HanabiEventPayload, S>

  type HanabiEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HanabiEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HanabiEventCountAggregateInputType | true
    }

  export interface HanabiEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HanabiEvent'], meta: { name: 'HanabiEvent' } }
    /**
     * Find zero or one HanabiEvent that matches the filter.
     * @param {HanabiEventFindUniqueArgs} args - Arguments to find a HanabiEvent
     * @example
     * // Get one HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HanabiEventFindUniqueArgs>(args: SelectSubset<T, HanabiEventFindUniqueArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HanabiEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HanabiEventFindUniqueOrThrowArgs} args - Arguments to find a HanabiEvent
     * @example
     * // Get one HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HanabiEventFindUniqueOrThrowArgs>(args: SelectSubset<T, HanabiEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HanabiEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventFindFirstArgs} args - Arguments to find a HanabiEvent
     * @example
     * // Get one HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HanabiEventFindFirstArgs>(args?: SelectSubset<T, HanabiEventFindFirstArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HanabiEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventFindFirstOrThrowArgs} args - Arguments to find a HanabiEvent
     * @example
     * // Get one HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HanabiEventFindFirstOrThrowArgs>(args?: SelectSubset<T, HanabiEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HanabiEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HanabiEvents
     * const hanabiEvents = await prisma.hanabiEvent.findMany()
     * 
     * // Get first 10 HanabiEvents
     * const hanabiEvents = await prisma.hanabiEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hanabiEventWithIdOnly = await prisma.hanabiEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HanabiEventFindManyArgs>(args?: SelectSubset<T, HanabiEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HanabiEvent.
     * @param {HanabiEventCreateArgs} args - Arguments to create a HanabiEvent.
     * @example
     * // Create one HanabiEvent
     * const HanabiEvent = await prisma.hanabiEvent.create({
     *   data: {
     *     // ... data to create a HanabiEvent
     *   }
     * })
     * 
     */
    create<T extends HanabiEventCreateArgs>(args: SelectSubset<T, HanabiEventCreateArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HanabiEvents.
     * @param {HanabiEventCreateManyArgs} args - Arguments to create many HanabiEvents.
     * @example
     * // Create many HanabiEvents
     * const hanabiEvent = await prisma.hanabiEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HanabiEventCreateManyArgs>(args?: SelectSubset<T, HanabiEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HanabiEvents and returns the data saved in the database.
     * @param {HanabiEventCreateManyAndReturnArgs} args - Arguments to create many HanabiEvents.
     * @example
     * // Create many HanabiEvents
     * const hanabiEvent = await prisma.hanabiEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HanabiEvents and only return the `id`
     * const hanabiEventWithIdOnly = await prisma.hanabiEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HanabiEventCreateManyAndReturnArgs>(args?: SelectSubset<T, HanabiEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HanabiEvent.
     * @param {HanabiEventDeleteArgs} args - Arguments to delete one HanabiEvent.
     * @example
     * // Delete one HanabiEvent
     * const HanabiEvent = await prisma.hanabiEvent.delete({
     *   where: {
     *     // ... filter to delete one HanabiEvent
     *   }
     * })
     * 
     */
    delete<T extends HanabiEventDeleteArgs>(args: SelectSubset<T, HanabiEventDeleteArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HanabiEvent.
     * @param {HanabiEventUpdateArgs} args - Arguments to update one HanabiEvent.
     * @example
     * // Update one HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HanabiEventUpdateArgs>(args: SelectSubset<T, HanabiEventUpdateArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HanabiEvents.
     * @param {HanabiEventDeleteManyArgs} args - Arguments to filter HanabiEvents to delete.
     * @example
     * // Delete a few HanabiEvents
     * const { count } = await prisma.hanabiEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HanabiEventDeleteManyArgs>(args?: SelectSubset<T, HanabiEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HanabiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HanabiEvents
     * const hanabiEvent = await prisma.hanabiEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HanabiEventUpdateManyArgs>(args: SelectSubset<T, HanabiEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HanabiEvents and returns the data updated in the database.
     * @param {HanabiEventUpdateManyAndReturnArgs} args - Arguments to update many HanabiEvents.
     * @example
     * // Update many HanabiEvents
     * const hanabiEvent = await prisma.hanabiEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HanabiEvents and only return the `id`
     * const hanabiEventWithIdOnly = await prisma.hanabiEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HanabiEventUpdateManyAndReturnArgs>(args: SelectSubset<T, HanabiEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HanabiEvent.
     * @param {HanabiEventUpsertArgs} args - Arguments to update or create a HanabiEvent.
     * @example
     * // Update or create a HanabiEvent
     * const hanabiEvent = await prisma.hanabiEvent.upsert({
     *   create: {
     *     // ... data to create a HanabiEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HanabiEvent we want to update
     *   }
     * })
     */
    upsert<T extends HanabiEventUpsertArgs>(args: SelectSubset<T, HanabiEventUpsertArgs<ExtArgs>>): Prisma__HanabiEventClient<$Result.GetResult<Prisma.$HanabiEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HanabiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventCountArgs} args - Arguments to filter HanabiEvents to count.
     * @example
     * // Count the number of HanabiEvents
     * const count = await prisma.hanabiEvent.count({
     *   where: {
     *     // ... the filter for the HanabiEvents we want to count
     *   }
     * })
    **/
    count<T extends HanabiEventCountArgs>(
      args?: Subset<T, HanabiEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HanabiEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HanabiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HanabiEventAggregateArgs>(args: Subset<T, HanabiEventAggregateArgs>): Prisma.PrismaPromise<GetHanabiEventAggregateType<T>>

    /**
     * Group by HanabiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanabiEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HanabiEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HanabiEventGroupByArgs['orderBy'] }
        : { orderBy?: HanabiEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HanabiEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHanabiEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HanabiEvent model
   */
  readonly fields: HanabiEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HanabiEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HanabiEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HanabiEvent model
   */
  interface HanabiEventFieldRefs {
    readonly id: FieldRef<"HanabiEvent", 'String'>
    readonly region: FieldRef<"HanabiEvent", 'String'>
    readonly detailLink: FieldRef<"HanabiEvent", 'String'>
    readonly name: FieldRef<"HanabiEvent", 'String'>
    readonly address: FieldRef<"HanabiEvent", 'String'>
    readonly datetime: FieldRef<"HanabiEvent", 'String'>
    readonly venue: FieldRef<"HanabiEvent", 'String'>
    readonly access: FieldRef<"HanabiEvent", 'String'>
    readonly organizer: FieldRef<"HanabiEvent", 'String'>
    readonly price: FieldRef<"HanabiEvent", 'String'>
    readonly contact: FieldRef<"HanabiEvent", 'String'>
    readonly website: FieldRef<"HanabiEvent", 'String'>
    readonly googleMap: FieldRef<"HanabiEvent", 'String'>
    readonly description: FieldRef<"HanabiEvent", 'String'>
    readonly regionId: FieldRef<"HanabiEvent", 'String'>
    readonly verified: FieldRef<"HanabiEvent", 'Boolean'>
    readonly createdAt: FieldRef<"HanabiEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"HanabiEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HanabiEvent findUnique
   */
  export type HanabiEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanabiEvent to fetch.
     */
    where: HanabiEventWhereUniqueInput
  }

  /**
   * HanabiEvent findUniqueOrThrow
   */
  export type HanabiEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanabiEvent to fetch.
     */
    where: HanabiEventWhereUniqueInput
  }

  /**
   * HanabiEvent findFirst
   */
  export type HanabiEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanabiEvent to fetch.
     */
    where?: HanabiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanabiEvents to fetch.
     */
    orderBy?: HanabiEventOrderByWithRelationInput | HanabiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HanabiEvents.
     */
    cursor?: HanabiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanabiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanabiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HanabiEvents.
     */
    distinct?: HanabiEventScalarFieldEnum | HanabiEventScalarFieldEnum[]
  }

  /**
   * HanabiEvent findFirstOrThrow
   */
  export type HanabiEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanabiEvent to fetch.
     */
    where?: HanabiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanabiEvents to fetch.
     */
    orderBy?: HanabiEventOrderByWithRelationInput | HanabiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HanabiEvents.
     */
    cursor?: HanabiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanabiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanabiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HanabiEvents.
     */
    distinct?: HanabiEventScalarFieldEnum | HanabiEventScalarFieldEnum[]
  }

  /**
   * HanabiEvent findMany
   */
  export type HanabiEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanabiEvents to fetch.
     */
    where?: HanabiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanabiEvents to fetch.
     */
    orderBy?: HanabiEventOrderByWithRelationInput | HanabiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HanabiEvents.
     */
    cursor?: HanabiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanabiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanabiEvents.
     */
    skip?: number
    distinct?: HanabiEventScalarFieldEnum | HanabiEventScalarFieldEnum[]
  }

  /**
   * HanabiEvent create
   */
  export type HanabiEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * The data needed to create a HanabiEvent.
     */
    data: XOR<HanabiEventCreateInput, HanabiEventUncheckedCreateInput>
  }

  /**
   * HanabiEvent createMany
   */
  export type HanabiEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HanabiEvents.
     */
    data: HanabiEventCreateManyInput | HanabiEventCreateManyInput[]
  }

  /**
   * HanabiEvent createManyAndReturn
   */
  export type HanabiEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * The data used to create many HanabiEvents.
     */
    data: HanabiEventCreateManyInput | HanabiEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HanabiEvent update
   */
  export type HanabiEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * The data needed to update a HanabiEvent.
     */
    data: XOR<HanabiEventUpdateInput, HanabiEventUncheckedUpdateInput>
    /**
     * Choose, which HanabiEvent to update.
     */
    where: HanabiEventWhereUniqueInput
  }

  /**
   * HanabiEvent updateMany
   */
  export type HanabiEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HanabiEvents.
     */
    data: XOR<HanabiEventUpdateManyMutationInput, HanabiEventUncheckedUpdateManyInput>
    /**
     * Filter which HanabiEvents to update
     */
    where?: HanabiEventWhereInput
    /**
     * Limit how many HanabiEvents to update.
     */
    limit?: number
  }

  /**
   * HanabiEvent updateManyAndReturn
   */
  export type HanabiEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * The data used to update HanabiEvents.
     */
    data: XOR<HanabiEventUpdateManyMutationInput, HanabiEventUncheckedUpdateManyInput>
    /**
     * Filter which HanabiEvents to update
     */
    where?: HanabiEventWhereInput
    /**
     * Limit how many HanabiEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HanabiEvent upsert
   */
  export type HanabiEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * The filter to search for the HanabiEvent to update in case it exists.
     */
    where: HanabiEventWhereUniqueInput
    /**
     * In case the HanabiEvent found by the `where` argument doesn't exist, create a new HanabiEvent with this data.
     */
    create: XOR<HanabiEventCreateInput, HanabiEventUncheckedCreateInput>
    /**
     * In case the HanabiEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HanabiEventUpdateInput, HanabiEventUncheckedUpdateInput>
  }

  /**
   * HanabiEvent delete
   */
  export type HanabiEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
    /**
     * Filter which HanabiEvent to delete.
     */
    where: HanabiEventWhereUniqueInput
  }

  /**
   * HanabiEvent deleteMany
   */
  export type HanabiEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HanabiEvents to delete
     */
    where?: HanabiEventWhereInput
    /**
     * Limit how many HanabiEvents to delete.
     */
    limit?: number
  }

  /**
   * HanabiEvent without action
   */
  export type HanabiEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanabiEvent
     */
    select?: HanabiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanabiEvent
     */
    omit?: HanabiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanabiEventInclude<ExtArgs> | null
  }


  /**
   * Model MatsuriEvent
   */

  export type AggregateMatsuriEvent = {
    _count: MatsuriEventCountAggregateOutputType | null
    _min: MatsuriEventMinAggregateOutputType | null
    _max: MatsuriEventMaxAggregateOutputType | null
  }

  export type MatsuriEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatsuriEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatsuriEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MatsuriEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatsuriEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatsuriEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MatsuriEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatsuriEvent to aggregate.
     */
    where?: MatsuriEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatsuriEvents to fetch.
     */
    orderBy?: MatsuriEventOrderByWithRelationInput | MatsuriEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatsuriEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatsuriEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatsuriEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatsuriEvents
    **/
    _count?: true | MatsuriEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatsuriEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatsuriEventMaxAggregateInputType
  }

  export type GetMatsuriEventAggregateType<T extends MatsuriEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMatsuriEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatsuriEvent[P]>
      : GetScalarType<T[P], AggregateMatsuriEvent[P]>
  }




  export type MatsuriEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatsuriEventWhereInput
    orderBy?: MatsuriEventOrderByWithAggregationInput | MatsuriEventOrderByWithAggregationInput[]
    by: MatsuriEventScalarFieldEnum[] | MatsuriEventScalarFieldEnum
    having?: MatsuriEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatsuriEventCountAggregateInputType | true
    _min?: MatsuriEventMinAggregateInputType
    _max?: MatsuriEventMaxAggregateInputType
  }

  export type MatsuriEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: MatsuriEventCountAggregateOutputType | null
    _min: MatsuriEventMinAggregateOutputType | null
    _max: MatsuriEventMaxAggregateOutputType | null
  }

  type GetMatsuriEventGroupByPayload<T extends MatsuriEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatsuriEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatsuriEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatsuriEventGroupByOutputType[P]>
            : GetScalarType<T[P], MatsuriEventGroupByOutputType[P]>
        }
      >
    >


  export type MatsuriEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matsuriEvent"]>

  export type MatsuriEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matsuriEvent"]>

  export type MatsuriEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matsuriEvent"]>

  export type MatsuriEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MatsuriEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["matsuriEvent"]>
  export type MatsuriEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type MatsuriEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type MatsuriEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $MatsuriEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatsuriEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["matsuriEvent"]>
    composites: {}
  }

  type MatsuriEventGetPayload<S extends boolean | null | undefined | MatsuriEventDefaultArgs> = $Result.GetResult<Prisma.$MatsuriEventPayload, S>

  type MatsuriEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatsuriEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatsuriEventCountAggregateInputType | true
    }

  export interface MatsuriEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatsuriEvent'], meta: { name: 'MatsuriEvent' } }
    /**
     * Find zero or one MatsuriEvent that matches the filter.
     * @param {MatsuriEventFindUniqueArgs} args - Arguments to find a MatsuriEvent
     * @example
     * // Get one MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatsuriEventFindUniqueArgs>(args: SelectSubset<T, MatsuriEventFindUniqueArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatsuriEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatsuriEventFindUniqueOrThrowArgs} args - Arguments to find a MatsuriEvent
     * @example
     * // Get one MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatsuriEventFindUniqueOrThrowArgs>(args: SelectSubset<T, MatsuriEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatsuriEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventFindFirstArgs} args - Arguments to find a MatsuriEvent
     * @example
     * // Get one MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatsuriEventFindFirstArgs>(args?: SelectSubset<T, MatsuriEventFindFirstArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatsuriEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventFindFirstOrThrowArgs} args - Arguments to find a MatsuriEvent
     * @example
     * // Get one MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatsuriEventFindFirstOrThrowArgs>(args?: SelectSubset<T, MatsuriEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatsuriEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatsuriEvents
     * const matsuriEvents = await prisma.matsuriEvent.findMany()
     * 
     * // Get first 10 MatsuriEvents
     * const matsuriEvents = await prisma.matsuriEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matsuriEventWithIdOnly = await prisma.matsuriEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatsuriEventFindManyArgs>(args?: SelectSubset<T, MatsuriEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatsuriEvent.
     * @param {MatsuriEventCreateArgs} args - Arguments to create a MatsuriEvent.
     * @example
     * // Create one MatsuriEvent
     * const MatsuriEvent = await prisma.matsuriEvent.create({
     *   data: {
     *     // ... data to create a MatsuriEvent
     *   }
     * })
     * 
     */
    create<T extends MatsuriEventCreateArgs>(args: SelectSubset<T, MatsuriEventCreateArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatsuriEvents.
     * @param {MatsuriEventCreateManyArgs} args - Arguments to create many MatsuriEvents.
     * @example
     * // Create many MatsuriEvents
     * const matsuriEvent = await prisma.matsuriEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatsuriEventCreateManyArgs>(args?: SelectSubset<T, MatsuriEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatsuriEvents and returns the data saved in the database.
     * @param {MatsuriEventCreateManyAndReturnArgs} args - Arguments to create many MatsuriEvents.
     * @example
     * // Create many MatsuriEvents
     * const matsuriEvent = await prisma.matsuriEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatsuriEvents and only return the `id`
     * const matsuriEventWithIdOnly = await prisma.matsuriEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatsuriEventCreateManyAndReturnArgs>(args?: SelectSubset<T, MatsuriEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatsuriEvent.
     * @param {MatsuriEventDeleteArgs} args - Arguments to delete one MatsuriEvent.
     * @example
     * // Delete one MatsuriEvent
     * const MatsuriEvent = await prisma.matsuriEvent.delete({
     *   where: {
     *     // ... filter to delete one MatsuriEvent
     *   }
     * })
     * 
     */
    delete<T extends MatsuriEventDeleteArgs>(args: SelectSubset<T, MatsuriEventDeleteArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatsuriEvent.
     * @param {MatsuriEventUpdateArgs} args - Arguments to update one MatsuriEvent.
     * @example
     * // Update one MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatsuriEventUpdateArgs>(args: SelectSubset<T, MatsuriEventUpdateArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatsuriEvents.
     * @param {MatsuriEventDeleteManyArgs} args - Arguments to filter MatsuriEvents to delete.
     * @example
     * // Delete a few MatsuriEvents
     * const { count } = await prisma.matsuriEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatsuriEventDeleteManyArgs>(args?: SelectSubset<T, MatsuriEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatsuriEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatsuriEvents
     * const matsuriEvent = await prisma.matsuriEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatsuriEventUpdateManyArgs>(args: SelectSubset<T, MatsuriEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatsuriEvents and returns the data updated in the database.
     * @param {MatsuriEventUpdateManyAndReturnArgs} args - Arguments to update many MatsuriEvents.
     * @example
     * // Update many MatsuriEvents
     * const matsuriEvent = await prisma.matsuriEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatsuriEvents and only return the `id`
     * const matsuriEventWithIdOnly = await prisma.matsuriEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatsuriEventUpdateManyAndReturnArgs>(args: SelectSubset<T, MatsuriEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatsuriEvent.
     * @param {MatsuriEventUpsertArgs} args - Arguments to update or create a MatsuriEvent.
     * @example
     * // Update or create a MatsuriEvent
     * const matsuriEvent = await prisma.matsuriEvent.upsert({
     *   create: {
     *     // ... data to create a MatsuriEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatsuriEvent we want to update
     *   }
     * })
     */
    upsert<T extends MatsuriEventUpsertArgs>(args: SelectSubset<T, MatsuriEventUpsertArgs<ExtArgs>>): Prisma__MatsuriEventClient<$Result.GetResult<Prisma.$MatsuriEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatsuriEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventCountArgs} args - Arguments to filter MatsuriEvents to count.
     * @example
     * // Count the number of MatsuriEvents
     * const count = await prisma.matsuriEvent.count({
     *   where: {
     *     // ... the filter for the MatsuriEvents we want to count
     *   }
     * })
    **/
    count<T extends MatsuriEventCountArgs>(
      args?: Subset<T, MatsuriEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatsuriEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatsuriEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatsuriEventAggregateArgs>(args: Subset<T, MatsuriEventAggregateArgs>): Prisma.PrismaPromise<GetMatsuriEventAggregateType<T>>

    /**
     * Group by MatsuriEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatsuriEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatsuriEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatsuriEventGroupByArgs['orderBy'] }
        : { orderBy?: MatsuriEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatsuriEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatsuriEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatsuriEvent model
   */
  readonly fields: MatsuriEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatsuriEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatsuriEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatsuriEvent model
   */
  interface MatsuriEventFieldRefs {
    readonly id: FieldRef<"MatsuriEvent", 'String'>
    readonly region: FieldRef<"MatsuriEvent", 'String'>
    readonly detailLink: FieldRef<"MatsuriEvent", 'String'>
    readonly name: FieldRef<"MatsuriEvent", 'String'>
    readonly address: FieldRef<"MatsuriEvent", 'String'>
    readonly datetime: FieldRef<"MatsuriEvent", 'String'>
    readonly venue: FieldRef<"MatsuriEvent", 'String'>
    readonly access: FieldRef<"MatsuriEvent", 'String'>
    readonly organizer: FieldRef<"MatsuriEvent", 'String'>
    readonly price: FieldRef<"MatsuriEvent", 'String'>
    readonly contact: FieldRef<"MatsuriEvent", 'String'>
    readonly website: FieldRef<"MatsuriEvent", 'String'>
    readonly googleMap: FieldRef<"MatsuriEvent", 'String'>
    readonly description: FieldRef<"MatsuriEvent", 'String'>
    readonly regionId: FieldRef<"MatsuriEvent", 'String'>
    readonly verified: FieldRef<"MatsuriEvent", 'Boolean'>
    readonly createdAt: FieldRef<"MatsuriEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"MatsuriEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatsuriEvent findUnique
   */
  export type MatsuriEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter, which MatsuriEvent to fetch.
     */
    where: MatsuriEventWhereUniqueInput
  }

  /**
   * MatsuriEvent findUniqueOrThrow
   */
  export type MatsuriEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter, which MatsuriEvent to fetch.
     */
    where: MatsuriEventWhereUniqueInput
  }

  /**
   * MatsuriEvent findFirst
   */
  export type MatsuriEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter, which MatsuriEvent to fetch.
     */
    where?: MatsuriEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatsuriEvents to fetch.
     */
    orderBy?: MatsuriEventOrderByWithRelationInput | MatsuriEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatsuriEvents.
     */
    cursor?: MatsuriEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatsuriEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatsuriEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatsuriEvents.
     */
    distinct?: MatsuriEventScalarFieldEnum | MatsuriEventScalarFieldEnum[]
  }

  /**
   * MatsuriEvent findFirstOrThrow
   */
  export type MatsuriEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter, which MatsuriEvent to fetch.
     */
    where?: MatsuriEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatsuriEvents to fetch.
     */
    orderBy?: MatsuriEventOrderByWithRelationInput | MatsuriEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatsuriEvents.
     */
    cursor?: MatsuriEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatsuriEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatsuriEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatsuriEvents.
     */
    distinct?: MatsuriEventScalarFieldEnum | MatsuriEventScalarFieldEnum[]
  }

  /**
   * MatsuriEvent findMany
   */
  export type MatsuriEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter, which MatsuriEvents to fetch.
     */
    where?: MatsuriEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatsuriEvents to fetch.
     */
    orderBy?: MatsuriEventOrderByWithRelationInput | MatsuriEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatsuriEvents.
     */
    cursor?: MatsuriEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatsuriEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatsuriEvents.
     */
    skip?: number
    distinct?: MatsuriEventScalarFieldEnum | MatsuriEventScalarFieldEnum[]
  }

  /**
   * MatsuriEvent create
   */
  export type MatsuriEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MatsuriEvent.
     */
    data: XOR<MatsuriEventCreateInput, MatsuriEventUncheckedCreateInput>
  }

  /**
   * MatsuriEvent createMany
   */
  export type MatsuriEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatsuriEvents.
     */
    data: MatsuriEventCreateManyInput | MatsuriEventCreateManyInput[]
  }

  /**
   * MatsuriEvent createManyAndReturn
   */
  export type MatsuriEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * The data used to create many MatsuriEvents.
     */
    data: MatsuriEventCreateManyInput | MatsuriEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatsuriEvent update
   */
  export type MatsuriEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MatsuriEvent.
     */
    data: XOR<MatsuriEventUpdateInput, MatsuriEventUncheckedUpdateInput>
    /**
     * Choose, which MatsuriEvent to update.
     */
    where: MatsuriEventWhereUniqueInput
  }

  /**
   * MatsuriEvent updateMany
   */
  export type MatsuriEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatsuriEvents.
     */
    data: XOR<MatsuriEventUpdateManyMutationInput, MatsuriEventUncheckedUpdateManyInput>
    /**
     * Filter which MatsuriEvents to update
     */
    where?: MatsuriEventWhereInput
    /**
     * Limit how many MatsuriEvents to update.
     */
    limit?: number
  }

  /**
   * MatsuriEvent updateManyAndReturn
   */
  export type MatsuriEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * The data used to update MatsuriEvents.
     */
    data: XOR<MatsuriEventUpdateManyMutationInput, MatsuriEventUncheckedUpdateManyInput>
    /**
     * Filter which MatsuriEvents to update
     */
    where?: MatsuriEventWhereInput
    /**
     * Limit how many MatsuriEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatsuriEvent upsert
   */
  export type MatsuriEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MatsuriEvent to update in case it exists.
     */
    where: MatsuriEventWhereUniqueInput
    /**
     * In case the MatsuriEvent found by the `where` argument doesn't exist, create a new MatsuriEvent with this data.
     */
    create: XOR<MatsuriEventCreateInput, MatsuriEventUncheckedCreateInput>
    /**
     * In case the MatsuriEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatsuriEventUpdateInput, MatsuriEventUncheckedUpdateInput>
  }

  /**
   * MatsuriEvent delete
   */
  export type MatsuriEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
    /**
     * Filter which MatsuriEvent to delete.
     */
    where: MatsuriEventWhereUniqueInput
  }

  /**
   * MatsuriEvent deleteMany
   */
  export type MatsuriEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatsuriEvents to delete
     */
    where?: MatsuriEventWhereInput
    /**
     * Limit how many MatsuriEvents to delete.
     */
    limit?: number
  }

  /**
   * MatsuriEvent without action
   */
  export type MatsuriEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatsuriEvent
     */
    select?: MatsuriEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatsuriEvent
     */
    omit?: MatsuriEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatsuriEventInclude<ExtArgs> | null
  }


  /**
   * Model HanamiEvent
   */

  export type AggregateHanamiEvent = {
    _count: HanamiEventCountAggregateOutputType | null
    _min: HanamiEventMinAggregateOutputType | null
    _max: HanamiEventMaxAggregateOutputType | null
  }

  export type HanamiEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HanamiEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HanamiEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HanamiEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HanamiEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HanamiEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HanamiEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HanamiEvent to aggregate.
     */
    where?: HanamiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanamiEvents to fetch.
     */
    orderBy?: HanamiEventOrderByWithRelationInput | HanamiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HanamiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanamiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanamiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HanamiEvents
    **/
    _count?: true | HanamiEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HanamiEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HanamiEventMaxAggregateInputType
  }

  export type GetHanamiEventAggregateType<T extends HanamiEventAggregateArgs> = {
        [P in keyof T & keyof AggregateHanamiEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHanamiEvent[P]>
      : GetScalarType<T[P], AggregateHanamiEvent[P]>
  }




  export type HanamiEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HanamiEventWhereInput
    orderBy?: HanamiEventOrderByWithAggregationInput | HanamiEventOrderByWithAggregationInput[]
    by: HanamiEventScalarFieldEnum[] | HanamiEventScalarFieldEnum
    having?: HanamiEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HanamiEventCountAggregateInputType | true
    _min?: HanamiEventMinAggregateInputType
    _max?: HanamiEventMaxAggregateInputType
  }

  export type HanamiEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: HanamiEventCountAggregateOutputType | null
    _min: HanamiEventMinAggregateOutputType | null
    _max: HanamiEventMaxAggregateOutputType | null
  }

  type GetHanamiEventGroupByPayload<T extends HanamiEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HanamiEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HanamiEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HanamiEventGroupByOutputType[P]>
            : GetScalarType<T[P], HanamiEventGroupByOutputType[P]>
        }
      >
    >


  export type HanamiEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanamiEvent"]>

  export type HanamiEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanamiEvent"]>

  export type HanamiEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hanamiEvent"]>

  export type HanamiEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HanamiEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["hanamiEvent"]>
  export type HanamiEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type HanamiEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type HanamiEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $HanamiEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HanamiEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hanamiEvent"]>
    composites: {}
  }

  type HanamiEventGetPayload<S extends boolean | null | undefined | HanamiEventDefaultArgs> = $Result.GetResult<Prisma.$HanamiEventPayload, S>

  type HanamiEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HanamiEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HanamiEventCountAggregateInputType | true
    }

  export interface HanamiEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HanamiEvent'], meta: { name: 'HanamiEvent' } }
    /**
     * Find zero or one HanamiEvent that matches the filter.
     * @param {HanamiEventFindUniqueArgs} args - Arguments to find a HanamiEvent
     * @example
     * // Get one HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HanamiEventFindUniqueArgs>(args: SelectSubset<T, HanamiEventFindUniqueArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HanamiEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HanamiEventFindUniqueOrThrowArgs} args - Arguments to find a HanamiEvent
     * @example
     * // Get one HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HanamiEventFindUniqueOrThrowArgs>(args: SelectSubset<T, HanamiEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HanamiEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventFindFirstArgs} args - Arguments to find a HanamiEvent
     * @example
     * // Get one HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HanamiEventFindFirstArgs>(args?: SelectSubset<T, HanamiEventFindFirstArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HanamiEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventFindFirstOrThrowArgs} args - Arguments to find a HanamiEvent
     * @example
     * // Get one HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HanamiEventFindFirstOrThrowArgs>(args?: SelectSubset<T, HanamiEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HanamiEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HanamiEvents
     * const hanamiEvents = await prisma.hanamiEvent.findMany()
     * 
     * // Get first 10 HanamiEvents
     * const hanamiEvents = await prisma.hanamiEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hanamiEventWithIdOnly = await prisma.hanamiEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HanamiEventFindManyArgs>(args?: SelectSubset<T, HanamiEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HanamiEvent.
     * @param {HanamiEventCreateArgs} args - Arguments to create a HanamiEvent.
     * @example
     * // Create one HanamiEvent
     * const HanamiEvent = await prisma.hanamiEvent.create({
     *   data: {
     *     // ... data to create a HanamiEvent
     *   }
     * })
     * 
     */
    create<T extends HanamiEventCreateArgs>(args: SelectSubset<T, HanamiEventCreateArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HanamiEvents.
     * @param {HanamiEventCreateManyArgs} args - Arguments to create many HanamiEvents.
     * @example
     * // Create many HanamiEvents
     * const hanamiEvent = await prisma.hanamiEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HanamiEventCreateManyArgs>(args?: SelectSubset<T, HanamiEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HanamiEvents and returns the data saved in the database.
     * @param {HanamiEventCreateManyAndReturnArgs} args - Arguments to create many HanamiEvents.
     * @example
     * // Create many HanamiEvents
     * const hanamiEvent = await prisma.hanamiEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HanamiEvents and only return the `id`
     * const hanamiEventWithIdOnly = await prisma.hanamiEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HanamiEventCreateManyAndReturnArgs>(args?: SelectSubset<T, HanamiEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HanamiEvent.
     * @param {HanamiEventDeleteArgs} args - Arguments to delete one HanamiEvent.
     * @example
     * // Delete one HanamiEvent
     * const HanamiEvent = await prisma.hanamiEvent.delete({
     *   where: {
     *     // ... filter to delete one HanamiEvent
     *   }
     * })
     * 
     */
    delete<T extends HanamiEventDeleteArgs>(args: SelectSubset<T, HanamiEventDeleteArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HanamiEvent.
     * @param {HanamiEventUpdateArgs} args - Arguments to update one HanamiEvent.
     * @example
     * // Update one HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HanamiEventUpdateArgs>(args: SelectSubset<T, HanamiEventUpdateArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HanamiEvents.
     * @param {HanamiEventDeleteManyArgs} args - Arguments to filter HanamiEvents to delete.
     * @example
     * // Delete a few HanamiEvents
     * const { count } = await prisma.hanamiEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HanamiEventDeleteManyArgs>(args?: SelectSubset<T, HanamiEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HanamiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HanamiEvents
     * const hanamiEvent = await prisma.hanamiEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HanamiEventUpdateManyArgs>(args: SelectSubset<T, HanamiEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HanamiEvents and returns the data updated in the database.
     * @param {HanamiEventUpdateManyAndReturnArgs} args - Arguments to update many HanamiEvents.
     * @example
     * // Update many HanamiEvents
     * const hanamiEvent = await prisma.hanamiEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HanamiEvents and only return the `id`
     * const hanamiEventWithIdOnly = await prisma.hanamiEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HanamiEventUpdateManyAndReturnArgs>(args: SelectSubset<T, HanamiEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HanamiEvent.
     * @param {HanamiEventUpsertArgs} args - Arguments to update or create a HanamiEvent.
     * @example
     * // Update or create a HanamiEvent
     * const hanamiEvent = await prisma.hanamiEvent.upsert({
     *   create: {
     *     // ... data to create a HanamiEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HanamiEvent we want to update
     *   }
     * })
     */
    upsert<T extends HanamiEventUpsertArgs>(args: SelectSubset<T, HanamiEventUpsertArgs<ExtArgs>>): Prisma__HanamiEventClient<$Result.GetResult<Prisma.$HanamiEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HanamiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventCountArgs} args - Arguments to filter HanamiEvents to count.
     * @example
     * // Count the number of HanamiEvents
     * const count = await prisma.hanamiEvent.count({
     *   where: {
     *     // ... the filter for the HanamiEvents we want to count
     *   }
     * })
    **/
    count<T extends HanamiEventCountArgs>(
      args?: Subset<T, HanamiEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HanamiEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HanamiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HanamiEventAggregateArgs>(args: Subset<T, HanamiEventAggregateArgs>): Prisma.PrismaPromise<GetHanamiEventAggregateType<T>>

    /**
     * Group by HanamiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HanamiEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HanamiEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HanamiEventGroupByArgs['orderBy'] }
        : { orderBy?: HanamiEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HanamiEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHanamiEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HanamiEvent model
   */
  readonly fields: HanamiEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HanamiEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HanamiEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HanamiEvent model
   */
  interface HanamiEventFieldRefs {
    readonly id: FieldRef<"HanamiEvent", 'String'>
    readonly region: FieldRef<"HanamiEvent", 'String'>
    readonly detailLink: FieldRef<"HanamiEvent", 'String'>
    readonly name: FieldRef<"HanamiEvent", 'String'>
    readonly address: FieldRef<"HanamiEvent", 'String'>
    readonly datetime: FieldRef<"HanamiEvent", 'String'>
    readonly venue: FieldRef<"HanamiEvent", 'String'>
    readonly access: FieldRef<"HanamiEvent", 'String'>
    readonly organizer: FieldRef<"HanamiEvent", 'String'>
    readonly price: FieldRef<"HanamiEvent", 'String'>
    readonly contact: FieldRef<"HanamiEvent", 'String'>
    readonly website: FieldRef<"HanamiEvent", 'String'>
    readonly googleMap: FieldRef<"HanamiEvent", 'String'>
    readonly description: FieldRef<"HanamiEvent", 'String'>
    readonly regionId: FieldRef<"HanamiEvent", 'String'>
    readonly verified: FieldRef<"HanamiEvent", 'Boolean'>
    readonly createdAt: FieldRef<"HanamiEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"HanamiEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HanamiEvent findUnique
   */
  export type HanamiEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanamiEvent to fetch.
     */
    where: HanamiEventWhereUniqueInput
  }

  /**
   * HanamiEvent findUniqueOrThrow
   */
  export type HanamiEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanamiEvent to fetch.
     */
    where: HanamiEventWhereUniqueInput
  }

  /**
   * HanamiEvent findFirst
   */
  export type HanamiEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanamiEvent to fetch.
     */
    where?: HanamiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanamiEvents to fetch.
     */
    orderBy?: HanamiEventOrderByWithRelationInput | HanamiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HanamiEvents.
     */
    cursor?: HanamiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanamiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanamiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HanamiEvents.
     */
    distinct?: HanamiEventScalarFieldEnum | HanamiEventScalarFieldEnum[]
  }

  /**
   * HanamiEvent findFirstOrThrow
   */
  export type HanamiEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanamiEvent to fetch.
     */
    where?: HanamiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanamiEvents to fetch.
     */
    orderBy?: HanamiEventOrderByWithRelationInput | HanamiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HanamiEvents.
     */
    cursor?: HanamiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanamiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanamiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HanamiEvents.
     */
    distinct?: HanamiEventScalarFieldEnum | HanamiEventScalarFieldEnum[]
  }

  /**
   * HanamiEvent findMany
   */
  export type HanamiEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter, which HanamiEvents to fetch.
     */
    where?: HanamiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HanamiEvents to fetch.
     */
    orderBy?: HanamiEventOrderByWithRelationInput | HanamiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HanamiEvents.
     */
    cursor?: HanamiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HanamiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HanamiEvents.
     */
    skip?: number
    distinct?: HanamiEventScalarFieldEnum | HanamiEventScalarFieldEnum[]
  }

  /**
   * HanamiEvent create
   */
  export type HanamiEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * The data needed to create a HanamiEvent.
     */
    data: XOR<HanamiEventCreateInput, HanamiEventUncheckedCreateInput>
  }

  /**
   * HanamiEvent createMany
   */
  export type HanamiEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HanamiEvents.
     */
    data: HanamiEventCreateManyInput | HanamiEventCreateManyInput[]
  }

  /**
   * HanamiEvent createManyAndReturn
   */
  export type HanamiEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * The data used to create many HanamiEvents.
     */
    data: HanamiEventCreateManyInput | HanamiEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HanamiEvent update
   */
  export type HanamiEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * The data needed to update a HanamiEvent.
     */
    data: XOR<HanamiEventUpdateInput, HanamiEventUncheckedUpdateInput>
    /**
     * Choose, which HanamiEvent to update.
     */
    where: HanamiEventWhereUniqueInput
  }

  /**
   * HanamiEvent updateMany
   */
  export type HanamiEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HanamiEvents.
     */
    data: XOR<HanamiEventUpdateManyMutationInput, HanamiEventUncheckedUpdateManyInput>
    /**
     * Filter which HanamiEvents to update
     */
    where?: HanamiEventWhereInput
    /**
     * Limit how many HanamiEvents to update.
     */
    limit?: number
  }

  /**
   * HanamiEvent updateManyAndReturn
   */
  export type HanamiEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * The data used to update HanamiEvents.
     */
    data: XOR<HanamiEventUpdateManyMutationInput, HanamiEventUncheckedUpdateManyInput>
    /**
     * Filter which HanamiEvents to update
     */
    where?: HanamiEventWhereInput
    /**
     * Limit how many HanamiEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HanamiEvent upsert
   */
  export type HanamiEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * The filter to search for the HanamiEvent to update in case it exists.
     */
    where: HanamiEventWhereUniqueInput
    /**
     * In case the HanamiEvent found by the `where` argument doesn't exist, create a new HanamiEvent with this data.
     */
    create: XOR<HanamiEventCreateInput, HanamiEventUncheckedCreateInput>
    /**
     * In case the HanamiEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HanamiEventUpdateInput, HanamiEventUncheckedUpdateInput>
  }

  /**
   * HanamiEvent delete
   */
  export type HanamiEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
    /**
     * Filter which HanamiEvent to delete.
     */
    where: HanamiEventWhereUniqueInput
  }

  /**
   * HanamiEvent deleteMany
   */
  export type HanamiEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HanamiEvents to delete
     */
    where?: HanamiEventWhereInput
    /**
     * Limit how many HanamiEvents to delete.
     */
    limit?: number
  }

  /**
   * HanamiEvent without action
   */
  export type HanamiEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HanamiEvent
     */
    select?: HanamiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HanamiEvent
     */
    omit?: HanamiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HanamiEventInclude<ExtArgs> | null
  }


  /**
   * Model MomijiEvent
   */

  export type AggregateMomijiEvent = {
    _count: MomijiEventCountAggregateOutputType | null
    _min: MomijiEventMinAggregateOutputType | null
    _max: MomijiEventMaxAggregateOutputType | null
  }

  export type MomijiEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MomijiEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MomijiEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MomijiEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MomijiEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MomijiEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MomijiEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MomijiEvent to aggregate.
     */
    where?: MomijiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MomijiEvents to fetch.
     */
    orderBy?: MomijiEventOrderByWithRelationInput | MomijiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MomijiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MomijiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MomijiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MomijiEvents
    **/
    _count?: true | MomijiEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MomijiEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MomijiEventMaxAggregateInputType
  }

  export type GetMomijiEventAggregateType<T extends MomijiEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMomijiEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMomijiEvent[P]>
      : GetScalarType<T[P], AggregateMomijiEvent[P]>
  }




  export type MomijiEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MomijiEventWhereInput
    orderBy?: MomijiEventOrderByWithAggregationInput | MomijiEventOrderByWithAggregationInput[]
    by: MomijiEventScalarFieldEnum[] | MomijiEventScalarFieldEnum
    having?: MomijiEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MomijiEventCountAggregateInputType | true
    _min?: MomijiEventMinAggregateInputType
    _max?: MomijiEventMaxAggregateInputType
  }

  export type MomijiEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: MomijiEventCountAggregateOutputType | null
    _min: MomijiEventMinAggregateOutputType | null
    _max: MomijiEventMaxAggregateOutputType | null
  }

  type GetMomijiEventGroupByPayload<T extends MomijiEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MomijiEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MomijiEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MomijiEventGroupByOutputType[P]>
            : GetScalarType<T[P], MomijiEventGroupByOutputType[P]>
        }
      >
    >


  export type MomijiEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momijiEvent"]>

  export type MomijiEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momijiEvent"]>

  export type MomijiEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momijiEvent"]>

  export type MomijiEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MomijiEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["momijiEvent"]>
  export type MomijiEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type MomijiEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type MomijiEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $MomijiEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MomijiEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["momijiEvent"]>
    composites: {}
  }

  type MomijiEventGetPayload<S extends boolean | null | undefined | MomijiEventDefaultArgs> = $Result.GetResult<Prisma.$MomijiEventPayload, S>

  type MomijiEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MomijiEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MomijiEventCountAggregateInputType | true
    }

  export interface MomijiEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MomijiEvent'], meta: { name: 'MomijiEvent' } }
    /**
     * Find zero or one MomijiEvent that matches the filter.
     * @param {MomijiEventFindUniqueArgs} args - Arguments to find a MomijiEvent
     * @example
     * // Get one MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MomijiEventFindUniqueArgs>(args: SelectSubset<T, MomijiEventFindUniqueArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MomijiEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MomijiEventFindUniqueOrThrowArgs} args - Arguments to find a MomijiEvent
     * @example
     * // Get one MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MomijiEventFindUniqueOrThrowArgs>(args: SelectSubset<T, MomijiEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MomijiEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventFindFirstArgs} args - Arguments to find a MomijiEvent
     * @example
     * // Get one MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MomijiEventFindFirstArgs>(args?: SelectSubset<T, MomijiEventFindFirstArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MomijiEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventFindFirstOrThrowArgs} args - Arguments to find a MomijiEvent
     * @example
     * // Get one MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MomijiEventFindFirstOrThrowArgs>(args?: SelectSubset<T, MomijiEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MomijiEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MomijiEvents
     * const momijiEvents = await prisma.momijiEvent.findMany()
     * 
     * // Get first 10 MomijiEvents
     * const momijiEvents = await prisma.momijiEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const momijiEventWithIdOnly = await prisma.momijiEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MomijiEventFindManyArgs>(args?: SelectSubset<T, MomijiEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MomijiEvent.
     * @param {MomijiEventCreateArgs} args - Arguments to create a MomijiEvent.
     * @example
     * // Create one MomijiEvent
     * const MomijiEvent = await prisma.momijiEvent.create({
     *   data: {
     *     // ... data to create a MomijiEvent
     *   }
     * })
     * 
     */
    create<T extends MomijiEventCreateArgs>(args: SelectSubset<T, MomijiEventCreateArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MomijiEvents.
     * @param {MomijiEventCreateManyArgs} args - Arguments to create many MomijiEvents.
     * @example
     * // Create many MomijiEvents
     * const momijiEvent = await prisma.momijiEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MomijiEventCreateManyArgs>(args?: SelectSubset<T, MomijiEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MomijiEvents and returns the data saved in the database.
     * @param {MomijiEventCreateManyAndReturnArgs} args - Arguments to create many MomijiEvents.
     * @example
     * // Create many MomijiEvents
     * const momijiEvent = await prisma.momijiEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MomijiEvents and only return the `id`
     * const momijiEventWithIdOnly = await prisma.momijiEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MomijiEventCreateManyAndReturnArgs>(args?: SelectSubset<T, MomijiEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MomijiEvent.
     * @param {MomijiEventDeleteArgs} args - Arguments to delete one MomijiEvent.
     * @example
     * // Delete one MomijiEvent
     * const MomijiEvent = await prisma.momijiEvent.delete({
     *   where: {
     *     // ... filter to delete one MomijiEvent
     *   }
     * })
     * 
     */
    delete<T extends MomijiEventDeleteArgs>(args: SelectSubset<T, MomijiEventDeleteArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MomijiEvent.
     * @param {MomijiEventUpdateArgs} args - Arguments to update one MomijiEvent.
     * @example
     * // Update one MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MomijiEventUpdateArgs>(args: SelectSubset<T, MomijiEventUpdateArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MomijiEvents.
     * @param {MomijiEventDeleteManyArgs} args - Arguments to filter MomijiEvents to delete.
     * @example
     * // Delete a few MomijiEvents
     * const { count } = await prisma.momijiEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MomijiEventDeleteManyArgs>(args?: SelectSubset<T, MomijiEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MomijiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MomijiEvents
     * const momijiEvent = await prisma.momijiEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MomijiEventUpdateManyArgs>(args: SelectSubset<T, MomijiEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MomijiEvents and returns the data updated in the database.
     * @param {MomijiEventUpdateManyAndReturnArgs} args - Arguments to update many MomijiEvents.
     * @example
     * // Update many MomijiEvents
     * const momijiEvent = await prisma.momijiEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MomijiEvents and only return the `id`
     * const momijiEventWithIdOnly = await prisma.momijiEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MomijiEventUpdateManyAndReturnArgs>(args: SelectSubset<T, MomijiEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MomijiEvent.
     * @param {MomijiEventUpsertArgs} args - Arguments to update or create a MomijiEvent.
     * @example
     * // Update or create a MomijiEvent
     * const momijiEvent = await prisma.momijiEvent.upsert({
     *   create: {
     *     // ... data to create a MomijiEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MomijiEvent we want to update
     *   }
     * })
     */
    upsert<T extends MomijiEventUpsertArgs>(args: SelectSubset<T, MomijiEventUpsertArgs<ExtArgs>>): Prisma__MomijiEventClient<$Result.GetResult<Prisma.$MomijiEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MomijiEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventCountArgs} args - Arguments to filter MomijiEvents to count.
     * @example
     * // Count the number of MomijiEvents
     * const count = await prisma.momijiEvent.count({
     *   where: {
     *     // ... the filter for the MomijiEvents we want to count
     *   }
     * })
    **/
    count<T extends MomijiEventCountArgs>(
      args?: Subset<T, MomijiEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MomijiEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MomijiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MomijiEventAggregateArgs>(args: Subset<T, MomijiEventAggregateArgs>): Prisma.PrismaPromise<GetMomijiEventAggregateType<T>>

    /**
     * Group by MomijiEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomijiEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MomijiEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MomijiEventGroupByArgs['orderBy'] }
        : { orderBy?: MomijiEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MomijiEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMomijiEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MomijiEvent model
   */
  readonly fields: MomijiEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MomijiEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MomijiEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MomijiEvent model
   */
  interface MomijiEventFieldRefs {
    readonly id: FieldRef<"MomijiEvent", 'String'>
    readonly region: FieldRef<"MomijiEvent", 'String'>
    readonly detailLink: FieldRef<"MomijiEvent", 'String'>
    readonly name: FieldRef<"MomijiEvent", 'String'>
    readonly address: FieldRef<"MomijiEvent", 'String'>
    readonly datetime: FieldRef<"MomijiEvent", 'String'>
    readonly venue: FieldRef<"MomijiEvent", 'String'>
    readonly access: FieldRef<"MomijiEvent", 'String'>
    readonly organizer: FieldRef<"MomijiEvent", 'String'>
    readonly price: FieldRef<"MomijiEvent", 'String'>
    readonly contact: FieldRef<"MomijiEvent", 'String'>
    readonly website: FieldRef<"MomijiEvent", 'String'>
    readonly googleMap: FieldRef<"MomijiEvent", 'String'>
    readonly description: FieldRef<"MomijiEvent", 'String'>
    readonly regionId: FieldRef<"MomijiEvent", 'String'>
    readonly verified: FieldRef<"MomijiEvent", 'Boolean'>
    readonly createdAt: FieldRef<"MomijiEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"MomijiEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MomijiEvent findUnique
   */
  export type MomijiEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter, which MomijiEvent to fetch.
     */
    where: MomijiEventWhereUniqueInput
  }

  /**
   * MomijiEvent findUniqueOrThrow
   */
  export type MomijiEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter, which MomijiEvent to fetch.
     */
    where: MomijiEventWhereUniqueInput
  }

  /**
   * MomijiEvent findFirst
   */
  export type MomijiEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter, which MomijiEvent to fetch.
     */
    where?: MomijiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MomijiEvents to fetch.
     */
    orderBy?: MomijiEventOrderByWithRelationInput | MomijiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MomijiEvents.
     */
    cursor?: MomijiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MomijiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MomijiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MomijiEvents.
     */
    distinct?: MomijiEventScalarFieldEnum | MomijiEventScalarFieldEnum[]
  }

  /**
   * MomijiEvent findFirstOrThrow
   */
  export type MomijiEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter, which MomijiEvent to fetch.
     */
    where?: MomijiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MomijiEvents to fetch.
     */
    orderBy?: MomijiEventOrderByWithRelationInput | MomijiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MomijiEvents.
     */
    cursor?: MomijiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MomijiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MomijiEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MomijiEvents.
     */
    distinct?: MomijiEventScalarFieldEnum | MomijiEventScalarFieldEnum[]
  }

  /**
   * MomijiEvent findMany
   */
  export type MomijiEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter, which MomijiEvents to fetch.
     */
    where?: MomijiEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MomijiEvents to fetch.
     */
    orderBy?: MomijiEventOrderByWithRelationInput | MomijiEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MomijiEvents.
     */
    cursor?: MomijiEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MomijiEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MomijiEvents.
     */
    skip?: number
    distinct?: MomijiEventScalarFieldEnum | MomijiEventScalarFieldEnum[]
  }

  /**
   * MomijiEvent create
   */
  export type MomijiEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MomijiEvent.
     */
    data: XOR<MomijiEventCreateInput, MomijiEventUncheckedCreateInput>
  }

  /**
   * MomijiEvent createMany
   */
  export type MomijiEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MomijiEvents.
     */
    data: MomijiEventCreateManyInput | MomijiEventCreateManyInput[]
  }

  /**
   * MomijiEvent createManyAndReturn
   */
  export type MomijiEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * The data used to create many MomijiEvents.
     */
    data: MomijiEventCreateManyInput | MomijiEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MomijiEvent update
   */
  export type MomijiEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MomijiEvent.
     */
    data: XOR<MomijiEventUpdateInput, MomijiEventUncheckedUpdateInput>
    /**
     * Choose, which MomijiEvent to update.
     */
    where: MomijiEventWhereUniqueInput
  }

  /**
   * MomijiEvent updateMany
   */
  export type MomijiEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MomijiEvents.
     */
    data: XOR<MomijiEventUpdateManyMutationInput, MomijiEventUncheckedUpdateManyInput>
    /**
     * Filter which MomijiEvents to update
     */
    where?: MomijiEventWhereInput
    /**
     * Limit how many MomijiEvents to update.
     */
    limit?: number
  }

  /**
   * MomijiEvent updateManyAndReturn
   */
  export type MomijiEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * The data used to update MomijiEvents.
     */
    data: XOR<MomijiEventUpdateManyMutationInput, MomijiEventUncheckedUpdateManyInput>
    /**
     * Filter which MomijiEvents to update
     */
    where?: MomijiEventWhereInput
    /**
     * Limit how many MomijiEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MomijiEvent upsert
   */
  export type MomijiEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MomijiEvent to update in case it exists.
     */
    where: MomijiEventWhereUniqueInput
    /**
     * In case the MomijiEvent found by the `where` argument doesn't exist, create a new MomijiEvent with this data.
     */
    create: XOR<MomijiEventCreateInput, MomijiEventUncheckedCreateInput>
    /**
     * In case the MomijiEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MomijiEventUpdateInput, MomijiEventUncheckedUpdateInput>
  }

  /**
   * MomijiEvent delete
   */
  export type MomijiEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
    /**
     * Filter which MomijiEvent to delete.
     */
    where: MomijiEventWhereUniqueInput
  }

  /**
   * MomijiEvent deleteMany
   */
  export type MomijiEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MomijiEvents to delete
     */
    where?: MomijiEventWhereInput
    /**
     * Limit how many MomijiEvents to delete.
     */
    limit?: number
  }

  /**
   * MomijiEvent without action
   */
  export type MomijiEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomijiEvent
     */
    select?: MomijiEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MomijiEvent
     */
    omit?: MomijiEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomijiEventInclude<ExtArgs> | null
  }


  /**
   * Model IlluminationEvent
   */

  export type AggregateIlluminationEvent = {
    _count: IlluminationEventCountAggregateOutputType | null
    _min: IlluminationEventMinAggregateOutputType | null
    _max: IlluminationEventMaxAggregateOutputType | null
  }

  export type IlluminationEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IlluminationEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IlluminationEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IlluminationEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IlluminationEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IlluminationEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IlluminationEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IlluminationEvent to aggregate.
     */
    where?: IlluminationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IlluminationEvents to fetch.
     */
    orderBy?: IlluminationEventOrderByWithRelationInput | IlluminationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IlluminationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IlluminationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IlluminationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IlluminationEvents
    **/
    _count?: true | IlluminationEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IlluminationEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IlluminationEventMaxAggregateInputType
  }

  export type GetIlluminationEventAggregateType<T extends IlluminationEventAggregateArgs> = {
        [P in keyof T & keyof AggregateIlluminationEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIlluminationEvent[P]>
      : GetScalarType<T[P], AggregateIlluminationEvent[P]>
  }




  export type IlluminationEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IlluminationEventWhereInput
    orderBy?: IlluminationEventOrderByWithAggregationInput | IlluminationEventOrderByWithAggregationInput[]
    by: IlluminationEventScalarFieldEnum[] | IlluminationEventScalarFieldEnum
    having?: IlluminationEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IlluminationEventCountAggregateInputType | true
    _min?: IlluminationEventMinAggregateInputType
    _max?: IlluminationEventMaxAggregateInputType
  }

  export type IlluminationEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: IlluminationEventCountAggregateOutputType | null
    _min: IlluminationEventMinAggregateOutputType | null
    _max: IlluminationEventMaxAggregateOutputType | null
  }

  type GetIlluminationEventGroupByPayload<T extends IlluminationEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IlluminationEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IlluminationEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IlluminationEventGroupByOutputType[P]>
            : GetScalarType<T[P], IlluminationEventGroupByOutputType[P]>
        }
      >
    >


  export type IlluminationEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["illuminationEvent"]>

  export type IlluminationEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["illuminationEvent"]>

  export type IlluminationEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["illuminationEvent"]>

  export type IlluminationEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IlluminationEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["illuminationEvent"]>
  export type IlluminationEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type IlluminationEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type IlluminationEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $IlluminationEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IlluminationEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["illuminationEvent"]>
    composites: {}
  }

  type IlluminationEventGetPayload<S extends boolean | null | undefined | IlluminationEventDefaultArgs> = $Result.GetResult<Prisma.$IlluminationEventPayload, S>

  type IlluminationEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IlluminationEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IlluminationEventCountAggregateInputType | true
    }

  export interface IlluminationEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IlluminationEvent'], meta: { name: 'IlluminationEvent' } }
    /**
     * Find zero or one IlluminationEvent that matches the filter.
     * @param {IlluminationEventFindUniqueArgs} args - Arguments to find a IlluminationEvent
     * @example
     * // Get one IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IlluminationEventFindUniqueArgs>(args: SelectSubset<T, IlluminationEventFindUniqueArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IlluminationEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IlluminationEventFindUniqueOrThrowArgs} args - Arguments to find a IlluminationEvent
     * @example
     * // Get one IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IlluminationEventFindUniqueOrThrowArgs>(args: SelectSubset<T, IlluminationEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IlluminationEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventFindFirstArgs} args - Arguments to find a IlluminationEvent
     * @example
     * // Get one IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IlluminationEventFindFirstArgs>(args?: SelectSubset<T, IlluminationEventFindFirstArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IlluminationEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventFindFirstOrThrowArgs} args - Arguments to find a IlluminationEvent
     * @example
     * // Get one IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IlluminationEventFindFirstOrThrowArgs>(args?: SelectSubset<T, IlluminationEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IlluminationEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IlluminationEvents
     * const illuminationEvents = await prisma.illuminationEvent.findMany()
     * 
     * // Get first 10 IlluminationEvents
     * const illuminationEvents = await prisma.illuminationEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const illuminationEventWithIdOnly = await prisma.illuminationEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IlluminationEventFindManyArgs>(args?: SelectSubset<T, IlluminationEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IlluminationEvent.
     * @param {IlluminationEventCreateArgs} args - Arguments to create a IlluminationEvent.
     * @example
     * // Create one IlluminationEvent
     * const IlluminationEvent = await prisma.illuminationEvent.create({
     *   data: {
     *     // ... data to create a IlluminationEvent
     *   }
     * })
     * 
     */
    create<T extends IlluminationEventCreateArgs>(args: SelectSubset<T, IlluminationEventCreateArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IlluminationEvents.
     * @param {IlluminationEventCreateManyArgs} args - Arguments to create many IlluminationEvents.
     * @example
     * // Create many IlluminationEvents
     * const illuminationEvent = await prisma.illuminationEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IlluminationEventCreateManyArgs>(args?: SelectSubset<T, IlluminationEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IlluminationEvents and returns the data saved in the database.
     * @param {IlluminationEventCreateManyAndReturnArgs} args - Arguments to create many IlluminationEvents.
     * @example
     * // Create many IlluminationEvents
     * const illuminationEvent = await prisma.illuminationEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IlluminationEvents and only return the `id`
     * const illuminationEventWithIdOnly = await prisma.illuminationEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IlluminationEventCreateManyAndReturnArgs>(args?: SelectSubset<T, IlluminationEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IlluminationEvent.
     * @param {IlluminationEventDeleteArgs} args - Arguments to delete one IlluminationEvent.
     * @example
     * // Delete one IlluminationEvent
     * const IlluminationEvent = await prisma.illuminationEvent.delete({
     *   where: {
     *     // ... filter to delete one IlluminationEvent
     *   }
     * })
     * 
     */
    delete<T extends IlluminationEventDeleteArgs>(args: SelectSubset<T, IlluminationEventDeleteArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IlluminationEvent.
     * @param {IlluminationEventUpdateArgs} args - Arguments to update one IlluminationEvent.
     * @example
     * // Update one IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IlluminationEventUpdateArgs>(args: SelectSubset<T, IlluminationEventUpdateArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IlluminationEvents.
     * @param {IlluminationEventDeleteManyArgs} args - Arguments to filter IlluminationEvents to delete.
     * @example
     * // Delete a few IlluminationEvents
     * const { count } = await prisma.illuminationEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IlluminationEventDeleteManyArgs>(args?: SelectSubset<T, IlluminationEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IlluminationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IlluminationEvents
     * const illuminationEvent = await prisma.illuminationEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IlluminationEventUpdateManyArgs>(args: SelectSubset<T, IlluminationEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IlluminationEvents and returns the data updated in the database.
     * @param {IlluminationEventUpdateManyAndReturnArgs} args - Arguments to update many IlluminationEvents.
     * @example
     * // Update many IlluminationEvents
     * const illuminationEvent = await prisma.illuminationEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IlluminationEvents and only return the `id`
     * const illuminationEventWithIdOnly = await prisma.illuminationEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IlluminationEventUpdateManyAndReturnArgs>(args: SelectSubset<T, IlluminationEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IlluminationEvent.
     * @param {IlluminationEventUpsertArgs} args - Arguments to update or create a IlluminationEvent.
     * @example
     * // Update or create a IlluminationEvent
     * const illuminationEvent = await prisma.illuminationEvent.upsert({
     *   create: {
     *     // ... data to create a IlluminationEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IlluminationEvent we want to update
     *   }
     * })
     */
    upsert<T extends IlluminationEventUpsertArgs>(args: SelectSubset<T, IlluminationEventUpsertArgs<ExtArgs>>): Prisma__IlluminationEventClient<$Result.GetResult<Prisma.$IlluminationEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IlluminationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventCountArgs} args - Arguments to filter IlluminationEvents to count.
     * @example
     * // Count the number of IlluminationEvents
     * const count = await prisma.illuminationEvent.count({
     *   where: {
     *     // ... the filter for the IlluminationEvents we want to count
     *   }
     * })
    **/
    count<T extends IlluminationEventCountArgs>(
      args?: Subset<T, IlluminationEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IlluminationEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IlluminationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IlluminationEventAggregateArgs>(args: Subset<T, IlluminationEventAggregateArgs>): Prisma.PrismaPromise<GetIlluminationEventAggregateType<T>>

    /**
     * Group by IlluminationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IlluminationEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IlluminationEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IlluminationEventGroupByArgs['orderBy'] }
        : { orderBy?: IlluminationEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IlluminationEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIlluminationEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IlluminationEvent model
   */
  readonly fields: IlluminationEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IlluminationEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IlluminationEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IlluminationEvent model
   */
  interface IlluminationEventFieldRefs {
    readonly id: FieldRef<"IlluminationEvent", 'String'>
    readonly region: FieldRef<"IlluminationEvent", 'String'>
    readonly detailLink: FieldRef<"IlluminationEvent", 'String'>
    readonly name: FieldRef<"IlluminationEvent", 'String'>
    readonly address: FieldRef<"IlluminationEvent", 'String'>
    readonly datetime: FieldRef<"IlluminationEvent", 'String'>
    readonly venue: FieldRef<"IlluminationEvent", 'String'>
    readonly access: FieldRef<"IlluminationEvent", 'String'>
    readonly organizer: FieldRef<"IlluminationEvent", 'String'>
    readonly price: FieldRef<"IlluminationEvent", 'String'>
    readonly contact: FieldRef<"IlluminationEvent", 'String'>
    readonly website: FieldRef<"IlluminationEvent", 'String'>
    readonly googleMap: FieldRef<"IlluminationEvent", 'String'>
    readonly description: FieldRef<"IlluminationEvent", 'String'>
    readonly regionId: FieldRef<"IlluminationEvent", 'String'>
    readonly verified: FieldRef<"IlluminationEvent", 'Boolean'>
    readonly createdAt: FieldRef<"IlluminationEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"IlluminationEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IlluminationEvent findUnique
   */
  export type IlluminationEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter, which IlluminationEvent to fetch.
     */
    where: IlluminationEventWhereUniqueInput
  }

  /**
   * IlluminationEvent findUniqueOrThrow
   */
  export type IlluminationEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter, which IlluminationEvent to fetch.
     */
    where: IlluminationEventWhereUniqueInput
  }

  /**
   * IlluminationEvent findFirst
   */
  export type IlluminationEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter, which IlluminationEvent to fetch.
     */
    where?: IlluminationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IlluminationEvents to fetch.
     */
    orderBy?: IlluminationEventOrderByWithRelationInput | IlluminationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IlluminationEvents.
     */
    cursor?: IlluminationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IlluminationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IlluminationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IlluminationEvents.
     */
    distinct?: IlluminationEventScalarFieldEnum | IlluminationEventScalarFieldEnum[]
  }

  /**
   * IlluminationEvent findFirstOrThrow
   */
  export type IlluminationEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter, which IlluminationEvent to fetch.
     */
    where?: IlluminationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IlluminationEvents to fetch.
     */
    orderBy?: IlluminationEventOrderByWithRelationInput | IlluminationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IlluminationEvents.
     */
    cursor?: IlluminationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IlluminationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IlluminationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IlluminationEvents.
     */
    distinct?: IlluminationEventScalarFieldEnum | IlluminationEventScalarFieldEnum[]
  }

  /**
   * IlluminationEvent findMany
   */
  export type IlluminationEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter, which IlluminationEvents to fetch.
     */
    where?: IlluminationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IlluminationEvents to fetch.
     */
    orderBy?: IlluminationEventOrderByWithRelationInput | IlluminationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IlluminationEvents.
     */
    cursor?: IlluminationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IlluminationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IlluminationEvents.
     */
    skip?: number
    distinct?: IlluminationEventScalarFieldEnum | IlluminationEventScalarFieldEnum[]
  }

  /**
   * IlluminationEvent create
   */
  export type IlluminationEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * The data needed to create a IlluminationEvent.
     */
    data: XOR<IlluminationEventCreateInput, IlluminationEventUncheckedCreateInput>
  }

  /**
   * IlluminationEvent createMany
   */
  export type IlluminationEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IlluminationEvents.
     */
    data: IlluminationEventCreateManyInput | IlluminationEventCreateManyInput[]
  }

  /**
   * IlluminationEvent createManyAndReturn
   */
  export type IlluminationEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * The data used to create many IlluminationEvents.
     */
    data: IlluminationEventCreateManyInput | IlluminationEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IlluminationEvent update
   */
  export type IlluminationEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * The data needed to update a IlluminationEvent.
     */
    data: XOR<IlluminationEventUpdateInput, IlluminationEventUncheckedUpdateInput>
    /**
     * Choose, which IlluminationEvent to update.
     */
    where: IlluminationEventWhereUniqueInput
  }

  /**
   * IlluminationEvent updateMany
   */
  export type IlluminationEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IlluminationEvents.
     */
    data: XOR<IlluminationEventUpdateManyMutationInput, IlluminationEventUncheckedUpdateManyInput>
    /**
     * Filter which IlluminationEvents to update
     */
    where?: IlluminationEventWhereInput
    /**
     * Limit how many IlluminationEvents to update.
     */
    limit?: number
  }

  /**
   * IlluminationEvent updateManyAndReturn
   */
  export type IlluminationEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * The data used to update IlluminationEvents.
     */
    data: XOR<IlluminationEventUpdateManyMutationInput, IlluminationEventUncheckedUpdateManyInput>
    /**
     * Filter which IlluminationEvents to update
     */
    where?: IlluminationEventWhereInput
    /**
     * Limit how many IlluminationEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IlluminationEvent upsert
   */
  export type IlluminationEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * The filter to search for the IlluminationEvent to update in case it exists.
     */
    where: IlluminationEventWhereUniqueInput
    /**
     * In case the IlluminationEvent found by the `where` argument doesn't exist, create a new IlluminationEvent with this data.
     */
    create: XOR<IlluminationEventCreateInput, IlluminationEventUncheckedCreateInput>
    /**
     * In case the IlluminationEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IlluminationEventUpdateInput, IlluminationEventUncheckedUpdateInput>
  }

  /**
   * IlluminationEvent delete
   */
  export type IlluminationEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
    /**
     * Filter which IlluminationEvent to delete.
     */
    where: IlluminationEventWhereUniqueInput
  }

  /**
   * IlluminationEvent deleteMany
   */
  export type IlluminationEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IlluminationEvents to delete
     */
    where?: IlluminationEventWhereInput
    /**
     * Limit how many IlluminationEvents to delete.
     */
    limit?: number
  }

  /**
   * IlluminationEvent without action
   */
  export type IlluminationEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IlluminationEvent
     */
    select?: IlluminationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IlluminationEvent
     */
    omit?: IlluminationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IlluminationEventInclude<ExtArgs> | null
  }


  /**
   * Model CultureEvent
   */

  export type AggregateCultureEvent = {
    _count: CultureEventCountAggregateOutputType | null
    _min: CultureEventMinAggregateOutputType | null
    _max: CultureEventMaxAggregateOutputType | null
  }

  export type CultureEventMinAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CultureEventMaxAggregateOutputType = {
    id: string | null
    region: string | null
    detailLink: string | null
    name: string | null
    address: string | null
    datetime: string | null
    venue: string | null
    access: string | null
    organizer: string | null
    price: string | null
    contact: string | null
    website: string | null
    googleMap: string | null
    description: string | null
    regionId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CultureEventCountAggregateOutputType = {
    id: number
    region: number
    detailLink: number
    name: number
    address: number
    datetime: number
    venue: number
    access: number
    organizer: number
    price: number
    contact: number
    website: number
    googleMap: number
    description: number
    regionId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CultureEventMinAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CultureEventMaxAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CultureEventCountAggregateInputType = {
    id?: true
    region?: true
    detailLink?: true
    name?: true
    address?: true
    datetime?: true
    venue?: true
    access?: true
    organizer?: true
    price?: true
    contact?: true
    website?: true
    googleMap?: true
    description?: true
    regionId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CultureEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CultureEvent to aggregate.
     */
    where?: CultureEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CultureEvents to fetch.
     */
    orderBy?: CultureEventOrderByWithRelationInput | CultureEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CultureEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CultureEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CultureEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CultureEvents
    **/
    _count?: true | CultureEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CultureEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CultureEventMaxAggregateInputType
  }

  export type GetCultureEventAggregateType<T extends CultureEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCultureEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCultureEvent[P]>
      : GetScalarType<T[P], AggregateCultureEvent[P]>
  }




  export type CultureEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CultureEventWhereInput
    orderBy?: CultureEventOrderByWithAggregationInput | CultureEventOrderByWithAggregationInput[]
    by: CultureEventScalarFieldEnum[] | CultureEventScalarFieldEnum
    having?: CultureEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CultureEventCountAggregateInputType | true
    _min?: CultureEventMinAggregateInputType
    _max?: CultureEventMaxAggregateInputType
  }

  export type CultureEventGroupByOutputType = {
    id: string
    region: string
    detailLink: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description: string | null
    regionId: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: CultureEventCountAggregateOutputType | null
    _min: CultureEventMinAggregateOutputType | null
    _max: CultureEventMaxAggregateOutputType | null
  }

  type GetCultureEventGroupByPayload<T extends CultureEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CultureEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CultureEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CultureEventGroupByOutputType[P]>
            : GetScalarType<T[P], CultureEventGroupByOutputType[P]>
        }
      >
    >


  export type CultureEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cultureEvent"]>

  export type CultureEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cultureEvent"]>

  export type CultureEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cultureEvent"]>

  export type CultureEventSelectScalar = {
    id?: boolean
    region?: boolean
    detailLink?: boolean
    name?: boolean
    address?: boolean
    datetime?: boolean
    venue?: boolean
    access?: boolean
    organizer?: boolean
    price?: boolean
    contact?: boolean
    website?: boolean
    googleMap?: boolean
    description?: boolean
    regionId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CultureEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region" | "detailLink" | "name" | "address" | "datetime" | "venue" | "access" | "organizer" | "price" | "contact" | "website" | "googleMap" | "description" | "regionId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["cultureEvent"]>
  export type CultureEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type CultureEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type CultureEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    regionRef?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $CultureEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CultureEvent"
    objects: {
      regionRef: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      region: string
      detailLink: string | null
      name: string
      address: string
      datetime: string
      venue: string
      access: string
      organizer: string
      price: string
      contact: string
      website: string
      googleMap: string
      description: string | null
      regionId: string
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cultureEvent"]>
    composites: {}
  }

  type CultureEventGetPayload<S extends boolean | null | undefined | CultureEventDefaultArgs> = $Result.GetResult<Prisma.$CultureEventPayload, S>

  type CultureEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CultureEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CultureEventCountAggregateInputType | true
    }

  export interface CultureEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CultureEvent'], meta: { name: 'CultureEvent' } }
    /**
     * Find zero or one CultureEvent that matches the filter.
     * @param {CultureEventFindUniqueArgs} args - Arguments to find a CultureEvent
     * @example
     * // Get one CultureEvent
     * const cultureEvent = await prisma.cultureEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CultureEventFindUniqueArgs>(args: SelectSubset<T, CultureEventFindUniqueArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CultureEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CultureEventFindUniqueOrThrowArgs} args - Arguments to find a CultureEvent
     * @example
     * // Get one CultureEvent
     * const cultureEvent = await prisma.cultureEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CultureEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CultureEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CultureEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventFindFirstArgs} args - Arguments to find a CultureEvent
     * @example
     * // Get one CultureEvent
     * const cultureEvent = await prisma.cultureEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CultureEventFindFirstArgs>(args?: SelectSubset<T, CultureEventFindFirstArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CultureEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventFindFirstOrThrowArgs} args - Arguments to find a CultureEvent
     * @example
     * // Get one CultureEvent
     * const cultureEvent = await prisma.cultureEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CultureEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CultureEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CultureEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CultureEvents
     * const cultureEvents = await prisma.cultureEvent.findMany()
     * 
     * // Get first 10 CultureEvents
     * const cultureEvents = await prisma.cultureEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cultureEventWithIdOnly = await prisma.cultureEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CultureEventFindManyArgs>(args?: SelectSubset<T, CultureEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CultureEvent.
     * @param {CultureEventCreateArgs} args - Arguments to create a CultureEvent.
     * @example
     * // Create one CultureEvent
     * const CultureEvent = await prisma.cultureEvent.create({
     *   data: {
     *     // ... data to create a CultureEvent
     *   }
     * })
     * 
     */
    create<T extends CultureEventCreateArgs>(args: SelectSubset<T, CultureEventCreateArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CultureEvents.
     * @param {CultureEventCreateManyArgs} args - Arguments to create many CultureEvents.
     * @example
     * // Create many CultureEvents
     * const cultureEvent = await prisma.cultureEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CultureEventCreateManyArgs>(args?: SelectSubset<T, CultureEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CultureEvents and returns the data saved in the database.
     * @param {CultureEventCreateManyAndReturnArgs} args - Arguments to create many CultureEvents.
     * @example
     * // Create many CultureEvents
     * const cultureEvent = await prisma.cultureEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CultureEvents and only return the `id`
     * const cultureEventWithIdOnly = await prisma.cultureEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CultureEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CultureEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CultureEvent.
     * @param {CultureEventDeleteArgs} args - Arguments to delete one CultureEvent.
     * @example
     * // Delete one CultureEvent
     * const CultureEvent = await prisma.cultureEvent.delete({
     *   where: {
     *     // ... filter to delete one CultureEvent
     *   }
     * })
     * 
     */
    delete<T extends CultureEventDeleteArgs>(args: SelectSubset<T, CultureEventDeleteArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CultureEvent.
     * @param {CultureEventUpdateArgs} args - Arguments to update one CultureEvent.
     * @example
     * // Update one CultureEvent
     * const cultureEvent = await prisma.cultureEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CultureEventUpdateArgs>(args: SelectSubset<T, CultureEventUpdateArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CultureEvents.
     * @param {CultureEventDeleteManyArgs} args - Arguments to filter CultureEvents to delete.
     * @example
     * // Delete a few CultureEvents
     * const { count } = await prisma.cultureEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CultureEventDeleteManyArgs>(args?: SelectSubset<T, CultureEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CultureEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CultureEvents
     * const cultureEvent = await prisma.cultureEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CultureEventUpdateManyArgs>(args: SelectSubset<T, CultureEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CultureEvents and returns the data updated in the database.
     * @param {CultureEventUpdateManyAndReturnArgs} args - Arguments to update many CultureEvents.
     * @example
     * // Update many CultureEvents
     * const cultureEvent = await prisma.cultureEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CultureEvents and only return the `id`
     * const cultureEventWithIdOnly = await prisma.cultureEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CultureEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CultureEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CultureEvent.
     * @param {CultureEventUpsertArgs} args - Arguments to update or create a CultureEvent.
     * @example
     * // Update or create a CultureEvent
     * const cultureEvent = await prisma.cultureEvent.upsert({
     *   create: {
     *     // ... data to create a CultureEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CultureEvent we want to update
     *   }
     * })
     */
    upsert<T extends CultureEventUpsertArgs>(args: SelectSubset<T, CultureEventUpsertArgs<ExtArgs>>): Prisma__CultureEventClient<$Result.GetResult<Prisma.$CultureEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CultureEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventCountArgs} args - Arguments to filter CultureEvents to count.
     * @example
     * // Count the number of CultureEvents
     * const count = await prisma.cultureEvent.count({
     *   where: {
     *     // ... the filter for the CultureEvents we want to count
     *   }
     * })
    **/
    count<T extends CultureEventCountArgs>(
      args?: Subset<T, CultureEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CultureEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CultureEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CultureEventAggregateArgs>(args: Subset<T, CultureEventAggregateArgs>): Prisma.PrismaPromise<GetCultureEventAggregateType<T>>

    /**
     * Group by CultureEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CultureEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CultureEventGroupByArgs['orderBy'] }
        : { orderBy?: CultureEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CultureEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCultureEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CultureEvent model
   */
  readonly fields: CultureEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CultureEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CultureEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    regionRef<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CultureEvent model
   */
  interface CultureEventFieldRefs {
    readonly id: FieldRef<"CultureEvent", 'String'>
    readonly region: FieldRef<"CultureEvent", 'String'>
    readonly detailLink: FieldRef<"CultureEvent", 'String'>
    readonly name: FieldRef<"CultureEvent", 'String'>
    readonly address: FieldRef<"CultureEvent", 'String'>
    readonly datetime: FieldRef<"CultureEvent", 'String'>
    readonly venue: FieldRef<"CultureEvent", 'String'>
    readonly access: FieldRef<"CultureEvent", 'String'>
    readonly organizer: FieldRef<"CultureEvent", 'String'>
    readonly price: FieldRef<"CultureEvent", 'String'>
    readonly contact: FieldRef<"CultureEvent", 'String'>
    readonly website: FieldRef<"CultureEvent", 'String'>
    readonly googleMap: FieldRef<"CultureEvent", 'String'>
    readonly description: FieldRef<"CultureEvent", 'String'>
    readonly regionId: FieldRef<"CultureEvent", 'String'>
    readonly verified: FieldRef<"CultureEvent", 'Boolean'>
    readonly createdAt: FieldRef<"CultureEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CultureEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CultureEvent findUnique
   */
  export type CultureEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter, which CultureEvent to fetch.
     */
    where: CultureEventWhereUniqueInput
  }

  /**
   * CultureEvent findUniqueOrThrow
   */
  export type CultureEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter, which CultureEvent to fetch.
     */
    where: CultureEventWhereUniqueInput
  }

  /**
   * CultureEvent findFirst
   */
  export type CultureEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter, which CultureEvent to fetch.
     */
    where?: CultureEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CultureEvents to fetch.
     */
    orderBy?: CultureEventOrderByWithRelationInput | CultureEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CultureEvents.
     */
    cursor?: CultureEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CultureEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CultureEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CultureEvents.
     */
    distinct?: CultureEventScalarFieldEnum | CultureEventScalarFieldEnum[]
  }

  /**
   * CultureEvent findFirstOrThrow
   */
  export type CultureEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter, which CultureEvent to fetch.
     */
    where?: CultureEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CultureEvents to fetch.
     */
    orderBy?: CultureEventOrderByWithRelationInput | CultureEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CultureEvents.
     */
    cursor?: CultureEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CultureEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CultureEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CultureEvents.
     */
    distinct?: CultureEventScalarFieldEnum | CultureEventScalarFieldEnum[]
  }

  /**
   * CultureEvent findMany
   */
  export type CultureEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter, which CultureEvents to fetch.
     */
    where?: CultureEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CultureEvents to fetch.
     */
    orderBy?: CultureEventOrderByWithRelationInput | CultureEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CultureEvents.
     */
    cursor?: CultureEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CultureEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CultureEvents.
     */
    skip?: number
    distinct?: CultureEventScalarFieldEnum | CultureEventScalarFieldEnum[]
  }

  /**
   * CultureEvent create
   */
  export type CultureEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CultureEvent.
     */
    data: XOR<CultureEventCreateInput, CultureEventUncheckedCreateInput>
  }

  /**
   * CultureEvent createMany
   */
  export type CultureEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CultureEvents.
     */
    data: CultureEventCreateManyInput | CultureEventCreateManyInput[]
  }

  /**
   * CultureEvent createManyAndReturn
   */
  export type CultureEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * The data used to create many CultureEvents.
     */
    data: CultureEventCreateManyInput | CultureEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CultureEvent update
   */
  export type CultureEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CultureEvent.
     */
    data: XOR<CultureEventUpdateInput, CultureEventUncheckedUpdateInput>
    /**
     * Choose, which CultureEvent to update.
     */
    where: CultureEventWhereUniqueInput
  }

  /**
   * CultureEvent updateMany
   */
  export type CultureEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CultureEvents.
     */
    data: XOR<CultureEventUpdateManyMutationInput, CultureEventUncheckedUpdateManyInput>
    /**
     * Filter which CultureEvents to update
     */
    where?: CultureEventWhereInput
    /**
     * Limit how many CultureEvents to update.
     */
    limit?: number
  }

  /**
   * CultureEvent updateManyAndReturn
   */
  export type CultureEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * The data used to update CultureEvents.
     */
    data: XOR<CultureEventUpdateManyMutationInput, CultureEventUncheckedUpdateManyInput>
    /**
     * Filter which CultureEvents to update
     */
    where?: CultureEventWhereInput
    /**
     * Limit how many CultureEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CultureEvent upsert
   */
  export type CultureEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CultureEvent to update in case it exists.
     */
    where: CultureEventWhereUniqueInput
    /**
     * In case the CultureEvent found by the `where` argument doesn't exist, create a new CultureEvent with this data.
     */
    create: XOR<CultureEventCreateInput, CultureEventUncheckedCreateInput>
    /**
     * In case the CultureEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CultureEventUpdateInput, CultureEventUncheckedUpdateInput>
  }

  /**
   * CultureEvent delete
   */
  export type CultureEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
    /**
     * Filter which CultureEvent to delete.
     */
    where: CultureEventWhereUniqueInput
  }

  /**
   * CultureEvent deleteMany
   */
  export type CultureEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CultureEvents to delete
     */
    where?: CultureEventWhereInput
    /**
     * Limit how many CultureEvents to delete.
     */
    limit?: number
  }

  /**
   * CultureEvent without action
   */
  export type CultureEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureEvent
     */
    select?: CultureEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CultureEvent
     */
    omit?: CultureEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureEventInclude<ExtArgs> | null
  }


  /**
   * Model ValidationResult
   */

  export type AggregateValidationResult = {
    _count: ValidationResultCountAggregateOutputType | null
    _avg: ValidationResultAvgAggregateOutputType | null
    _sum: ValidationResultSumAggregateOutputType | null
    _min: ValidationResultMinAggregateOutputType | null
    _max: ValidationResultMaxAggregateOutputType | null
  }

  export type ValidationResultAvgAggregateOutputType = {
    confidenceScore: number | null
  }

  export type ValidationResultSumAggregateOutputType = {
    confidenceScore: number | null
  }

  export type ValidationResultMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    eventType: string | null
    regionCode: string | null
    fieldName: string | null
    localValue: string | null
    externalValue: string | null
    isConsistent: boolean | null
    confidenceScore: number | null
    notes: string | null
    validationDate: Date | null
  }

  export type ValidationResultMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    eventType: string | null
    regionCode: string | null
    fieldName: string | null
    localValue: string | null
    externalValue: string | null
    isConsistent: boolean | null
    confidenceScore: number | null
    notes: string | null
    validationDate: Date | null
  }

  export type ValidationResultCountAggregateOutputType = {
    id: number
    eventId: number
    eventType: number
    regionCode: number
    fieldName: number
    localValue: number
    externalValue: number
    isConsistent: number
    confidenceScore: number
    notes: number
    validationDate: number
    _all: number
  }


  export type ValidationResultAvgAggregateInputType = {
    confidenceScore?: true
  }

  export type ValidationResultSumAggregateInputType = {
    confidenceScore?: true
  }

  export type ValidationResultMinAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    regionCode?: true
    fieldName?: true
    localValue?: true
    externalValue?: true
    isConsistent?: true
    confidenceScore?: true
    notes?: true
    validationDate?: true
  }

  export type ValidationResultMaxAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    regionCode?: true
    fieldName?: true
    localValue?: true
    externalValue?: true
    isConsistent?: true
    confidenceScore?: true
    notes?: true
    validationDate?: true
  }

  export type ValidationResultCountAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    regionCode?: true
    fieldName?: true
    localValue?: true
    externalValue?: true
    isConsistent?: true
    confidenceScore?: true
    notes?: true
    validationDate?: true
    _all?: true
  }

  export type ValidationResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ValidationResult to aggregate.
     */
    where?: ValidationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: ValidationResultOrderByWithRelationInput | ValidationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ValidationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValidationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ValidationResults
    **/
    _count?: true | ValidationResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ValidationResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ValidationResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ValidationResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ValidationResultMaxAggregateInputType
  }

  export type GetValidationResultAggregateType<T extends ValidationResultAggregateArgs> = {
        [P in keyof T & keyof AggregateValidationResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateValidationResult[P]>
      : GetScalarType<T[P], AggregateValidationResult[P]>
  }




  export type ValidationResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ValidationResultWhereInput
    orderBy?: ValidationResultOrderByWithAggregationInput | ValidationResultOrderByWithAggregationInput[]
    by: ValidationResultScalarFieldEnum[] | ValidationResultScalarFieldEnum
    having?: ValidationResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ValidationResultCountAggregateInputType | true
    _avg?: ValidationResultAvgAggregateInputType
    _sum?: ValidationResultSumAggregateInputType
    _min?: ValidationResultMinAggregateInputType
    _max?: ValidationResultMaxAggregateInputType
  }

  export type ValidationResultGroupByOutputType = {
    id: string
    eventId: string
    eventType: string
    regionCode: string
    fieldName: string
    localValue: string | null
    externalValue: string | null
    isConsistent: boolean
    confidenceScore: number
    notes: string | null
    validationDate: Date
    _count: ValidationResultCountAggregateOutputType | null
    _avg: ValidationResultAvgAggregateOutputType | null
    _sum: ValidationResultSumAggregateOutputType | null
    _min: ValidationResultMinAggregateOutputType | null
    _max: ValidationResultMaxAggregateOutputType | null
  }

  type GetValidationResultGroupByPayload<T extends ValidationResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ValidationResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ValidationResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ValidationResultGroupByOutputType[P]>
            : GetScalarType<T[P], ValidationResultGroupByOutputType[P]>
        }
      >
    >


  export type ValidationResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    regionCode?: boolean
    fieldName?: boolean
    localValue?: boolean
    externalValue?: boolean
    isConsistent?: boolean
    confidenceScore?: boolean
    notes?: boolean
    validationDate?: boolean
  }, ExtArgs["result"]["validationResult"]>

  export type ValidationResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    regionCode?: boolean
    fieldName?: boolean
    localValue?: boolean
    externalValue?: boolean
    isConsistent?: boolean
    confidenceScore?: boolean
    notes?: boolean
    validationDate?: boolean
  }, ExtArgs["result"]["validationResult"]>

  export type ValidationResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    regionCode?: boolean
    fieldName?: boolean
    localValue?: boolean
    externalValue?: boolean
    isConsistent?: boolean
    confidenceScore?: boolean
    notes?: boolean
    validationDate?: boolean
  }, ExtArgs["result"]["validationResult"]>

  export type ValidationResultSelectScalar = {
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    regionCode?: boolean
    fieldName?: boolean
    localValue?: boolean
    externalValue?: boolean
    isConsistent?: boolean
    confidenceScore?: boolean
    notes?: boolean
    validationDate?: boolean
  }

  export type ValidationResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "eventType" | "regionCode" | "fieldName" | "localValue" | "externalValue" | "isConsistent" | "confidenceScore" | "notes" | "validationDate", ExtArgs["result"]["validationResult"]>

  export type $ValidationResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ValidationResult"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      eventType: string
      regionCode: string
      fieldName: string
      localValue: string | null
      externalValue: string | null
      isConsistent: boolean
      confidenceScore: number
      notes: string | null
      validationDate: Date
    }, ExtArgs["result"]["validationResult"]>
    composites: {}
  }

  type ValidationResultGetPayload<S extends boolean | null | undefined | ValidationResultDefaultArgs> = $Result.GetResult<Prisma.$ValidationResultPayload, S>

  type ValidationResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ValidationResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ValidationResultCountAggregateInputType | true
    }

  export interface ValidationResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ValidationResult'], meta: { name: 'ValidationResult' } }
    /**
     * Find zero or one ValidationResult that matches the filter.
     * @param {ValidationResultFindUniqueArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ValidationResultFindUniqueArgs>(args: SelectSubset<T, ValidationResultFindUniqueArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ValidationResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ValidationResultFindUniqueOrThrowArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ValidationResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ValidationResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ValidationResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindFirstArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ValidationResultFindFirstArgs>(args?: SelectSubset<T, ValidationResultFindFirstArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ValidationResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindFirstOrThrowArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ValidationResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ValidationResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ValidationResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ValidationResults
     * const validationResults = await prisma.validationResult.findMany()
     * 
     * // Get first 10 ValidationResults
     * const validationResults = await prisma.validationResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ValidationResultFindManyArgs>(args?: SelectSubset<T, ValidationResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ValidationResult.
     * @param {ValidationResultCreateArgs} args - Arguments to create a ValidationResult.
     * @example
     * // Create one ValidationResult
     * const ValidationResult = await prisma.validationResult.create({
     *   data: {
     *     // ... data to create a ValidationResult
     *   }
     * })
     * 
     */
    create<T extends ValidationResultCreateArgs>(args: SelectSubset<T, ValidationResultCreateArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ValidationResults.
     * @param {ValidationResultCreateManyArgs} args - Arguments to create many ValidationResults.
     * @example
     * // Create many ValidationResults
     * const validationResult = await prisma.validationResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ValidationResultCreateManyArgs>(args?: SelectSubset<T, ValidationResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ValidationResults and returns the data saved in the database.
     * @param {ValidationResultCreateManyAndReturnArgs} args - Arguments to create many ValidationResults.
     * @example
     * // Create many ValidationResults
     * const validationResult = await prisma.validationResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ValidationResults and only return the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ValidationResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ValidationResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ValidationResult.
     * @param {ValidationResultDeleteArgs} args - Arguments to delete one ValidationResult.
     * @example
     * // Delete one ValidationResult
     * const ValidationResult = await prisma.validationResult.delete({
     *   where: {
     *     // ... filter to delete one ValidationResult
     *   }
     * })
     * 
     */
    delete<T extends ValidationResultDeleteArgs>(args: SelectSubset<T, ValidationResultDeleteArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ValidationResult.
     * @param {ValidationResultUpdateArgs} args - Arguments to update one ValidationResult.
     * @example
     * // Update one ValidationResult
     * const validationResult = await prisma.validationResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ValidationResultUpdateArgs>(args: SelectSubset<T, ValidationResultUpdateArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ValidationResults.
     * @param {ValidationResultDeleteManyArgs} args - Arguments to filter ValidationResults to delete.
     * @example
     * // Delete a few ValidationResults
     * const { count } = await prisma.validationResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ValidationResultDeleteManyArgs>(args?: SelectSubset<T, ValidationResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ValidationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ValidationResults
     * const validationResult = await prisma.validationResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ValidationResultUpdateManyArgs>(args: SelectSubset<T, ValidationResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ValidationResults and returns the data updated in the database.
     * @param {ValidationResultUpdateManyAndReturnArgs} args - Arguments to update many ValidationResults.
     * @example
     * // Update many ValidationResults
     * const validationResult = await prisma.validationResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ValidationResults and only return the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ValidationResultUpdateManyAndReturnArgs>(args: SelectSubset<T, ValidationResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ValidationResult.
     * @param {ValidationResultUpsertArgs} args - Arguments to update or create a ValidationResult.
     * @example
     * // Update or create a ValidationResult
     * const validationResult = await prisma.validationResult.upsert({
     *   create: {
     *     // ... data to create a ValidationResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ValidationResult we want to update
     *   }
     * })
     */
    upsert<T extends ValidationResultUpsertArgs>(args: SelectSubset<T, ValidationResultUpsertArgs<ExtArgs>>): Prisma__ValidationResultClient<$Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ValidationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultCountArgs} args - Arguments to filter ValidationResults to count.
     * @example
     * // Count the number of ValidationResults
     * const count = await prisma.validationResult.count({
     *   where: {
     *     // ... the filter for the ValidationResults we want to count
     *   }
     * })
    **/
    count<T extends ValidationResultCountArgs>(
      args?: Subset<T, ValidationResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ValidationResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ValidationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ValidationResultAggregateArgs>(args: Subset<T, ValidationResultAggregateArgs>): Prisma.PrismaPromise<GetValidationResultAggregateType<T>>

    /**
     * Group by ValidationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ValidationResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ValidationResultGroupByArgs['orderBy'] }
        : { orderBy?: ValidationResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ValidationResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValidationResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ValidationResult model
   */
  readonly fields: ValidationResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ValidationResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ValidationResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ValidationResult model
   */
  interface ValidationResultFieldRefs {
    readonly id: FieldRef<"ValidationResult", 'String'>
    readonly eventId: FieldRef<"ValidationResult", 'String'>
    readonly eventType: FieldRef<"ValidationResult", 'String'>
    readonly regionCode: FieldRef<"ValidationResult", 'String'>
    readonly fieldName: FieldRef<"ValidationResult", 'String'>
    readonly localValue: FieldRef<"ValidationResult", 'String'>
    readonly externalValue: FieldRef<"ValidationResult", 'String'>
    readonly isConsistent: FieldRef<"ValidationResult", 'Boolean'>
    readonly confidenceScore: FieldRef<"ValidationResult", 'Float'>
    readonly notes: FieldRef<"ValidationResult", 'String'>
    readonly validationDate: FieldRef<"ValidationResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ValidationResult findUnique
   */
  export type ValidationResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter, which ValidationResult to fetch.
     */
    where: ValidationResultWhereUniqueInput
  }

  /**
   * ValidationResult findUniqueOrThrow
   */
  export type ValidationResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter, which ValidationResult to fetch.
     */
    where: ValidationResultWhereUniqueInput
  }

  /**
   * ValidationResult findFirst
   */
  export type ValidationResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter, which ValidationResult to fetch.
     */
    where?: ValidationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: ValidationResultOrderByWithRelationInput | ValidationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ValidationResults.
     */
    cursor?: ValidationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValidationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ValidationResults.
     */
    distinct?: ValidationResultScalarFieldEnum | ValidationResultScalarFieldEnum[]
  }

  /**
   * ValidationResult findFirstOrThrow
   */
  export type ValidationResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter, which ValidationResult to fetch.
     */
    where?: ValidationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: ValidationResultOrderByWithRelationInput | ValidationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ValidationResults.
     */
    cursor?: ValidationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValidationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ValidationResults.
     */
    distinct?: ValidationResultScalarFieldEnum | ValidationResultScalarFieldEnum[]
  }

  /**
   * ValidationResult findMany
   */
  export type ValidationResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter, which ValidationResults to fetch.
     */
    where?: ValidationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: ValidationResultOrderByWithRelationInput | ValidationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ValidationResults.
     */
    cursor?: ValidationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValidationResults.
     */
    skip?: number
    distinct?: ValidationResultScalarFieldEnum | ValidationResultScalarFieldEnum[]
  }

  /**
   * ValidationResult create
   */
  export type ValidationResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * The data needed to create a ValidationResult.
     */
    data: XOR<ValidationResultCreateInput, ValidationResultUncheckedCreateInput>
  }

  /**
   * ValidationResult createMany
   */
  export type ValidationResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ValidationResults.
     */
    data: ValidationResultCreateManyInput | ValidationResultCreateManyInput[]
  }

  /**
   * ValidationResult createManyAndReturn
   */
  export type ValidationResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * The data used to create many ValidationResults.
     */
    data: ValidationResultCreateManyInput | ValidationResultCreateManyInput[]
  }

  /**
   * ValidationResult update
   */
  export type ValidationResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * The data needed to update a ValidationResult.
     */
    data: XOR<ValidationResultUpdateInput, ValidationResultUncheckedUpdateInput>
    /**
     * Choose, which ValidationResult to update.
     */
    where: ValidationResultWhereUniqueInput
  }

  /**
   * ValidationResult updateMany
   */
  export type ValidationResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ValidationResults.
     */
    data: XOR<ValidationResultUpdateManyMutationInput, ValidationResultUncheckedUpdateManyInput>
    /**
     * Filter which ValidationResults to update
     */
    where?: ValidationResultWhereInput
    /**
     * Limit how many ValidationResults to update.
     */
    limit?: number
  }

  /**
   * ValidationResult updateManyAndReturn
   */
  export type ValidationResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * The data used to update ValidationResults.
     */
    data: XOR<ValidationResultUpdateManyMutationInput, ValidationResultUncheckedUpdateManyInput>
    /**
     * Filter which ValidationResults to update
     */
    where?: ValidationResultWhereInput
    /**
     * Limit how many ValidationResults to update.
     */
    limit?: number
  }

  /**
   * ValidationResult upsert
   */
  export type ValidationResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * The filter to search for the ValidationResult to update in case it exists.
     */
    where: ValidationResultWhereUniqueInput
    /**
     * In case the ValidationResult found by the `where` argument doesn't exist, create a new ValidationResult with this data.
     */
    create: XOR<ValidationResultCreateInput, ValidationResultUncheckedCreateInput>
    /**
     * In case the ValidationResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ValidationResultUpdateInput, ValidationResultUncheckedUpdateInput>
  }

  /**
   * ValidationResult delete
   */
  export type ValidationResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
    /**
     * Filter which ValidationResult to delete.
     */
    where: ValidationResultWhereUniqueInput
  }

  /**
   * ValidationResult deleteMany
   */
  export type ValidationResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ValidationResults to delete
     */
    where?: ValidationResultWhereInput
    /**
     * Limit how many ValidationResults to delete.
     */
    limit?: number
  }

  /**
   * ValidationResult without action
   */
  export type ValidationResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: ValidationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: ValidationResultOmit<ExtArgs> | null
  }


  /**
   * Model ExternalRawData
   */

  export type AggregateExternalRawData = {
    _count: ExternalRawDataCountAggregateOutputType | null
    _min: ExternalRawDataMinAggregateOutputType | null
    _max: ExternalRawDataMaxAggregateOutputType | null
  }

  export type ExternalRawDataMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    regionCode: string | null
    eventType: string | null
    sourceType: string | null
    rawHtml: string | null
    sourceUrl: string | null
    scrapeDate: Date | null
  }

  export type ExternalRawDataMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    regionCode: string | null
    eventType: string | null
    sourceType: string | null
    rawHtml: string | null
    sourceUrl: string | null
    scrapeDate: Date | null
  }

  export type ExternalRawDataCountAggregateOutputType = {
    id: number
    eventId: number
    regionCode: number
    eventType: number
    sourceType: number
    rawHtml: number
    parsedData: number
    sourceUrl: number
    scrapeDate: number
    _all: number
  }


  export type ExternalRawDataMinAggregateInputType = {
    id?: true
    eventId?: true
    regionCode?: true
    eventType?: true
    sourceType?: true
    rawHtml?: true
    sourceUrl?: true
    scrapeDate?: true
  }

  export type ExternalRawDataMaxAggregateInputType = {
    id?: true
    eventId?: true
    regionCode?: true
    eventType?: true
    sourceType?: true
    rawHtml?: true
    sourceUrl?: true
    scrapeDate?: true
  }

  export type ExternalRawDataCountAggregateInputType = {
    id?: true
    eventId?: true
    regionCode?: true
    eventType?: true
    sourceType?: true
    rawHtml?: true
    parsedData?: true
    sourceUrl?: true
    scrapeDate?: true
    _all?: true
  }

  export type ExternalRawDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalRawData to aggregate.
     */
    where?: ExternalRawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalRawData to fetch.
     */
    orderBy?: ExternalRawDataOrderByWithRelationInput | ExternalRawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExternalRawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalRawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalRawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExternalRawData
    **/
    _count?: true | ExternalRawDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExternalRawDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExternalRawDataMaxAggregateInputType
  }

  export type GetExternalRawDataAggregateType<T extends ExternalRawDataAggregateArgs> = {
        [P in keyof T & keyof AggregateExternalRawData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternalRawData[P]>
      : GetScalarType<T[P], AggregateExternalRawData[P]>
  }




  export type ExternalRawDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExternalRawDataWhereInput
    orderBy?: ExternalRawDataOrderByWithAggregationInput | ExternalRawDataOrderByWithAggregationInput[]
    by: ExternalRawDataScalarFieldEnum[] | ExternalRawDataScalarFieldEnum
    having?: ExternalRawDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExternalRawDataCountAggregateInputType | true
    _min?: ExternalRawDataMinAggregateInputType
    _max?: ExternalRawDataMaxAggregateInputType
  }

  export type ExternalRawDataGroupByOutputType = {
    id: string
    eventId: string
    regionCode: string
    eventType: string
    sourceType: string
    rawHtml: string | null
    parsedData: JsonValue
    sourceUrl: string
    scrapeDate: Date
    _count: ExternalRawDataCountAggregateOutputType | null
    _min: ExternalRawDataMinAggregateOutputType | null
    _max: ExternalRawDataMaxAggregateOutputType | null
  }

  type GetExternalRawDataGroupByPayload<T extends ExternalRawDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExternalRawDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExternalRawDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExternalRawDataGroupByOutputType[P]>
            : GetScalarType<T[P], ExternalRawDataGroupByOutputType[P]>
        }
      >
    >


  export type ExternalRawDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    regionCode?: boolean
    eventType?: boolean
    sourceType?: boolean
    rawHtml?: boolean
    parsedData?: boolean
    sourceUrl?: boolean
    scrapeDate?: boolean
  }, ExtArgs["result"]["externalRawData"]>

  export type ExternalRawDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    regionCode?: boolean
    eventType?: boolean
    sourceType?: boolean
    rawHtml?: boolean
    parsedData?: boolean
    sourceUrl?: boolean
    scrapeDate?: boolean
  }, ExtArgs["result"]["externalRawData"]>

  export type ExternalRawDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    regionCode?: boolean
    eventType?: boolean
    sourceType?: boolean
    rawHtml?: boolean
    parsedData?: boolean
    sourceUrl?: boolean
    scrapeDate?: boolean
  }, ExtArgs["result"]["externalRawData"]>

  export type ExternalRawDataSelectScalar = {
    id?: boolean
    eventId?: boolean
    regionCode?: boolean
    eventType?: boolean
    sourceType?: boolean
    rawHtml?: boolean
    parsedData?: boolean
    sourceUrl?: boolean
    scrapeDate?: boolean
  }

  export type ExternalRawDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "regionCode" | "eventType" | "sourceType" | "rawHtml" | "parsedData" | "sourceUrl" | "scrapeDate", ExtArgs["result"]["externalRawData"]>

  export type $ExternalRawDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExternalRawData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      regionCode: string
      eventType: string
      sourceType: string
      rawHtml: string | null
      parsedData: Prisma.JsonValue
      sourceUrl: string
      scrapeDate: Date
    }, ExtArgs["result"]["externalRawData"]>
    composites: {}
  }

  type ExternalRawDataGetPayload<S extends boolean | null | undefined | ExternalRawDataDefaultArgs> = $Result.GetResult<Prisma.$ExternalRawDataPayload, S>

  type ExternalRawDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExternalRawDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExternalRawDataCountAggregateInputType | true
    }

  export interface ExternalRawDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExternalRawData'], meta: { name: 'ExternalRawData' } }
    /**
     * Find zero or one ExternalRawData that matches the filter.
     * @param {ExternalRawDataFindUniqueArgs} args - Arguments to find a ExternalRawData
     * @example
     * // Get one ExternalRawData
     * const externalRawData = await prisma.externalRawData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExternalRawDataFindUniqueArgs>(args: SelectSubset<T, ExternalRawDataFindUniqueArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExternalRawData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExternalRawDataFindUniqueOrThrowArgs} args - Arguments to find a ExternalRawData
     * @example
     * // Get one ExternalRawData
     * const externalRawData = await prisma.externalRawData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExternalRawDataFindUniqueOrThrowArgs>(args: SelectSubset<T, ExternalRawDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalRawData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataFindFirstArgs} args - Arguments to find a ExternalRawData
     * @example
     * // Get one ExternalRawData
     * const externalRawData = await prisma.externalRawData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExternalRawDataFindFirstArgs>(args?: SelectSubset<T, ExternalRawDataFindFirstArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalRawData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataFindFirstOrThrowArgs} args - Arguments to find a ExternalRawData
     * @example
     * // Get one ExternalRawData
     * const externalRawData = await prisma.externalRawData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExternalRawDataFindFirstOrThrowArgs>(args?: SelectSubset<T, ExternalRawDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExternalRawData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExternalRawData
     * const externalRawData = await prisma.externalRawData.findMany()
     * 
     * // Get first 10 ExternalRawData
     * const externalRawData = await prisma.externalRawData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const externalRawDataWithIdOnly = await prisma.externalRawData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExternalRawDataFindManyArgs>(args?: SelectSubset<T, ExternalRawDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExternalRawData.
     * @param {ExternalRawDataCreateArgs} args - Arguments to create a ExternalRawData.
     * @example
     * // Create one ExternalRawData
     * const ExternalRawData = await prisma.externalRawData.create({
     *   data: {
     *     // ... data to create a ExternalRawData
     *   }
     * })
     * 
     */
    create<T extends ExternalRawDataCreateArgs>(args: SelectSubset<T, ExternalRawDataCreateArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExternalRawData.
     * @param {ExternalRawDataCreateManyArgs} args - Arguments to create many ExternalRawData.
     * @example
     * // Create many ExternalRawData
     * const externalRawData = await prisma.externalRawData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExternalRawDataCreateManyArgs>(args?: SelectSubset<T, ExternalRawDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExternalRawData and returns the data saved in the database.
     * @param {ExternalRawDataCreateManyAndReturnArgs} args - Arguments to create many ExternalRawData.
     * @example
     * // Create many ExternalRawData
     * const externalRawData = await prisma.externalRawData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExternalRawData and only return the `id`
     * const externalRawDataWithIdOnly = await prisma.externalRawData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExternalRawDataCreateManyAndReturnArgs>(args?: SelectSubset<T, ExternalRawDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExternalRawData.
     * @param {ExternalRawDataDeleteArgs} args - Arguments to delete one ExternalRawData.
     * @example
     * // Delete one ExternalRawData
     * const ExternalRawData = await prisma.externalRawData.delete({
     *   where: {
     *     // ... filter to delete one ExternalRawData
     *   }
     * })
     * 
     */
    delete<T extends ExternalRawDataDeleteArgs>(args: SelectSubset<T, ExternalRawDataDeleteArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExternalRawData.
     * @param {ExternalRawDataUpdateArgs} args - Arguments to update one ExternalRawData.
     * @example
     * // Update one ExternalRawData
     * const externalRawData = await prisma.externalRawData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExternalRawDataUpdateArgs>(args: SelectSubset<T, ExternalRawDataUpdateArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExternalRawData.
     * @param {ExternalRawDataDeleteManyArgs} args - Arguments to filter ExternalRawData to delete.
     * @example
     * // Delete a few ExternalRawData
     * const { count } = await prisma.externalRawData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExternalRawDataDeleteManyArgs>(args?: SelectSubset<T, ExternalRawDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalRawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExternalRawData
     * const externalRawData = await prisma.externalRawData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExternalRawDataUpdateManyArgs>(args: SelectSubset<T, ExternalRawDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalRawData and returns the data updated in the database.
     * @param {ExternalRawDataUpdateManyAndReturnArgs} args - Arguments to update many ExternalRawData.
     * @example
     * // Update many ExternalRawData
     * const externalRawData = await prisma.externalRawData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExternalRawData and only return the `id`
     * const externalRawDataWithIdOnly = await prisma.externalRawData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExternalRawDataUpdateManyAndReturnArgs>(args: SelectSubset<T, ExternalRawDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExternalRawData.
     * @param {ExternalRawDataUpsertArgs} args - Arguments to update or create a ExternalRawData.
     * @example
     * // Update or create a ExternalRawData
     * const externalRawData = await prisma.externalRawData.upsert({
     *   create: {
     *     // ... data to create a ExternalRawData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExternalRawData we want to update
     *   }
     * })
     */
    upsert<T extends ExternalRawDataUpsertArgs>(args: SelectSubset<T, ExternalRawDataUpsertArgs<ExtArgs>>): Prisma__ExternalRawDataClient<$Result.GetResult<Prisma.$ExternalRawDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExternalRawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataCountArgs} args - Arguments to filter ExternalRawData to count.
     * @example
     * // Count the number of ExternalRawData
     * const count = await prisma.externalRawData.count({
     *   where: {
     *     // ... the filter for the ExternalRawData we want to count
     *   }
     * })
    **/
    count<T extends ExternalRawDataCountArgs>(
      args?: Subset<T, ExternalRawDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExternalRawDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExternalRawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExternalRawDataAggregateArgs>(args: Subset<T, ExternalRawDataAggregateArgs>): Prisma.PrismaPromise<GetExternalRawDataAggregateType<T>>

    /**
     * Group by ExternalRawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalRawDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExternalRawDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExternalRawDataGroupByArgs['orderBy'] }
        : { orderBy?: ExternalRawDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExternalRawDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternalRawDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExternalRawData model
   */
  readonly fields: ExternalRawDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExternalRawData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExternalRawDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExternalRawData model
   */
  interface ExternalRawDataFieldRefs {
    readonly id: FieldRef<"ExternalRawData", 'String'>
    readonly eventId: FieldRef<"ExternalRawData", 'String'>
    readonly regionCode: FieldRef<"ExternalRawData", 'String'>
    readonly eventType: FieldRef<"ExternalRawData", 'String'>
    readonly sourceType: FieldRef<"ExternalRawData", 'String'>
    readonly rawHtml: FieldRef<"ExternalRawData", 'String'>
    readonly parsedData: FieldRef<"ExternalRawData", 'Json'>
    readonly sourceUrl: FieldRef<"ExternalRawData", 'String'>
    readonly scrapeDate: FieldRef<"ExternalRawData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExternalRawData findUnique
   */
  export type ExternalRawDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter, which ExternalRawData to fetch.
     */
    where: ExternalRawDataWhereUniqueInput
  }

  /**
   * ExternalRawData findUniqueOrThrow
   */
  export type ExternalRawDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter, which ExternalRawData to fetch.
     */
    where: ExternalRawDataWhereUniqueInput
  }

  /**
   * ExternalRawData findFirst
   */
  export type ExternalRawDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter, which ExternalRawData to fetch.
     */
    where?: ExternalRawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalRawData to fetch.
     */
    orderBy?: ExternalRawDataOrderByWithRelationInput | ExternalRawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalRawData.
     */
    cursor?: ExternalRawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalRawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalRawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalRawData.
     */
    distinct?: ExternalRawDataScalarFieldEnum | ExternalRawDataScalarFieldEnum[]
  }

  /**
   * ExternalRawData findFirstOrThrow
   */
  export type ExternalRawDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter, which ExternalRawData to fetch.
     */
    where?: ExternalRawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalRawData to fetch.
     */
    orderBy?: ExternalRawDataOrderByWithRelationInput | ExternalRawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalRawData.
     */
    cursor?: ExternalRawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalRawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalRawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalRawData.
     */
    distinct?: ExternalRawDataScalarFieldEnum | ExternalRawDataScalarFieldEnum[]
  }

  /**
   * ExternalRawData findMany
   */
  export type ExternalRawDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter, which ExternalRawData to fetch.
     */
    where?: ExternalRawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalRawData to fetch.
     */
    orderBy?: ExternalRawDataOrderByWithRelationInput | ExternalRawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExternalRawData.
     */
    cursor?: ExternalRawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalRawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalRawData.
     */
    skip?: number
    distinct?: ExternalRawDataScalarFieldEnum | ExternalRawDataScalarFieldEnum[]
  }

  /**
   * ExternalRawData create
   */
  export type ExternalRawDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * The data needed to create a ExternalRawData.
     */
    data: XOR<ExternalRawDataCreateInput, ExternalRawDataUncheckedCreateInput>
  }

  /**
   * ExternalRawData createMany
   */
  export type ExternalRawDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExternalRawData.
     */
    data: ExternalRawDataCreateManyInput | ExternalRawDataCreateManyInput[]
  }

  /**
   * ExternalRawData createManyAndReturn
   */
  export type ExternalRawDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * The data used to create many ExternalRawData.
     */
    data: ExternalRawDataCreateManyInput | ExternalRawDataCreateManyInput[]
  }

  /**
   * ExternalRawData update
   */
  export type ExternalRawDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * The data needed to update a ExternalRawData.
     */
    data: XOR<ExternalRawDataUpdateInput, ExternalRawDataUncheckedUpdateInput>
    /**
     * Choose, which ExternalRawData to update.
     */
    where: ExternalRawDataWhereUniqueInput
  }

  /**
   * ExternalRawData updateMany
   */
  export type ExternalRawDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExternalRawData.
     */
    data: XOR<ExternalRawDataUpdateManyMutationInput, ExternalRawDataUncheckedUpdateManyInput>
    /**
     * Filter which ExternalRawData to update
     */
    where?: ExternalRawDataWhereInput
    /**
     * Limit how many ExternalRawData to update.
     */
    limit?: number
  }

  /**
   * ExternalRawData updateManyAndReturn
   */
  export type ExternalRawDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * The data used to update ExternalRawData.
     */
    data: XOR<ExternalRawDataUpdateManyMutationInput, ExternalRawDataUncheckedUpdateManyInput>
    /**
     * Filter which ExternalRawData to update
     */
    where?: ExternalRawDataWhereInput
    /**
     * Limit how many ExternalRawData to update.
     */
    limit?: number
  }

  /**
   * ExternalRawData upsert
   */
  export type ExternalRawDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * The filter to search for the ExternalRawData to update in case it exists.
     */
    where: ExternalRawDataWhereUniqueInput
    /**
     * In case the ExternalRawData found by the `where` argument doesn't exist, create a new ExternalRawData with this data.
     */
    create: XOR<ExternalRawDataCreateInput, ExternalRawDataUncheckedCreateInput>
    /**
     * In case the ExternalRawData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExternalRawDataUpdateInput, ExternalRawDataUncheckedUpdateInput>
  }

  /**
   * ExternalRawData delete
   */
  export type ExternalRawDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
    /**
     * Filter which ExternalRawData to delete.
     */
    where: ExternalRawDataWhereUniqueInput
  }

  /**
   * ExternalRawData deleteMany
   */
  export type ExternalRawDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalRawData to delete
     */
    where?: ExternalRawDataWhereInput
    /**
     * Limit how many ExternalRawData to delete.
     */
    limit?: number
  }

  /**
   * ExternalRawData without action
   */
  export type ExternalRawDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalRawData
     */
    select?: ExternalRawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalRawData
     */
    omit?: ExternalRawDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RegionScalarFieldEnum: {
    id: 'id',
    code: 'code',
    nameCn: 'nameCn',
    nameJp: 'nameJp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const HanabiEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HanabiEventScalarFieldEnum = (typeof HanabiEventScalarFieldEnum)[keyof typeof HanabiEventScalarFieldEnum]


  export const MatsuriEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MatsuriEventScalarFieldEnum = (typeof MatsuriEventScalarFieldEnum)[keyof typeof MatsuriEventScalarFieldEnum]


  export const HanamiEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HanamiEventScalarFieldEnum = (typeof HanamiEventScalarFieldEnum)[keyof typeof HanamiEventScalarFieldEnum]


  export const MomijiEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MomijiEventScalarFieldEnum = (typeof MomijiEventScalarFieldEnum)[keyof typeof MomijiEventScalarFieldEnum]


  export const IlluminationEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IlluminationEventScalarFieldEnum = (typeof IlluminationEventScalarFieldEnum)[keyof typeof IlluminationEventScalarFieldEnum]


  export const CultureEventScalarFieldEnum: {
    id: 'id',
    region: 'region',
    detailLink: 'detailLink',
    name: 'name',
    address: 'address',
    datetime: 'datetime',
    venue: 'venue',
    access: 'access',
    organizer: 'organizer',
    price: 'price',
    contact: 'contact',
    website: 'website',
    googleMap: 'googleMap',
    description: 'description',
    regionId: 'regionId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CultureEventScalarFieldEnum = (typeof CultureEventScalarFieldEnum)[keyof typeof CultureEventScalarFieldEnum]


  export const ValidationResultScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    eventType: 'eventType',
    regionCode: 'regionCode',
    fieldName: 'fieldName',
    localValue: 'localValue',
    externalValue: 'externalValue',
    isConsistent: 'isConsistent',
    confidenceScore: 'confidenceScore',
    notes: 'notes',
    validationDate: 'validationDate'
  };

  export type ValidationResultScalarFieldEnum = (typeof ValidationResultScalarFieldEnum)[keyof typeof ValidationResultScalarFieldEnum]


  export const ExternalRawDataScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    regionCode: 'regionCode',
    eventType: 'eventType',
    sourceType: 'sourceType',
    rawHtml: 'rawHtml',
    parsedData: 'parsedData',
    sourceUrl: 'sourceUrl',
    scrapeDate: 'scrapeDate'
  };

  export type ExternalRawDataScalarFieldEnum = (typeof ExternalRawDataScalarFieldEnum)[keyof typeof ExternalRawDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: StringFilter<"Region"> | string
    code?: StringFilter<"Region"> | string
    nameCn?: StringFilter<"Region"> | string
    nameJp?: StringFilter<"Region"> | string
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
    hanabiEvents?: HanabiEventListRelationFilter
    matsuriEvents?: MatsuriEventListRelationFilter
    hanamiEvents?: HanamiEventListRelationFilter
    momijiEvents?: MomijiEventListRelationFilter
    illuminationEvents?: IlluminationEventListRelationFilter
    cultureEvents?: CultureEventListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    nameCn?: SortOrder
    nameJp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hanabiEvents?: HanabiEventOrderByRelationAggregateInput
    matsuriEvents?: MatsuriEventOrderByRelationAggregateInput
    hanamiEvents?: HanamiEventOrderByRelationAggregateInput
    momijiEvents?: MomijiEventOrderByRelationAggregateInput
    illuminationEvents?: IlluminationEventOrderByRelationAggregateInput
    cultureEvents?: CultureEventOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    nameCn?: StringFilter<"Region"> | string
    nameJp?: StringFilter<"Region"> | string
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
    hanabiEvents?: HanabiEventListRelationFilter
    matsuriEvents?: MatsuriEventListRelationFilter
    hanamiEvents?: HanamiEventListRelationFilter
    momijiEvents?: MomijiEventListRelationFilter
    illuminationEvents?: IlluminationEventListRelationFilter
    cultureEvents?: CultureEventListRelationFilter
  }, "id" | "code">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    nameCn?: SortOrder
    nameJp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Region"> | string
    code?: StringWithAggregatesFilter<"Region"> | string
    nameCn?: StringWithAggregatesFilter<"Region"> | string
    nameJp?: StringWithAggregatesFilter<"Region"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
  }

  export type HanabiEventWhereInput = {
    AND?: HanabiEventWhereInput | HanabiEventWhereInput[]
    OR?: HanabiEventWhereInput[]
    NOT?: HanabiEventWhereInput | HanabiEventWhereInput[]
    id?: StringFilter<"HanabiEvent"> | string
    region?: StringFilter<"HanabiEvent"> | string
    detailLink?: StringNullableFilter<"HanabiEvent"> | string | null
    name?: StringFilter<"HanabiEvent"> | string
    address?: StringFilter<"HanabiEvent"> | string
    datetime?: StringFilter<"HanabiEvent"> | string
    venue?: StringFilter<"HanabiEvent"> | string
    access?: StringFilter<"HanabiEvent"> | string
    organizer?: StringFilter<"HanabiEvent"> | string
    price?: StringFilter<"HanabiEvent"> | string
    contact?: StringFilter<"HanabiEvent"> | string
    website?: StringFilter<"HanabiEvent"> | string
    googleMap?: StringFilter<"HanabiEvent"> | string
    description?: StringNullableFilter<"HanabiEvent"> | string | null
    regionId?: StringFilter<"HanabiEvent"> | string
    verified?: BoolFilter<"HanabiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanabiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanabiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type HanabiEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type HanabiEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HanabiEventWhereInput | HanabiEventWhereInput[]
    OR?: HanabiEventWhereInput[]
    NOT?: HanabiEventWhereInput | HanabiEventWhereInput[]
    region?: StringFilter<"HanabiEvent"> | string
    detailLink?: StringNullableFilter<"HanabiEvent"> | string | null
    name?: StringFilter<"HanabiEvent"> | string
    address?: StringFilter<"HanabiEvent"> | string
    datetime?: StringFilter<"HanabiEvent"> | string
    venue?: StringFilter<"HanabiEvent"> | string
    access?: StringFilter<"HanabiEvent"> | string
    organizer?: StringFilter<"HanabiEvent"> | string
    price?: StringFilter<"HanabiEvent"> | string
    contact?: StringFilter<"HanabiEvent"> | string
    website?: StringFilter<"HanabiEvent"> | string
    googleMap?: StringFilter<"HanabiEvent"> | string
    description?: StringNullableFilter<"HanabiEvent"> | string | null
    regionId?: StringFilter<"HanabiEvent"> | string
    verified?: BoolFilter<"HanabiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanabiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanabiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type HanabiEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HanabiEventCountOrderByAggregateInput
    _max?: HanabiEventMaxOrderByAggregateInput
    _min?: HanabiEventMinOrderByAggregateInput
  }

  export type HanabiEventScalarWhereWithAggregatesInput = {
    AND?: HanabiEventScalarWhereWithAggregatesInput | HanabiEventScalarWhereWithAggregatesInput[]
    OR?: HanabiEventScalarWhereWithAggregatesInput[]
    NOT?: HanabiEventScalarWhereWithAggregatesInput | HanabiEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HanabiEvent"> | string
    region?: StringWithAggregatesFilter<"HanabiEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"HanabiEvent"> | string | null
    name?: StringWithAggregatesFilter<"HanabiEvent"> | string
    address?: StringWithAggregatesFilter<"HanabiEvent"> | string
    datetime?: StringWithAggregatesFilter<"HanabiEvent"> | string
    venue?: StringWithAggregatesFilter<"HanabiEvent"> | string
    access?: StringWithAggregatesFilter<"HanabiEvent"> | string
    organizer?: StringWithAggregatesFilter<"HanabiEvent"> | string
    price?: StringWithAggregatesFilter<"HanabiEvent"> | string
    contact?: StringWithAggregatesFilter<"HanabiEvent"> | string
    website?: StringWithAggregatesFilter<"HanabiEvent"> | string
    googleMap?: StringWithAggregatesFilter<"HanabiEvent"> | string
    description?: StringNullableWithAggregatesFilter<"HanabiEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"HanabiEvent"> | string
    verified?: BoolWithAggregatesFilter<"HanabiEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"HanabiEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HanabiEvent"> | Date | string
  }

  export type MatsuriEventWhereInput = {
    AND?: MatsuriEventWhereInput | MatsuriEventWhereInput[]
    OR?: MatsuriEventWhereInput[]
    NOT?: MatsuriEventWhereInput | MatsuriEventWhereInput[]
    id?: StringFilter<"MatsuriEvent"> | string
    region?: StringFilter<"MatsuriEvent"> | string
    detailLink?: StringNullableFilter<"MatsuriEvent"> | string | null
    name?: StringFilter<"MatsuriEvent"> | string
    address?: StringFilter<"MatsuriEvent"> | string
    datetime?: StringFilter<"MatsuriEvent"> | string
    venue?: StringFilter<"MatsuriEvent"> | string
    access?: StringFilter<"MatsuriEvent"> | string
    organizer?: StringFilter<"MatsuriEvent"> | string
    price?: StringFilter<"MatsuriEvent"> | string
    contact?: StringFilter<"MatsuriEvent"> | string
    website?: StringFilter<"MatsuriEvent"> | string
    googleMap?: StringFilter<"MatsuriEvent"> | string
    description?: StringNullableFilter<"MatsuriEvent"> | string | null
    regionId?: StringFilter<"MatsuriEvent"> | string
    verified?: BoolFilter<"MatsuriEvent"> | boolean
    createdAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type MatsuriEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type MatsuriEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatsuriEventWhereInput | MatsuriEventWhereInput[]
    OR?: MatsuriEventWhereInput[]
    NOT?: MatsuriEventWhereInput | MatsuriEventWhereInput[]
    region?: StringFilter<"MatsuriEvent"> | string
    detailLink?: StringNullableFilter<"MatsuriEvent"> | string | null
    name?: StringFilter<"MatsuriEvent"> | string
    address?: StringFilter<"MatsuriEvent"> | string
    datetime?: StringFilter<"MatsuriEvent"> | string
    venue?: StringFilter<"MatsuriEvent"> | string
    access?: StringFilter<"MatsuriEvent"> | string
    organizer?: StringFilter<"MatsuriEvent"> | string
    price?: StringFilter<"MatsuriEvent"> | string
    contact?: StringFilter<"MatsuriEvent"> | string
    website?: StringFilter<"MatsuriEvent"> | string
    googleMap?: StringFilter<"MatsuriEvent"> | string
    description?: StringNullableFilter<"MatsuriEvent"> | string | null
    regionId?: StringFilter<"MatsuriEvent"> | string
    verified?: BoolFilter<"MatsuriEvent"> | boolean
    createdAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type MatsuriEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MatsuriEventCountOrderByAggregateInput
    _max?: MatsuriEventMaxOrderByAggregateInput
    _min?: MatsuriEventMinOrderByAggregateInput
  }

  export type MatsuriEventScalarWhereWithAggregatesInput = {
    AND?: MatsuriEventScalarWhereWithAggregatesInput | MatsuriEventScalarWhereWithAggregatesInput[]
    OR?: MatsuriEventScalarWhereWithAggregatesInput[]
    NOT?: MatsuriEventScalarWhereWithAggregatesInput | MatsuriEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    region?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"MatsuriEvent"> | string | null
    name?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    address?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    datetime?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    venue?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    access?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    organizer?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    price?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    contact?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    website?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    googleMap?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    description?: StringNullableWithAggregatesFilter<"MatsuriEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"MatsuriEvent"> | string
    verified?: BoolWithAggregatesFilter<"MatsuriEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MatsuriEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MatsuriEvent"> | Date | string
  }

  export type HanamiEventWhereInput = {
    AND?: HanamiEventWhereInput | HanamiEventWhereInput[]
    OR?: HanamiEventWhereInput[]
    NOT?: HanamiEventWhereInput | HanamiEventWhereInput[]
    id?: StringFilter<"HanamiEvent"> | string
    region?: StringFilter<"HanamiEvent"> | string
    detailLink?: StringNullableFilter<"HanamiEvent"> | string | null
    name?: StringFilter<"HanamiEvent"> | string
    address?: StringFilter<"HanamiEvent"> | string
    datetime?: StringFilter<"HanamiEvent"> | string
    venue?: StringFilter<"HanamiEvent"> | string
    access?: StringFilter<"HanamiEvent"> | string
    organizer?: StringFilter<"HanamiEvent"> | string
    price?: StringFilter<"HanamiEvent"> | string
    contact?: StringFilter<"HanamiEvent"> | string
    website?: StringFilter<"HanamiEvent"> | string
    googleMap?: StringFilter<"HanamiEvent"> | string
    description?: StringNullableFilter<"HanamiEvent"> | string | null
    regionId?: StringFilter<"HanamiEvent"> | string
    verified?: BoolFilter<"HanamiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanamiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanamiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type HanamiEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type HanamiEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HanamiEventWhereInput | HanamiEventWhereInput[]
    OR?: HanamiEventWhereInput[]
    NOT?: HanamiEventWhereInput | HanamiEventWhereInput[]
    region?: StringFilter<"HanamiEvent"> | string
    detailLink?: StringNullableFilter<"HanamiEvent"> | string | null
    name?: StringFilter<"HanamiEvent"> | string
    address?: StringFilter<"HanamiEvent"> | string
    datetime?: StringFilter<"HanamiEvent"> | string
    venue?: StringFilter<"HanamiEvent"> | string
    access?: StringFilter<"HanamiEvent"> | string
    organizer?: StringFilter<"HanamiEvent"> | string
    price?: StringFilter<"HanamiEvent"> | string
    contact?: StringFilter<"HanamiEvent"> | string
    website?: StringFilter<"HanamiEvent"> | string
    googleMap?: StringFilter<"HanamiEvent"> | string
    description?: StringNullableFilter<"HanamiEvent"> | string | null
    regionId?: StringFilter<"HanamiEvent"> | string
    verified?: BoolFilter<"HanamiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanamiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanamiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type HanamiEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HanamiEventCountOrderByAggregateInput
    _max?: HanamiEventMaxOrderByAggregateInput
    _min?: HanamiEventMinOrderByAggregateInput
  }

  export type HanamiEventScalarWhereWithAggregatesInput = {
    AND?: HanamiEventScalarWhereWithAggregatesInput | HanamiEventScalarWhereWithAggregatesInput[]
    OR?: HanamiEventScalarWhereWithAggregatesInput[]
    NOT?: HanamiEventScalarWhereWithAggregatesInput | HanamiEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HanamiEvent"> | string
    region?: StringWithAggregatesFilter<"HanamiEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"HanamiEvent"> | string | null
    name?: StringWithAggregatesFilter<"HanamiEvent"> | string
    address?: StringWithAggregatesFilter<"HanamiEvent"> | string
    datetime?: StringWithAggregatesFilter<"HanamiEvent"> | string
    venue?: StringWithAggregatesFilter<"HanamiEvent"> | string
    access?: StringWithAggregatesFilter<"HanamiEvent"> | string
    organizer?: StringWithAggregatesFilter<"HanamiEvent"> | string
    price?: StringWithAggregatesFilter<"HanamiEvent"> | string
    contact?: StringWithAggregatesFilter<"HanamiEvent"> | string
    website?: StringWithAggregatesFilter<"HanamiEvent"> | string
    googleMap?: StringWithAggregatesFilter<"HanamiEvent"> | string
    description?: StringNullableWithAggregatesFilter<"HanamiEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"HanamiEvent"> | string
    verified?: BoolWithAggregatesFilter<"HanamiEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"HanamiEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HanamiEvent"> | Date | string
  }

  export type MomijiEventWhereInput = {
    AND?: MomijiEventWhereInput | MomijiEventWhereInput[]
    OR?: MomijiEventWhereInput[]
    NOT?: MomijiEventWhereInput | MomijiEventWhereInput[]
    id?: StringFilter<"MomijiEvent"> | string
    region?: StringFilter<"MomijiEvent"> | string
    detailLink?: StringNullableFilter<"MomijiEvent"> | string | null
    name?: StringFilter<"MomijiEvent"> | string
    address?: StringFilter<"MomijiEvent"> | string
    datetime?: StringFilter<"MomijiEvent"> | string
    venue?: StringFilter<"MomijiEvent"> | string
    access?: StringFilter<"MomijiEvent"> | string
    organizer?: StringFilter<"MomijiEvent"> | string
    price?: StringFilter<"MomijiEvent"> | string
    contact?: StringFilter<"MomijiEvent"> | string
    website?: StringFilter<"MomijiEvent"> | string
    googleMap?: StringFilter<"MomijiEvent"> | string
    description?: StringNullableFilter<"MomijiEvent"> | string | null
    regionId?: StringFilter<"MomijiEvent"> | string
    verified?: BoolFilter<"MomijiEvent"> | boolean
    createdAt?: DateTimeFilter<"MomijiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MomijiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type MomijiEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type MomijiEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MomijiEventWhereInput | MomijiEventWhereInput[]
    OR?: MomijiEventWhereInput[]
    NOT?: MomijiEventWhereInput | MomijiEventWhereInput[]
    region?: StringFilter<"MomijiEvent"> | string
    detailLink?: StringNullableFilter<"MomijiEvent"> | string | null
    name?: StringFilter<"MomijiEvent"> | string
    address?: StringFilter<"MomijiEvent"> | string
    datetime?: StringFilter<"MomijiEvent"> | string
    venue?: StringFilter<"MomijiEvent"> | string
    access?: StringFilter<"MomijiEvent"> | string
    organizer?: StringFilter<"MomijiEvent"> | string
    price?: StringFilter<"MomijiEvent"> | string
    contact?: StringFilter<"MomijiEvent"> | string
    website?: StringFilter<"MomijiEvent"> | string
    googleMap?: StringFilter<"MomijiEvent"> | string
    description?: StringNullableFilter<"MomijiEvent"> | string | null
    regionId?: StringFilter<"MomijiEvent"> | string
    verified?: BoolFilter<"MomijiEvent"> | boolean
    createdAt?: DateTimeFilter<"MomijiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MomijiEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type MomijiEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MomijiEventCountOrderByAggregateInput
    _max?: MomijiEventMaxOrderByAggregateInput
    _min?: MomijiEventMinOrderByAggregateInput
  }

  export type MomijiEventScalarWhereWithAggregatesInput = {
    AND?: MomijiEventScalarWhereWithAggregatesInput | MomijiEventScalarWhereWithAggregatesInput[]
    OR?: MomijiEventScalarWhereWithAggregatesInput[]
    NOT?: MomijiEventScalarWhereWithAggregatesInput | MomijiEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MomijiEvent"> | string
    region?: StringWithAggregatesFilter<"MomijiEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"MomijiEvent"> | string | null
    name?: StringWithAggregatesFilter<"MomijiEvent"> | string
    address?: StringWithAggregatesFilter<"MomijiEvent"> | string
    datetime?: StringWithAggregatesFilter<"MomijiEvent"> | string
    venue?: StringWithAggregatesFilter<"MomijiEvent"> | string
    access?: StringWithAggregatesFilter<"MomijiEvent"> | string
    organizer?: StringWithAggregatesFilter<"MomijiEvent"> | string
    price?: StringWithAggregatesFilter<"MomijiEvent"> | string
    contact?: StringWithAggregatesFilter<"MomijiEvent"> | string
    website?: StringWithAggregatesFilter<"MomijiEvent"> | string
    googleMap?: StringWithAggregatesFilter<"MomijiEvent"> | string
    description?: StringNullableWithAggregatesFilter<"MomijiEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"MomijiEvent"> | string
    verified?: BoolWithAggregatesFilter<"MomijiEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MomijiEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MomijiEvent"> | Date | string
  }

  export type IlluminationEventWhereInput = {
    AND?: IlluminationEventWhereInput | IlluminationEventWhereInput[]
    OR?: IlluminationEventWhereInput[]
    NOT?: IlluminationEventWhereInput | IlluminationEventWhereInput[]
    id?: StringFilter<"IlluminationEvent"> | string
    region?: StringFilter<"IlluminationEvent"> | string
    detailLink?: StringNullableFilter<"IlluminationEvent"> | string | null
    name?: StringFilter<"IlluminationEvent"> | string
    address?: StringFilter<"IlluminationEvent"> | string
    datetime?: StringFilter<"IlluminationEvent"> | string
    venue?: StringFilter<"IlluminationEvent"> | string
    access?: StringFilter<"IlluminationEvent"> | string
    organizer?: StringFilter<"IlluminationEvent"> | string
    price?: StringFilter<"IlluminationEvent"> | string
    contact?: StringFilter<"IlluminationEvent"> | string
    website?: StringFilter<"IlluminationEvent"> | string
    googleMap?: StringFilter<"IlluminationEvent"> | string
    description?: StringNullableFilter<"IlluminationEvent"> | string | null
    regionId?: StringFilter<"IlluminationEvent"> | string
    verified?: BoolFilter<"IlluminationEvent"> | boolean
    createdAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type IlluminationEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type IlluminationEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IlluminationEventWhereInput | IlluminationEventWhereInput[]
    OR?: IlluminationEventWhereInput[]
    NOT?: IlluminationEventWhereInput | IlluminationEventWhereInput[]
    region?: StringFilter<"IlluminationEvent"> | string
    detailLink?: StringNullableFilter<"IlluminationEvent"> | string | null
    name?: StringFilter<"IlluminationEvent"> | string
    address?: StringFilter<"IlluminationEvent"> | string
    datetime?: StringFilter<"IlluminationEvent"> | string
    venue?: StringFilter<"IlluminationEvent"> | string
    access?: StringFilter<"IlluminationEvent"> | string
    organizer?: StringFilter<"IlluminationEvent"> | string
    price?: StringFilter<"IlluminationEvent"> | string
    contact?: StringFilter<"IlluminationEvent"> | string
    website?: StringFilter<"IlluminationEvent"> | string
    googleMap?: StringFilter<"IlluminationEvent"> | string
    description?: StringNullableFilter<"IlluminationEvent"> | string | null
    regionId?: StringFilter<"IlluminationEvent"> | string
    verified?: BoolFilter<"IlluminationEvent"> | boolean
    createdAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type IlluminationEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IlluminationEventCountOrderByAggregateInput
    _max?: IlluminationEventMaxOrderByAggregateInput
    _min?: IlluminationEventMinOrderByAggregateInput
  }

  export type IlluminationEventScalarWhereWithAggregatesInput = {
    AND?: IlluminationEventScalarWhereWithAggregatesInput | IlluminationEventScalarWhereWithAggregatesInput[]
    OR?: IlluminationEventScalarWhereWithAggregatesInput[]
    NOT?: IlluminationEventScalarWhereWithAggregatesInput | IlluminationEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    region?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"IlluminationEvent"> | string | null
    name?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    address?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    datetime?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    venue?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    access?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    organizer?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    price?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    contact?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    website?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    googleMap?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    description?: StringNullableWithAggregatesFilter<"IlluminationEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"IlluminationEvent"> | string
    verified?: BoolWithAggregatesFilter<"IlluminationEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"IlluminationEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IlluminationEvent"> | Date | string
  }

  export type CultureEventWhereInput = {
    AND?: CultureEventWhereInput | CultureEventWhereInput[]
    OR?: CultureEventWhereInput[]
    NOT?: CultureEventWhereInput | CultureEventWhereInput[]
    id?: StringFilter<"CultureEvent"> | string
    region?: StringFilter<"CultureEvent"> | string
    detailLink?: StringNullableFilter<"CultureEvent"> | string | null
    name?: StringFilter<"CultureEvent"> | string
    address?: StringFilter<"CultureEvent"> | string
    datetime?: StringFilter<"CultureEvent"> | string
    venue?: StringFilter<"CultureEvent"> | string
    access?: StringFilter<"CultureEvent"> | string
    organizer?: StringFilter<"CultureEvent"> | string
    price?: StringFilter<"CultureEvent"> | string
    contact?: StringFilter<"CultureEvent"> | string
    website?: StringFilter<"CultureEvent"> | string
    googleMap?: StringFilter<"CultureEvent"> | string
    description?: StringNullableFilter<"CultureEvent"> | string | null
    regionId?: StringFilter<"CultureEvent"> | string
    verified?: BoolFilter<"CultureEvent"> | boolean
    createdAt?: DateTimeFilter<"CultureEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CultureEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type CultureEventOrderByWithRelationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    regionRef?: RegionOrderByWithRelationInput
  }

  export type CultureEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CultureEventWhereInput | CultureEventWhereInput[]
    OR?: CultureEventWhereInput[]
    NOT?: CultureEventWhereInput | CultureEventWhereInput[]
    region?: StringFilter<"CultureEvent"> | string
    detailLink?: StringNullableFilter<"CultureEvent"> | string | null
    name?: StringFilter<"CultureEvent"> | string
    address?: StringFilter<"CultureEvent"> | string
    datetime?: StringFilter<"CultureEvent"> | string
    venue?: StringFilter<"CultureEvent"> | string
    access?: StringFilter<"CultureEvent"> | string
    organizer?: StringFilter<"CultureEvent"> | string
    price?: StringFilter<"CultureEvent"> | string
    contact?: StringFilter<"CultureEvent"> | string
    website?: StringFilter<"CultureEvent"> | string
    googleMap?: StringFilter<"CultureEvent"> | string
    description?: StringNullableFilter<"CultureEvent"> | string | null
    regionId?: StringFilter<"CultureEvent"> | string
    verified?: BoolFilter<"CultureEvent"> | boolean
    createdAt?: DateTimeFilter<"CultureEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CultureEvent"> | Date | string
    regionRef?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type CultureEventOrderByWithAggregationInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrderInput | SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CultureEventCountOrderByAggregateInput
    _max?: CultureEventMaxOrderByAggregateInput
    _min?: CultureEventMinOrderByAggregateInput
  }

  export type CultureEventScalarWhereWithAggregatesInput = {
    AND?: CultureEventScalarWhereWithAggregatesInput | CultureEventScalarWhereWithAggregatesInput[]
    OR?: CultureEventScalarWhereWithAggregatesInput[]
    NOT?: CultureEventScalarWhereWithAggregatesInput | CultureEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CultureEvent"> | string
    region?: StringWithAggregatesFilter<"CultureEvent"> | string
    detailLink?: StringNullableWithAggregatesFilter<"CultureEvent"> | string | null
    name?: StringWithAggregatesFilter<"CultureEvent"> | string
    address?: StringWithAggregatesFilter<"CultureEvent"> | string
    datetime?: StringWithAggregatesFilter<"CultureEvent"> | string
    venue?: StringWithAggregatesFilter<"CultureEvent"> | string
    access?: StringWithAggregatesFilter<"CultureEvent"> | string
    organizer?: StringWithAggregatesFilter<"CultureEvent"> | string
    price?: StringWithAggregatesFilter<"CultureEvent"> | string
    contact?: StringWithAggregatesFilter<"CultureEvent"> | string
    website?: StringWithAggregatesFilter<"CultureEvent"> | string
    googleMap?: StringWithAggregatesFilter<"CultureEvent"> | string
    description?: StringNullableWithAggregatesFilter<"CultureEvent"> | string | null
    regionId?: StringWithAggregatesFilter<"CultureEvent"> | string
    verified?: BoolWithAggregatesFilter<"CultureEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CultureEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CultureEvent"> | Date | string
  }

  export type ValidationResultWhereInput = {
    AND?: ValidationResultWhereInput | ValidationResultWhereInput[]
    OR?: ValidationResultWhereInput[]
    NOT?: ValidationResultWhereInput | ValidationResultWhereInput[]
    id?: StringFilter<"ValidationResult"> | string
    eventId?: StringFilter<"ValidationResult"> | string
    eventType?: StringFilter<"ValidationResult"> | string
    regionCode?: StringFilter<"ValidationResult"> | string
    fieldName?: StringFilter<"ValidationResult"> | string
    localValue?: StringNullableFilter<"ValidationResult"> | string | null
    externalValue?: StringNullableFilter<"ValidationResult"> | string | null
    isConsistent?: BoolFilter<"ValidationResult"> | boolean
    confidenceScore?: FloatFilter<"ValidationResult"> | number
    notes?: StringNullableFilter<"ValidationResult"> | string | null
    validationDate?: DateTimeFilter<"ValidationResult"> | Date | string
  }

  export type ValidationResultOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    regionCode?: SortOrder
    fieldName?: SortOrder
    localValue?: SortOrderInput | SortOrder
    externalValue?: SortOrderInput | SortOrder
    isConsistent?: SortOrder
    confidenceScore?: SortOrder
    notes?: SortOrderInput | SortOrder
    validationDate?: SortOrder
  }

  export type ValidationResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ValidationResultWhereInput | ValidationResultWhereInput[]
    OR?: ValidationResultWhereInput[]
    NOT?: ValidationResultWhereInput | ValidationResultWhereInput[]
    eventId?: StringFilter<"ValidationResult"> | string
    eventType?: StringFilter<"ValidationResult"> | string
    regionCode?: StringFilter<"ValidationResult"> | string
    fieldName?: StringFilter<"ValidationResult"> | string
    localValue?: StringNullableFilter<"ValidationResult"> | string | null
    externalValue?: StringNullableFilter<"ValidationResult"> | string | null
    isConsistent?: BoolFilter<"ValidationResult"> | boolean
    confidenceScore?: FloatFilter<"ValidationResult"> | number
    notes?: StringNullableFilter<"ValidationResult"> | string | null
    validationDate?: DateTimeFilter<"ValidationResult"> | Date | string
  }, "id">

  export type ValidationResultOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    regionCode?: SortOrder
    fieldName?: SortOrder
    localValue?: SortOrderInput | SortOrder
    externalValue?: SortOrderInput | SortOrder
    isConsistent?: SortOrder
    confidenceScore?: SortOrder
    notes?: SortOrderInput | SortOrder
    validationDate?: SortOrder
    _count?: ValidationResultCountOrderByAggregateInput
    _avg?: ValidationResultAvgOrderByAggregateInput
    _max?: ValidationResultMaxOrderByAggregateInput
    _min?: ValidationResultMinOrderByAggregateInput
    _sum?: ValidationResultSumOrderByAggregateInput
  }

  export type ValidationResultScalarWhereWithAggregatesInput = {
    AND?: ValidationResultScalarWhereWithAggregatesInput | ValidationResultScalarWhereWithAggregatesInput[]
    OR?: ValidationResultScalarWhereWithAggregatesInput[]
    NOT?: ValidationResultScalarWhereWithAggregatesInput | ValidationResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ValidationResult"> | string
    eventId?: StringWithAggregatesFilter<"ValidationResult"> | string
    eventType?: StringWithAggregatesFilter<"ValidationResult"> | string
    regionCode?: StringWithAggregatesFilter<"ValidationResult"> | string
    fieldName?: StringWithAggregatesFilter<"ValidationResult"> | string
    localValue?: StringNullableWithAggregatesFilter<"ValidationResult"> | string | null
    externalValue?: StringNullableWithAggregatesFilter<"ValidationResult"> | string | null
    isConsistent?: BoolWithAggregatesFilter<"ValidationResult"> | boolean
    confidenceScore?: FloatWithAggregatesFilter<"ValidationResult"> | number
    notes?: StringNullableWithAggregatesFilter<"ValidationResult"> | string | null
    validationDate?: DateTimeWithAggregatesFilter<"ValidationResult"> | Date | string
  }

  export type ExternalRawDataWhereInput = {
    AND?: ExternalRawDataWhereInput | ExternalRawDataWhereInput[]
    OR?: ExternalRawDataWhereInput[]
    NOT?: ExternalRawDataWhereInput | ExternalRawDataWhereInput[]
    id?: StringFilter<"ExternalRawData"> | string
    eventId?: StringFilter<"ExternalRawData"> | string
    regionCode?: StringFilter<"ExternalRawData"> | string
    eventType?: StringFilter<"ExternalRawData"> | string
    sourceType?: StringFilter<"ExternalRawData"> | string
    rawHtml?: StringNullableFilter<"ExternalRawData"> | string | null
    parsedData?: JsonFilter<"ExternalRawData">
    sourceUrl?: StringFilter<"ExternalRawData"> | string
    scrapeDate?: DateTimeFilter<"ExternalRawData"> | Date | string
  }

  export type ExternalRawDataOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    regionCode?: SortOrder
    eventType?: SortOrder
    sourceType?: SortOrder
    rawHtml?: SortOrderInput | SortOrder
    parsedData?: SortOrder
    sourceUrl?: SortOrder
    scrapeDate?: SortOrder
  }

  export type ExternalRawDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExternalRawDataWhereInput | ExternalRawDataWhereInput[]
    OR?: ExternalRawDataWhereInput[]
    NOT?: ExternalRawDataWhereInput | ExternalRawDataWhereInput[]
    eventId?: StringFilter<"ExternalRawData"> | string
    regionCode?: StringFilter<"ExternalRawData"> | string
    eventType?: StringFilter<"ExternalRawData"> | string
    sourceType?: StringFilter<"ExternalRawData"> | string
    rawHtml?: StringNullableFilter<"ExternalRawData"> | string | null
    parsedData?: JsonFilter<"ExternalRawData">
    sourceUrl?: StringFilter<"ExternalRawData"> | string
    scrapeDate?: DateTimeFilter<"ExternalRawData"> | Date | string
  }, "id">

  export type ExternalRawDataOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    regionCode?: SortOrder
    eventType?: SortOrder
    sourceType?: SortOrder
    rawHtml?: SortOrderInput | SortOrder
    parsedData?: SortOrder
    sourceUrl?: SortOrder
    scrapeDate?: SortOrder
    _count?: ExternalRawDataCountOrderByAggregateInput
    _max?: ExternalRawDataMaxOrderByAggregateInput
    _min?: ExternalRawDataMinOrderByAggregateInput
  }

  export type ExternalRawDataScalarWhereWithAggregatesInput = {
    AND?: ExternalRawDataScalarWhereWithAggregatesInput | ExternalRawDataScalarWhereWithAggregatesInput[]
    OR?: ExternalRawDataScalarWhereWithAggregatesInput[]
    NOT?: ExternalRawDataScalarWhereWithAggregatesInput | ExternalRawDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExternalRawData"> | string
    eventId?: StringWithAggregatesFilter<"ExternalRawData"> | string
    regionCode?: StringWithAggregatesFilter<"ExternalRawData"> | string
    eventType?: StringWithAggregatesFilter<"ExternalRawData"> | string
    sourceType?: StringWithAggregatesFilter<"ExternalRawData"> | string
    rawHtml?: StringNullableWithAggregatesFilter<"ExternalRawData"> | string | null
    parsedData?: JsonWithAggregatesFilter<"ExternalRawData">
    sourceUrl?: StringWithAggregatesFilter<"ExternalRawData"> | string
    scrapeDate?: DateTimeWithAggregatesFilter<"ExternalRawData"> | Date | string
  }

  export type RegionCreateInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateManyInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanabiEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutHanabiEventsInput
  }

  export type HanabiEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanabiEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutHanabiEventsNestedInput
  }

  export type HanabiEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanabiEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanabiEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanabiEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutMatsuriEventsInput
  }

  export type MatsuriEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatsuriEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutMatsuriEventsNestedInput
  }

  export type MatsuriEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatsuriEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutHanamiEventsInput
  }

  export type HanamiEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanamiEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutHanamiEventsNestedInput
  }

  export type HanamiEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanamiEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutMomijiEventsInput
  }

  export type MomijiEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomijiEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutMomijiEventsNestedInput
  }

  export type MomijiEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomijiEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutIlluminationEventsInput
  }

  export type IlluminationEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IlluminationEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutIlluminationEventsNestedInput
  }

  export type IlluminationEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IlluminationEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    regionRef: RegionCreateNestedOneWithoutCultureEventsInput
  }

  export type CultureEventUncheckedCreateInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CultureEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    regionRef?: RegionUpdateOneRequiredWithoutCultureEventsNestedInput
  }

  export type CultureEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventCreateManyInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    regionId: string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CultureEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValidationResultCreateInput = {
    id?: string
    eventId: string
    eventType: string
    regionCode: string
    fieldName: string
    localValue?: string | null
    externalValue?: string | null
    isConsistent: boolean
    confidenceScore?: number
    notes?: string | null
    validationDate?: Date | string
  }

  export type ValidationResultUncheckedCreateInput = {
    id?: string
    eventId: string
    eventType: string
    regionCode: string
    fieldName: string
    localValue?: string | null
    externalValue?: string | null
    isConsistent: boolean
    confidenceScore?: number
    notes?: string | null
    validationDate?: Date | string
  }

  export type ValidationResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    fieldName?: StringFieldUpdateOperationsInput | string
    localValue?: NullableStringFieldUpdateOperationsInput | string | null
    externalValue?: NullableStringFieldUpdateOperationsInput | string | null
    isConsistent?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValidationResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    fieldName?: StringFieldUpdateOperationsInput | string
    localValue?: NullableStringFieldUpdateOperationsInput | string | null
    externalValue?: NullableStringFieldUpdateOperationsInput | string | null
    isConsistent?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValidationResultCreateManyInput = {
    id?: string
    eventId: string
    eventType: string
    regionCode: string
    fieldName: string
    localValue?: string | null
    externalValue?: string | null
    isConsistent: boolean
    confidenceScore?: number
    notes?: string | null
    validationDate?: Date | string
  }

  export type ValidationResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    fieldName?: StringFieldUpdateOperationsInput | string
    localValue?: NullableStringFieldUpdateOperationsInput | string | null
    externalValue?: NullableStringFieldUpdateOperationsInput | string | null
    isConsistent?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValidationResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    fieldName?: StringFieldUpdateOperationsInput | string
    localValue?: NullableStringFieldUpdateOperationsInput | string | null
    externalValue?: NullableStringFieldUpdateOperationsInput | string | null
    isConsistent?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalRawDataCreateInput = {
    id?: string
    eventId: string
    regionCode: string
    eventType: string
    sourceType: string
    rawHtml?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    sourceUrl: string
    scrapeDate?: Date | string
  }

  export type ExternalRawDataUncheckedCreateInput = {
    id?: string
    eventId: string
    regionCode: string
    eventType: string
    sourceType: string
    rawHtml?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    sourceUrl: string
    scrapeDate?: Date | string
  }

  export type ExternalRawDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    rawHtml?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    sourceUrl?: StringFieldUpdateOperationsInput | string
    scrapeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalRawDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    rawHtml?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    sourceUrl?: StringFieldUpdateOperationsInput | string
    scrapeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalRawDataCreateManyInput = {
    id?: string
    eventId: string
    regionCode: string
    eventType: string
    sourceType: string
    rawHtml?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    sourceUrl: string
    scrapeDate?: Date | string
  }

  export type ExternalRawDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    rawHtml?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    sourceUrl?: StringFieldUpdateOperationsInput | string
    scrapeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalRawDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    regionCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    rawHtml?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    sourceUrl?: StringFieldUpdateOperationsInput | string
    scrapeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HanabiEventListRelationFilter = {
    every?: HanabiEventWhereInput
    some?: HanabiEventWhereInput
    none?: HanabiEventWhereInput
  }

  export type MatsuriEventListRelationFilter = {
    every?: MatsuriEventWhereInput
    some?: MatsuriEventWhereInput
    none?: MatsuriEventWhereInput
  }

  export type HanamiEventListRelationFilter = {
    every?: HanamiEventWhereInput
    some?: HanamiEventWhereInput
    none?: HanamiEventWhereInput
  }

  export type MomijiEventListRelationFilter = {
    every?: MomijiEventWhereInput
    some?: MomijiEventWhereInput
    none?: MomijiEventWhereInput
  }

  export type IlluminationEventListRelationFilter = {
    every?: IlluminationEventWhereInput
    some?: IlluminationEventWhereInput
    none?: IlluminationEventWhereInput
  }

  export type CultureEventListRelationFilter = {
    every?: CultureEventWhereInput
    some?: CultureEventWhereInput
    none?: CultureEventWhereInput
  }

  export type HanabiEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatsuriEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HanamiEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MomijiEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IlluminationEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CultureEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameCn?: SortOrder
    nameJp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameCn?: SortOrder
    nameJp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameCn?: SortOrder
    nameJp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HanabiEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HanabiEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HanabiEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MatsuriEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatsuriEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatsuriEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HanamiEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HanamiEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HanamiEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomijiEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomijiEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomijiEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IlluminationEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IlluminationEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IlluminationEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CultureEventCountOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CultureEventMaxOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CultureEventMinOrderByAggregateInput = {
    id?: SortOrder
    region?: SortOrder
    detailLink?: SortOrder
    name?: SortOrder
    address?: SortOrder
    datetime?: SortOrder
    venue?: SortOrder
    access?: SortOrder
    organizer?: SortOrder
    price?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    googleMap?: SortOrder
    description?: SortOrder
    regionId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ValidationResultCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    regionCode?: SortOrder
    fieldName?: SortOrder
    localValue?: SortOrder
    externalValue?: SortOrder
    isConsistent?: SortOrder
    confidenceScore?: SortOrder
    notes?: SortOrder
    validationDate?: SortOrder
  }

  export type ValidationResultAvgOrderByAggregateInput = {
    confidenceScore?: SortOrder
  }

  export type ValidationResultMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    regionCode?: SortOrder
    fieldName?: SortOrder
    localValue?: SortOrder
    externalValue?: SortOrder
    isConsistent?: SortOrder
    confidenceScore?: SortOrder
    notes?: SortOrder
    validationDate?: SortOrder
  }

  export type ValidationResultMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    regionCode?: SortOrder
    fieldName?: SortOrder
    localValue?: SortOrder
    externalValue?: SortOrder
    isConsistent?: SortOrder
    confidenceScore?: SortOrder
    notes?: SortOrder
    validationDate?: SortOrder
  }

  export type ValidationResultSumOrderByAggregateInput = {
    confidenceScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ExternalRawDataCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    regionCode?: SortOrder
    eventType?: SortOrder
    sourceType?: SortOrder
    rawHtml?: SortOrder
    parsedData?: SortOrder
    sourceUrl?: SortOrder
    scrapeDate?: SortOrder
  }

  export type ExternalRawDataMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    regionCode?: SortOrder
    eventType?: SortOrder
    sourceType?: SortOrder
    rawHtml?: SortOrder
    sourceUrl?: SortOrder
    scrapeDate?: SortOrder
  }

  export type ExternalRawDataMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    regionCode?: SortOrder
    eventType?: SortOrder
    sourceType?: SortOrder
    rawHtml?: SortOrder
    sourceUrl?: SortOrder
    scrapeDate?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type HanabiEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput> | HanabiEventCreateWithoutRegionRefInput[] | HanabiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanabiEventCreateOrConnectWithoutRegionRefInput | HanabiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: HanabiEventCreateManyRegionRefInputEnvelope
    connect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
  }

  export type MatsuriEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput> | MatsuriEventCreateWithoutRegionRefInput[] | MatsuriEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MatsuriEventCreateOrConnectWithoutRegionRefInput | MatsuriEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: MatsuriEventCreateManyRegionRefInputEnvelope
    connect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
  }

  export type HanamiEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput> | HanamiEventCreateWithoutRegionRefInput[] | HanamiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanamiEventCreateOrConnectWithoutRegionRefInput | HanamiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: HanamiEventCreateManyRegionRefInputEnvelope
    connect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
  }

  export type MomijiEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput> | MomijiEventCreateWithoutRegionRefInput[] | MomijiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MomijiEventCreateOrConnectWithoutRegionRefInput | MomijiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: MomijiEventCreateManyRegionRefInputEnvelope
    connect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
  }

  export type IlluminationEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput> | IlluminationEventCreateWithoutRegionRefInput[] | IlluminationEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: IlluminationEventCreateOrConnectWithoutRegionRefInput | IlluminationEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: IlluminationEventCreateManyRegionRefInputEnvelope
    connect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
  }

  export type CultureEventCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput> | CultureEventCreateWithoutRegionRefInput[] | CultureEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: CultureEventCreateOrConnectWithoutRegionRefInput | CultureEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: CultureEventCreateManyRegionRefInputEnvelope
    connect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
  }

  export type HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput> | HanabiEventCreateWithoutRegionRefInput[] | HanabiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanabiEventCreateOrConnectWithoutRegionRefInput | HanabiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: HanabiEventCreateManyRegionRefInputEnvelope
    connect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
  }

  export type MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput> | MatsuriEventCreateWithoutRegionRefInput[] | MatsuriEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MatsuriEventCreateOrConnectWithoutRegionRefInput | MatsuriEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: MatsuriEventCreateManyRegionRefInputEnvelope
    connect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
  }

  export type HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput> | HanamiEventCreateWithoutRegionRefInput[] | HanamiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanamiEventCreateOrConnectWithoutRegionRefInput | HanamiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: HanamiEventCreateManyRegionRefInputEnvelope
    connect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
  }

  export type MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput> | MomijiEventCreateWithoutRegionRefInput[] | MomijiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MomijiEventCreateOrConnectWithoutRegionRefInput | MomijiEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: MomijiEventCreateManyRegionRefInputEnvelope
    connect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
  }

  export type IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput> | IlluminationEventCreateWithoutRegionRefInput[] | IlluminationEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: IlluminationEventCreateOrConnectWithoutRegionRefInput | IlluminationEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: IlluminationEventCreateManyRegionRefInputEnvelope
    connect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
  }

  export type CultureEventUncheckedCreateNestedManyWithoutRegionRefInput = {
    create?: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput> | CultureEventCreateWithoutRegionRefInput[] | CultureEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: CultureEventCreateOrConnectWithoutRegionRefInput | CultureEventCreateOrConnectWithoutRegionRefInput[]
    createMany?: CultureEventCreateManyRegionRefInputEnvelope
    connect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HanabiEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput> | HanabiEventCreateWithoutRegionRefInput[] | HanabiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanabiEventCreateOrConnectWithoutRegionRefInput | HanabiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: HanabiEventUpsertWithWhereUniqueWithoutRegionRefInput | HanabiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: HanabiEventCreateManyRegionRefInputEnvelope
    set?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    disconnect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    delete?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    connect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    update?: HanabiEventUpdateWithWhereUniqueWithoutRegionRefInput | HanabiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: HanabiEventUpdateManyWithWhereWithoutRegionRefInput | HanabiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: HanabiEventScalarWhereInput | HanabiEventScalarWhereInput[]
  }

  export type MatsuriEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput> | MatsuriEventCreateWithoutRegionRefInput[] | MatsuriEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MatsuriEventCreateOrConnectWithoutRegionRefInput | MatsuriEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: MatsuriEventUpsertWithWhereUniqueWithoutRegionRefInput | MatsuriEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: MatsuriEventCreateManyRegionRefInputEnvelope
    set?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    disconnect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    delete?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    connect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    update?: MatsuriEventUpdateWithWhereUniqueWithoutRegionRefInput | MatsuriEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: MatsuriEventUpdateManyWithWhereWithoutRegionRefInput | MatsuriEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: MatsuriEventScalarWhereInput | MatsuriEventScalarWhereInput[]
  }

  export type HanamiEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput> | HanamiEventCreateWithoutRegionRefInput[] | HanamiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanamiEventCreateOrConnectWithoutRegionRefInput | HanamiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: HanamiEventUpsertWithWhereUniqueWithoutRegionRefInput | HanamiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: HanamiEventCreateManyRegionRefInputEnvelope
    set?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    disconnect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    delete?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    connect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    update?: HanamiEventUpdateWithWhereUniqueWithoutRegionRefInput | HanamiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: HanamiEventUpdateManyWithWhereWithoutRegionRefInput | HanamiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: HanamiEventScalarWhereInput | HanamiEventScalarWhereInput[]
  }

  export type MomijiEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput> | MomijiEventCreateWithoutRegionRefInput[] | MomijiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MomijiEventCreateOrConnectWithoutRegionRefInput | MomijiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: MomijiEventUpsertWithWhereUniqueWithoutRegionRefInput | MomijiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: MomijiEventCreateManyRegionRefInputEnvelope
    set?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    disconnect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    delete?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    connect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    update?: MomijiEventUpdateWithWhereUniqueWithoutRegionRefInput | MomijiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: MomijiEventUpdateManyWithWhereWithoutRegionRefInput | MomijiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: MomijiEventScalarWhereInput | MomijiEventScalarWhereInput[]
  }

  export type IlluminationEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput> | IlluminationEventCreateWithoutRegionRefInput[] | IlluminationEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: IlluminationEventCreateOrConnectWithoutRegionRefInput | IlluminationEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: IlluminationEventUpsertWithWhereUniqueWithoutRegionRefInput | IlluminationEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: IlluminationEventCreateManyRegionRefInputEnvelope
    set?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    disconnect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    delete?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    connect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    update?: IlluminationEventUpdateWithWhereUniqueWithoutRegionRefInput | IlluminationEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: IlluminationEventUpdateManyWithWhereWithoutRegionRefInput | IlluminationEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: IlluminationEventScalarWhereInput | IlluminationEventScalarWhereInput[]
  }

  export type CultureEventUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput> | CultureEventCreateWithoutRegionRefInput[] | CultureEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: CultureEventCreateOrConnectWithoutRegionRefInput | CultureEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: CultureEventUpsertWithWhereUniqueWithoutRegionRefInput | CultureEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: CultureEventCreateManyRegionRefInputEnvelope
    set?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    disconnect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    delete?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    connect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    update?: CultureEventUpdateWithWhereUniqueWithoutRegionRefInput | CultureEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: CultureEventUpdateManyWithWhereWithoutRegionRefInput | CultureEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: CultureEventScalarWhereInput | CultureEventScalarWhereInput[]
  }

  export type HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput> | HanabiEventCreateWithoutRegionRefInput[] | HanabiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanabiEventCreateOrConnectWithoutRegionRefInput | HanabiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: HanabiEventUpsertWithWhereUniqueWithoutRegionRefInput | HanabiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: HanabiEventCreateManyRegionRefInputEnvelope
    set?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    disconnect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    delete?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    connect?: HanabiEventWhereUniqueInput | HanabiEventWhereUniqueInput[]
    update?: HanabiEventUpdateWithWhereUniqueWithoutRegionRefInput | HanabiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: HanabiEventUpdateManyWithWhereWithoutRegionRefInput | HanabiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: HanabiEventScalarWhereInput | HanabiEventScalarWhereInput[]
  }

  export type MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput> | MatsuriEventCreateWithoutRegionRefInput[] | MatsuriEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MatsuriEventCreateOrConnectWithoutRegionRefInput | MatsuriEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: MatsuriEventUpsertWithWhereUniqueWithoutRegionRefInput | MatsuriEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: MatsuriEventCreateManyRegionRefInputEnvelope
    set?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    disconnect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    delete?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    connect?: MatsuriEventWhereUniqueInput | MatsuriEventWhereUniqueInput[]
    update?: MatsuriEventUpdateWithWhereUniqueWithoutRegionRefInput | MatsuriEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: MatsuriEventUpdateManyWithWhereWithoutRegionRefInput | MatsuriEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: MatsuriEventScalarWhereInput | MatsuriEventScalarWhereInput[]
  }

  export type HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput> | HanamiEventCreateWithoutRegionRefInput[] | HanamiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: HanamiEventCreateOrConnectWithoutRegionRefInput | HanamiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: HanamiEventUpsertWithWhereUniqueWithoutRegionRefInput | HanamiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: HanamiEventCreateManyRegionRefInputEnvelope
    set?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    disconnect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    delete?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    connect?: HanamiEventWhereUniqueInput | HanamiEventWhereUniqueInput[]
    update?: HanamiEventUpdateWithWhereUniqueWithoutRegionRefInput | HanamiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: HanamiEventUpdateManyWithWhereWithoutRegionRefInput | HanamiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: HanamiEventScalarWhereInput | HanamiEventScalarWhereInput[]
  }

  export type MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput> | MomijiEventCreateWithoutRegionRefInput[] | MomijiEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: MomijiEventCreateOrConnectWithoutRegionRefInput | MomijiEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: MomijiEventUpsertWithWhereUniqueWithoutRegionRefInput | MomijiEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: MomijiEventCreateManyRegionRefInputEnvelope
    set?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    disconnect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    delete?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    connect?: MomijiEventWhereUniqueInput | MomijiEventWhereUniqueInput[]
    update?: MomijiEventUpdateWithWhereUniqueWithoutRegionRefInput | MomijiEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: MomijiEventUpdateManyWithWhereWithoutRegionRefInput | MomijiEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: MomijiEventScalarWhereInput | MomijiEventScalarWhereInput[]
  }

  export type IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput> | IlluminationEventCreateWithoutRegionRefInput[] | IlluminationEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: IlluminationEventCreateOrConnectWithoutRegionRefInput | IlluminationEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: IlluminationEventUpsertWithWhereUniqueWithoutRegionRefInput | IlluminationEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: IlluminationEventCreateManyRegionRefInputEnvelope
    set?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    disconnect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    delete?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    connect?: IlluminationEventWhereUniqueInput | IlluminationEventWhereUniqueInput[]
    update?: IlluminationEventUpdateWithWhereUniqueWithoutRegionRefInput | IlluminationEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: IlluminationEventUpdateManyWithWhereWithoutRegionRefInput | IlluminationEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: IlluminationEventScalarWhereInput | IlluminationEventScalarWhereInput[]
  }

  export type CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput = {
    create?: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput> | CultureEventCreateWithoutRegionRefInput[] | CultureEventUncheckedCreateWithoutRegionRefInput[]
    connectOrCreate?: CultureEventCreateOrConnectWithoutRegionRefInput | CultureEventCreateOrConnectWithoutRegionRefInput[]
    upsert?: CultureEventUpsertWithWhereUniqueWithoutRegionRefInput | CultureEventUpsertWithWhereUniqueWithoutRegionRefInput[]
    createMany?: CultureEventCreateManyRegionRefInputEnvelope
    set?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    disconnect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    delete?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    connect?: CultureEventWhereUniqueInput | CultureEventWhereUniqueInput[]
    update?: CultureEventUpdateWithWhereUniqueWithoutRegionRefInput | CultureEventUpdateWithWhereUniqueWithoutRegionRefInput[]
    updateMany?: CultureEventUpdateManyWithWhereWithoutRegionRefInput | CultureEventUpdateManyWithWhereWithoutRegionRefInput[]
    deleteMany?: CultureEventScalarWhereInput | CultureEventScalarWhereInput[]
  }

  export type RegionCreateNestedOneWithoutHanabiEventsInput = {
    create?: XOR<RegionCreateWithoutHanabiEventsInput, RegionUncheckedCreateWithoutHanabiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHanabiEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RegionUpdateOneRequiredWithoutHanabiEventsNestedInput = {
    create?: XOR<RegionCreateWithoutHanabiEventsInput, RegionUncheckedCreateWithoutHanabiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHanabiEventsInput
    upsert?: RegionUpsertWithoutHanabiEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutHanabiEventsInput, RegionUpdateWithoutHanabiEventsInput>, RegionUncheckedUpdateWithoutHanabiEventsInput>
  }

  export type RegionCreateNestedOneWithoutMatsuriEventsInput = {
    create?: XOR<RegionCreateWithoutMatsuriEventsInput, RegionUncheckedCreateWithoutMatsuriEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutMatsuriEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutMatsuriEventsNestedInput = {
    create?: XOR<RegionCreateWithoutMatsuriEventsInput, RegionUncheckedCreateWithoutMatsuriEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutMatsuriEventsInput
    upsert?: RegionUpsertWithoutMatsuriEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutMatsuriEventsInput, RegionUpdateWithoutMatsuriEventsInput>, RegionUncheckedUpdateWithoutMatsuriEventsInput>
  }

  export type RegionCreateNestedOneWithoutHanamiEventsInput = {
    create?: XOR<RegionCreateWithoutHanamiEventsInput, RegionUncheckedCreateWithoutHanamiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHanamiEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutHanamiEventsNestedInput = {
    create?: XOR<RegionCreateWithoutHanamiEventsInput, RegionUncheckedCreateWithoutHanamiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHanamiEventsInput
    upsert?: RegionUpsertWithoutHanamiEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutHanamiEventsInput, RegionUpdateWithoutHanamiEventsInput>, RegionUncheckedUpdateWithoutHanamiEventsInput>
  }

  export type RegionCreateNestedOneWithoutMomijiEventsInput = {
    create?: XOR<RegionCreateWithoutMomijiEventsInput, RegionUncheckedCreateWithoutMomijiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutMomijiEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutMomijiEventsNestedInput = {
    create?: XOR<RegionCreateWithoutMomijiEventsInput, RegionUncheckedCreateWithoutMomijiEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutMomijiEventsInput
    upsert?: RegionUpsertWithoutMomijiEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutMomijiEventsInput, RegionUpdateWithoutMomijiEventsInput>, RegionUncheckedUpdateWithoutMomijiEventsInput>
  }

  export type RegionCreateNestedOneWithoutIlluminationEventsInput = {
    create?: XOR<RegionCreateWithoutIlluminationEventsInput, RegionUncheckedCreateWithoutIlluminationEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutIlluminationEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutIlluminationEventsNestedInput = {
    create?: XOR<RegionCreateWithoutIlluminationEventsInput, RegionUncheckedCreateWithoutIlluminationEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutIlluminationEventsInput
    upsert?: RegionUpsertWithoutIlluminationEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutIlluminationEventsInput, RegionUpdateWithoutIlluminationEventsInput>, RegionUncheckedUpdateWithoutIlluminationEventsInput>
  }

  export type RegionCreateNestedOneWithoutCultureEventsInput = {
    create?: XOR<RegionCreateWithoutCultureEventsInput, RegionUncheckedCreateWithoutCultureEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCultureEventsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutCultureEventsNestedInput = {
    create?: XOR<RegionCreateWithoutCultureEventsInput, RegionUncheckedCreateWithoutCultureEventsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCultureEventsInput
    upsert?: RegionUpsertWithoutCultureEventsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutCultureEventsInput, RegionUpdateWithoutCultureEventsInput>, RegionUncheckedUpdateWithoutCultureEventsInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type HanabiEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanabiEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanabiEventCreateOrConnectWithoutRegionRefInput = {
    where: HanabiEventWhereUniqueInput
    create: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type HanabiEventCreateManyRegionRefInputEnvelope = {
    data: HanabiEventCreateManyRegionRefInput | HanabiEventCreateManyRegionRefInput[]
  }

  export type MatsuriEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatsuriEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatsuriEventCreateOrConnectWithoutRegionRefInput = {
    where: MatsuriEventWhereUniqueInput
    create: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput>
  }

  export type MatsuriEventCreateManyRegionRefInputEnvelope = {
    data: MatsuriEventCreateManyRegionRefInput | MatsuriEventCreateManyRegionRefInput[]
  }

  export type HanamiEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanamiEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanamiEventCreateOrConnectWithoutRegionRefInput = {
    where: HanamiEventWhereUniqueInput
    create: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type HanamiEventCreateManyRegionRefInputEnvelope = {
    data: HanamiEventCreateManyRegionRefInput | HanamiEventCreateManyRegionRefInput[]
  }

  export type MomijiEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomijiEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomijiEventCreateOrConnectWithoutRegionRefInput = {
    where: MomijiEventWhereUniqueInput
    create: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type MomijiEventCreateManyRegionRefInputEnvelope = {
    data: MomijiEventCreateManyRegionRefInput | MomijiEventCreateManyRegionRefInput[]
  }

  export type IlluminationEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IlluminationEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IlluminationEventCreateOrConnectWithoutRegionRefInput = {
    where: IlluminationEventWhereUniqueInput
    create: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput>
  }

  export type IlluminationEventCreateManyRegionRefInputEnvelope = {
    data: IlluminationEventCreateManyRegionRefInput | IlluminationEventCreateManyRegionRefInput[]
  }

  export type CultureEventCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CultureEventUncheckedCreateWithoutRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CultureEventCreateOrConnectWithoutRegionRefInput = {
    where: CultureEventWhereUniqueInput
    create: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput>
  }

  export type CultureEventCreateManyRegionRefInputEnvelope = {
    data: CultureEventCreateManyRegionRefInput | CultureEventCreateManyRegionRefInput[]
  }

  export type HanabiEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: HanabiEventWhereUniqueInput
    update: XOR<HanabiEventUpdateWithoutRegionRefInput, HanabiEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<HanabiEventCreateWithoutRegionRefInput, HanabiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type HanabiEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: HanabiEventWhereUniqueInput
    data: XOR<HanabiEventUpdateWithoutRegionRefInput, HanabiEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type HanabiEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: HanabiEventScalarWhereInput
    data: XOR<HanabiEventUpdateManyMutationInput, HanabiEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type HanabiEventScalarWhereInput = {
    AND?: HanabiEventScalarWhereInput | HanabiEventScalarWhereInput[]
    OR?: HanabiEventScalarWhereInput[]
    NOT?: HanabiEventScalarWhereInput | HanabiEventScalarWhereInput[]
    id?: StringFilter<"HanabiEvent"> | string
    region?: StringFilter<"HanabiEvent"> | string
    detailLink?: StringNullableFilter<"HanabiEvent"> | string | null
    name?: StringFilter<"HanabiEvent"> | string
    address?: StringFilter<"HanabiEvent"> | string
    datetime?: StringFilter<"HanabiEvent"> | string
    venue?: StringFilter<"HanabiEvent"> | string
    access?: StringFilter<"HanabiEvent"> | string
    organizer?: StringFilter<"HanabiEvent"> | string
    price?: StringFilter<"HanabiEvent"> | string
    contact?: StringFilter<"HanabiEvent"> | string
    website?: StringFilter<"HanabiEvent"> | string
    googleMap?: StringFilter<"HanabiEvent"> | string
    description?: StringNullableFilter<"HanabiEvent"> | string | null
    regionId?: StringFilter<"HanabiEvent"> | string
    verified?: BoolFilter<"HanabiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanabiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanabiEvent"> | Date | string
  }

  export type MatsuriEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: MatsuriEventWhereUniqueInput
    update: XOR<MatsuriEventUpdateWithoutRegionRefInput, MatsuriEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<MatsuriEventCreateWithoutRegionRefInput, MatsuriEventUncheckedCreateWithoutRegionRefInput>
  }

  export type MatsuriEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: MatsuriEventWhereUniqueInput
    data: XOR<MatsuriEventUpdateWithoutRegionRefInput, MatsuriEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type MatsuriEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: MatsuriEventScalarWhereInput
    data: XOR<MatsuriEventUpdateManyMutationInput, MatsuriEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type MatsuriEventScalarWhereInput = {
    AND?: MatsuriEventScalarWhereInput | MatsuriEventScalarWhereInput[]
    OR?: MatsuriEventScalarWhereInput[]
    NOT?: MatsuriEventScalarWhereInput | MatsuriEventScalarWhereInput[]
    id?: StringFilter<"MatsuriEvent"> | string
    region?: StringFilter<"MatsuriEvent"> | string
    detailLink?: StringNullableFilter<"MatsuriEvent"> | string | null
    name?: StringFilter<"MatsuriEvent"> | string
    address?: StringFilter<"MatsuriEvent"> | string
    datetime?: StringFilter<"MatsuriEvent"> | string
    venue?: StringFilter<"MatsuriEvent"> | string
    access?: StringFilter<"MatsuriEvent"> | string
    organizer?: StringFilter<"MatsuriEvent"> | string
    price?: StringFilter<"MatsuriEvent"> | string
    contact?: StringFilter<"MatsuriEvent"> | string
    website?: StringFilter<"MatsuriEvent"> | string
    googleMap?: StringFilter<"MatsuriEvent"> | string
    description?: StringNullableFilter<"MatsuriEvent"> | string | null
    regionId?: StringFilter<"MatsuriEvent"> | string
    verified?: BoolFilter<"MatsuriEvent"> | boolean
    createdAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MatsuriEvent"> | Date | string
  }

  export type HanamiEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: HanamiEventWhereUniqueInput
    update: XOR<HanamiEventUpdateWithoutRegionRefInput, HanamiEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<HanamiEventCreateWithoutRegionRefInput, HanamiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type HanamiEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: HanamiEventWhereUniqueInput
    data: XOR<HanamiEventUpdateWithoutRegionRefInput, HanamiEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type HanamiEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: HanamiEventScalarWhereInput
    data: XOR<HanamiEventUpdateManyMutationInput, HanamiEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type HanamiEventScalarWhereInput = {
    AND?: HanamiEventScalarWhereInput | HanamiEventScalarWhereInput[]
    OR?: HanamiEventScalarWhereInput[]
    NOT?: HanamiEventScalarWhereInput | HanamiEventScalarWhereInput[]
    id?: StringFilter<"HanamiEvent"> | string
    region?: StringFilter<"HanamiEvent"> | string
    detailLink?: StringNullableFilter<"HanamiEvent"> | string | null
    name?: StringFilter<"HanamiEvent"> | string
    address?: StringFilter<"HanamiEvent"> | string
    datetime?: StringFilter<"HanamiEvent"> | string
    venue?: StringFilter<"HanamiEvent"> | string
    access?: StringFilter<"HanamiEvent"> | string
    organizer?: StringFilter<"HanamiEvent"> | string
    price?: StringFilter<"HanamiEvent"> | string
    contact?: StringFilter<"HanamiEvent"> | string
    website?: StringFilter<"HanamiEvent"> | string
    googleMap?: StringFilter<"HanamiEvent"> | string
    description?: StringNullableFilter<"HanamiEvent"> | string | null
    regionId?: StringFilter<"HanamiEvent"> | string
    verified?: BoolFilter<"HanamiEvent"> | boolean
    createdAt?: DateTimeFilter<"HanamiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"HanamiEvent"> | Date | string
  }

  export type MomijiEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: MomijiEventWhereUniqueInput
    update: XOR<MomijiEventUpdateWithoutRegionRefInput, MomijiEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<MomijiEventCreateWithoutRegionRefInput, MomijiEventUncheckedCreateWithoutRegionRefInput>
  }

  export type MomijiEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: MomijiEventWhereUniqueInput
    data: XOR<MomijiEventUpdateWithoutRegionRefInput, MomijiEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type MomijiEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: MomijiEventScalarWhereInput
    data: XOR<MomijiEventUpdateManyMutationInput, MomijiEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type MomijiEventScalarWhereInput = {
    AND?: MomijiEventScalarWhereInput | MomijiEventScalarWhereInput[]
    OR?: MomijiEventScalarWhereInput[]
    NOT?: MomijiEventScalarWhereInput | MomijiEventScalarWhereInput[]
    id?: StringFilter<"MomijiEvent"> | string
    region?: StringFilter<"MomijiEvent"> | string
    detailLink?: StringNullableFilter<"MomijiEvent"> | string | null
    name?: StringFilter<"MomijiEvent"> | string
    address?: StringFilter<"MomijiEvent"> | string
    datetime?: StringFilter<"MomijiEvent"> | string
    venue?: StringFilter<"MomijiEvent"> | string
    access?: StringFilter<"MomijiEvent"> | string
    organizer?: StringFilter<"MomijiEvent"> | string
    price?: StringFilter<"MomijiEvent"> | string
    contact?: StringFilter<"MomijiEvent"> | string
    website?: StringFilter<"MomijiEvent"> | string
    googleMap?: StringFilter<"MomijiEvent"> | string
    description?: StringNullableFilter<"MomijiEvent"> | string | null
    regionId?: StringFilter<"MomijiEvent"> | string
    verified?: BoolFilter<"MomijiEvent"> | boolean
    createdAt?: DateTimeFilter<"MomijiEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MomijiEvent"> | Date | string
  }

  export type IlluminationEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: IlluminationEventWhereUniqueInput
    update: XOR<IlluminationEventUpdateWithoutRegionRefInput, IlluminationEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<IlluminationEventCreateWithoutRegionRefInput, IlluminationEventUncheckedCreateWithoutRegionRefInput>
  }

  export type IlluminationEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: IlluminationEventWhereUniqueInput
    data: XOR<IlluminationEventUpdateWithoutRegionRefInput, IlluminationEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type IlluminationEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: IlluminationEventScalarWhereInput
    data: XOR<IlluminationEventUpdateManyMutationInput, IlluminationEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type IlluminationEventScalarWhereInput = {
    AND?: IlluminationEventScalarWhereInput | IlluminationEventScalarWhereInput[]
    OR?: IlluminationEventScalarWhereInput[]
    NOT?: IlluminationEventScalarWhereInput | IlluminationEventScalarWhereInput[]
    id?: StringFilter<"IlluminationEvent"> | string
    region?: StringFilter<"IlluminationEvent"> | string
    detailLink?: StringNullableFilter<"IlluminationEvent"> | string | null
    name?: StringFilter<"IlluminationEvent"> | string
    address?: StringFilter<"IlluminationEvent"> | string
    datetime?: StringFilter<"IlluminationEvent"> | string
    venue?: StringFilter<"IlluminationEvent"> | string
    access?: StringFilter<"IlluminationEvent"> | string
    organizer?: StringFilter<"IlluminationEvent"> | string
    price?: StringFilter<"IlluminationEvent"> | string
    contact?: StringFilter<"IlluminationEvent"> | string
    website?: StringFilter<"IlluminationEvent"> | string
    googleMap?: StringFilter<"IlluminationEvent"> | string
    description?: StringNullableFilter<"IlluminationEvent"> | string | null
    regionId?: StringFilter<"IlluminationEvent"> | string
    verified?: BoolFilter<"IlluminationEvent"> | boolean
    createdAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"IlluminationEvent"> | Date | string
  }

  export type CultureEventUpsertWithWhereUniqueWithoutRegionRefInput = {
    where: CultureEventWhereUniqueInput
    update: XOR<CultureEventUpdateWithoutRegionRefInput, CultureEventUncheckedUpdateWithoutRegionRefInput>
    create: XOR<CultureEventCreateWithoutRegionRefInput, CultureEventUncheckedCreateWithoutRegionRefInput>
  }

  export type CultureEventUpdateWithWhereUniqueWithoutRegionRefInput = {
    where: CultureEventWhereUniqueInput
    data: XOR<CultureEventUpdateWithoutRegionRefInput, CultureEventUncheckedUpdateWithoutRegionRefInput>
  }

  export type CultureEventUpdateManyWithWhereWithoutRegionRefInput = {
    where: CultureEventScalarWhereInput
    data: XOR<CultureEventUpdateManyMutationInput, CultureEventUncheckedUpdateManyWithoutRegionRefInput>
  }

  export type CultureEventScalarWhereInput = {
    AND?: CultureEventScalarWhereInput | CultureEventScalarWhereInput[]
    OR?: CultureEventScalarWhereInput[]
    NOT?: CultureEventScalarWhereInput | CultureEventScalarWhereInput[]
    id?: StringFilter<"CultureEvent"> | string
    region?: StringFilter<"CultureEvent"> | string
    detailLink?: StringNullableFilter<"CultureEvent"> | string | null
    name?: StringFilter<"CultureEvent"> | string
    address?: StringFilter<"CultureEvent"> | string
    datetime?: StringFilter<"CultureEvent"> | string
    venue?: StringFilter<"CultureEvent"> | string
    access?: StringFilter<"CultureEvent"> | string
    organizer?: StringFilter<"CultureEvent"> | string
    price?: StringFilter<"CultureEvent"> | string
    contact?: StringFilter<"CultureEvent"> | string
    website?: StringFilter<"CultureEvent"> | string
    googleMap?: StringFilter<"CultureEvent"> | string
    description?: StringNullableFilter<"CultureEvent"> | string | null
    regionId?: StringFilter<"CultureEvent"> | string
    verified?: BoolFilter<"CultureEvent"> | boolean
    createdAt?: DateTimeFilter<"CultureEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CultureEvent"> | Date | string
  }

  export type RegionCreateWithoutHanabiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutHanabiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutHanabiEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutHanabiEventsInput, RegionUncheckedCreateWithoutHanabiEventsInput>
  }

  export type RegionUpsertWithoutHanabiEventsInput = {
    update: XOR<RegionUpdateWithoutHanabiEventsInput, RegionUncheckedUpdateWithoutHanabiEventsInput>
    create: XOR<RegionCreateWithoutHanabiEventsInput, RegionUncheckedCreateWithoutHanabiEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutHanabiEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutHanabiEventsInput, RegionUncheckedUpdateWithoutHanabiEventsInput>
  }

  export type RegionUpdateWithoutHanabiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutHanabiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateWithoutMatsuriEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutMatsuriEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutMatsuriEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutMatsuriEventsInput, RegionUncheckedCreateWithoutMatsuriEventsInput>
  }

  export type RegionUpsertWithoutMatsuriEventsInput = {
    update: XOR<RegionUpdateWithoutMatsuriEventsInput, RegionUncheckedUpdateWithoutMatsuriEventsInput>
    create: XOR<RegionCreateWithoutMatsuriEventsInput, RegionUncheckedCreateWithoutMatsuriEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutMatsuriEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutMatsuriEventsInput, RegionUncheckedUpdateWithoutMatsuriEventsInput>
  }

  export type RegionUpdateWithoutMatsuriEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutMatsuriEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateWithoutHanamiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutHanamiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutHanamiEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutHanamiEventsInput, RegionUncheckedCreateWithoutHanamiEventsInput>
  }

  export type RegionUpsertWithoutHanamiEventsInput = {
    update: XOR<RegionUpdateWithoutHanamiEventsInput, RegionUncheckedUpdateWithoutHanamiEventsInput>
    create: XOR<RegionCreateWithoutHanamiEventsInput, RegionUncheckedCreateWithoutHanamiEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutHanamiEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutHanamiEventsInput, RegionUncheckedUpdateWithoutHanamiEventsInput>
  }

  export type RegionUpdateWithoutHanamiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutHanamiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateWithoutMomijiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutMomijiEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutMomijiEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutMomijiEventsInput, RegionUncheckedCreateWithoutMomijiEventsInput>
  }

  export type RegionUpsertWithoutMomijiEventsInput = {
    update: XOR<RegionUpdateWithoutMomijiEventsInput, RegionUncheckedUpdateWithoutMomijiEventsInput>
    create: XOR<RegionCreateWithoutMomijiEventsInput, RegionUncheckedCreateWithoutMomijiEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutMomijiEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutMomijiEventsInput, RegionUncheckedUpdateWithoutMomijiEventsInput>
  }

  export type RegionUpdateWithoutMomijiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutMomijiEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateWithoutIlluminationEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutIlluminationEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    cultureEvents?: CultureEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutIlluminationEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutIlluminationEventsInput, RegionUncheckedCreateWithoutIlluminationEventsInput>
  }

  export type RegionUpsertWithoutIlluminationEventsInput = {
    update: XOR<RegionUpdateWithoutIlluminationEventsInput, RegionUncheckedUpdateWithoutIlluminationEventsInput>
    create: XOR<RegionCreateWithoutIlluminationEventsInput, RegionUncheckedCreateWithoutIlluminationEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutIlluminationEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutIlluminationEventsInput, RegionUncheckedUpdateWithoutIlluminationEventsInput>
  }

  export type RegionUpdateWithoutIlluminationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutIlluminationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    cultureEvents?: CultureEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionCreateWithoutCultureEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventCreateNestedManyWithoutRegionRefInput
  }

  export type RegionUncheckedCreateWithoutCultureEventsInput = {
    id?: string
    code: string
    nameCn: string
    nameJp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hanabiEvents?: HanabiEventUncheckedCreateNestedManyWithoutRegionRefInput
    matsuriEvents?: MatsuriEventUncheckedCreateNestedManyWithoutRegionRefInput
    hanamiEvents?: HanamiEventUncheckedCreateNestedManyWithoutRegionRefInput
    momijiEvents?: MomijiEventUncheckedCreateNestedManyWithoutRegionRefInput
    illuminationEvents?: IlluminationEventUncheckedCreateNestedManyWithoutRegionRefInput
  }

  export type RegionCreateOrConnectWithoutCultureEventsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCultureEventsInput, RegionUncheckedCreateWithoutCultureEventsInput>
  }

  export type RegionUpsertWithoutCultureEventsInput = {
    update: XOR<RegionUpdateWithoutCultureEventsInput, RegionUncheckedUpdateWithoutCultureEventsInput>
    create: XOR<RegionCreateWithoutCultureEventsInput, RegionUncheckedCreateWithoutCultureEventsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutCultureEventsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutCultureEventsInput, RegionUncheckedUpdateWithoutCultureEventsInput>
  }

  export type RegionUpdateWithoutCultureEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUpdateManyWithoutRegionRefNestedInput
  }

  export type RegionUncheckedUpdateWithoutCultureEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameCn?: StringFieldUpdateOperationsInput | string
    nameJp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hanabiEvents?: HanabiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    matsuriEvents?: MatsuriEventUncheckedUpdateManyWithoutRegionRefNestedInput
    hanamiEvents?: HanamiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    momijiEvents?: MomijiEventUncheckedUpdateManyWithoutRegionRefNestedInput
    illuminationEvents?: IlluminationEventUncheckedUpdateManyWithoutRegionRefNestedInput
  }

  export type HanabiEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatsuriEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanamiEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomijiEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IlluminationEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CultureEventCreateManyRegionRefInput = {
    id?: string
    region: string
    detailLink?: string | null
    name: string
    address: string
    datetime: string
    venue: string
    access: string
    organizer: string
    price: string
    contact: string
    website: string
    googleMap: string
    description?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HanabiEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanabiEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanabiEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatsuriEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HanamiEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomijiEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IlluminationEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventUncheckedUpdateWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CultureEventUncheckedUpdateManyWithoutRegionRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    detailLink?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    datetime?: StringFieldUpdateOperationsInput | string
    venue?: StringFieldUpdateOperationsInput | string
    access?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    googleMap?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}