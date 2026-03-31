/**
 * Simple validator for AI-generated reflex code.
 * Focuses on basic syntax and blatant security violations.
 */

export function validateReflexCode(code) {
    if (typeof code !== 'string' || !code.trim()) {
        return { valid: false, reason: 'Empty code' };
    }

    const forbidden = [
        /\bprocess\b/,
        /\brequire\s*\(/,
        /\bchild_process\b/,
        /\bfs\b/,
        /\beval\s*\(/,
        /\bFunction\s*\(/,
        /\bhttps?:\/\//,
        /\b__proto__\b/
    ];

    for (const pattern of forbidden) {
        if (pattern.test(code)) {
            return { valid: false, reason: `Forbidden pattern detected: ${pattern}` };
        }
    }

    // Basic syntax check using Function constructor (safe since we don't execute it here)
    try {
        new Function('bot', 'attacker', 'amount', 'skills', 'world', 'Vec3', code);
    } catch (err) {
        return { valid: false, reason: `Syntax Error: ${err.message}` };
    }

    return { valid: true };
}
