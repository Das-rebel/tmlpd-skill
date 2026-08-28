/**
 * Token Optimization Module - Phase 1 Implementation
 *
 * 6 patterns from arXiv:2608.17188 - Token Optimization and Context Window Management
 *
 * Patterns:
 * 1. SemanticCache - Embedding-based similarity caching
 * 2. ContextStratifier -分层 context levels
 * 3. TokenAwareFallback - Token-count based model routing
 * 4. SchemaContractor - Schema-referenced prompts
 * 5. FetchOnceProcessor - Fetch once, process locally
 * 6. InterAgentCompressor - Message compression
 */
export { SemanticCache, SemanticCacheConfig, SemanticCacheEntry } from "./semanticCache";
export { ContextStratifier, ContextLevel, ContextStratifierConfig, StratificationResult } from "./contextStratifier";
export { TokenAwareFallback, TokenAwareFallbackConfig, FallbackDecision, TokenThreshold } from "./tokenAwareFallback";
export { SchemaContractor, SchemaContractConfig, SchemaInfo } from "./schemaContract";
export { FetchOnceProcessor, FetchOnceConfig, FetchOnceResult } from "./fetchOnceLocal";
export { InterAgentCompressor, Message, CompressionConfig, CompressionResult } from "./interAgentCompression";
/**
 * Create a fully configured TokenOptimizer with all patterns
 */
import { SemanticCache } from "./semanticCache";
import { ContextStratifier } from "./contextStratifier";
import { TokenAwareFallback } from "./tokenAwareFallback";
import { SchemaContractor } from "./schemaContract";
import { FetchOnceProcessor } from "./fetchOnceLocal";
import { InterAgentCompressor } from "./interAgentCompression";
export interface TokenOptimizerConfig {
    semanticCache?: boolean;
    contextStratification?: boolean;
    tokenAwareFallback?: boolean;
    schemaContraction?: boolean;
    fetchOnce?: boolean;
    agentCompression?: boolean;
}
export declare class TokenOptimizer {
    semanticCache: SemanticCache;
    contextStratifier: ContextStratifier;
    tokenAwareFallback: TokenAwareFallback;
    schemaContractor: SchemaContractor;
    fetchOnceProcessor: FetchOnceProcessor;
    agentCompressor: InterAgentCompressor;
    private config;
    constructor(config?: TokenOptimizerConfig);
    /**
     * Optimize a query before sending to LLM
     */
    optimizeQuery(query: string, history?: Array<{
        role: string;
        content: string;
    }>): Promise<{
        query: string;
        history: Array<{
            role: string;
            content: string;
        }>;
        contextLevel: string;
        recommendedModel: string;
        cacheHit: boolean;
        cachedResponse?: string;
    }>;
    /**
     * Record a query-response pair in cache
     */
    recordResponse(query: string, response: string, options?: {
        model?: string;
        tokens?: number;
        cost?: number;
    }): Promise<void>;
    /**
     * Get optimization statistics
     */
    getStats(): {
        semanticCache: {
            hits: number;
            misses: number;
            size: number;
            hitRate: number;
        };
        tokenAwareFallback: {
            thresholds: import("./tokenAwareFallback").TokenThreshold[];
        };
    };
}
/**
 * Helper to estimate token savings across all patterns
 */
export declare function estimateTotalSavings(patterns: ("semantic" | "context" | "fallback" | "schema" | "fetchOnce" | "compression")[], queryTokens: number, responseTokens: number): {
    tokensSaved: number;
    percentReduction: string;
    patterns: string[];
};
//# sourceMappingURL=index.d.ts.map