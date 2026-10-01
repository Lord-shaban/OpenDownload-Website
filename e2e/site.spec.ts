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
    const motion = page.getByRole("button", {
      name: ar ? "إيقاف الحركة" : "Pause motion",
      exact: true,
    });
    await motion.click();
    await expect(page.locator(".media-scene")).toHaveAttribute("data-paused", "true");
    await expect(
      page.getByRole("button", { name: ar ? "تشغيل الحركة" : "Resume motion", exact: true })
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".source-grid button")).toHaveCount(8);
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
