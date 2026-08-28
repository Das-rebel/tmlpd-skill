/**
 * Inter-Agent Communication Compression - Token Optimization Pattern #6
 *
 * Compress messages between agents to reduce token usage.
 * Uses summarization for long messages, preserves key info for short ones.
 *
 * Based on: arXiv:2608.17188 - Token Optimization and Context Window Management
 */
export interface Message {
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    metadata?: Record<string, unknown>;
}
export interface CompressionConfig {
    maxMessageLength: number;
    summarizeThreshold: number;
    preserveKeywords: string[];
    summaryModel?: string;
}
export interface CompressionResult {
    messages: Message[];
    originalTokens: number;
    compressedTokens: number;
    compressionRatio: number;
}
export declare class InterAgentCompressor {
    private config;
    constructor(config?: Partial<CompressionConfig>);
    /**
     * Estimate tokens in text (rough)
     */
    private estimateTokens;
    /**
     * Check if text contains preserved keywords
     */
    private containsPreservedKeyword;
    /**
     * Compress a single message
     */
    compressMessage(message: Message): Message;
    /**
     * Compress array of messages
     */
    compress(messages: Message[]): CompressionResult;
    /**
     * Compress messages in-place (mutates array)
     */
    compressInPlace(messages: Message[]): void;
    /**
     * Get compression statistics
     */
    getStats(result: CompressionResult): {
        tokensReduced: number;
        percentReduction: string;
    };
}
export default InterAgentCompressor;
//# sourceMappingURL=interAgentCompression.d.ts.map