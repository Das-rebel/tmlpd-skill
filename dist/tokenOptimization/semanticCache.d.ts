/**
 * Semantic Cache - Token Optimization Pattern #1
 *
 * Cache semantically similar queries instead of exact-match caching.
 * Uses embedding similarity (cosine) to find cached responses.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export interface SemanticCacheConfig {
    enabled: boolean;
    similarityThreshold: number;
    maxEntries: number;
    embeddingModel: string;
    ttlSeconds: number;
    cacheDir?: string;
}
export interface SemanticCacheEntry {
    query: string;
    embedding: number[];
    response: string;
    model: string;
    tokensSaved: number;
    costSaved: number;
    cachedAt: number;
    expiresAt: number;
}
export declare class SemanticCache {
    private cache;
    private config;
    private hits;
    private misses;
    private embeddingCache;
    constructor(config?: Partial<SemanticCacheConfig>);
    /**
     * Get embedding for text (with caching)
     */
    private getEmbedding;
    /**
     * Generate cache key from query
     */
    private generateKey;
    /**
     * Find best matching cached entry using cosine similarity
     */
    get(query: string): Promise<{
        response: string;
        similarity: number;
        tokensSaved: number;
        costSaved: number;
    } | null>;
    /**
     * Store query-response pair in semantic cache
     */
    set(query: string, response: string, options?: {
        model?: string;
        tokensSaved?: number;
        costSaved?: number;
    }): Promise<void>;
    /**
     * Evict oldest entry
     */
    private evictOldest;
    /**
     * Get cache statistics
     */
    getStats(): {
        hits: number;
        misses: number;
        size: number;
        hitRate: number;
    };
    /**
     * Clear cache
     */
    clear(): void;
}
export default SemanticCache;
//# sourceMappingURL=semanticCache.d.ts.map