// Build a No-Framework JavaScript Drag-n-Drop (with Zell) — Learn With Jason
// https://www.youtube.com/watch?v=QVgEzUXeT-I&t=1573s

const items = document.querySelectorAll(".item");

[...items].forEach((item) => {
  item.addEventListener("pointerdown", (e) => {
    item.style.left = `${item.getBoundingClientRect().left}px`;
    item.style.top = `${item.getBoundingClientRect().top}px`;

    const clone = item.cloneNode();
    clone.classList.add("clone");
    item.before(clone);

    // Related to styling
    item.style.pointerEvents = "none";
    item.dataset.state = "dragging";

    // make sure item is position absolute in relation to body
    document.body.append(item);

    // tell DOM that further pointer events related to this
    // item even if item moved from under the pointer or
    // or pointer moved away from item and is no longer on this item
    item.setPointerCapture(e.pointerId);

    // add other event listeners here as matter of taste;
    // you only need these others if
    // pointerdown has happened
    const move = (e) => {
      // delta since the last pointer move event
      item.style.left = `${parseFloat(item.style.left) + e.movementX}px`;
      item.style.top = `${parseFloat(item.style.top) + e.movementY}px`;

      // returns the element at pointer coordinate
      const hitTest = document.elementFromPoint(
        parseFloat(item.style.left),
        parseFloat(item.style.top)
      );

      const pointersDropzone = hitTest.closest("[data-dropzone]");
      const clonesDropzone = clone.closest("[data-dropzone]");

      // if pointer not over dropzone return
      if (!pointersDropzone) return;

      if (clonesDropzone !== pointersDropzone) {
        pointersDropzone.append(clone);
        return;
      }

      const pointersDropzoneChildren = [...pointersDropzone.children];
      const cloneIndex = pointersDropzoneChildren.findIndex((child) => child === clone);
      
      pointersDropzoneChildren.forEach((child, index) => {
        if (hitTest === clone) return;

        if (hitTest === child) {
          if (cloneIndex < index) {
            child.after(clone);
            return;
          }

          child.before(clone);
        }
      });
    };

    const up = (e) => {
      clone.after(item);
      clone.remove();

      item.style.left = "";
      item.style.top = "";
      item.style.pointerEvents = "";
      item.dataset.state = "idle";
      
      item.releasePointerCapture(e.pointerId);

      item.removeEventListener("pointerup", up);
      item.removeEventListener("pointermove", move);
    };

    item.addEventListener("pointermove", move);
    item.addEventListener("pointerup", up);
  });

  // other listeners could also be here
});
