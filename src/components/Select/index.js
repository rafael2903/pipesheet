import SelectSearch from 'react-select-search/dist/cjs/SelectSearch'
import Fuse from 'fuse.js'
import styles from './styles.module.css'

export default function Select({ ...rest }) {
  function fuzzySearch(options) {
    const fuse = new Fuse(options, {
      keys: ['name', 'groupName', 'items.name'],
      threshold: 0.3,
    })

    return (value) => {
      if (!value.length) {
        return options
      }

      return fuse.search(value)
    }
  }

  return (
    <SelectSearch
      search
      options={[
        { value: 'hamburger', name: 'Hamburger' },
        { value: 'fries', name: 'Fries' },
        { value: 'milkshake', name: 'Milkshake' },
      ]}
      filterOptions={fuzzySearch}
      emptyMessage="Não encontrado"
      className={(key) => styles[key]}
      {...rest}
    />
  )
}
