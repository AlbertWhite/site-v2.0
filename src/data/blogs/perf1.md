---
title: "Improve Web Performance with example for next.js: how did I find lodash is loaded completely in the bundle"
date: "2023-01-28"
category: "blog"
star: 5
keyword: "web performance"
---

With NextJS, it's not easy to detect if a piece of code (for example, lodash) is really included in the JS bundle for two reasons:

- Code is fully uglified, including function names and variables, the implementation is changed a bit, too.
- Real JS bundle per page is different from the bundle built from `next build`, because next.js chooses the small chunks and constructs the real JS bundle by page, so it's difficult to know if a built js chunk really exists in the real bundle or not.

After hours of work, I found the most efficient way to detect if a library is loaded in the uglified js bundle or not:

**By error messages which are thrown**.

Yes, it's the **only** thing that will not be uglified. 


Thus, I searched for lodash repo in git, and finally found a special thrown message from `template.js`: `Invalid variable option passed into _.template`.

With this error message, I was able to find that the whole lodashed is loaded from the 455KB bundle, while we didn't use this function in the source code.

By the way, the fix was quite simple: import the lodash function by `import get from 'lodash/get'`, but not by `import {get} from 'lodash'` and there will be only used lodash function loaded in the bundle.
