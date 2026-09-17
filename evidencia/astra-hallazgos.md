Auditor: gpt-6-astra | Sin acceso a internet | Fuentes: archivos locales

Leí completos `evidencia/home.txt`, `evidencia/aviso-privacidad.txt` y `evidencia/terminos.txt`. La revisión cubre la captación de prospectos y sus textos legales; no verifica comportamiento del formulario, imágenes, contratación posterior ni tratamiento efectivo de datos.

No pude confirmar la legislación vigente, las reglas de publicidad aplicables a esta empresa ni los criterios actuales de CONDUSEF. Las implicaciones jurídicas se marcan **Por validar**, sin afirmar infracciones. Las recomendaciones son criterios de remediación propuestos, no transcripciones de obligaciones legales.

---

**ID: UX-080**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, formulario; `aviso-privacidad.txt`, Obtención y tratamiento de los datos personales.  
**Problema:** El consentimiento textual del formulario autoriza contacto por WhatsApp, pero no explica el tratamiento del rango de ingresos. Debe validarse si ese dato queda vinculado a una persona identificada o identificable, qué consentimiento requiere y cómo se obtiene. No pude confirmar en fuente vigente el requisito de consentimiento expreso para datos financieros o patrimoniales ni sus excepciones.  
**Impacto:** El prospecto puede autorizar una conversación sin comprender el uso de su información económica; afecta la decisión informada al enviar el formulario.  
**Evidencia:** “Acepto ser contactado a través de la cuenta de WhatsApp verificada de Mejora Buró”. El aviso declara: “Los datos que los Clientes libre y voluntariamente proporcionan a Mejora Buró, incluyen: datos de identificación, datos laborales, datos patrimoniales, actividad a la que se dedican.”  
**Recomendacion:** Explicar junto al campo para qué se solicita el ingreso, enlazar el aviso y distinguir el tratamiento de información económica de la autorización de contacto. Validar jurídicamente el mecanismo de consentimiento aplicable.  
**Criterio de aceptacion:** Antes del envío se identifica la finalidad del rango de ingresos; la revisión jurídica documenta el consentimiento exigible y una prueba del flujo acredita su obtención y registro.

---

**ID: UX-081**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `aviso-privacidad.txt`, Finalidad del tratamiento de datos.  
**Problema:** El aviso incluye publicidad y prospección entre las finalidades de mantenimiento o cumplimiento de la relación jurídica. Aunque reconoce la posibilidad de negarse, deja al cliente determinar cuáles finalidades no son necesarias y comunicarlo al recibir el aviso. Es una agrupación textual que dificulta distinguir la asesoría solicitada del marketing; no demuestra que el checkbox esté premarcado ni que exista consentimiento forzado en funcionamiento.  
**Impacto:** El prospecto puede interpretar que aceptar publicidad forma parte de recibir asesoría, reduciendo su control sobre contactos posteriores.  
**Evidencia:** “(ix) para fines mercadotécnicos, publicitarios y de prospección comercial relacionados a Mejora Buró.” También: “aquellas que servirán al mantenimiento y/o cumplimiento de las obligaciones que se derivan de la relación jurídica serán las contenidas en los incisos (iii), (iv), (v), (vi), (vii), (viii), (ix).”  
**Recomendacion:** Separar las finalidades necesarias para atender la solicitud de las finalidades publicitarias opcionales y ofrecer una decisión específica sobre estas últimas.  
**Criterio de aceptacion:** El aviso distingue ambos grupos y el prospecto puede solicitar asesoría sin autorizar campañas posteriores; esa preferencia se conserva durante el seguimiento.

---

**ID: UX-082**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `aviso-privacidad.txt`, Transferencia de datos personales por Mejora Buró.  
**Problema:** La cláusula comprende transferencias para publicidad y expresa conformidad mediante una supuesta firma del aviso. Los textos no permiten establecer cómo se obtiene esa conformidad en el flujo descrito ni cuáles transferencias requieren consentimiento. No pude verificar las excepciones legales aplicables ni la vigencia de la referencia al artículo 37.  
**Impacto:** El usuario puede desconocer que la autorización contempla compartir datos para promoción, además de atender su solicitud.  
**Evidencia:** “(vi) publicidad y promoción de los productos financieros que Mejora Buró ofrezca a sus Clientes.” La cláusula añade: “En este acto, el Cliente manifiesta su conformidad para que Mejora Buró pueda llevar a cabo las transferencias en los supuestos antes enunciados, a los terceros receptores antes mencionados y por las finalidades enunciadas, por lo que firma de enterado y de conformidad el presente Aviso de Privacidad.”  
**Recomendacion:** Contrastar el aviso con las transferencias reales; identificar destinatarios o categorías, finalidad y fundamento aplicable. Sustituir la referencia a una firma por el mecanismo que efectivamente se utilice y permitir decisiones separadas cuando corresponda.  
**Criterio de aceptacion:** Cada transferencia declarada tiene una finalidad y una base documentadas; las que requieran autorización cuentan con evidencia del consentimiento correspondiente y una negativa impide ejecutarlas.

---

**ID: UX-083**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `aviso-privacidad.txt`, Medios y procedimiento para el ejercicio de los derechos ARCO y para la revocación del consentimiento.  
**Problema:** El procedimiento publicado remite al domicilio para obtener la solicitud y consultar la respuesta. Frente a la captación digital, introduce una carga considerable para ejercer derechos o retirar el consentimiento. El hallazgo es de fricción documentada; no afirma que un procedimiento presencial sea, por sí mismo, ilegal.  
**Impacto:** Personas fuera de Ciudad de México o con limitaciones de movilidad pueden desistir de solicitar acceso, cancelación u oposición.  
**Evidencia:** “Los Clientes de Mejora Buró podrán ejercer sus derechos ARCO y revocar su consentimiento para el tratamiento de sus datos personales, a través de la solicitud respectiva, que podrá ser obtenida en forma gratuita en el domicilio de Mejora Buró, la cual deberá ser entregada al Director Jurídico de Mejora Buró.” También: “La respuesta se pondrá a disposición del Cliente en el domicilio de Mejora Buró donde se hubiere presentado la solicitud, dentro del plazo antes señalado.”  
**Recomendacion:** Añadir un procedimiento remoto explícito con requisitos, verificación proporcional de identidad, acuse y respuesta por el canal elegido. Ofrecer una baja sencilla de comunicaciones publicitarias.  
**Criterio de aceptacion:** Una persona puede presentar y dar seguimiento a su solicitud sin desplazarse; el aviso describe el canal y una prueba completa acredita recepción, respuesta y ejecución cuando proceda.

---

**ID: UX-084**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `terminos.txt`, apartados G. Responsabilidad e I. Verificación de identidad; `home.txt`, descripción del servicio.  
**Problema:** Los términos describen operaciones entre usuarios, calificaciones y réplicas, mientras la portada ofrece asesoría con un consultor. Esas cláusulas no explican qué compromisos adquiere una persona al solicitar contacto en el flujo aportado.  
**Impacto:** Dificulta comprender quién presta el servicio, qué relación se inicia y qué responsabilidades corresponden al prospecto. Puede generar desconfianza durante la consulta de los términos.  
**Evidencia:** “Mejora Buró recomienda actuar con prudencia y sentido común al momento de realizar operaciones con otros Usuarios.” Además: “Este sistema de información, además constará de un espacio donde los Usuarios podrán hacer comentarios y réplicas a las calificaciones recibidas y acceder a los mismos.” La portada indica: “Uno de nuestros asesores te brinda educación y orientación legal y financiera, sin compromiso.”  
**Recomendacion:** Reescribir los términos para la captación y asesoría reales: solicitud de contacto, alcance de la asesoría inicial y momento de contratación de servicios adicionales. Retirar las cláusulas de operaciones y reputación entre usuarios si no corresponden.  
**Criterio de aceptacion:** Cada cláusula corresponde a una función o relación real y el documento permite identificar qué ocurre al enviar el formulario y qué requeriría una contratación posterior.

---

**ID: UX-085**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, encabezado principal y Preguntas Frecuentes → ¿Qué hacemos?  
**Problema:** El encabezado presenta pagar menos al mes como beneficio, mientras la descripción concreta del servicio se limita a educación y organización financiera. Debe validarse qué actuación permite obtener ese beneficio y cuáles son sus condiciones y límites. El texto no equivale a una garantía expresa, pero puede generar una expectativa superior al alcance explicado. No pude confirmar qué reglas publicitarias o declaraciones espera CONDUSEF de esta empresa según su actividad y estatus.  
**Impacto:** Puede atraer prospectos que esperan una reducción de pagos cuando la prestación descrita no explica cómo se conseguiría; afecta la calidad de los leads y la confianza durante la asesoría.  
**Evidencia:** “Pagar menos al mes para olvidarse del estrés.” Frente a: “Brindamos educación y herramientas para ayudar a las personas a organizar mejor su panorama financiero y tomar decisiones más informadas.”  
**Recomendacion:** Alinear la promesa con el servicio comprobable. Si existe negociación de deuda, explicar condiciones, dependencia de terceros y consecuencias relevantes. Declarar el papel y estatus reales de la empresa, sin sugerir autorizaciones o respaldo institucional no acreditados.  
**Criterio de aceptacion:** El beneficio anunciado tiene soporte documentado y condiciones accesibles antes de solicitar contacto; la revisión jurídica confirma las reglas aplicables y las declaraciones sobre alcance y estatus.

---

**ID: UX-086**  
**Severidad:** Media  
**Confianza:** Baja  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, bloque anterior a las redes sociales, repetido en ambos documentos legales.  
**Problema:** Se anuncia un aval del fideicomiso, pero el texto descargado no identifica quién lo otorga ni qué cubre. Puede existir información en imágenes no conservadas en la extracción; por ello, no se concluye que el aval sea falso ni que falte en la página visual.  
**Impacto:** El visitante podría interpretar un respaldo comercial como garantía de resultados, de recursos o supervisión institucional.  
**Evidencia:** “Nuestro Fideicomiso está avalado por:”  
**Recomendacion:** Verificar el bloque visual y la documentación del supuesto aval. Identificar en texto a la entidad, su función y el alcance preciso del respaldo; sustituir “avalado” si no describe correctamente la relación.  
**Criterio de aceptacion:** El bloque permite conocer quién interviene y en qué calidad; cada afirmación tiene soporte comprobable y no atribuye garantías superiores a las documentadas.

---

**ID: UX-087**  
**Severidad:** Media  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `home.txt`, Preguntas Frecuentes → ¿Cuánto cuestan los servicios de asesoría legal y financiera con Mejora Buró?  
**Problema:** La respuesta reconoce costos variables, pero no aporta rangos, componentes ni método de cálculo. La información económica disponible antes del contacto no permite estimar la asequibilidad. Dado que no existe compra en el sitio y la consulta inicial se declara gratuita, esto no acredita cargos ocultos ni una infracción por no publicar precios.  
**Impacto:** Obliga a invertir tiempo en una conversación para comparar alternativas y puede producir abandono cuando se conozca la cotización.  
**Evidencia:** “Los costos pueden variar según el perfil y los servicios que se elijan .” Y: “Durante la asesoría gratuita , compartimos información sobre las opciones disponibles y sus características.”  
**Recomendacion:** Publicar los componentes del costo y, cuando sea viable, rangos o ejemplos con supuestos explícitos. Explicar cuándo se entrega la cotización y qué incluye.  
**Criterio de aceptacion:** Antes de solicitar contacto, el visitante entiende qué es gratuito, qué puede cobrarse y cómo se determina; antes de contratar recibe una cotización desglosada y el total aplicable.

---

No hay sustento textual para señalar **urgencia falsa**: “¡Comienza ahora!” no demuestra escasez ni plazos ficticios. Tampoco encontré promesas de borrar registros del buró, porcentajes garantizados de descuento o resultados asegurados.

“¡Nuestros clientes no dejan de hablar de nosotros!” no basta para afirmar que existen testimonios falsos o no verificables: su contenido podría estar en elementos excluidos de la extracción.

La identidad legal **sí aparece**: “Baui Solutions S.A. de C.V. (en lo sucesivo Mejora Buró)”, junto con domicilio. El aviso también reconoce derechos ARCO y revocación. Estas menciones no acreditan cumplimiento integral, pero impiden reportarlas como ausentes.