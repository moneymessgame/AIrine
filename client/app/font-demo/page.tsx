"use client";

import { useTranslations } from "@/components/translations-context";
import { Container } from "@/components/ui/container";

export default function FontDemoPage() {
  const { t } = useTranslations();

  return (
    <Container className="max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-8">Демонстрация шрифта PT Sans Narrow</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Примеры заголовков</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Заголовок 1 уровня (h1)</h1>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold">Заголовок 2 уровня (h2)</h2>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold">Заголовок 3 уровня (h3)</h3>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold">Заголовок 4 уровня (h4)</h4>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
            
            <div>
              <h5 className="text-lg font-bold">Заголовок 5 уровня (h5)</h5>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
            
            <div>
              <h6 className="text-base font-bold">Заголовок 6 уровня (h6)</h6>
              <p className="text-sm text-muted-foreground">font-family: var(--font-pt-sans-narrow)</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-4">Сравнение шрифтов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded">
              <h3 className="text-2xl font-bold mb-2">PT Sans Narrow (Заголовок)</h3>
              <p className="text-sm text-muted-foreground">Шрифт для заголовков: PT Sans Narrow</p>
            </div>
            
            <div className="border p-4 rounded">
              <p className="text-2xl font-bold mb-2">Geist Sans (Основной текст)</p>
              <p className="text-sm text-muted-foreground">Основной шрифт: Geist Sans</p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
