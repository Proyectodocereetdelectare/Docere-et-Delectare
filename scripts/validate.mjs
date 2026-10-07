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
const externalScripts = new Set();

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
  if (!fs.existsSync(full)) {
    errors.push(file + ": archivo inexistente");
    continue;
  }

  const html = fs.readFileSync(full, "utf8");

  for (const src of [...html.matchAll(/<script\s+src=["']([^"']+)["']/gi)].map(m => m[1])) {
    const target = path.join(root, src);
    if (!fs.existsSync(target)) errors.push(file + ": script inexistente " + src);
    else externalScripts.add(target);
  }

  for (const href of [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map(m => m[1])) {
    if (!/^https?:|^data:|^javascript:/i.test(href)) {
      const target = path.join(root, href);
      if (!fs.existsSync(target)) errors.push(file + ": recurso CSS inexistente " + href);
    }
  }

  for (const href of [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1])) {
    if (href === "#") errors.push(file + ': enlace href="#" sin destino');
    if (!/^(https?:|mailto:|javascript:|#)/i.test(href)) {
      const target = path.join(root, href.split("#")[0].split("?")[0]);
      if (!fs.existsSync(target)) errors.push(file + ": destino inexistente " + href);
    }
  }

  if (/4\.?º\s*ESO/i.test(html)) errors.push(file + ": referencia a 4.º ESO");
  if (/según (la )?(presentación|material)|en el material|en la presentación/i.test(html)) {
    errors.push(file + ": referencia a presentación/material");
  }

  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join("\n");
  if (scripts.trim()) {
    try { new Function(scripts); }
    catch (error) { errors.push(file + ": JavaScript inline inválido: " + error.message); }
  }

  for (const [open, close, label] of [["{","}","llaves"],["[","]","corchetes"],["(",")","paréntesis"]]) {
    if (!balanced(scripts, open, close)) errors.push(file + ": " + label + " desbalanceados");
  }

  const funcs = [...scripts.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]);
  const duplicates = [...new Set(funcs.filter((x, i) => funcs.indexOf(x) !== i))];
  if (duplicates.length) errors.push(file + ": funciones duplicadas " + duplicates.join(", "));
}

for (const file of externalScripts) {
  try {
    const source = fs.readFileSync(file, "utf8");
    new Function(source);
  } catch (error) {
    errors.push("JS externo inválido " + path.relative(root, file) + ": " + error.message);
  }
}


const dataContracts = [
  { file: "assets/js/data/morfologia/estructura-palabra.js", expr: "({identifica,clasifica,analiza,reto})" },
  { file: "assets/js/data/morfologia/formacion-palabras.js", expr: "({A})" },
  { file: "assets/js/data/morfologia/categorias-gramaticales.js", expr: "({A})" },
  { file: "assets/js/data/morfologia/verbo.js", expr: "({A})" },
  { file: "assets/js/data/sintaxis/sintaxis.js", expr: "({BANCO})" }
];

for (const contract of dataContracts) {
  const full = path.join(root, contract.file);
  if (!fs.existsSync(full)) {
    errors.push("Falta banco de datos " + contract.file);
    continue;
  }
  try {
    const source = fs.readFileSync(full, "utf8");
    const values = new Function(source + "\nreturn " + contract.expr + ";")();
    const activities = contract.expr.includes("BANCO")
      ? Object.values(values.BANCO).flat()
      : Object.values(values).flat();
    const ids = activities.map(a => a && a.id).filter(Boolean);
    if (ids.length !== activities.length) {
      errors.push(contract.file + ": hay actividades sin identificador estable");
    }
    if (new Set(ids).size !== ids.length) {
      errors.push(contract.file + ": hay identificadores de actividad duplicados");
    }
  } catch (error) {
    errors.push(contract.file + ": banco inválido: " + error.message);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Docere et Delectare: validación estructural OK (" + pages.length + " páginas).");
