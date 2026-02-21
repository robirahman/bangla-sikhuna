# Handwriting / Tracing Feature — TODO

## Current State

* Canvas overlay shows a large background letter for the user to trace over
* User can draw freehand strokes on the canvas
* Clear button resets strokes; Mark Complete records writing mastery
* **Stroke-order guide paths** rendered as dashed/solid overlays on the canvas (STROKE_PATHS data for all 50 letters + 10 digits)
* **Animated stroke playback** via "Show Stroke" button — draws each stroke in sequence with a moving pen tip
* **Stroke hints** displayed as numbered instructions alongside the canvas when stroke data is available

## What's Done

### 1. Vector stroke-order data per letter ✅

* Hand-crafted polyline paths for all 50 core Bengali letters + 10 Bengali digits
* Stored as `STROKE_PATHS` in `alphabet.js` — JSON map keyed by letter character
* Each entry: array of strokes, each stroke an array of [x, y] points (normalized 0–1)
* Strokes ordered in conventional Bengali handwriting sequence

### 2. Animated stroke playback ✅

* "Show Stroke" button animates drawing each stroke in order
* Uses requestAnimationFrame to progressively draw each stroke path (~500ms per stroke)
* Orange animated line with moving pen-tip dot
* Completed strokes shown in green, upcoming strokes shown as dashed guides
* Stroke-order numbers displayed at the start of each stroke

### 3. Stroke hints ✅

* Numbered textual hints from `STROKE_HINTS` displayed alongside the canvas
* Only shown when `STROKE_PATHS` data exists for the letter

## What's Needed

### 4. Stroke-matching validation (future)

* Compare user-drawn strokes against the reference vector paths
* Score based on proximity, direction, and stroke order
* Provide visual feedback (green for correct, red for off-track)

### 5. Refine stroke data

* The current polyline paths are hand-crafted approximations
* Could be improved by tracing actual font outlines or referencing calligraphy guides
* Reference video: [How to write the Bengali alphabet](https://www.youtube.com/watch?v=5E85IDwqBdU)
