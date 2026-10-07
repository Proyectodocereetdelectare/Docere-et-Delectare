import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "morfologia.html",
  "estructura-palabra.html",
  "formacion-palabras.html",
  "categorias-gramaticales.html",
  "verbo.html",
  "sintaxis.html",
  "progreso.html"
];

const errors = [];

function balanced(source, open, close) {
  let depth = 0, quote = null, escaped = false, line = false, block = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (line) { if (c === "\n") line = false; continue; }
    if (block) { if (c === "*" && n === "/") { block = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (c === "\\") { escaped = true; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === "/" && n === "/") { line = true; i++; continue; }
    if (c === "/" && n === "*") { block = true; i++; continue; }
    if (c === "'" || c === '"' || c === "`") { quote = c; continue; }
    if (c === open) depth++;
    if (c === close) depth--;
    if (depth < 0) return false;
  }
  return depth === 0 && !quote && !block;
}

for (const file of pages) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) { errors.push(`Falta ${file}`); continue; }
  const html = fs.readFileSync(full, "utf8");

  for (const src of [...html.matchAll(/<script\s+src=["']([^"']+)["']/gi)].map(m => m[1])) {
    const target = path.join(root, src);
    if (!fs.existsSync(target)) errors.push(`${file}: script inexistente ${src}`);
  }

  for (const href of [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1])) {
    if (href === "#") errors.push(`${file}: enlace href="#" sin destino`);
  }

  if (/4\.?º\s*ESO/i.test(html)) errors.push(`${file}: referencia a 4.º ESO`);
  if (/según (la )?(presentación|material)|en el material|en la presentación/i.test(html)) {
    errors.push(`${file}: referencia a presentación/material`);
  }

  const scripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/gi)].map(m => m[1]).join("\n");
  for (const [open, close, label] of [["{","}","llaves"],["[","]","corchetes"],["(",")","paréntesis"]]) {
    if (!balanced(scripts, open, close)) errors.push(`${file}: ${label} desbalanceados`);
  }

  const funcs = [...scripts.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]);
  const duplicates = [...new Set(funcs.filter((x, i) => funcs.indexOf(x) !== i))];
  if (duplicates.length) errors.push(`${file}: funciones duplicadas ${duplicates.join(", ")}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Docere et Delectare: validación estructural OK (${pages.length} páginas).`);
