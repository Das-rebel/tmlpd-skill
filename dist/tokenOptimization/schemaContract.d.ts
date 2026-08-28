/**
 * Schema-Contracted Prompts - Token Optimization Pattern #4
 *
 * Use structured schemas to reduce prompt size.
 * Instead of verbose descriptions, reference schema directly.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export interface SchemaContractConfig {
    includeExamples: boolean;
    maxSchemaSize: number;
}
export interface SchemaInfo {
    name: string;
    description?: string;
    schema: Record<string, unknown>;
    examples?: Array<Record<string, unknown>>;
}
export declare class SchemaContractor {
    private config;
    constructor(config?: Partial<SchemaContractConfig>);
    /**
     * Contract a prompt by injecting schema reference
     */
    contract(prompt: string, schema: SchemaInfo): string;
    /**
     * Contract with inline schema (smaller)
     */
    contractInline(prompt: string, schema: SchemaInfo): string;
    /**
     * Extract schema from Pydantic-style model definition
     */
    static extractSchemaFromModel(modelDef: string): SchemaInfo;
}
export default SchemaContractor;
//# sourceMappingURL=schemaContract.d.ts.map