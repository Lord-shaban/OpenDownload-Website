import { expect, test } from "@playwright/test";
import { routes, SITE_URL, APP_URL, REPO_URL } from "../lib/site";
for (const locale of ["en", "ar"] as const) {
  const ar = locale === "ar";
  test(`${locale}: product preview, theme, FAQ and language navigation`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", ar ? "rtl" : "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      ar ? "من رابط عام" : "From a public link"
    );
    expect(
      await page.locator("main .actions").first().getByRole("link").first().getAttribute("href")
    ).toBe(APP_URL);
    expect(
      await page.locator("main .actions").first().getByRole("link").nth(1).getAttribute("href")
    ).toBe(REPO_URL);
    await expect(page.locator(".media-scene")).toBeVisible();
    await page
      .getByRole("button", { name: ar ? "إيقاف الحركة" : "Pause motion", exact: true })
      .click();
    await expect(page.locator(".media-scene")).toHaveAttribute("data-paused", "true");
    await expect(
      page.getByRole("button", { name: ar ? "تشغيل الحركة" : "Resume motion", exact: true })
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".source-grid button")).toHaveCount(11);
    for (const source of ["linkedin", "pinterest", "threads"]) {
      await page.locator(`.source-${source}`).click();
      await expect(page.locator(`.source-${source}`)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("#source-detail")).toContainText(
        ar ? "أحدث كود" : "current source"
      );
      await expect(page.locator("#source-detail .source-status")).toHaveText(
        ar ? "اختُبر الكود الجديد" : "Current source tested"
      );
    }
    await page.locator(".source-soundcloud").click();
    await expect(page.locator("#source-detail")).toContainText("NASA");
    await expect(page.locator(".source-soundcloud")).toHaveAttribute("aria-pressed", "true");
    await page.locator(".source-instagram").click();
    await expect(page.locator("#source-detail")).toContainText(
      ar ? "معارض الصور" : "photo galleries"
    );
    const dark = page.getByRole("button", { name: ar ? "داكن" : "Dark", exact: true });
    await dark.click();
    await expect(dark).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".showcase-image img")).toHaveAttribute("alt", /owned|مملوك/);
    await page.getByRole("button", { name: ar ? "العربية" : "Arabic", exact: true }).click();
    await expect(page.locator(".showcase-image img")).toHaveAttribute("alt", /Arabic|العربية/);
    await page.locator(".faq-list summary").first().click();
    await expect(page.locator(".faq-list details").first()).toHaveAttribute("open", "");
    await expect(page.locator(".faq-list details").first().locator("p")).toContainText("MIT");
    await page
      .getByRole("button", { name: ar ? "تغيير المظهر" : "Switch color theme", exact: true })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page
      .getByRole("link", { name: ar ? "Switch to English" : "Switch to Arabic", exact: true })
      .click();
    await expect(page).toHaveURL(ar ? /\/en$/ : /\/ar$/);
    await expect(page.locator("html")).toHaveAttribute("lang", ar ? "en" : "ar");
  });
  test(`${locale}: documentation search, links and locale preservation`, async ({ page }) => {
    await page.goto(`/${locale}/docs`);
    const search = page.getByRole("searchbox", {
      name: ar ? "بحث في التوثيق" : "Search documentation",
    });
    await search.fill(ar ? "الصيغ" : "formats");
    const nav = page.getByRole("navigation", {
      name: ar ? "أدلة التوثيق" : "Documentation guides",
    });
    await expect(nav.getByRole("link")).toHaveCount(1);
    await nav.getByRole("link").click();
    await expect(page).toHaveURL(/docs\/capabilities$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      ar ? "المصادر والصيغ" : "Sources & formats"
    );
    await expect(page.locator(".prose")).toContainText("YouTube");
    await page
      .getByRole("link", { name: ar ? "Switch to English" : "Switch to Arabic", exact: true })
      .click();
    await expect(page).toHaveURL(ar ? /\/en\/docs\/capabilities$/ : /\/ar\/docs\/capabilities$/);
    await page.goto(`/${locale}/docs/self-hosting`);
    await expect(page.locator("pre code")).toContainText("--no-build");
    await page.getByRole("button", { name: ar ? "نسخ الأمر" : "Copy command" }).click();
    await expect(page.locator(".code-block").getByRole("status")).toContainText(
      /copied|تم نسخ|Select|تعذر/
    );
  });
  test(`${locale}: responsive product images and compact layouts`, async ({ page }) => {
    await page.goto(`/${locale}`);
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      const heroOrder = await page.locator(".hero").evaluate((hero) => {
        const title = hero.querySelector("h1")!.getBoundingClientRect();
        const actions = hero.querySelector(".actions")!.getBoundingClientRect();
        return title.bottom < actions.top;
      });
      expect(heroOrder).toBe(true);
      for (const name of ar ? ["فاتح", "داكن", "العربية"] : ["Light", "Dark", "Arabic"]) {
        await page.getByRole("button", { name, exact: true }).click();
        const image = page.locator(".showcase-image img");
        await expect
          .poll(() =>
            image.evaluate((el) => {
              const image = el as HTMLImageElement;
              return image.complete && image.naturalWidth > 100;
            })
          )
          .toBe(true);
        const src = await image.evaluate((el) => (el as HTMLImageElement).currentSrc);
        expect(src).toMatch(/workspace-(light|dark|arabic)\.jpg/);
      }
    }
    for (const photo of await page
      .locator(".media-scene img, .media-bento img, .journal-card img, .open-art img")
      .all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate(
            (el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 100
          )
        )
        .toBe(true);
    }
  });
  test(`${locale}: source announcement, publication dates and article metadata`, async ({
    page,
    request,
  }) => {
    await page.goto(`/${locale}/blog`);
    const newest = page.locator(".journal-card").first();
    await expect(newest).toContainText(ar ? "لينكدإن" : "LinkedIn");
    await expect(newest.locator("img")).toHaveAttribute("src", /sources-collection-v2/);
    await expect(newest.locator("time")).toHaveAttribute("datetime", "2026-10-03");
    await expect(page.locator('.journal-card time[datetime="2026-10-01"]')).toHaveCount(2);
    await newest.click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/blog/linkedin-pinterest-threads$`));
    await expect(page.locator(".prose")).toContainText("Threads");
    await expect(page.locator(".article-cover img")).toHaveAttribute("loading", "eager");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      ar ? "لينكدإن وبينترست وثريدز" : "LinkedIn, Pinterest and Threads"
    );
    await expect(page.locator(".article-meta time")).toHaveAttribute("datetime", "2026-10-03");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    const response = await request.get(`/${locale}/blog/linkedin-pinterest-threads`);
    expect(await response.text()).toContain(
      'property="article:published_time" content="2026-10-03T00:00:00Z"'
    );
  });
  test(`${locale}: no overflow, working routes, metadata and reduced motion`, async ({
    page,
    request,
    isMobile,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    expect(
      await page.locator(".hero h1").evaluate((el) => getComputedStyle(el).animationName)
    ).toBe("none");
    expect(
      await page.locator(".scene-photo").evaluate((el) => getComputedStyle(el).animationName)
    ).toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    if (isMobile) {
      await page.getByLabel(ar ? "قائمة التنقل" : "Navigation menu").click();
      await expect(
        page.getByRole("navigation", { name: ar ? "تنقل الهاتف" : "Mobile navigation" })
      ).toBeVisible();
    } else {
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: ar ? "انتقل إلى المحتوى" : "Skip to content" })
      ).toBeFocused();
    }
    for (const path of routes) {
      const response = await request.get(`/${locale}${path ? `/${path}` : ""}`);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html).toContain(`<html lang="${locale}"`);
      expect(html).toContain(
        `rel="canonical" href="${SITE_URL}/${locale}${path ? `/${path}` : ""}"`
      );
      expect(html).toContain('property="og:title"');
      expect(html).toContain(`property="og:image" content="${SITE_URL}/opengraph-image`);
    }
    for (const path of ["docs/self-hosting", "blog/introducing-0-1", "security"]) {
      await page.goto(`/${locale}/${path}`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        path
      ).toBe(true);
    }
    const missing = await request.get(`/${locale}/not-a-page`);
    expect(missing.status()).toBe(404);
  });
}
