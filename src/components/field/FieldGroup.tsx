import React from 'react'

import { CellGroup } from '../cell/CellGroup'
import type { CellGroupProps } from '../cell/types'

export interface FieldGroupProps extends CellGroupProps {}

export const FieldGroup: React.FC<FieldGroupProps> = props => <CellGroup {...props} />

FieldGroup.displayName = 'FieldGroup'
