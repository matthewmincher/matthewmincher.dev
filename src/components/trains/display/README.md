# Departure board display

Copied from `display/` in the private `matthewmincher/trains` repo, which also
drives the OLED boards. Make changes there and copy them across, so the website
and the boards draw the same pixels.

- `renderer.ts` draws a board into a 256×64 greyscale framebuffer (no DOM)
- `paint.ts` paints that framebuffer onto a `<canvas>` as an amber OLED panel
- `font.ts` is the bitmap font; `types.ts` is the shape of `/api/trains`
