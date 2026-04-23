import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import { type Foundations } from "../../design-system/tokens"
import type { CascaderTokens } from "./types"
export const createCascaderTokens = (foundations: Foundations): CascaderTokens => {
  const { palette, spacing, radii } = foundations
  const surface = foundations.surface ?? '#ffffff'
  const surfaceMuted = palette.default[100]
  const placeholderText = "Select"
  return {
    defaults: { placeholder: placeholderText, title: placeholderText, showHeader: true, closeable: true, swipeable: true, poppable: false, closeOnClickOverlay: true, closeOnFinish: true, popupPlacement: "bottom", popupRound: true, loadingText: "Loading...", },
    layout: {
      container: { borderRadius: 0, width: "100%", },
      header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 0, },
      title: { lineHeight: 20, includeFontPadding: false, },
      closeButton: {},
      tabsWrapper: { width: "100%", },
      tabsContentStatic: { width: "100%", },
      tabsItem: { alignItems: "center", },
      tabsTitle: { includeFontPadding: false, },
      tabTitleNode: { includeFontPadding: false, },
      optionList: { flexGrow: 0, },
      option: { justifyContent: "center", },
      optionContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
      optionText: { lineHeight: 20, includeFontPadding: false, },
      optionTextActive: {},
      optionLabel: { flex: 1, },
      empty: { textAlign: "center", },
      inlineChildren: {},
    },
    colors: { background: surface, headerText: palette.default[900], placeholder: palette.default[500], closeIcon: palette.default[300], closeIconActive: palette.default[500], tabText: palette.default[900], tabActive: palette.primary[500], tabInactive: palette.default[500], optionText: palette.default[900], optionDisabled: palette.default[300], optionActiveBackground: surfaceMuted, optionActiveText: palette.primary[500], divider: palette.default[200], },
    typography: { titleSize: 16, titleWeight: "500", tabsTitleSize: 14, tabTitlePlaceholderWeight: "400", tabTitleWeight: "500", optionTextSize: 14, optionTextActiveWeight: "500", emptyTextSize: 14, },
    sizing: { indicatorHeight: 3, optionMinHeight: 40, optionListHeight: 384, headerHeight: 48, closeIconSize: 22, selectedIconSize: 18, },
    radii: { option: radii.sm, },
    spacing: { headerPaddingHorizontal: spacing.lg, tabNavPaddingHorizontal: 6, tabNavPaddingVertical: 2, tabPaddingHorizontal: 10, optionPaddingVertical: 10, optionPaddingHorizontal: spacing.lg, optionListPaddingTop: 6, optionListPaddingBottom: 0, closeButtonMarginLeft: 8, optionLabelMarginRight: 12, emptyPaddingVertical: 24, inlineChildrenPaddingVertical: 12, },
  }
}
export const useCascaderTokens = createComponentTokensHook(
  "cascader",
  createCascaderTokens
)
