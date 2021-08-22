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
    <div className='w-full'>
      <span className='absolute right-2 top-1/2 transform rotate-90 text-gray-500 font-bold'>
        {'>'}
      </span>
      <SelectSearch
        search
        options={[
          { value: 'hamburger', name: 'Hamburger' },
          { value: 'fries', name: 'Fries' },
          { value: 'milkshake', name: 'Milkshake' },
        ]}
        filterOptions={fuzzySearch}
        emptyMessage='Não encontrado'
        className={(key) => styles[key]}
        {...rest}
      />
    </div>
  )
}
