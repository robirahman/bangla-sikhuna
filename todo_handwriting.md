# Handwriting / Tracing Feature — TODO

## Current State

* Canvas overlay shows a large background letter for the user to trace over
* User can draw freehand strokes on the canvas
* Clear button resets strokes; Mark Complete records writing mastery
* No stroke-order guidance, animated playback, or stroke-matching validation

## What's Needed

### 1\. Vector stroke-order data per letter

* Define ordered control-point paths (bezier/polyline) for each Bengali letter
* Store as a JSON map keyed by letter character
* Each entry: array of strokes, each stroke an array of \[x, y] points (normalized 0-1)

### 2\. Animated stroke playback

* Re-add a "Show Stroke" button that animates drawing each stroke in order
* Use requestAnimationFrame to progressively draw each stroke path
* Allow the user to replay the animation

### 3\. Stroke-matching validation

* Compare user-drawn strokes against the reference vector paths
* Score based on proximity, direction, and stroke order
* Provide visual feedback (green for correct, red for off-track)

### 4\. Stroke hints (optional)

* Once vector data exists, derive meaningful textual hints per stroke
* Display step-by-step instructions alongside the canvas

### 5\. Correct demonstration

* An excellent demonstration of how to write each letter can be found in this video, \[How to write the Bengali alphabet](https://www.youtube.com/watch?v=5E85IDwqBdU).
