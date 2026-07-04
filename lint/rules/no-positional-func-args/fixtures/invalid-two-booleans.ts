// hodor-test expect-message: same boolean type
export function setFeatureFlags(isEnabled: boolean, isVisible: boolean) {
  return { isEnabled, isVisible };
}
