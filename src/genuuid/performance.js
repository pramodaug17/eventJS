
export default function genPerformace(c, r) {
    return ((performance && performance.now && (performance.now()*1000)) || 0);
}