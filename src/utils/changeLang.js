import i18next from "i18next";

export function getContent(content_ru, content_uz) {
  const currentLanguage = i18next.language;
  return currentLanguage === "uz" ? content_uz : content_ru;
}
