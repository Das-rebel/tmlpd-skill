/**
 * Fetch-Once/Process-Locally - Token Optimization Pattern #5
 *
 * Fetch data once with expensive model, then process locally with cheap model.
 * Reduces API calls by extracting only needed info from fetched content.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export interface FetchOnceConfig {
    expensiveModel?: string;
    cheapModel?: string;
    extractionPrompt?: string;
}
export interface FetchOnceResult {
    extractedData: string;
    fullFetched: boolean;
    tokensSaved: number;
    costSaved: number;
}
export declare class FetchOnceProcessor {
    private config;
    constructor(config?: Partial<FetchOnceConfig>);
    /**
     * Fetch URL content once, then extract needed data locally
     */
    process(url: string, task: string, options?: {
        fullContent?: boolean;
        expensiveModel?: string;
        cheapModel?: string;
    }): Promise<FetchOnceResult>;
    /**
     * Batch process multiple URLs for same extraction task
     */
    processBatch(urls: string[], task: string, options?: {
        expensiveModel?: string;
        cheapModel?: string;
    }): Promise<FetchOnceResult[]>;
    /**
     * Estimate cost (simplified)
     */
    private estimateCost;
}
export default FetchOnceProcessor;
//# sourceMappingURL=fetchOnceLocal.d.ts.map