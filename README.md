# redraw

A pixel art tool, built with React and the HTML5 Canvas.

*A work-in-progress...*

[Try it out!](http://redraw.reidmitchell.net)

## Bugs to fix

- [ ] Pasting twice in a row leaves you in a weird state
- [ ] Undo/redo/undo leaves you in a weird state
- [ ] Undo/redo buttons only become enabled/disabled on state changes (e.g. when you hover over the canvas), rather than on any pushUndo
- [ ] On Edge/IE, pixels are blurry in the canvas (because CSS `image-rendering` doesn't work)

## Improvements to make

- [ ] Custom colors/color palettes
- [ ] Eyedropper tool
- [ ] Allow save/export of canvas to file
- [ ] Keyboard shortcuts for all buttons/tools
- [ ] Automatically save canvas data to local storage
- [ ] Allow resizing of canvas
- [ ] Mobile layout

## Acknowledgements

While working on this, I took a lot of inspiration from these awesome projects:

- [Make 8-Bit Art](https://github.com/jennschiffer/make8bitart)
- [JS Paint](https://github.com/1j01/jspaint)
