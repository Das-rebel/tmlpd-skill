/**
 * TMLPD - Ensemble Voting (P0)
 *
 * Parallel multi-LLM execution with confidence-weighted result merging.
 * This is TMLPD's core differentiator: nobody else does parallel ensemble.
 *
 * Runs N providers simultaneously on the same query, scores each result,
 * and returns the best one with explanation of why it was chosen.
 */
export interface EnsembleResult {
    best: string;
    winner: string;
    runnerUp: string | null;
    scores: Record<string, number>;
    allResults: Record<string, string | null>;
    reasoning: string;
    timing: {
        totalMs: number;
        perProvider: Record<string, number>;
    };
}
export interface EnsembleConfig {
    providers: string[];
    timeoutMs: number;
    minProviders: number;
    scoringWeights: {
        lengthPenalty: number;
        recencyBoost: number;
        historicalAccuracy: number;
    };
}
/**
 * Execute a query across multiple providers IN PARALLEL and score results.
 * Returns the best answer with full provenance.
 */
export declare function executeEnsemble(query: string, systemPrompt: string, context: string, providerExecutors: Record<string, (q: string, sys: string, ctx: string) => Promise<string | null>>, config?: Partial<EnsembleConfig>): Promise<EnsembleResult>;
/**
 * Merge multiple text results into a combined response.
 * Used when providers give complementary answers.
 */
export declare function mergeComplementary(results: string[], maxLength?: number): string;
/**
 * Update historical accuracy for a provider based on user feedback.
 */
export declare function recordFeedback(winner: string, wasHelpful: boolean, history: Record<string, {
    good: number;
    bad: number;
}>): Record<string, {
    good: number;
    bad: number;
}>;
//# sourceMappingURL=ensembleVoting.d.ts.map