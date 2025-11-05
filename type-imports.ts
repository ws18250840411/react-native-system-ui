import type Foo from './type-default'
import type Bar from './type-default'

const value: Foo | Bar = {} as Foo
console.log(value)
