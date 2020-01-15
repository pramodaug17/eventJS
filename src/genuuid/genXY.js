
export default function genXY(c, r) {
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
}