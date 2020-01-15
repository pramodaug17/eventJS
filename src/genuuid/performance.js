
export default function genPerformance(c, r) {
    return ((performance && performance.now && (performance.now()*1000)) || 0);
}