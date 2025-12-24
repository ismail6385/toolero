import Fuse from 'fuse.js';

export interface SuggestionTool {
    id: string;
    name: string;
    slug: string;
    category?: string;
    intent_keywords?: string[]; // Array of strings e.g. ["merge pdf", "combine pdf"]
}

export interface LinkMatch {
    tool: SuggestionTool;
    matchText: string;
    range: [number, number]; // Start, End indices in text
    score: number;
}

// Configuration
const INLINE_LINK_SUGGESTIONS = true;
const MIN_MATCH_CHARS = 4;
const FUZZY_THRESHOLD = 0.3; // Lower = stricter

export class LinkSuggester {
    private fuse: Fuse<SuggestionTool>;
    private tools: SuggestionTool[];

    constructor(tools: SuggestionTool[]) {
        this.tools = tools;
        // Flatten keywords for searching or search distinct keys
        this.fuse = new Fuse(tools, {
            keys: ['name', 'intent_keywords'],
            threshold: FUZZY_THRESHOLD,
            includeMatches: true,
            minMatchCharLength: MIN_MATCH_CHARS,
            ignoreLocation: true,
        });
    }

    findMatches(text: string, cursorPosition: number): LinkMatch | null {
        if (!INLINE_LINK_SUGGESTIONS) return null;

        // Optimization: Only look at the words around the cursor (e.g. last 5-6 words)
        // For simplicity and accuracy in this demo, we can scan the whole text or a window.
        // Let's grab the current "phrase" or window around cursor.

        const windowStart = Math.max(0, cursorPosition - 30);
        const windowEnd = Math.min(text.length, cursorPosition + 10);
        const contextText = text.substring(windowStart, windowEnd);

        if (contextText.length < MIN_MATCH_CHARS) return null;

        const results = this.fuse.search(contextText);

        if (results.length > 0) {
            const best = results[0];
            // We verify if the match actually overlaps with our cursor or is very close
            // This part is tricky with Fuse as it returns general matches.
            // Simplified approach: Regex match the Name or Keywords of top result in the text context.

            const keywordToMatch = this.getBestMatchingKeyword(best.item, contextText);

            if (keywordToMatch) {
                // Verify context text actually contains this keyword (redundant check for safety)
                const indexInContext = contextText.toLowerCase().indexOf(keywordToMatch.toLowerCase());
                if (indexInContext !== -1) {
                    const absoluteStart = windowStart + indexInContext;
                    const absoluteEnd = absoluteStart + keywordToMatch.length;

                    // Check if cursor is inside or right at the end of this range
                    if (cursorPosition >= absoluteStart && cursorPosition <= absoluteEnd + 1) {
                        return {
                            tool: best.item,
                            matchText: text.substring(absoluteStart, absoluteEnd), // Get original case
                            range: [absoluteStart, absoluteEnd],
                            score: best.score || 0
                        };
                    }
                }
            }
        }
        return null;
    }

    private getBestMatchingKeyword(tool: SuggestionTool, text: string): string | null {
        // Check Name
        if (text.toLowerCase().includes(tool.name.toLowerCase())) return tool.name;

        // Check Keywords
        if (tool.intent_keywords) {
            for (const kw of tool.intent_keywords) {
                if (text.toLowerCase().includes(kw.toLowerCase())) return kw;
            }
        }
        return null;
    }
}
