#!/usr/bin/env ts-node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var readline = __importStar(require("readline"));
var ROOT = process.cwd();
var CHECKLIST_PATH = path.join(ROOT, '~12_CHECKLIST_MAESTRO.md');
var REPORT_PATH = path.join(ROOT, 'audit-artifacts/reports/checklist-audit.json');
// Criterios de ejemplo para puntaje
var CRITERIA = [
    { key: 'estructura', weight: 0.2 },
    { key: 'logica', weight: 0.4 },
    { key: 'integracion', weight: 0.2 },
    { key: 'tests', weight: 0.2 },
];
// Utilidad para buscar archivos recursivamente, ignorando carpetas temporales
function walk(dir, filelist) {
    if (filelist === void 0) { filelist = []; }
    var IGNORE_DIRS = ['node_modules', '.git', '.turbo', '.next', '.DS_Store', 'coverage', 'cache', 'logs'];
    if (!fs.existsSync(dir))
        return filelist;
    fs.readdirSync(dir).forEach(function (file) {
        var filepath = path.join(dir, file);
        var stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            if (IGNORE_DIRS.some(function (ignored) { return file === ignored || file.startsWith('.'); }))
                return;
            filelist = walk(filepath, filelist);
        }
        else {
            filelist.push(filepath);
        }
    });
    return filelist;
}
// Parsear el checklist maestro y extraer los ítems
function parseChecklist() {
    return __awaiter(this, void 0, void 0, function () {
        var items, rl, currentSection, _a, rl_1, rl_1_1, line, clean, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    items = [];
                    rl = readline.createInterface({
                        input: fs.createReadStream(CHECKLIST_PATH),
                        crlfDelay: Infinity,
                    });
                    currentSection = '';
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = true, rl_1 = __asyncValues(rl);
                    _e.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _e.sent(), _b = rl_1_1.done, !_b)) return [3 /*break*/, 5];
                    _d = rl_1_1.value;
                    _a = false;
                    line = _d;
                    if (line.startsWith('### ')) {
                        currentSection = line.replace('### ', '').trim();
                    }
                    if (/^[-•] [✅🟡🔲❌⚠️⬜️]/.test(line.trim()) || /^[-•] /.test(line.trim())) {
                        clean = line.replace(/^[-•] [✅🟡🔲❌⚠️⬜️]? ?/, '').trim();
                        items.push({ section: currentSection, raw: line.trim(), item: clean });
                    }
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(rl_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, items];
            }
        });
    });
}
// Analizar evidencia para cada ítem (versión simple, se puede mejorar)
function analyzeItem(item, allFiles) {
    var evidence = [];
    var score = 0;
    // Estructura: buscar si hay carpeta/archivo mencionado
    var estructura = /`?\/?([\w\-]+)\/?`?/.exec(item);
    if (estructura) {
        var name_1 = estructura[1];
        if (allFiles.some(function (f) { return f.includes(name_1); })) {
            score += 0.2;
            evidence.push("Estructura encontrada: ".concat(name_1));
        }
    }
    // Lógica: buscar si hay archivo .ts relevante
    if (/middleware|service|controller|route|validator|test|auth|stripe|resend|openai|posthog/i.test(item)) {
        var found = allFiles.filter(function (f) { return new RegExp(item.split(' ')[0], 'i').test(f); });
        if (found.length > 0) {
            score += 0.4;
            evidence.push("L\u00F3gica encontrada: ".concat(found.join(', ')));
        }
    }
    // Integración: buscar dependencias en package.json
    if (/stripe|resend|openai|posthog|supabase|zod|vitest|supertest|dotenv/i.test(item)) {
        var pkg = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
        if (new RegExp(item.split(' ')[0], 'i').test(pkg)) {
            score += 0.2;
            evidence.push('Integración encontrada en package.json');
        }
    }
    // Tests: buscar archivos de test
    if (/test|coverage|vitest|supertest/i.test(item)) {
        var found = allFiles.filter(function (f) { return /test/i.test(f); });
        if (found.length > 0) {
            score += 0.2;
            evidence.push("Tests encontrados: ".concat(found.join(', ')));
        }
    }
    return { score: Math.min(score, 1), evidence: evidence };
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var items, allFiles, results, _i, items_1, _a, section, raw, item, _b, score, evidence, status_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Iniciando auditoría del checklist maestro...');
                    return [4 /*yield*/, parseChecklist()];
                case 1:
                    items = _c.sent();
                    allFiles = walk(ROOT);
                    results = [];
                    for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                        _a = items_1[_i], section = _a.section, raw = _a.raw, item = _a.item;
                        _b = analyzeItem(item, allFiles), score = _b.score, evidence = _b.evidence;
                        status_1 = '❌ Pendiente';
                        if (score === 1)
                            status_1 = '✅ Implementado';
                        else if (score >= 0.6)
                            status_1 = '🟡 Parcial';
                        else if (score >= 0.2)
                            status_1 = '🔲 Estructura';
                        results.push({ section: section, item: item, status: status_1, score: score, evidence: evidence });
                    }
                    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
                    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
                    console.log("Reporte generado en: ".concat(REPORT_PATH));
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error('Error en la auditoría:', err);
    process.exit(1);
});
