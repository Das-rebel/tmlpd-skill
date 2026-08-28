"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenOptimizer = exports.InterAgentCompressor = exports.FetchOnceProcessor = exports.SchemaContractor = exports.TokenAwareFallback = exports.ContextStratifier = exports.SemanticCache = void 0;
exports.estimateTotalSavings = estimateTotalSavings;
var semanticCache_1 = require("./semanticCache");
Object.defineProperty(exports, "SemanticCache", { enumerable: true, get: function () { return semanticCache_1.SemanticCache; } });
var contextStratifier_1 = require("./contextStratifier");
Object.defineProperty(exports, "ContextStratifier", { enumerable: true, get: function () { return contextStratifier_1.ContextStratifier; } });
var tokenAwareFallback_1 = require("./tokenAwareFallback");
Object.defineProperty(exports, "TokenAwareFallback", { enumerable: true, get: function () { return tokenAwareFallback_1.TokenAwareFallback; } });
var schemaContract_1 = require("./schemaContract");
Object.defineProperty(exports, "SchemaContractor", { enumerable: true, get: function () { return schemaContract_1.SchemaContractor; } });
var fetchOnceLocal_1 = require("./fetchOnceLocal");
Object.defineProperty(exports, "FetchOnceProcessor", { enumerable: true, get: function () { return fetchOnceLocal_1.FetchOnceProcessor; } });
var interAgentCompression_1 = require("./interAgentCompression");
Object.defineProperty(exports, "InterAgentCompressor", { enumerable: true, get: function () { return interAgentCompression_1.InterAgentCompressor; } });
/**
 * Create a fully configured TokenOptimizer with all patterns
 */
const semanticCache_2 = require("./semanticCache");
const contextStratifier_2 = require("./contextStratifier");
const tokenAwareFallback_2 = require("./tokenAwareFallback");
const schemaContract_2 = require("./schemaContract");
const fetchOnceLocal_2 = require("./fetchOnceLocal");
const interAgentCompression_2 = require("./interAgentCompression");
class TokenOptimizer {
    semanticCache;
    contextStratifier;
    tokenAwareFallback;
    schemaContractor;
    fetchOnceProcessor;
    agentCompressor;
    config;
    constructor(config = {}) {
        this.config = config;
        this.semanticCache = new semanticCache_2.SemanticCache({
            enabled: config.semanticCache ?? true,
        });
        this.contextStratifier = new contextStratifier_2.ContextStratifier();
        this.tokenAwareFallback = new tokenAwareFallback_2.TokenAwareFallback();
        this.schemaContractor = new schemaContract_2.SchemaContractor();
        this.fetchOnceProcessor = new fetchOnceLocal_2.FetchOnceProcessor();
        this.agentCompressor = new interAgentCompression_2.InterAgentCompressor();
    }
    /**
     * Optimize a query before sending to LLM
     */
    async optimizeQuery(query, history) {
        // 1. Check semantic cache
        const cacheResult = await this.semanticCache.get(query);
        if (cacheResult) {
            return {
                query,
                history: [],
                contextLevel: "CACHED",
                recommendedModel: "cached",
                cacheHit: true,
                cachedResponse: cacheResult.response,
            };
        }
        // 2. Classify context level
        const stratification = this.contextStratifier.classify(query, history);
        // 3. Get token-aware model recommendation
        const totalTokens = this.tokenAwareFallback.estimateTotalTokens(query, history);
        const modelDecision = this.tokenAwareFallback.selectModel(totalTokens);
        // 4. Stratify history
        const stratifiedHistory = this.contextStratifier.stratifyHistory(history, stratification.level);
        return {
            query,
            history: stratifiedHistory,
            contextLevel: stratification.level,
            recommendedModel: modelDecision.targetModel,
            cacheHit: false,
        };
    }
    /**
     * Record a query-response pair in cache
     */
    async recordResponse(query, response, options = {}) {
        await this.semanticCache.set(query, response, {
            model: options.model,
            tokensSaved: options.tokens,
            costSaved: options.cost,
        });
    }
    /**
     * Get optimization statistics
     */
    getStats() {
        return {
            semanticCache: this.semanticCache.getStats(),
            tokenAwareFallback: {
                thresholds: this.tokenAwareFallback.getThresholds(),
            },
        };
    }
}
exports.TokenOptimizer = TokenOptimizer;
/**
 * Helper to estimate token savings across all patterns
 */
function estimateTotalSavings(patterns, queryTokens, responseTokens) {
    let totalTokens = queryTokens + responseTokens;
    let saved = 0;
    const appliedPatterns = [];
    if (patterns.includes("semantic")) {
        // ~20% cache hit rate after warmup
        saved += totalTokens * 0.2;
        appliedPatterns.push("Semantic Caching (-20%)");
    }
    if (patterns.includes("context")) {
        // ~30% reduction from context stratification
        saved += totalTokens * 0.3;
        appliedPatterns.push("Context Stratification (-30%)");
    }
    if (patterns.includes("fallback")) {
        // ~40% savings from cheap model routing
        saved += totalTokens * 0.4;
        appliedPatterns.push("Token-Aware Fallback (-40%)");
    }
    if (patterns.includes("compression")) {
        // ~15% from message compression
        saved += totalTokens * 0.15;
        appliedPatterns.push("Inter-Agent Compression (-15%)");
    }
    const percentReduction = totalTokens > 0 ? ((saved / totalTokens) * 100).toFixed(1) : "0%";
    return {
        tokensSaved: Math.round(saved),
        percentReduction: percentReduction + "%",
        patterns: appliedPatterns,
    };
}
//# sourceMappingURL=index.js.map