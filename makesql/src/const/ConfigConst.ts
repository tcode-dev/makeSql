export const ConfigConst = {
  characterCode: {
    utf8: 'UTF-8',
    shiftJis: 'Shift_JIS',
    eucJp: 'EUC-JP'
  },
  delimiter: {
    comma: ',',
    space: /\s/,
    tab: /\t/
  },
  lettercase: {
    lowercase: {
      select: 'select',
      insert: 'insert',
      delete: 'delete',
      update: 'update',
      from: 'from',
      where: 'where',
      into: 'into',
      values: 'values',
      set: 'set',
      and: 'and',
      or: 'or'
    },
    camelcase: {
      select: 'Select',
      insert: 'Insert',
      delete: 'Delete',
      update: 'Update',
      from: 'From',
      where: 'Where',
      into: 'Into',
      values: 'Values',
      set: 'Set',
      and: 'And',
      or: 'Or'
    },
    uppercase: {
      select: 'SELECT',
      insert: 'INSERT',
      delete: 'DELETE',
      update: 'UPDATE',
      from: 'FROM',
      where: 'WHERE',
      into: 'INTO',
      values: 'VALUES',
      set: 'SET',
      and: 'AND',
      or: 'OR'
    }
  }
}
export const LabelConst = {
  utf8: 'UTF-8',
  shiftJis: 'Shift_JIS',
  eucJp: 'EUC-JP',
  comma: 'comma',
  space: 'space',
  tab: 'tab',
  lowercase: 'lowercase',
  camelcase: 'Camelcase',
  uppercase: 'UPPERCASE'
}
export type TypeOfConfigConst = typeof ConfigConst
export type MultipleConfig = keyof TypeOfConfigConst
export type CharacterCode = keyof TypeOfConfigConst['characterCode']
export type Delimiter = keyof TypeOfConfigConst['delimiter']
export type Lettercase = keyof TypeOfConfigConst['lettercase']
export type LabelGroup = CharacterCode[] | Delimiter[] | Lettercase[]
export type Bulk = 'bulk'
export type Quotation = 'quotation'
export type SingleConfig = Bulk | Quotation
