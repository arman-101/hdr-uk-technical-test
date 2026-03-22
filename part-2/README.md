# HDR UK Technical Test - Part 2: GitHub Repository Card List

## 🤖 AI Usage Note

I utilised AI primarily as an architectural sounding board and to accelerate the boilerplate setup of the Next.js components. The most effective prompt involved providing my existing, centralised Tailwind CSS design system and instructing the AI to build the grid layout strictly adhering to those specific CSS variables. One area where the model initially stumbled was with framework dependency versions; it attempted to use brand-new Tailwind v4 syntax in an environment configured for v3, which completely broke the CSS compiler. I had to manually debug this, downgrade the Tailwind packages via npm, and restore the `tailwind.config.ts` file to ensure the styles compiled perfectly.

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v3 with a centralised CSS variable design system)

## ✅ Assessment Criteria

* **Data Fetching:** Implemented cleanly inside a Client Component using `useEffect`.
* **Component Design:** Adheres strictly to a centralised design system. The UI uses 4-column standardised grids, clean component structures, and responsive layouts.
* **Edge Cases Handled:**

  * Real-time search safely disables when data is loading or errors out.
  * Null descriptions and null languages from the GitHub API are caught and handled gracefully with fallback UI elements.
  * Empty search results display a user-friendly message instead of a blank page.
  * Network errors are caught and provide a user-friendly fallback with a retry action.