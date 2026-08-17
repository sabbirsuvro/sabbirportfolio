(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t);
    new MutationObserver((t) => {
        for (const o of t)
            if (o.type === "childList")
                for (const l of o.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && s(l);
    }).observe(document, { childList: !0, subtree: !0 });
    function i(t) {
        const o = {};
        return (
            t.integrity && (o.integrity = t.integrity),
            t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy),
            t.crossOrigin === "use-credentials"
                ? (o.credentials = "include")
                : t.crossOrigin === "anonymous"
                  ? (o.credentials = "omit")
                  : (o.credentials = "same-origin"),
            o
        );
    }
    function s(t) {
        if (t.ep) return;
        t.ep = !0;
        const o = i(t);
        fetch(t.href, o);
    }
})();
const a = 181,
    x = (n) => `/Video_images/ezgif-frame-${String(n).padStart(3, "0")}.jpg`,
    d = document.getElementById("hero-canvas"),
    c = d.getContext("2d", { alpha: !1 });
c.imageSmoothingEnabled = !0;
c.imageSmoothingQuality = "high";
const r = new Array(a);
let u = 0,
    m = 0;
function E() {
    const n = d.clientWidth || window.innerWidth,
        e = d.clientHeight || window.innerHeight - 70;
    return { width: n, height: e };
}
function h() {
    const n = Math.min(window.devicePixelRatio || 1, 2),
        { width: e, height: i } = E();
    (d.width = Math.round(e * n)),
        (d.height = Math.round(i * n)),
        (c.imageSmoothingEnabled = !0),
        (c.imageSmoothingQuality = "high"),
        f();
}
function S(n) {
    const e = Math.min(a - 1, Math.max(0, n));
    if (r[e] && r[e].complete && r[e].naturalWidth > 0) return r[e];
    for (let i = 1; i < a; i++) {
        const s = e - i;
        if (s >= 0 && r[s] && r[s].complete && r[s].naturalWidth > 0) return r[s];
        const t = e + i;
        if (t < a && r[t] && r[t].complete && r[t].naturalWidth > 0) return r[t];
    }
    return null;
}
function f() {
    const n = Math.min(a - 1, Math.max(0, Math.round(u))),
        e = S(n);
    if (!e) return;
    const i = d.width,
        s = d.height,
        t = e.naturalWidth,
        o = e.naturalHeight;
    (c.fillStyle = "#000000"), c.fillRect(0, 0, i, s);
    const l = Math.max(i / t, s / o),
        g = t * l,
        w = o * l,
        M = (i - g) / 2,
        v = (s - w) / 2;
    c.drawImage(e, 0, 0, t, o, M, v, g, w);
}
function p() {
    const n = m - u;
    Math.abs(n) > 5e-4 && ((u += n * 0.12), f()), requestAnimationFrame(p);
}
function y() {
    const n = document.documentElement.scrollHeight - window.innerHeight;
    if (n <= 0) return;
    m = Math.min(1, Math.max(0, window.scrollY / n)) * (a - 1);
}
window.addEventListener("resize", h);
window.addEventListener("orientationchange", () => {
    setTimeout(h, 100);
});
window.visualViewport && window.visualViewport.addEventListener("resize", h);
window.addEventListener("scroll", y, { passive: !0 });
h();
y();
u = m;
requestAnimationFrame(p);
for (let n = 1; n <= a; n++) {
    const e = n - 1,
        i = new Image();
    (i.src = x(n)),
        (i.onload = () => {
            (r[e] = i), (e === 0 || e === Math.round(u)) && f();
        });
}
