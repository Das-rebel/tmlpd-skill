/**
 * TMLPD - Query-Type Presets (P1)
 *
 * Configurable provider + temperature profiles per query type.
 * Replaces flat regex patterns with named, adjustable presets.
 * This productizes what Reddit users do manually: route different
 * task types to different providers with different settings.
 */
export interface QueryPreset {
    name: string;
    description: string;
    provider: string;
    fallbackProvider?: string;
    temperature: number;
    maxTokens: number;
    ensemble: boolean;
    ensembleProviders?: string[];
    timeoutMs: number;
    systemPrompt?: string;
}
export interface PresetRouter {
    presets: Record<string, QueryPreset>;
    defaultPreset: string;
    classify: (query: string) => string;
}
export declare const DEFAULT_PRESETS: Record<string, QueryPreset>;
export declare function createPresetRouter(customPresets?: Record<string, QueryPreset>): PresetRouter;
/**
 * Get preset config for a query, with fallback to default.
 */
export declare function getPresetForQuery(query: string, router: PresetRouter): QueryPreset;
//# sourceMappingURL=queryTypePresets.d.ts.map