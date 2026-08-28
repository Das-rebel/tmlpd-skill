/**
 * Context Stratifier - Token Optimization Pattern #2
 *
 * Different context levels for different query types.
 * Reduces tokens by matching context depth to query complexity.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export type ContextLevel = "LOW" | "MEDIUM" | "HIGH";
export interface ContextStratifierConfig {
    levels: {
        LOW: ContextLevelConfig;
        MEDIUM: ContextLevelConfig;
        HIGH: ContextLevelConfig;
    };
    autoClassify: boolean;
}
export interface ContextLevelConfig {
    maxTokens: number;
    includeHistory: boolean;
    maxHistoryMessages: number;
}
export interface StratificationResult {
    level: ContextLevel;
    maxTokens: number;
    includeHistory: boolean;
    maxHistoryMessages: number;
    reasoning: string;
}
export declare class ContextStratifier {
    private config;
    constructor(config?: Partial<ContextStratifierConfig>);
    /**
     * Classify query complexity and return appropriate context level
     */
    classify(query: string, history?: Array<{
        role: string;
        content: string;
    }>): StratificationResult;
    /**
     * Stratify history based on context level
     */
    stratifyHistory(history: Array<{
        role: string;
        content: string;
    }>, level: ContextLevel): Array<{
        role: string;
        content: string;
    }>;
    /**
     * Truncate content to fit within level's token budget
     */
    truncateToLevel(content: string, level: ContextLevel): string;
    /**
     * Get configuration for a level
     */
    getLevelConfig(level: ContextLevel): ContextLevelConfig;
    /**
     * Update level configuration
     */
    setLevelConfig(level: ContextLevel, config: Partial<ContextLevelConfig>): void;
}
export default ContextStratifier;
//# sourceMappingURL=contextStratifier.d.ts.map