# ~14_REGLAS_DE_ORO.md

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25** (actualizado tras validación de módulos auth y profiles)
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

## REGLAS DE ORO STRATO SAFE STACK™

1. **Lee estas reglas de oro todos los días antes de trabajar.**
   - La disciplina diaria es la mejor defensa contra la deuda técnica y la desalineación.

2. **Nunca avances dejando deuda técnica.**
   - Todo workaround debe estar documentado en ~11_LOCAL_WORKAROUNDS.md y tener fecha/condición de eliminación.
   - No se permite "lo arreglo después" sin dejar trazabilidad y plan de remoción.

3. **Prohibido el uso de `any`, `@ts-ignore`, `eslint-disable` y bypasses de tipado/linting.**
   - Solo se permite en casos documentados, temporales y con justificación clara.
   - Todo uso debe estar marcado para eliminación antes de producción.

4. **Cada avance debe dejar el repo en estado validado, auditable y sin errores ni warnings.**
   - Corre todos los scripts de validación y auditoría antes de cada commit y push.
   - No se permite avanzar con tests fallando, coverage bajo o warnings de lint/tsc.

5. **No existe feature "simple" o "temporal".**
   - Todo debe pasar por validación, test y documentación.
   - Si surge una excepción, documenta el motivo y el plan de remoción.

6. **Sincroniza siempre la lógica de negocio, el checklist maestro y las reglas de oro.**
   - Cada avance, workaround o decisión debe reflejarse en los tres archivos.
   - Actualiza la fecha de sincronización en cada uno.

7. **Prioriza la claridad, la mantenibilidad y la trazabilidad sobre la velocidad.**
   - Prefiere menos features, pero bien documentadas, probadas y alineadas con la visión de negocio.

8. **Nunca ignores los errores de CI, validaciones o guardianes.**
   - Si un guardián bloquea, revisa, documenta y corrige antes de avanzar.

9. **Todo colaborador (humano o IA) debe leer y aceptar estas reglas antes de contribuir.**
   - Dejar constancia en el commit inicial de cada colaborador.

10. **Revisa y refuerza estas reglas cada sprint.**
    - Si alguna regla deja de cumplirse o pierde sentido, actualízala y documenta el motivo.

---

> **Estas reglas de oro son la defensa final contra la deuda técnica, la desalineación y el caos. Si alguna vez dudas, vuelve a leerlas y consulta la lógica de negocio y el checklist maestro.** 