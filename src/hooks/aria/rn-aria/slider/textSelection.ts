

import { runAfterTransition } from '@react-aria/utils';
type State = 'default' | 'disabled' | 'restoring';

let state: State = 'default';
let savedUserSelect = '';

export function disableTextSelection() {
  if (state === 'default') {
    savedUserSelect = document.documentElement.style.webkitUserSelect;
    document.documentElement.style.webkitUserSelect = 'none';
  }

  state = 'disabled';
}

export function restoreTextSelection() {
  if (state !== 'disabled') {
    return;
  }

  state = 'restoring';
  setTimeout(() => {
    runAfterTransition(() => {
      if (state === 'restoring') {
        if (document.documentElement.style.webkitUserSelect === 'none') {
          document.documentElement.style.webkitUserSelect =
            savedUserSelect || '';
        }

        savedUserSelect = '';
        state = 'default';
      }
    });
  }, 300);
}
