const x = t => Object.values(((c) => ({ res: c > 0 ? `${c} is above freezing temperature` : `${c} is freezing temperature` }))(((m) => (m - 32) * (5/9))(t)))[0];
const y = t => `${t = (t - 32) * (5 / 9)} is ${t > 0 ? "above ": ""}freezing temperature`;
const z = t => Object.values(((c) => ({ r: `${c} is ${c > 0 ? "above ": ""}freezing temperature` }))(((m) => (m - 32) * (5/9))(t)))[0];
