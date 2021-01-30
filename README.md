# Vanilla JS Drag and Drop

Based on the following video:
[Build a No-Framework JavaScript Drag-n-Drop (with Zell) — Learn With Jason](https://www.youtube.com/watch?v=QVgEzUXeT-I&t=1573s)

The program uses the `pointerdown`, `pointermove`, and `pointerup` events to allow items to be dragged back and forth between 'dropzones' and to reorder items within the dropzone.

Key points involve using a clone of the item being dragged to provide a 'preview' of where the item will be dropped.

The item being dragged is absolutely positioned and then appended to the body with Javascript to make sure that no matter how parent elements may be positioned, the item stays absolutely positioned relative to the body. That way it can be dragged anywhere.

Fast pointer movements are accounted for with `setPointerCapture`.

`movementX` and `movementY` give the distance the pointer has moved and `elementFromPoint` returns the element that the pointer is currently over.
