# Task 8 report — mockup components

Implemented `WealthMockup` and `RoutinePhone` with their CSS in `src/site/mockups/`.

## Decisions

- WealthPrivate shows abstract document categories and a source-trace area. It does not show processing status, document counts, a financial chart, or financial figures.
- DermaPrivate shows a generic morning routine and ingredient-note area. It does not show a user identity, date, step count, numbered sequence, health score, or compatibility metric.
- Both render the existing `ConceptualLabel`, preserving its exact visible text: “Illustrative — not a representation of released software.”
- All mockup colors use existing design tokens. No hex literals were added outside `src/tokens.css`.

## Self review

- Reviewed both components for fabricated financial and health data, status claims, counts, and percentages.
- Checked mockup files for hex literals and disallowed example terms with `rg`; no matches.
- No tests were added or run, as requested. Browser acceptance remains part of Task 13 once the panels integrate these mockups.
