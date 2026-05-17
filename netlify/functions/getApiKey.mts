import type { Context } from "@netlify/functions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.handler = async (_req: Request, _context: Context) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

    // Return the API key in the response
    return {
        statusCode: 200,
        body: JSON.stringify({ geminiApiKey: GEMINI_API_KEY, replicateApiKey: REPLICATE_API_KEY }),
    };
};
