/**
 * Token-Aware Fallback Chain - Token Optimization Pattern #3
 *
 * Route to smaller models when high-token content is detected.
 * Reduces cost by using cheap models for simple/high-volume queries.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export interface TokenThreshold {
    maxTokens: number;
    models: string[];
}
export interface TokenAwareFallbackConfig {
    thresholds: TokenThreshold[];
    defaultModel?: string;
    enableDynamicThreshold?: boolean;
}
export interface FallbackDecision {
    targetModel: string;
    tier: "cheap" | "medium" | "expensive";
    estimatedTokens: number;
    reasoning: string;
}
export declare class TokenAwareFallback {
    private config;
    constructor(config?: Partial<TokenAwareFallbackConfig>);
    /**
     * Estimate token count from text (rough approximation)
     */
    estimateTokens(text: string): number;
    /**
     * Estimate tokens including history
     */
    estimateTotalTokens(query: string, history?: Array<{
        content: string;
    }>): number;
    /**
     * Select appropriate model based on token count
     */
    selectModel(estimatedTokens: number): FallbackDecision;
    /**
     * Get cost tier for a model
     */
    private getModelTier;
    /**
     * Create fallback chain for a query
     */
    createFallbackChain(query: string, history?: Array<{
        content: string;
    }>): string[];
    /**
     * Estimate cost savings vs always using expensive model
     */
    estimateSavings(query: string, history?: Array<{
        content: string;
    }>): {
        savingsPercent: number;
        cheapModel: string;
        expensiveModel: string;
    };
    /**
     * Get model cost per 1M tokens
     */
    getModelCost(model: string): number;
    /**
     * Get all configured thresholds
     */
    getThresholds(): TokenThreshold[];
}
export default TokenAwareFallback;
//# sourceMappingURL=tokenAwareFallback.d.ts.map