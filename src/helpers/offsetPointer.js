export default function offsetPointer(e, x, y){
    e = e || window.event;
    const offsetX = e.clientX - x
    const offsetY = e.clientY - y
    console.log([offsetX, offsetY]);
    return (offsetX, offsetY)
}
