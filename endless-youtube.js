/* 
    "The Phantom Wiggle"
    Avoid "are you still watching?" prompts and enjoy uninterrupted YouTube.
    Usage: Run in browser as a userscript, or prefix with `javascript:` in the address bar.
*/
const m=(x, y)=>window.scrollTo(x, y);setInterval(()=>{m(1,200);m(0,0);},1700000);