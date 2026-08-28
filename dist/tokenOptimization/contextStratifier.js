"use strict";
/**
 * Context Stratifier - Token Optimization Pattern #2
 *
 * Different context levels for different query types.
 * Reduces tokens by matching context depth to query complexity.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextStratifier = void 0;
/**
 * Keywords that indicate HIGH complexity queries
 */
const HIGH_COMPLEXITY_KEYWORDS = [
    "analyze", "compare", "evaluate", "design", "architect",
    "explain in detail", "comprehensive", "thorough",
    "debug", "troubleshoot", "optimize", "improve",
    "research", "investigate", "synthesize", "comprehensive"
];
/**
 * Keywords that indicate LOW complexity queries
 */
const LOW_COMPLEXITY_KEYWORDS = [
    "what is", "who is", "define", "simple", "quick",
    "brief", "summary", "list", "count", "yes or no",
    "translate", "convert", "calculate", "single word"
];
class ContextStratifier {
    config;
    constructor(config = {}) {
        this.config = {
            levels: {
                LOW: {
                    maxTokens: config?.levels?.LOW?.maxTokens ?? 512,
                    includeHistory: config?.levels?.LOW?.includeHistory ?? false,
                    maxHistoryMessages: config?.levels?.LOW?.maxHistoryMessages ?? 0,
                },
                MEDIUM: {
                    maxTokens: config?.levels?.MEDIUM?.maxTokens ?? 2048,
                    includeHistory: config?.levels?.MEDIUM?.includeHistory ?? true,
                    maxHistoryMessages: config?.levels?.MEDIUM?.maxHistoryMessages ?? 3,
                },
                HIGH: {
                    maxTokens: config?.levels?.HIGH?.maxTokens ?? 8192,
                    includeHistory: config?.levels?.HIGH?.includeHistory ?? true,
                    maxHistoryMessages: config?.levels?.HIGH?.maxHistoryMessages ?? 10,
                },
            },
            autoClassify: config.autoClassify ?? true,
        };
    }
    /**
     * Classify query complexity and return appropriate context level
     */
    classify(query, history) {
        const queryLower = query.toLowerCase();
        const queryLength = query.split(/\s+/).length;
        // Check keyword indicators
        const highScore = HIGH_COMPLEXITY_KEYWORDS.filter(kw => queryLower.includes(kw)).length;
        const lowScore = LOW_COMPLEXITY_KEYWORDS.filter(kw => queryLower.includes(kw)).length;
        let level;
        // Decision logic
        if (queryLength < 10 || lowScore > highScore) {
            level = "LOW";
        }
        else if (queryLength > 50 || highScore > lowScore) {
            level = "HIGH";
        }
        else {
            level = "MEDIUM";
        }
        const levelConfig = this.config.levels[level];
        return {
            level,
            maxTokens: levelConfig.maxTokens,
            includeHistory: levelConfig.includeHistory,
            maxHistoryMessages: levelConfig.maxHistoryMessages,
            reasoning: `Query classified as ${level} (length: ${queryLength}, high_kw: ${highScore}, low_kw: ${lowScore})`,
        };
    }
    /**
     * Stratify history based on context level
     */
    stratifyHistory(history, level) {
        const levelConfig = this.config.levels[level];
        if (!levelConfig.includeHistory) {
            return [];
        }
        // Take most recent messages
        return history.slice(-levelConfig.maxHistoryMessages);
    }
    /**
     * Truncate content to fit within level's token budget
     */
    truncateToLevel(content, level) {
        const maxTokens = this.config.levels[level].maxTokens;
        // Rough estimate: ~4 chars per token
        const maxChars = maxTokens * 4;
        if (content.length <= maxChars) {
            return content;
        }
        return content.substring(0, maxChars - 3) + "...";
    }
    /**
     * Get configuration for a level
     */
    getLevelConfig(level) {
        return this.config.levels[level];
    }
    /**
     * Update level configuration
     */
    setLevelConfig(level, config) {
        this.config.levels[level] = {
            ...this.config.levels[level],
            ...config,
        };
    }
}
exports.ContextStratifier = ContextStratifier;
exports.default = ContextStratifier;
//# sourceMappingURL=contextStratifier.js.map