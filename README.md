# TMLPD — Parallel Multi-LLM Execution Module

> **Part of the [A3M Router](https://github.com/Das-rebel/a3m-router) ecosystem.**

Parallel multi-LLM execution with confidence-weighted ensemble merging. Runs providers simultaneously, scores each result, and returns the best answer with transparent reasoning.

## What's New in v1.3.0

**Token Optimization** — 6 patterns from [arXiv:2608.17188](https://arxiv.org/abs/2608.17188) for 40-60% token reduction:

| Pattern | Description |
|:--------|:------------|
| **Semantic Cache** | Embedding-based similarity caching (cosine > 0.85 threshold) |
| **Context Stratification** |分层 context levels (LOW: 512 tokens, MEDIUM: 2048, HIGH: 8192) |
| **Token-Aware Fallback** | Route to cheap/medium/expensive models by token count |
| **Schema Contraction** | Inject schema reference vs full description |
| **Fetch-Once/Process-Local** | One expensive fetch, extract with cheap model |
| **Inter-Agent Compression** | Compress messages between agents |

## Core Features

| Feature | Description |
|:--------|:------------|
| **Parallel execution** | Run N providers simultaneously, not sequentially |
| **Ensemble scoring** | Score results on specificity, structure, and relevance |
| **Token Optimization** | 6 patterns for 40-60% token reduction |
| **Query-type presets** | Auto-configure provider + temp per task type |
| **Cost tracking** | Per-query cost display with provider breakdown |
| **Persistent memory** | Cross-session `.memory.json` with keyword indexing |
| **Prefix caching** | RadixAttention-style caching for repeated prefixes |
| **Speculative decoding** | Medusa/EAGLE-style multi-token prediction |
| **Token compression** | ISON encoding for ~40% token reduction |

## Usage

```typescript
import { executeEnsemble, createPresetRouter, TokenOptimizer } from "tmlpd-pi";

// Parallel ensemble: run all providers simultaneously, pick best
const result = await executeEnsemble(
  "Explain vector databases",
  systemPrompt,
  context,
  { nvidia: callNvidia, groq: callGroq }
);
console.log(`Winner: ${result.winner} (score: ${result.scores[result.winner]})`);

// Token Optimization - 40-60% token reduction
const optimizer = new TokenOptimizer();
const optimized = await optimizer.optimizeQuery(
  "Explain quantum computing",
  history
);
console.log(`Context level: ${optimized.contextLevel}`);
console.log(`Recommended model: ${optimized.recommendedModel}`);
console.log(`Cache hit: ${optimized.cacheHit}`);

// Query-type presets: auto-configure per task
const router = createPresetRouter();
const preset = router.classify("Write a Python sort function"); // → 'code'
```

## Token Optimization Patterns

```typescript
import { SemanticCache, ContextStratifier, TokenAwareFallback } from "tmlpd-pi";

// Semantic caching - cache by embedding similarity
const cache = new SemanticCache({ similarityThreshold: 0.85 });
const cached = await cache.get("Explain quantum entanglement");
if (cached) console.log(`Cache hit! Similarity: ${cached.similarity}`);

// Context stratification - match context depth to query complexity
const stratifier = new ContextStratifier();
const result = stratifier.classify("What is 2+2?", history);
// → LOW context (512 tokens, no history)

// Token-aware fallback - route by token count
const fallback = new TokenAwareFallback();
const decision = fallback.selectModel(estimatedTokens);
// → cheap model for <500 tokens
```

## Exports

- `createTMLPD`, `TMLPDTools` — Core parallel execution
- `executeEnsemble`, `mergeComplementary`, `recordFeedback` — P0 Ensemble voting
- `createPresetRouter`, `getPresetForQuery`, `DEFAULT_PRESETS` — P1 Query presets
- `TokenOptimizer`, `SemanticCache`, `ContextStratifier`, `TokenAwareFallback` — **NEW Token Optimization**
- `EpisodicMemoryStore` — P3 Persistent memory with auto-save
- `CostTracker`, `BudgetEnforcer` — P2 Cost tracking
- `ResponseCache`, `PrefixCache` — Caching layers
- `HALOOrchestrator`, `MCTSWorkflowOptimizer` — Advanced orchestration

## Research Backing

- **Token Optimization** (arXiv:2608.17188) — NEW 6 patterns for 40-60% token reduction
- **RouteLLM** (arXiv:2404.06035) — Learned cost-quality routing
- **RadixAttention** (arXiv:2312.07104) — 5-10x speedup via prefix caching
- **Medusa** (arXiv:2401.10774) — 2-3x faster generation
- **A-Mem** (arXiv:2502.12110) — Episodic memory patterns

---

*Part of the A3M Router ecosystem. "Nobody does parallel multi-LLM execution with result merging. Everyone does sequential fallback."*
