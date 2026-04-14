<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GIT — NON-NEGOTIABLE

NEVER run `git commit` or `git push` under any circumstances unless the user explicitly says "commit", "push", or runs `/commit` in that exact message.

- "execute", "do it", "implement", "wire it", "fix it" = code changes ONLY. Stop there.
- Completing a task does NOT authorize a commit or push.
- Approval in a previous message does NOT carry over.
- The only exception: the user's words in the current message explicitly request a git operation.

Violations have real consequences for the user. There are no second chances on this rule.
