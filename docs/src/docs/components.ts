import type { Locale } from '@/context/LocaleContext';

import action_sheetZh, { metadata as action_sheetZhMeta } from '../pages/action-sheet/index.zh-CN.md';
import action_sheetEn, { metadata as action_sheetEnMeta } from '../pages/action-sheet/index.en-US.md';
import avatarZh, { metadata as avatarZhMeta } from '../pages/avatar/index.zh-CN.md';
import avatarEn, { metadata as avatarEnMeta } from '../pages/avatar/index.en-US.md';
import badgeZh, { metadata as badgeZhMeta } from '../pages/badge/index.zh-CN.md';
import badgeEn, { metadata as badgeEnMeta } from '../pages/badge/index.en-US.md';
import blankZh, { metadata as blankZhMeta } from '../pages/blank/index.zh-CN.md';
import blankEn, { metadata as blankEnMeta } from '../pages/blank/index.en-US.md';
import bottom_barZh, { metadata as bottom_barZhMeta } from '../pages/bottom-bar/index.zh-CN.md';
import bottom_barEn, { metadata as bottom_barEnMeta } from '../pages/bottom-bar/index.en-US.md';
import buttonZh, { metadata as buttonZhMeta } from '../pages/button/index.zh-CN.md';
import buttonEn, { metadata as buttonEnMeta } from '../pages/button/index.en-US.md';
import button_barZh, { metadata as button_barZhMeta } from '../pages/button-bar/index.zh-CN.md';
import button_barEn, { metadata as button_barEnMeta } from '../pages/button-bar/index.en-US.md';
import cardZh, { metadata as cardZhMeta } from '../pages/card/index.zh-CN.md';
import cardEn, { metadata as cardEnMeta } from '../pages/card/index.en-US.md';
import cellZh, { metadata as cellZhMeta } from '../pages/cell/index.zh-CN.md';
import cellEn, { metadata as cellEnMeta } from '../pages/cell/index.en-US.md';
import checkboxZh, { metadata as checkboxZhMeta } from '../pages/checkbox/index.zh-CN.md';
import checkboxEn, { metadata as checkboxEnMeta } from '../pages/checkbox/index.en-US.md';
import colZh, { metadata as colZhMeta } from '../pages/col/index.zh-CN.md';
import colEn, { metadata as colEnMeta } from '../pages/col/index.en-US.md';
import collapseZh, { metadata as collapseZhMeta } from '../pages/collapse/index.zh-CN.md';
import collapseEn, { metadata as collapseEnMeta } from '../pages/collapse/index.en-US.md';
import date_pickerZh, { metadata as date_pickerZhMeta } from '../pages/date-picker/index.zh-CN.md';
import date_pickerEn, { metadata as date_pickerEnMeta } from '../pages/date-picker/index.en-US.md';
import date_picker_viewZh, { metadata as date_picker_viewZhMeta } from '../pages/date-picker-view/index.zh-CN.md';
import date_picker_viewEn, { metadata as date_picker_viewEnMeta } from '../pages/date-picker-view/index.en-US.md';
import descriptionZh, { metadata as descriptionZhMeta } from '../pages/description/index.zh-CN.md';
import descriptionEn, { metadata as descriptionEnMeta } from '../pages/description/index.en-US.md';
import dialogZh, { metadata as dialogZhMeta } from '../pages/dialog/index.zh-CN.md';
import dialogEn, { metadata as dialogEnMeta } from '../pages/dialog/index.en-US.md';
import dividerZh, { metadata as dividerZhMeta } from '../pages/divider/index.zh-CN.md';
import dividerEn, { metadata as dividerEnMeta } from '../pages/divider/index.en-US.md';
import dropdownZh, { metadata as dropdownZhMeta } from '../pages/dropdown/index.zh-CN.md';
import dropdownEn, { metadata as dropdownEnMeta } from '../pages/dropdown/index.en-US.md';
import elevator_navZh, { metadata as elevator_navZhMeta } from '../pages/elevator-nav/index.zh-CN.md';
import elevator_navEn, { metadata as elevator_navEnMeta } from '../pages/elevator-nav/index.en-US.md';
import emptyZh, { metadata as emptyZhMeta } from '../pages/empty/index.zh-CN.md';
import emptyEn, { metadata as emptyEnMeta } from '../pages/empty/index.en-US.md';
import error_boundaryZh, { metadata as error_boundaryZhMeta } from '../pages/error-boundary/index.zh-CN.md';
import error_boundaryEn, { metadata as error_boundaryEnMeta } from '../pages/error-boundary/index.en-US.md';
import fieldZh, { metadata as fieldZhMeta } from '../pages/field/index.zh-CN.md';
import fieldEn, { metadata as fieldEnMeta } from '../pages/field/index.en-US.md';
import flexZh, { metadata as flexZhMeta } from '../pages/flex/index.zh-CN.md';
import flexEn, { metadata as flexEnMeta } from '../pages/flex/index.en-US.md';
import floating_panelZh, { metadata as floating_panelZhMeta } from '../pages/floating-panel/index.zh-CN.md';
import floating_panelEn, { metadata as floating_panelEnMeta } from '../pages/floating-panel/index.en-US.md';
import formZh, { metadata as formZhMeta } from '../pages/form/index.zh-CN.md';
import formEn, { metadata as formEnMeta } from '../pages/form/index.en-US.md';
import gridZh, { metadata as gridZhMeta } from '../pages/grid/index.zh-CN.md';
import gridEn, { metadata as gridEnMeta } from '../pages/grid/index.en-US.md';
import loadingZh, { metadata as loadingZhMeta } from '../pages/loading/index.zh-CN.md';
import loadingEn, { metadata as loadingEnMeta } from '../pages/loading/index.en-US.md';
import nav_barZh, { metadata as nav_barZhMeta } from '../pages/nav-bar/index.zh-CN.md';
import nav_barEn, { metadata as nav_barEnMeta } from '../pages/nav-bar/index.en-US.md';
import nav_tabZh, { metadata as nav_tabZhMeta } from '../pages/nav-tab/index.zh-CN.md';
import nav_tabEn, { metadata as nav_tabEnMeta } from '../pages/nav-tab/index.en-US.md';
import notice_barZh, { metadata as notice_barZhMeta } from '../pages/notice-bar/index.zh-CN.md';
import notice_barEn, { metadata as notice_barEnMeta } from '../pages/notice-bar/index.en-US.md';
import notifyZh, { metadata as notifyZhMeta } from '../pages/notify/index.zh-CN.md';
import notifyEn, { metadata as notifyEnMeta } from '../pages/notify/index.en-US.md';
import number_inputZh, { metadata as number_inputZhMeta } from '../pages/number-input/index.zh-CN.md';
import number_inputEn, { metadata as number_inputEnMeta } from '../pages/number-input/index.en-US.md';
import overlayZh, { metadata as overlayZhMeta } from '../pages/overlay/index.zh-CN.md';
import overlayEn, { metadata as overlayEnMeta } from '../pages/overlay/index.en-US.md';
import password_inputZh, { metadata as password_inputZhMeta } from '../pages/password-input/index.zh-CN.md';
import password_inputEn, { metadata as password_inputEnMeta } from '../pages/password-input/index.en-US.md';
import pickerZh, { metadata as pickerZhMeta } from '../pages/picker/index.zh-CN.md';
import pickerEn, { metadata as pickerEnMeta } from '../pages/picker/index.en-US.md';
import picker_viewZh, { metadata as picker_viewZhMeta } from '../pages/picker-view/index.zh-CN.md';
import picker_viewEn, { metadata as picker_viewEnMeta } from '../pages/picker-view/index.en-US.md';
import popoverZh, { metadata as popoverZhMeta } from '../pages/popover/index.zh-CN.md';
import popoverEn, { metadata as popoverEnMeta } from '../pages/popover/index.en-US.md';
import popupZh, { metadata as popupZhMeta } from '../pages/popup/index.zh-CN.md';
import popupEn, { metadata as popupEnMeta } from '../pages/popup/index.en-US.md';
import progressZh, { metadata as progressZhMeta } from '../pages/progress/index.zh-CN.md';
import progressEn, { metadata as progressEnMeta } from '../pages/progress/index.en-US.md';
import resultZh, { metadata as resultZhMeta } from '../pages/result/index.zh-CN.md';
import resultEn, { metadata as resultEnMeta } from '../pages/result/index.en-US.md';
import rowZh, { metadata as rowZhMeta } from '../pages/row/index.zh-CN.md';
import rowEn, { metadata as rowEnMeta } from '../pages/row/index.en-US.md';
import searchZh, { metadata as searchZhMeta } from '../pages/search/index.zh-CN.md';
import searchEn, { metadata as searchEnMeta } from '../pages/search/index.en-US.md';
import selectorZh, { metadata as selectorZhMeta } from '../pages/selector/index.zh-CN.md';
import selectorEn, { metadata as selectorEnMeta } from '../pages/selector/index.en-US.md';
import sidebarZh, { metadata as sidebarZhMeta } from '../pages/sidebar/index.zh-CN.md';
import sidebarEn, { metadata as sidebarEnMeta } from '../pages/sidebar/index.en-US.md';
import skeletonZh, { metadata as skeletonZhMeta } from '../pages/skeleton/index.zh-CN.md';
import skeletonEn, { metadata as skeletonEnMeta } from '../pages/skeleton/index.en-US.md';
import spaceZh, { metadata as spaceZhMeta } from '../pages/space/index.zh-CN.md';
import spaceEn, { metadata as spaceEnMeta } from '../pages/space/index.en-US.md';
import step_selectorZh, { metadata as step_selectorZhMeta } from '../pages/step-selector/index.zh-CN.md';
import step_selectorEn, { metadata as step_selectorEnMeta } from '../pages/step-selector/index.en-US.md';
import stepsZh, { metadata as stepsZhMeta } from '../pages/steps/index.zh-CN.md';
import stepsEn, { metadata as stepsEnMeta } from '../pages/steps/index.en-US.md';
import switchZh, { metadata as switchZhMeta } from '../pages/switch/index.zh-CN.md';
import switchEn, { metadata as switchEnMeta } from '../pages/switch/index.en-US.md';
import tab_barZh, { metadata as tab_barZhMeta } from '../pages/tab-bar/index.zh-CN.md';
import tab_barEn, { metadata as tab_barEnMeta } from '../pages/tab-bar/index.en-US.md';
import tabsZh, { metadata as tabsZhMeta } from '../pages/tabs/index.zh-CN.md';
import tabsEn, { metadata as tabsEnMeta } from '../pages/tabs/index.en-US.md';
import tagZh, { metadata as tagZhMeta } from '../pages/tag/index.zh-CN.md';
import tagEn, { metadata as tagEnMeta } from '../pages/tag/index.en-US.md';
import text_inputZh, { metadata as text_inputZhMeta } from '../pages/text-input/index.zh-CN.md';
import text_inputEn, { metadata as text_inputEnMeta } from '../pages/text-input/index.en-US.md';
import text_input_base_todoZh, { metadata as text_input_base_todoZhMeta } from '../pages/text-input-base_todo/index.zh-CN.md';
import text_input_base_todoEn, { metadata as text_input_base_todoEnMeta } from '../pages/text-input-base_todo/index.en-US.md';
import toastZh, { metadata as toastZhMeta } from '../pages/toast/index.zh-CN.md';
import toastEn, { metadata as toastEnMeta } from '../pages/toast/index.en-US.md';
import treeZh, { metadata as treeZhMeta } from '../pages/tree/index.zh-CN.md';
import treeEn, { metadata as treeEnMeta } from '../pages/tree/index.en-US.md';
import uploaderZh, { metadata as uploaderZhMeta } from '../pages/uploader/index.zh-CN.md';
import uploaderEn, { metadata as uploaderEnMeta } from '../pages/uploader/index.en-US.md';
import water_markZh, { metadata as water_markZhMeta } from '../pages/water-mark/index.zh-CN.md';
import water_markEn, { metadata as water_markEnMeta } from '../pages/water-mark/index.en-US.md';

export type ComponentDocMeta = {
  slug: string;
  group: string;
  titles: Record<Locale, string>;
  locales: Record<Locale, { Component: React.ComponentType; metadata: any }>; // metadata typed lazily
};

const DOCS: ComponentDocMeta[] = [
  {
    slug: 'action-sheet',
    group: 'feedback',
    titles: {
      'zh-CN': 'Action Sheet 组件',
      'en-US': 'Action Sheet',
    },
    locales: {
      'zh-CN': { Component: action_sheetZh, metadata: action_sheetZhMeta },
      'en-US': { Component: action_sheetEn, metadata: action_sheetEnMeta },
    },
  },
  {
    slug: 'avatar',
    group: 'basic',
    titles: {
      'zh-CN': 'Avatar 头像',
      'en-US': 'Avatar',
    },
    locales: {
      'zh-CN': { Component: avatarZh, metadata: avatarZhMeta },
      'en-US': { Component: avatarEn, metadata: avatarEnMeta },
    },
  },
  {
    slug: 'badge',
    group: 'basic',
    titles: {
      'zh-CN': 'Badge 组件',
      'en-US': 'Badge',
    },
    locales: {
      'zh-CN': { Component: badgeZh, metadata: badgeZhMeta },
      'en-US': { Component: badgeEn, metadata: badgeEnMeta },
    },
  },
  {
    slug: 'blank',
    group: 'basic',
    titles: {
      'zh-CN': 'Blank 组件',
      'en-US': 'Blank',
    },
    locales: {
      'zh-CN': { Component: blankZh, metadata: blankZhMeta },
      'en-US': { Component: blankEn, metadata: blankEnMeta },
    },
  },
  {
    slug: 'bottom-bar',
    group: 'navigation',
    titles: {
      'zh-CN': 'Bottom Bar 组件',
      'en-US': 'Bottom Bar',
    },
    locales: {
      'zh-CN': { Component: bottom_barZh, metadata: bottom_barZhMeta },
      'en-US': { Component: bottom_barEn, metadata: bottom_barEnMeta },
    },
  },
  {
    slug: 'button',
    group: 'basic',
    titles: {
      'zh-CN': 'Button 按钮',
      'en-US': 'Button',
    },
    locales: {
      'zh-CN': { Component: buttonZh, metadata: buttonZhMeta },
      'en-US': { Component: buttonEn, metadata: buttonEnMeta },
    },
  },
  {
    slug: 'button-bar',
    group: 'basic',
    titles: {
      'zh-CN': 'Button Bar 组件',
      'en-US': 'Button Bar',
    },
    locales: {
      'zh-CN': { Component: button_barZh, metadata: button_barZhMeta },
      'en-US': { Component: button_barEn, metadata: button_barEnMeta },
    },
  },
  {
    slug: 'card',
    group: 'basic',
    titles: {
      'zh-CN': 'Card 组件',
      'en-US': 'Card',
    },
    locales: {
      'zh-CN': { Component: cardZh, metadata: cardZhMeta },
      'en-US': { Component: cardEn, metadata: cardEnMeta },
    },
  },
  {
    slug: 'cell',
    group: 'basic',
    titles: {
      'zh-CN': 'Cell 组件',
      'en-US': 'Cell',
    },
    locales: {
      'zh-CN': { Component: cellZh, metadata: cellZhMeta },
      'en-US': { Component: cellEn, metadata: cellEnMeta },
    },
  },
  {
    slug: 'checkbox',
    group: 'basic',
    titles: {
      'zh-CN': 'Checkbox 组件',
      'en-US': 'Checkbox',
    },
    locales: {
      'zh-CN': { Component: checkboxZh, metadata: checkboxZhMeta },
      'en-US': { Component: checkboxEn, metadata: checkboxEnMeta },
    },
  },
  {
    slug: 'col',
    group: 'layout',
    titles: {
      'zh-CN': 'Col 组件',
      'en-US': 'Col',
    },
    locales: {
      'zh-CN': { Component: colZh, metadata: colZhMeta },
      'en-US': { Component: colEn, metadata: colEnMeta },
    },
  },
  {
    slug: 'collapse',
    group: 'basic',
    titles: {
      'zh-CN': 'Collapse 组件',
      'en-US': 'Collapse',
    },
    locales: {
      'zh-CN': { Component: collapseZh, metadata: collapseZhMeta },
      'en-US': { Component: collapseEn, metadata: collapseEnMeta },
    },
  },
  {
    slug: 'date-picker',
    group: 'form',
    titles: {
      'zh-CN': 'Date Picker 组件',
      'en-US': 'Date Picker',
    },
    locales: {
      'zh-CN': { Component: date_pickerZh, metadata: date_pickerZhMeta },
      'en-US': { Component: date_pickerEn, metadata: date_pickerEnMeta },
    },
  },
  {
    slug: 'date-picker-view',
    group: 'form',
    titles: {
      'zh-CN': 'Date Picker View 组件',
      'en-US': 'Date Picker View',
    },
    locales: {
      'zh-CN': { Component: date_picker_viewZh, metadata: date_picker_viewZhMeta },
      'en-US': { Component: date_picker_viewEn, metadata: date_picker_viewEnMeta },
    },
  },
  {
    slug: 'description',
    group: 'others',
    titles: {
      'zh-CN': 'Description 组件',
      'en-US': 'Description',
    },
    locales: {
      'zh-CN': { Component: descriptionZh, metadata: descriptionZhMeta },
      'en-US': { Component: descriptionEn, metadata: descriptionEnMeta },
    },
  },
  {
    slug: 'dialog',
    group: 'feedback',
    titles: {
      'zh-CN': 'Dialog 组件',
      'en-US': 'Dialog',
    },
    locales: {
      'zh-CN': { Component: dialogZh, metadata: dialogZhMeta },
      'en-US': { Component: dialogEn, metadata: dialogEnMeta },
    },
  },
  {
    slug: 'divider',
    group: 'basic',
    titles: {
      'zh-CN': 'Divider 组件',
      'en-US': 'Divider',
    },
    locales: {
      'zh-CN': { Component: dividerZh, metadata: dividerZhMeta },
      'en-US': { Component: dividerEn, metadata: dividerEnMeta },
    },
  },
  {
    slug: 'dropdown',
    group: 'navigation',
    titles: {
      'zh-CN': 'Dropdown 组件',
      'en-US': 'Dropdown',
    },
    locales: {
      'zh-CN': { Component: dropdownZh, metadata: dropdownZhMeta },
      'en-US': { Component: dropdownEn, metadata: dropdownEnMeta },
    },
  },
  {
    slug: 'elevator-nav',
    group: 'navigation',
    titles: {
      'zh-CN': 'Elevator Nav 组件',
      'en-US': 'Elevator Nav',
    },
    locales: {
      'zh-CN': { Component: elevator_navZh, metadata: elevator_navZhMeta },
      'en-US': { Component: elevator_navEn, metadata: elevator_navEnMeta },
    },
  },
  {
    slug: 'empty',
    group: 'basic',
    titles: {
      'zh-CN': 'Empty 组件',
      'en-US': 'Empty',
    },
    locales: {
      'zh-CN': { Component: emptyZh, metadata: emptyZhMeta },
      'en-US': { Component: emptyEn, metadata: emptyEnMeta },
    },
  },
  {
    slug: 'error-boundary',
    group: 'others',
    titles: {
      'zh-CN': 'Error Boundary 组件',
      'en-US': 'Error Boundary',
    },
    locales: {
      'zh-CN': { Component: error_boundaryZh, metadata: error_boundaryZhMeta },
      'en-US': { Component: error_boundaryEn, metadata: error_boundaryEnMeta },
    },
  },
  {
    slug: 'field',
    group: 'form',
    titles: {
      'zh-CN': 'Field 组件',
      'en-US': 'Field',
    },
    locales: {
      'zh-CN': { Component: fieldZh, metadata: fieldZhMeta },
      'en-US': { Component: fieldEn, metadata: fieldEnMeta },
    },
  },
  {
    slug: 'flex',
    group: 'layout',
    titles: {
      'zh-CN': 'Flex 组件',
      'en-US': 'Flex',
    },
    locales: {
      'zh-CN': { Component: flexZh, metadata: flexZhMeta },
      'en-US': { Component: flexEn, metadata: flexEnMeta },
    },
  },
  {
    slug: 'floating-panel',
    group: 'feedback',
    titles: {
      'zh-CN': 'Floating Panel 组件',
      'en-US': 'Floating Panel',
    },
    locales: {
      'zh-CN': { Component: floating_panelZh, metadata: floating_panelZhMeta },
      'en-US': { Component: floating_panelEn, metadata: floating_panelEnMeta },
    },
  },
  {
    slug: 'form',
    group: 'form',
    titles: {
      'zh-CN': 'Form 组件',
      'en-US': 'Form',
    },
    locales: {
      'zh-CN': { Component: formZh, metadata: formZhMeta },
      'en-US': { Component: formEn, metadata: formEnMeta },
    },
  },
  {
    slug: 'grid',
    group: 'basic',
    titles: {
      'zh-CN': 'Grid 组件',
      'en-US': 'Grid',
    },
    locales: {
      'zh-CN': { Component: gridZh, metadata: gridZhMeta },
      'en-US': { Component: gridEn, metadata: gridEnMeta },
    },
  },
  {
    slug: 'loading',
    group: 'basic',
    titles: {
      'zh-CN': 'Loading 组件',
      'en-US': 'Loading',
    },
    locales: {
      'zh-CN': { Component: loadingZh, metadata: loadingZhMeta },
      'en-US': { Component: loadingEn, metadata: loadingEnMeta },
    },
  },
  {
    slug: 'nav-bar',
    group: 'navigation',
    titles: {
      'zh-CN': 'Nav Bar 组件',
      'en-US': 'Nav Bar',
    },
    locales: {
      'zh-CN': { Component: nav_barZh, metadata: nav_barZhMeta },
      'en-US': { Component: nav_barEn, metadata: nav_barEnMeta },
    },
  },
  {
    slug: 'nav-tab',
    group: 'navigation',
    titles: {
      'zh-CN': 'Nav Tab 组件',
      'en-US': 'Nav Tab',
    },
    locales: {
      'zh-CN': { Component: nav_tabZh, metadata: nav_tabZhMeta },
      'en-US': { Component: nav_tabEn, metadata: nav_tabEnMeta },
    },
  },
  {
    slug: 'notice-bar',
    group: 'basic',
    titles: {
      'zh-CN': 'Notice Bar 组件',
      'en-US': 'Notice Bar',
    },
    locales: {
      'zh-CN': { Component: notice_barZh, metadata: notice_barZhMeta },
      'en-US': { Component: notice_barEn, metadata: notice_barEnMeta },
    },
  },
  {
    slug: 'notify',
    group: 'feedback',
    titles: {
      'zh-CN': 'Notify 组件',
      'en-US': 'Notify',
    },
    locales: {
      'zh-CN': { Component: notifyZh, metadata: notifyZhMeta },
      'en-US': { Component: notifyEn, metadata: notifyEnMeta },
    },
  },
  {
    slug: 'number-input',
    group: 'form',
    titles: {
      'zh-CN': 'Number Input 组件',
      'en-US': 'Number Input',
    },
    locales: {
      'zh-CN': { Component: number_inputZh, metadata: number_inputZhMeta },
      'en-US': { Component: number_inputEn, metadata: number_inputEnMeta },
    },
  },
  {
    slug: 'overlay',
    group: 'feedback',
    titles: {
      'zh-CN': 'Overlay 组件',
      'en-US': 'Overlay',
    },
    locales: {
      'zh-CN': { Component: overlayZh, metadata: overlayZhMeta },
      'en-US': { Component: overlayEn, metadata: overlayEnMeta },
    },
  },
  {
    slug: 'password-input',
    group: 'form',
    titles: {
      'zh-CN': 'Password Input 组件',
      'en-US': 'Password Input',
    },
    locales: {
      'zh-CN': { Component: password_inputZh, metadata: password_inputZhMeta },
      'en-US': { Component: password_inputEn, metadata: password_inputEnMeta },
    },
  },
  {
    slug: 'picker',
    group: 'form',
    titles: {
      'zh-CN': 'Picker 组件',
      'en-US': 'Picker',
    },
    locales: {
      'zh-CN': { Component: pickerZh, metadata: pickerZhMeta },
      'en-US': { Component: pickerEn, metadata: pickerEnMeta },
    },
  },
  {
    slug: 'picker-view',
    group: 'form',
    titles: {
      'zh-CN': 'Picker View 组件',
      'en-US': 'Picker View',
    },
    locales: {
      'zh-CN': { Component: picker_viewZh, metadata: picker_viewZhMeta },
      'en-US': { Component: picker_viewEn, metadata: picker_viewEnMeta },
    },
  },
  {
    slug: 'popover',
    group: 'others',
    titles: {
      'zh-CN': 'Popover 组件',
      'en-US': 'Popover',
    },
    locales: {
      'zh-CN': { Component: popoverZh, metadata: popoverZhMeta },
      'en-US': { Component: popoverEn, metadata: popoverEnMeta },
    },
  },
  {
    slug: 'popup',
    group: 'basic',
    titles: {
      'zh-CN': 'Popup 组件',
      'en-US': 'Popup',
    },
    locales: {
      'zh-CN': { Component: popupZh, metadata: popupZhMeta },
      'en-US': { Component: popupEn, metadata: popupEnMeta },
    },
  },
  {
    slug: 'progress',
    group: 'basic',
    titles: {
      'zh-CN': 'Progress 组件',
      'en-US': 'Progress',
    },
    locales: {
      'zh-CN': { Component: progressZh, metadata: progressZhMeta },
      'en-US': { Component: progressEn, metadata: progressEnMeta },
    },
  },
  {
    slug: 'result',
    group: 'basic',
    titles: {
      'zh-CN': 'Result 组件',
      'en-US': 'Result',
    },
    locales: {
      'zh-CN': { Component: resultZh, metadata: resultZhMeta },
      'en-US': { Component: resultEn, metadata: resultEnMeta },
    },
  },
  {
    slug: 'row',
    group: 'layout',
    titles: {
      'zh-CN': 'Row 组件',
      'en-US': 'Row',
    },
    locales: {
      'zh-CN': { Component: rowZh, metadata: rowZhMeta },
      'en-US': { Component: rowEn, metadata: rowEnMeta },
    },
  },
  {
    slug: 'search',
    group: 'form',
    titles: {
      'zh-CN': 'Search 组件',
      'en-US': 'Search',
    },
    locales: {
      'zh-CN': { Component: searchZh, metadata: searchZhMeta },
      'en-US': { Component: searchEn, metadata: searchEnMeta },
    },
  },
  {
    slug: 'selector',
    group: 'form',
    titles: {
      'zh-CN': 'Selector 组件',
      'en-US': 'Selector',
    },
    locales: {
      'zh-CN': { Component: selectorZh, metadata: selectorZhMeta },
      'en-US': { Component: selectorEn, metadata: selectorEnMeta },
    },
  },
  {
    slug: 'sidebar',
    group: 'navigation',
    titles: {
      'zh-CN': 'Sidebar 组件',
      'en-US': 'Sidebar',
    },
    locales: {
      'zh-CN': { Component: sidebarZh, metadata: sidebarZhMeta },
      'en-US': { Component: sidebarEn, metadata: sidebarEnMeta },
    },
  },
  {
    slug: 'skeleton',
    group: 'basic',
    titles: {
      'zh-CN': 'Skeleton 组件',
      'en-US': 'Skeleton',
    },
    locales: {
      'zh-CN': { Component: skeletonZh, metadata: skeletonZhMeta },
      'en-US': { Component: skeletonEn, metadata: skeletonEnMeta },
    },
  },
  {
    slug: 'space',
    group: 'basic',
    titles: {
      'zh-CN': 'Space 组件',
      'en-US': 'Space',
    },
    locales: {
      'zh-CN': { Component: spaceZh, metadata: spaceZhMeta },
      'en-US': { Component: spaceEn, metadata: spaceEnMeta },
    },
  },
  {
    slug: 'step-selector',
    group: 'form',
    titles: {
      'zh-CN': 'Step Selector 组件',
      'en-US': 'Step Selector',
    },
    locales: {
      'zh-CN': { Component: step_selectorZh, metadata: step_selectorZhMeta },
      'en-US': { Component: step_selectorEn, metadata: step_selectorEnMeta },
    },
  },
  {
    slug: 'steps',
    group: 'basic',
    titles: {
      'zh-CN': 'Steps 组件',
      'en-US': 'Steps',
    },
    locales: {
      'zh-CN': { Component: stepsZh, metadata: stepsZhMeta },
      'en-US': { Component: stepsEn, metadata: stepsEnMeta },
    },
  },
  {
    slug: 'switch',
    group: 'basic',
    titles: {
      'zh-CN': 'Switch 组件',
      'en-US': 'Switch',
    },
    locales: {
      'zh-CN': { Component: switchZh, metadata: switchZhMeta },
      'en-US': { Component: switchEn, metadata: switchEnMeta },
    },
  },
  {
    slug: 'tab-bar',
    group: 'basic',
    titles: {
      'zh-CN': 'Tab Bar 组件',
      'en-US': 'Tab Bar',
    },
    locales: {
      'zh-CN': { Component: tab_barZh, metadata: tab_barZhMeta },
      'en-US': { Component: tab_barEn, metadata: tab_barEnMeta },
    },
  },
  {
    slug: 'tabs',
    group: 'basic',
    titles: {
      'zh-CN': 'Tabs 组件',
      'en-US': 'Tabs',
    },
    locales: {
      'zh-CN': { Component: tabsZh, metadata: tabsZhMeta },
      'en-US': { Component: tabsEn, metadata: tabsEnMeta },
    },
  },
  {
    slug: 'tag',
    group: 'basic',
    titles: {
      'zh-CN': 'Tag 组件',
      'en-US': 'Tag',
    },
    locales: {
      'zh-CN': { Component: tagZh, metadata: tagZhMeta },
      'en-US': { Component: tagEn, metadata: tagEnMeta },
    },
  },
  {
    slug: 'text-input',
    group: 'basic',
    titles: {
      'zh-CN': 'Text Input 组件',
      'en-US': 'Text Input',
    },
    locales: {
      'zh-CN': { Component: text_inputZh, metadata: text_inputZhMeta },
      'en-US': { Component: text_inputEn, metadata: text_inputEnMeta },
    },
  },
  {
    slug: 'text-input-base_todo',
    group: 'others',
    titles: {
      'zh-CN': 'Text Input Base_Todo 组件',
      'en-US': 'Text Input Base_Todo',
    },
    locales: {
      'zh-CN': { Component: text_input_base_todoZh, metadata: text_input_base_todoZhMeta },
      'en-US': { Component: text_input_base_todoEn, metadata: text_input_base_todoEnMeta },
    },
  },
  {
    slug: 'toast',
    group: 'basic',
    titles: {
      'zh-CN': 'Toast 组件',
      'en-US': 'Toast',
    },
    locales: {
      'zh-CN': { Component: toastZh, metadata: toastZhMeta },
      'en-US': { Component: toastEn, metadata: toastEnMeta },
    },
  },
  {
    slug: 'tree',
    group: 'form',
    titles: {
      'zh-CN': 'Tree 组件',
      'en-US': 'Tree',
    },
    locales: {
      'zh-CN': { Component: treeZh, metadata: treeZhMeta },
      'en-US': { Component: treeEn, metadata: treeEnMeta },
    },
  },
  {
    slug: 'uploader',
    group: 'feedback',
    titles: {
      'zh-CN': 'Uploader 组件',
      'en-US': 'Uploader',
    },
    locales: {
      'zh-CN': { Component: uploaderZh, metadata: uploaderZhMeta },
      'en-US': { Component: uploaderEn, metadata: uploaderEnMeta },
    },
  },
  {
    slug: 'water-mark',
    group: 'layout',
    titles: {
      'zh-CN': 'Water Mark 组件',
      'en-US': 'Water Mark',
    },
    locales: {
      'zh-CN': { Component: water_markZh, metadata: water_markZhMeta },
      'en-US': { Component: water_markEn, metadata: water_markEnMeta },
    },
  }
];

export function getComponentDocs() {
  return DOCS;
}

export function getComponentDoc(slug: string) {
  return DOCS.find((doc) => doc.slug === slug);
}

export function getMenuGroups(locale: Locale) {
  return [
    {
      key: 'basic',
      label: '基础组件',
      items: DOCS
        .filter((doc) => doc.group === 'basic')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    },
    {
      key: 'form',
      label: '表单组件',
      items: DOCS
        .filter((doc) => doc.group === 'form')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    },
    {
      key: 'feedback',
      label: '反馈组件',
      items: DOCS
        .filter((doc) => doc.group === 'feedback')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    },
    {
      key: 'navigation',
      label: '导航组件',
      items: DOCS
        .filter((doc) => doc.group === 'navigation')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    },
    {
      key: 'layout',
      label: '布局组件',
      items: DOCS
        .filter((doc) => doc.group === 'layout')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    },
    {
      key: 'others',
      label: '其他',
      items: DOCS
        .filter((doc) => doc.group === 'others')
        .map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale] ?? doc.titles['zh-CN'],
        })),
    }
  ].filter((group) => group.items.length > 0);
}

export default DOCS;
