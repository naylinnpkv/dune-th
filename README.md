## Getting Started

To run the development server:

```bash
npm install
npm run dev
```

To run tests:

```bash
npm run test
```

---

## Approach

- I prioritized fulfilling the basic requirements due to limited time for this take-home project.
- As a bonus, I wrote some tests for the homepage.
- The architecture is simple and straightforward, as the app only contains two pages.

---

## Assumptions and Notes

- I did not find Redux necessary for this project.
- I used [`swr`](https://swr.vercel.app/) as the data-fetching library. While it typically reduces the need for a state management library, state management was not necessary in this case.
- Since this is a [Next.js](https://nextjs.org/) project, I created API routes within the same codebase. This makes the project more maintainable and improves security, as API keys are not exposed to the client.
- The app is deployed on Vercel and is live at: [https://dune-th.vercel.app/](https://dune-th.vercel.app/)
