import { expect, type Page, test } from '@playwright/test';

type FocusMeta = {
  tag: string;
  text: string;
  aria: string;
  href: string;
  id: string;
  name: string;
  placeholder: string;
};

async function pressTabAndReadActive(page: Page): Promise<FocusMeta> {
  await page.keyboard.press('Tab');
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) {
      return {
        tag: '',
        text: '',
        aria: '',
        href: '',
        id: '',
        name: '',
        placeholder: '',
      };
    }

    return {
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' '),
      aria: el.getAttribute('aria-label') || '',
      href: el.getAttribute('href') || '',
      id: el.getAttribute('id') || '',
      name: el.getAttribute('name') || '',
      placeholder: el.getAttribute('placeholder') || '',
    };
  });
}

async function pressShiftTabAndReadActive(page: Page): Promise<FocusMeta> {
  await page.keyboard.press('Shift+Tab');
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) {
      return {
        tag: '',
        text: '',
        aria: '',
        href: '',
        id: '',
        name: '',
        placeholder: '',
      };
    }

    return {
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' '),
      aria: el.getAttribute('aria-label') || '',
      href: el.getAttribute('href') || '',
      id: el.getAttribute('id') || '',
      name: el.getAttribute('name') || '',
      placeholder: el.getAttribute('placeholder') || '',
    };
  });
}

async function collectFocusTrail(page: Page, maxTabs: number): Promise<FocusMeta[]> {
  const trail: FocusMeta[] = [];

  for (let i = 0; i < maxTabs; i += 1) {
    trail.push(await pressTabAndReadActive(page));
  }

  return trail;
}

async function collectShiftTabTrail(page: Page, maxSteps: number): Promise<FocusMeta[]> {
  const trail: FocusMeta[] = [];

  for (let i = 0; i < maxSteps; i += 1) {
    trail.push(await pressShiftTabAndReadActive(page));
  }

  return trail;
}

async function expectTabSequence(
  page: Page,
  sequence: Array<(meta: FocusMeta) => boolean>,
  message: string,
): Promise<void> {
  for (let i = 0; i < sequence.length; i += 1) {
    const active = await pressTabAndReadActive(page);
    expect(sequence[i](active), `${message} at step ${i + 1}`).toBe(true);
  }
}

function findOrderedSequence(
  trail: FocusMeta[],
  sequence: Array<(meta: FocusMeta) => boolean>,
): number {
  let cursor = 0;

  for (const matches of sequence) {
    while (cursor < trail.length && !matches(trail[cursor])) {
      cursor += 1;
    }

    if (cursor >= trail.length) {
      return -1;
    }

    cursor += 1;
  }

  return cursor;
}

test.describe('Keyboard focus order', () => {
  test.describe('Forward TAB flow', () => {
    test('critical TAB sequence on home', async ({ page }) => {
      await page.goto('/');

      const expectedSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => /#home/.test(meta.href) && /topo da p[aá]gina/i.test(meta.aria),
        (meta) => /#beneficios/.test(meta.href),
        (meta) => /#modalidades/.test(meta.href),
        (meta) => /#cases/.test(meta.href),
        (meta) => /#faq/.test(meta.href) && meta.tag === 'a',
        (meta) => /#location/.test(meta.href),
        (meta) => /#parceiros/.test(meta.href),
        (meta) => /#contato/.test(meta.href),
        (meta) => meta.tag === 'button' && /acessar [aá]rea do cliente/i.test(meta.aria),
        (meta) => meta.tag === 'button' && /Calcular Economia/i.test(meta.text),
        (meta) => meta.tag === 'button' && /Falar com um Especialista/i.test(meta.text),
      ];

      for (const matches of expectedSequence) {
        const active = await pressTabAndReadActive(page);
        expect(matches(active)).toBe(true);
      }
    });

    test('calculation modal opens with initial focus and closes with Escape', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: 'Calcular Economia' }).click();

      const input = page.locator('#valor-consumo');
      await expect(input).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(page.locator('.modal.show')).toHaveCount(0);

      await expect(
        page.locator('#home').getByRole('button', { name: 'Calcular Economia' }),
      ).toBeVisible();
    });

    test('TAB flow covers FAQ, contact form and footer sequence', async ({ page }) => {
      await page.goto('/');

      const trail = await collectFocusTrail(page, 140);

      const faqSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'button' && /Quanto tempo leva/i.test(meta.text),
        (meta) => meta.tag === 'button' && /dias nublados/i.test(meta.text),
        (meta) => meta.tag === 'button' && /baterias/i.test(meta.text),
        (meta) => meta.tag === 'button' && /vida [uú]til/i.test(meta.text),
        (meta) => meta.tag === 'button' && /financiamento/i.test(meta.text),
        (meta) => meta.tag === 'button' && /Selecionar emoji/i.test(meta.aria),
        (meta) => meta.tag === 'textarea' && /Digite sua pergunta/i.test(meta.placeholder),
      ];

      const contactSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'a' && /tel:\+?5521999677722/i.test(meta.href),
        (meta) => meta.tag === 'a' && /mailto:comercial@devsolar\.com\.br/i.test(meta.href),
        (meta) => meta.tag === 'a' && /facebook\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /instagram\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /linkedin\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /wa\.me\/5521999677722/i.test(meta.href),
        (meta) => meta.tag === 'input' && meta.id === 'firstName',
        (meta) => meta.tag === 'input' && meta.id === 'lastName',
        (meta) => meta.tag === 'input' && meta.id === 'email',
        (meta) => meta.tag === 'input' && meta.id === 'phone',
        (meta) => meta.tag === 'textarea' && meta.id === 'message',
        (meta) => meta.tag === 'button' && /Enviar Mensagem/i.test(meta.text),
      ];

      const footerSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'a' && /Ir para a p[aá]gina inicial de DEV Solar/i.test(meta.aria),
        (meta) => meta.tag === 'a' && /tel:5521999677722/i.test(meta.href),
        (meta) => meta.tag === 'a' && /mailto:comercial@devsolar\.com\.br/i.test(meta.href),
        (meta) => meta.tag === 'a' && /^\/#beneficios$/.test(meta.href),
        (meta) => meta.tag === 'a' && /^\/#faq$/.test(meta.href),
        (meta) => meta.tag === 'a' && /facebook\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /instagram\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /linkedin\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /wa\.me\/5521999677722/i.test(meta.href),
        (meta) => meta.tag === 'input' && meta.id === 'newsletter-email',
        (meta) => meta.tag === 'button' && /Inscrever na newsletter/i.test(meta.aria),
        (meta) => meta.tag === 'a' && /^\/#$/.test(meta.href),
        (meta) => meta.tag === 'a' && /linkedin\.com\/in\//i.test(meta.href),
        (meta) => meta.tag === 'a' && /Entrar em contato pelo WhatsApp/i.test(meta.aria),
      ];

      const faqEnd = findOrderedSequence(trail, faqSequence);
      expect(faqEnd, 'FAQ sequence not found in TAB trail').toBeGreaterThan(0);

      const contactEnd = findOrderedSequence(
        trail.slice(Math.max(faqEnd - 1, 0)),
        contactSequence,
      );
      expect(contactEnd, 'Contact sequence not found after FAQ in TAB trail').toBeGreaterThan(0);

      const footerEnd = findOrderedSequence(
        trail.slice(Math.max(faqEnd + contactEnd - 2, 0)),
        footerSequence,
      );
      expect(footerEnd, 'Footer sequence not found after contact in TAB trail').toBeGreaterThan(0);
    });

    test('desktop TAB matrix keeps primary nav then hero CTA order', async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 900 });
      await page.goto('/');

      await expectTabSequence(
        page,
        [
          (meta) => /#home/.test(meta.href) && /topo da p[aá]gina/i.test(meta.aria),
          (meta) => /#beneficios/.test(meta.href),
          (meta) => /#modalidades/.test(meta.href),
          (meta) => /#cases/.test(meta.href),
          (meta) => /#faq/.test(meta.href) && meta.tag === 'a',
          (meta) => /#location/.test(meta.href),
          (meta) => /#parceiros/.test(meta.href),
          (meta) => /#contato/.test(meta.href),
          (meta) => meta.tag === 'button' && /acessar [aá]rea do cliente/i.test(meta.aria),
          (meta) => meta.tag === 'button' && /Calcular Economia/i.test(meta.text),
          (meta) => meta.tag === 'button' && /Falar com um Especialista/i.test(meta.text),
        ],
        'Unexpected desktop TAB order',
      );
    });

    test('mobile TAB matrix covers hamburger closed and opened flows', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');

      await expectTabSequence(
        page,
        [
          (meta) => /#home/.test(meta.href) && /topo da p[aá]gina/i.test(meta.aria),
          (meta) => meta.tag === 'button' && /Toggle navigation/i.test(meta.aria),
        ],
        'Unexpected mobile TAB order with collapsed menu',
      );

      const collapsedNext = await pressTabAndReadActive(page);
      expect(
        collapsedNext.tag === 'button' && /Calcular Economia/i.test(collapsedNext.text),
        'Collapsed mobile menu should skip hidden nav links and move to hero CTA',
      ).toBe(true);

      await page.keyboard.press('Shift+Tab');

      const backToToggle = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) {
          return { tag: '', aria: '' };
        }

        return {
          tag: el.tagName.toLowerCase(),
          aria: el.getAttribute('aria-label') || '',
        };
      });

      expect(
        backToToggle.tag === 'button' && /Toggle navigation/i.test(backToToggle.aria),
        'Expected focus to return to mobile toggle before opening menu',
      ).toBe(true);

      await page.keyboard.press('Enter');

      await expect(page.locator('#basic-navbar-nav')).toHaveClass(/show/);

      await expectTabSequence(
        page,
        [
          (meta) => /#beneficios/.test(meta.href),
          (meta) => /#modalidades/.test(meta.href),
          (meta) => /#cases/.test(meta.href),
          (meta) => /#faq/.test(meta.href),
          (meta) => /#location/.test(meta.href),
          (meta) => /#parceiros/.test(meta.href),
          (meta) => /#contato/.test(meta.href),
          (meta) => meta.tag === 'button' && /acessar [aá]rea do cliente/i.test(meta.aria),
        ],
        'Unexpected mobile TAB order with expanded menu',
      );
    });
  });

  test.describe('Reverse Shift+TAB flow', () => {
    test('Shift+TAB reverse flow covers footer, contact and FAQ controls', async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 900 });
      await page.goto('/');

      const newsletterSubmit = page.locator('button[aria-label="Inscrever na newsletter"]');
      await newsletterSubmit.focus();
      await expect(newsletterSubmit).toBeFocused();

      const reverseTrail = await collectShiftTabTrail(page, 120);

      const footerReverseSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'input' && meta.id === 'newsletter-email',
        (meta) => meta.tag === 'a' && /wa\.me\/5521999677722/i.test(meta.href),
        (meta) => meta.tag === 'a' && /linkedin\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /instagram\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /facebook\.com/i.test(meta.href),
        (meta) => meta.tag === 'a' && /^\/#faq$/.test(meta.href),
      ];

      const contactReverseSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'button' && /Enviar Mensagem/i.test(meta.text),
        (meta) => meta.tag === 'textarea' && meta.id === 'message',
        (meta) => meta.tag === 'input' && meta.id === 'phone',
        (meta) => meta.tag === 'input' && meta.id === 'email',
        (meta) => meta.tag === 'input' && meta.id === 'lastName',
        (meta) => meta.tag === 'input' && meta.id === 'firstName',
      ];

      const faqReverseSequence: Array<(meta: FocusMeta) => boolean> = [
        (meta) => meta.tag === 'textarea' && /Digite sua pergunta/i.test(meta.placeholder),
        (meta) => meta.tag === 'button' && /Selecionar emoji/i.test(meta.aria),
        (meta) => meta.tag === 'button' && /financiamento/i.test(meta.text),
      ];

      const footerEnd = findOrderedSequence(reverseTrail, footerReverseSequence);
      expect(footerEnd, 'Footer reverse sequence not found in Shift+TAB trail').toBeGreaterThan(0);

      const contactEnd = findOrderedSequence(
        reverseTrail.slice(Math.max(footerEnd - 1, 0)),
        contactReverseSequence,
      );
      expect(
        contactEnd,
        'Contact reverse sequence not found after footer in Shift+TAB trail',
      ).toBeGreaterThan(0);

      const faqEnd = findOrderedSequence(
        reverseTrail.slice(Math.max(footerEnd + contactEnd - 2, 0)),
        faqReverseSequence,
      );
      expect(faqEnd, 'FAQ reverse sequence not found after contact in Shift+TAB trail').toBeGreaterThan(0);
    });
  });
});
