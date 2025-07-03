import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { glob } from 'glob';

class ReleaseChecker {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
    this.report = {
      timestamp: new Date().toISOString(),
      score: 0,
      checks: {
        visibility: { score: 0, missingPaths: [] },
        modules: { score: 0, modules: {} },
        tests: { score: 0, coverage: 0, e2e: false, unit: false },
        ciCd: { score: 0, hasWorkflows: false, hasDeployment: false, hasLinting: false },
        documentation: { score: 0, hasModuleDocs: false, hasApiDocs: false, hasReadme: false },
        defenses: { score: 0, hasValidation: false, hasLogging: false, hasMonitoring: false },
      },
    };
  }

  async run() {
    console.log('🚀 Iniciando auditoría de release...');
    
    await this.checkVisibility();
    await this.checkModules();
    await this.checkTests();
    await this.checkCiCd();
    await this.checkDocumentation();
    await this.checkDefenses();

    this.calculateScore();
    this.saveReport();
    
    return this.report;
  }

  checkVisibility() {
    const requiredPaths = [
      'apps/',
      'packages/',
      'scripts/',
      'docs/',
      '.github/workflows/',
      'tsconfig.json',
      'package.json',
    ];

    const missingPaths = requiredPaths.filter(
      p => !fs.existsSync(path.join(this.rootDir, p))
    );

    const score = ((requiredPaths.length - missingPaths.length) / requiredPaths.length) * 100;
    
    this.report.checks.visibility = {
      score: Math.round(score * 10) / 10,
      missingPaths,
    };
  }

  async checkModules() {
    const modules = ['auth', 'billing', 'analytics', 'campaigns', 'runtime'];
    const moduleStatus = {};

    for (const module of modules) {
      const modulePath = `apps/backend-nest/src/${module}`;
      const exists = fs.existsSync(path.join(this.rootDir, modulePath));
      
      if (!exists) {
        moduleStatus[module] = { status: 'missing', tests: false, documentation: false };
        continue;
      }

      const testFiles = await glob(`${modulePath}/**/*.{spec,test}.ts`, { cwd: this.rootDir });
      const hasTests = testFiles.length > 0;
      const hasDocs = fs.existsSync(path.join(this.rootDir, `docs/modules/${module}.md`));

      moduleStatus[module] = {
        status: hasTests && hasDocs ? 'complete' : 'partial',
        tests: hasTests,
        documentation: hasDocs,
      };
    }

    const completeModules = Object.values(moduleStatus).filter(m => m.status === 'complete').length;
    const score = (completeModules / modules.length) * 100;
    
    this.report.checks.modules = {
      score: Math.round(score * 10) / 10,
      modules: moduleStatus,
    };
  }

  async checkTests() {
    let coverage = 0;
    let hasUnitTests = false;
    let hasE2ETests = false;

    try {
      // Verificar pruebas unitarias
      const testFiles = await glob('**/*.{spec,test}.{js,jsx,ts,tsx}', { 
        cwd: this.rootDir,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
      });
      
      hasUnitTests = testFiles.length > 0;
      
      // Verificar cobertura (solo si hay pruebas)
      if (hasUnitTests) {
        try {
          // Intentar con Vitest primero
          const vitestCmd = 'npx vitest run --coverage --reporter=json';
          const vitestOutput = execSync(vitestCmd, { 
            cwd: this.rootDir, 
            stdio: 'pipe',
            timeout: 30000 
          }).toString();
          
          const vitestResult = JSON.parse(vitestOutput);
          coverage = vitestResult?.coverage?.lines?.pct || 0;
        } catch (error) {
          console.warn('No se pudo obtener cobertura con Vitest, intentando con Jest...');
          try {
            const jestCmd = 'npx jest --coverage --json';
            const jestOutput = execSync(jestCmd, { 
              cwd: this.rootDir, 
              stdio: 'pipe',
              timeout: 30000 
            }).toString();
            
            const jestResult = JSON.parse(jestOutput);
            coverage = jestResult.coverageMap?.summary?.pct || 0;
          } catch (jestError) {
            console.warn('No se pudo obtener cobertura con Jest:', jestError.message);
          }
        }
      }
    } catch (error) {
      console.warn('Error al verificar pruebas:', error.message);
    }

    // Verificar pruebas E2E
    hasE2ETests = fs.existsSync(path.join(this.rootDir, 'tests/e2e'));

    // Calcular puntuación
    const coverageScore = Math.min(100, (coverage / 80) * 100); // 80% es el objetivo
    const testTypeScore = (hasUnitTests ? 70 : 0) + (hasE2ETests ? 30 : 0);
    const score = (coverageScore * 0.7) + (testTypeScore * 0.3);

    this.report.checks.tests = {
      score: Math.round(score * 10) / 10,
      coverage: Math.round(coverage * 10) / 10,
      unit: hasUnitTests,
      e2e: hasE2ETests,
    };
  }

  checkCiCd() {
    const workflowsDir = path.join(this.rootDir, '.github/workflows');
    const hasWorkflows = fs.existsSync(workflowsDir);
    
    let hasDeployment = false;
    let hasLinting = false;

    if (hasWorkflows) {
      try {
        const workflowFiles = fs.readdirSync(workflowsDir);
        hasDeployment = workflowFiles.some(f => f.includes('deploy'));
        hasLinting = workflowFiles.some(f => f.includes('lint'));
      } catch (error) {
        console.warn('Error leyendo workflows:', error.message);
      }
    }

    const score = [
      hasWorkflows ? 40 : 0,
      hasDeployment ? 30 : 0,
      hasLinting ? 30 : 0,
    ].reduce((a, b) => a + b, 0);

    this.report.checks.ciCd = {
      score,
      hasWorkflows,
      hasDeployment,
      hasLinting,
    };
  }

  checkDocumentation() {
    const hasModuleDocs = fs.existsSync(path.join(this.rootDir, 'docs/modules'));
    const hasApiDocs = fs.existsSync(path.join(this.rootDir, 'docs/api'));
    const hasReadme = fs.existsSync(path.join(this.rootDir, 'README.md'));

    const score = [
      hasModuleDocs ? 40 : 0,
      hasApiDocs ? 40 : 0,
      hasReadme ? 20 : 0,
    ].reduce((a, b) => a + b, 0);

    this.report.checks.documentation = {
      score,
      hasModuleDocs,
      hasApiDocs,
      hasReadme,
    };
  }

  async checkDefenses() {
    // Verificar validación con Zod u otro validador
    const hasZodValidation = await this.searchInFiles('zod', ['apps/backend-nest/src/**/*.ts']);
    
    // Verificar logging estructurado
    const hasStructuredLogging = await this.searchInFiles('logger', ['apps/backend-nest/src/**/*.ts']);
    
    // Verificar monitoreo
    const hasMonitoring = fs.existsSync(path.join(this.rootDir, 'monitoring'));

    const score = [
      hasZodValidation ? 40 : 0,
      hasStructuredLogging ? 30 : 0,
      hasMonitoring ? 30 : 0,
    ].reduce((a, b) => a + b, 0);

    this.report.checks.defenses = {
      score,
      hasValidation: hasZodValidation,
      hasLogging: hasStructuredLogging,
      hasMonitoring,
    };
  }

  async searchInFiles(term, patterns) {
    try {
      const files = await glob(patterns, { 
        cwd: this.rootDir, 
        nodir: true,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
      });
      
      for (const file of files) {
        try {
          const content = fs.readFileSync(path.join(this.rootDir, file), 'utf-8');
          if (content.includes(term)) {
            return true;
          }
        } catch (error) {
          console.warn(`Error leyendo archivo ${file}:`, error.message);
        }
      }
      return false;
    } catch (error) {
      console.warn(`Error buscando '${term}':`, error.message);
      return false;
    }
  }

  calculateScore() {
    const weights = {
      visibility: 0.15,
      modules: 0.25,
      tests: 0.2,
      ciCd: 0.2,
      documentation: 0.1,
      defenses: 0.1,
    };

    const checks = this.report.checks;
    const score = Object.entries(weights).reduce((total, [key, weight]) => {
      return total + (checks[key]?.score || 0) * weight;
    }, 0);

    this.report.score = Math.round(score * 10) / 10;
  }

  saveReport() {
    const reportPath = path.join(this.rootDir, 'release-score.json');
    
    // Crear un informe legible
    const readableReport = {
      timestamp: this.report.timestamp,
      score: this.report.score,
      checks: {
        visibility: {
          score: this.report.checks.visibility.score,
          missing: this.report.checks.visibility.missingPaths
        },
        modules: {
          score: this.report.checks.modules.score,
          details: Object.entries(this.report.checks.modules.modules).map(([name, mod]) => ({
            module: name,
            status: mod.status,
            hasTests: mod.tests,
            hasDocumentation: mod.documentation
          }))
        },
        tests: {
          score: this.report.checks.tests.score,
          coverage: this.report.checks.tests.coverage,
          hasUnitTests: this.report.checks.tests.unit,
          hasE2ETests: this.report.checks.tests.e2e
        },
        ciCd: {
          score: this.report.checks.ciCd.score,
          hasWorkflows: this.report.checks.ciCd.hasWorkflows,
          hasDeployment: this.report.checks.ciCd.hasDeployment,
          hasLinting: this.report.checks.ciCd.hasLinting
        },
        documentation: {
          score: this.report.checks.documentation.score,
          hasModuleDocs: this.report.checks.documentation.hasModuleDocs,
          hasApiDocs: this.report.checks.documentation.hasApiDocs,
          hasReadme: this.report.checks.documentation.hasReadme
        },
        defenses: {
          score: this.report.checks.defenses.score,
          hasValidation: this.report.checks.defenses.hasValidation,
          hasLogging: this.report.checks.defenses.hasLogging,
          hasMonitoring: this.report.checks.defenses.hasMonitoring
        }
      },
      summary: this.getSummary()
    };

    fs.writeFileSync(reportPath, JSON.stringify(readableReport, null, 2));
    console.log(`✅ Reporte guardado en: ${reportPath}`);
    console.log(`📊 Puntuación total: ${this.report.score}/100`);
    
    if (this.report.score < 90) {
      console.error('❌ Puntuación insuficiente para release. Se requiere al menos 90%');
      process.exit(1);
    } else {
      console.log('🚀 ¡Listo para release!');
    }
  }

  getSummary() {
    const { checks } = this.report;
    const modules = Object.entries(checks.modules.modules)
      .map(([name, mod]) => `- ${name}: ${mod.status} (${mod.tests ? 'con tests' : 'sin tests'}, ${mod.documentation ? 'documentado' : 'sin documentación'})`)
      .join('\n');

    return `
📊 RESUMEN DEL ANÁLISIS DE RELEASE

VISIBILIDAD (${checks.visibility.score}%):
${checks.visibility.missingPaths.length > 0 
  ? `Faltan: ${checks.visibility.missingPaths.join(', ')}` 
  : '✅ Todas las rutas requeridas están presentes'}

MÓDULOS (${checks.modules.score}%):
${modules}

PRUEBAS (${checks.tests.score}%):
- Cobertura: ${checks.tests.coverage}%
- Unitarias: ${checks.tests.unit ? '✅' : '❌'}
- E2E: ${checks.tests.e2e ? '✅' : '❌'}

CI/CD (${checks.ciCd.score}%):
- Workflows: ${checks.ciCd.hasWorkflows ? '✅' : '❌'}
- Despliegue: ${checks.ciCd.hasDeployment ? '✅' : '❌'}
- Linting: ${checks.ciCd.hasLinting ? '✅' : '❌'}

DOCUMENTACIÓN (${checks.documentation.score}%):
- Módulos: ${checks.documentation.hasModuleDocs ? '✅' : '❌'}
- API: ${checks.documentation.hasApiDocs ? '✅' : '❌'}
- README: ${checks.documentation.hasReadme ? '✅' : '❌'}

DEFENSAS (${checks.defenses.score}%):
- Validación: ${checks.defenses.hasValidation ? '✅' : '❌'}
- Logging: ${checks.defenses.hasLogging ? '✅' : '❌'}
- Monitoreo: ${checks.defenses.hasMonitoring ? '✅' : '❌'}

💡 RECOMENDACIONES:
${this.getRecommendations()}
`;
  }

  getRecommendations() {
    const { checks } = this.report;
    const recommendations = [];

    if (checks.visibility.missingPaths.length > 0) {
      recommendations.push(`- Agregar las rutas faltantes: ${checks.visibility.missingPaths.join(', ')}`);
    }

    Object.entries(checks.modules.modules).forEach(([name, mod]) => {
      if (!mod.tests) recommendations.push(`- Agregar pruebas unitarias para el módulo ${name}`);
      if (!mod.documentation) recommendations.push(`- Documentar el módulo ${name}`);
    });

    if (checks.tests.coverage < 80) {
      recommendations.push(`- Aumentar la cobertura de pruebas al menos al 80% (actual: ${checks.tests.coverage}%)`);
    }
    
    if (!checks.tests.e2e) {
      recommendations.push('- Implementar pruebas E2E');
    }

    if (!checks.ciCd.hasWorkflows) {
      recommendations.push('- Configurar GitHub Actions para CI/CD');
    }

    if (!checks.documentation.hasApiDocs) {
      recommendations.push('- Documentar la API');
    }

    if (!checks.defenses.hasMonitoring) {
      recommendations.push('- Implementar monitoreo de la aplicación');
    }

    return recommendations.length > 0 
      ? recommendations.join('\n') 
      : '✅ ¡Todo parece estar en orden! El proyecto cumple con los estándares de calidad.';
  }
}

// Ejecutar el checker
(async () => {
  try {
    const checker = new ReleaseChecker();
    await checker.run();
  } catch (error) {
    console.error('❌ Error al ejecutar el release checker:', error);
    process.exit(1);
  }
})();
