import React from "react"
import { Cascader, Field, FieldGroup, type CascaderOption } from "react-native-system-ui"

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const initialOptions: AsyncOption[] = [
  { text: "浙江省", value: "zhejiang" },
  { text: "江苏省", value: "jiangsu" },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(item => item?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "请选择所在地区"
}

const cloneOptions = (options: AsyncOption[]): AsyncOption[] =>
  options.map(option => ({
    ...option,
    children: option.children ? cloneOptions(option.children) : undefined,
  }))

const updateOption = (
  options: AsyncOption[],
  target: CascaderOption | undefined,
  updater: (option: AsyncOption) => AsyncOption,
): AsyncOption[] => {
  if (!target) return options
  return options.map(option => {
    if (option.value === target.value) {
      return updater(option)
    }
    if (option.children) {
      return {
        ...option,
        children: updateOption(option.children, target, updater),
      }
    }
    return option
  })
}

export default function CascaderAsyncDemo() {
  const [options, setOptions] = React.useState<AsyncOption[]>(initialOptions)
  const [value, setValue] = React.useState<string[]>([])

  const loadChildren = (option: AsyncOption) => {
    setOptions(prev => updateOption(prev, option, item => ({ ...item, loading: true })))
    setTimeout(() => {
      setOptions(prev =>
        updateOption(prev, option, item => ({
          ...item,
          loading: false,
          children: [
            { text: `${item.text} - A`, value: `${item.value}-a` },
            { text: `${item.text} - B`, value: `${item.value}-b` },
          ],
        })),
      )
    }, 800)
  }

  const handleChange = (_: string[], rows: CascaderOption[]) => {
    const last = rows[rows.length - 1] as AsyncOption | undefined
    if (last && !last.children && !last.loading) {
      loadChildren(last)
    }
  }

  return (
    <Cascader
      poppable
      options={options}
      value={value}
      onChange={(val, rows) => {
        setValue(val)
        handleChange(val, rows)
      }}
      onFinish={(val, rows) => {
        setValue(val)
        handleChange(val, rows)
      }}
    >
      {(_, rows, actions) => (
        <FieldGroup title="异步加载">
          <Field
            label="地区"
            value={formatValue(rows)}
            placeholder="请选择所在地区"
            readOnly
            isLink
            onPress={actions.open}
          />
        </FieldGroup>
      )}
    </Cascader>
  )
}
